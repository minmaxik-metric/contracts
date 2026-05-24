import { type DynamicModule, Module, Provider } from "@nestjs/common"

import {
	GRPC_CLIENT_PREFIX,
	GRPC_MODULE_OPTIONS
} from "./constants/grpc.constants"
import { GrpcClientFactory } from "./factory/grpc.factory"
import { GrpcClientUrls, GrpcModuleAsyncOptions } from "./interfaces"
import { GRPC_CLIENTS } from "./registry/grpc.registry"

@Module({})
export class GrpcModule {
	public static register(urls: GrpcClientUrls): DynamicModule {
		const entries = Object.entries(urls) as Array<
			[keyof typeof GRPC_CLIENTS, string]
		>
		return {
			module: GrpcModule,
			providers: [
				GrpcClientFactory,
				...entries.map(([token, url]) => this.createClientProvider(token, url))
			],
			exports: [
				GrpcClientFactory,
				...entries.map(([token]) => `${GRPC_CLIENT_PREFIX}_${token}`)
			]
		}
	}

	public static registerAsync(options: GrpcModuleAsyncOptions): DynamicModule {
		return {
			module: GrpcModule,
			imports: options.imports ?? [],
			providers: [
				{
					provide: GRPC_MODULE_OPTIONS,
					useFactory: options.useFactory,
					inject: options.inject ?? []
				},
				{
					provide: GrpcClientFactory,
					useFactory: (urls: GrpcClientUrls) => {
						const factory = new GrpcClientFactory()

						for (const [token, url] of Object.entries(urls)) {
							const config = GRPC_CLIENTS[token as keyof typeof GRPC_CLIENTS]
							if (!config)
								throw new Error(
									`No config provided to token ${token}, update @citec-spbu/common package`
								)
							const client = factory.createClient({
								options: {
									package: config.package,
									protoPath: config.protoPath,
									url
								}
							})

							factory.register(token, client)
						}

						return factory
					},
					inject: [GRPC_MODULE_OPTIONS]
				},
				...options.clients.map(token => ({
					provide: `${GRPC_CLIENT_PREFIX}_${token}`,
					useFactory: (factory: GrpcClientFactory) => factory.getClient(token),
					inject: [GrpcClientFactory]
				}))
			],
			exports: [
				GrpcClientFactory,
				...options.clients.map(token => `${GRPC_CLIENT_PREFIX}_${token}`)
			]
		}
	}

	private static createClientProvider(
		token: keyof typeof GRPC_CLIENTS,
		url: string
	): Provider {
		const config = GRPC_CLIENTS[token]
		return {
			provide: `${GRPC_CLIENT_PREFIX}_${token}`,
			useFactory: (factory: GrpcClientFactory) => {
				const client = factory.createClient({
					options: {
						package: config.package,
						protoPath: config.protoPath,
						url
					}
				})
				factory.register(token, client)
				return client
			},
			inject: [GrpcClientFactory]
		} as Provider
	}
}

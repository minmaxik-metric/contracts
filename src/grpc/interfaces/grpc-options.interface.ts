import { ModuleMetadata } from "@nestjs/common"

import { GRPC_CLIENTS } from "../registry/grpc.registry"

export type GrpcClientUrls = Partial<Record<keyof typeof GRPC_CLIENTS, string>>

export interface GrpcModuleAsyncOptions extends Pick<
	ModuleMetadata,
	"imports"
> {
	clients: Array<keyof typeof GRPC_CLIENTS>
	useFactory: (...args: any[]) => Promise<GrpcClientUrls> | GrpcClientUrls
	inject?: any[]
}

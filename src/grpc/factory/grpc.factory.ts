import { Injectable } from "@nestjs/common"
import {
	ClientGrpc,
	ClientProxyFactory,
	GrpcOptions,
	Transport
} from "@nestjs/microservices"

@Injectable()
export class GrpcClientFactory {
	private clients = new Map<string, ClientGrpc>()

	public createClient(options: GrpcOptions) {
		return ClientProxyFactory.create({
			transport: Transport.GRPC,
			...options
		}) as ClientGrpc
	}

	public register(token: string, client: ClientGrpc) {
		this.clients.set(token, client)
	}

	public getClient<T extends ClientGrpc = ClientGrpc>(token: string): T {
		const client = this.clients.get(token)

		if (!client) throw new Error(`gRPC client ${token} not found`)

		return client as T
	}
}

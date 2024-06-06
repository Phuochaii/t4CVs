import { RpcException } from "@nestjs/microservices";
import { status as GrpcStatus } from "@grpc/grpc-js";
import { HttpException } from "@nestjs/common";

export class GrpcException extends RpcException {
    constructor({ code, httpError }: { code: GrpcStatus; httpError: HttpException }) {
        const errorDetails = JSON.stringify(httpError);
        super({
            code,
            details: errorDetails,
        });
    }
}
import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

export class JwtGuard extends AuthGuard('jwt') {

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const request: Request = ctx.getContext().req;
        return request;
    }
}
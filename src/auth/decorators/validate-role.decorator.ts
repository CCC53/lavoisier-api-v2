import { createParamDecorator, ExecutionContext, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../../personal/enum/valid.roles';
import { Personal } from '../../personal/entities/personal.entity';

export const ValidateRole = createParamDecorator((rol: ValidRoles, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const personal: Personal = ctx.getContext().req.user;
    if (!personal) {
        throw new InternalServerErrorException("No user authenticated");
    }
    if (personal.rol !== rol) {
        throw new ForbiddenException("You don't have the necessary permissions")
    }
    return personal;
});
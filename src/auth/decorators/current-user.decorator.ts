import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Personal } from '../../personal/entities/personal.entity';

export const CurrentUser = createParamDecorator((data: any, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: Personal = ctx.getContext().req.user;
    if (!user) {
        throw new InternalServerErrorException("No user authenticated");
    }
    return user;
}); 
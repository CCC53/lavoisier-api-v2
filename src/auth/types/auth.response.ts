import { Field, ObjectType } from "@nestjs/graphql";
import { Personal } from '../../personal/entities/personal.entity';

@ObjectType()
export class AuthResponse {
    @Field(() => String)
    token: string;

    @Field(() => Personal)
    personal: Personal;
}
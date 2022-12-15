import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateHistorialInput } from './create-historial.input';

@InputType()
export class UpdateHistorialInput extends PartialType(CreateHistorialInput) {
    @Field(() => ID) @IsNotEmpty() @IsUUID()
    id: string;
}
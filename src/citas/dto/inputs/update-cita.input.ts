import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateCitaInput } from './create-cita.input';

@InputType()
export class UpdateCitaInput extends PartialType(CreateCitaInput) {

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    id: string;
}
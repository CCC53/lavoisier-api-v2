import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateCitaInput {

    @Field(() => String) @IsString() @IsNotEmpty()
    motivo: string;

    @Field(() => String) @IsString() @IsNotEmpty()
    fecha: Date;
    
    @Field(() => String) @IsString() @IsNotEmpty()
    horario: string;

    @Field(() => ID) @IsUUID() @IsNotEmpty()
    pacienteId: string;
}
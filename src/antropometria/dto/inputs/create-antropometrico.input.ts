import { Field, Float, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsPositive, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateAntropometricoInput {

    @Field(() => String) @IsNotEmpty() @IsString()
    fecha: string;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    peso: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    talla: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    imc: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    cintura: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    cBrazo: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    pTriceps: number;

    @Field(() => Float) @IsNotEmpty() @IsPositive()
    pAbdominal: number;

    @Field(() => String) @IsNotEmpty() @IsString()
    porcentajeGrasa: string;

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    pacienteId: string;
}
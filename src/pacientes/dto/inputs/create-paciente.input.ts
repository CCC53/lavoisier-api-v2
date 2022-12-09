import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ValidGenres } from '../../enum/valid.genres';

@InputType()
export class CreatePacienteInput {

    @Field(() => String) @IsString() @IsNotEmpty()
    nombre: string;

    @Field(() => String) @IsEmail() @IsNotEmpty()
    email: string;

    @Field(() => String) @IsString() @IsNotEmpty()
    telefono: string;

    @Field(() => ValidGenres) @IsNotEmpty() @IsEnum(ValidGenres)
    sexo: ValidGenres;

    @Field(() => String) @IsString() @IsNotEmpty()
    nacimiento: Date;
}
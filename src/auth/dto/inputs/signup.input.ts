import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ValidRoles } from '../../../personal/enum/valid.roles';

@InputType()
export class SignUpInput {
    @Field(() => String) @IsNotEmpty() @IsString()
    nombre: string;

    @Field(() => String) @IsNotEmpty() @IsString()
    telefono: string;
    
    @Field(() => String) @IsNotEmpty() @IsEmail()
    email: string;
    
    @Field(() => String) @IsNotEmpty() @IsString() @MaxLength(10) @MinLength(5)
    password: string;

    @Field(() => ValidRoles) @IsNotEmpty() @IsEnum(ValidRoles)
    rol: ValidRoles;
}
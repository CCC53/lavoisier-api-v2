import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsEmail, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class SigninInput {
    @Field(() => String) @IsNotEmpty() @IsEmail()
    email: string;

    @Field(() => String) @IsNotEmpty() @IsString() @MaxLength(10) @MinLength(5)
    password: string;
}
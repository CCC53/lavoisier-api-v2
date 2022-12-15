import { Field, Float, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive, IsString, IsUUID } from "class-validator";

@InputType()
export class CreateLaboratorialInput {

    @Field(() => String) @IsNotEmpty() @IsString()
    fecha: Date;
    
    @Field(() => Float) @IsNotEmpty() @IsPositive()
    glucosa: number;
    
    @Field(() => Float) @IsNotEmpty() @IsPositive()
    insulina: number;


    @Field(() => Float) @IsNotEmpty() @IsPositive()
    trigliceridos: number;
    
    @Field(() => Float) @IsNotEmpty() @IsPositive()
    colesterolTotal: number;
    
    @Field(() => Float) @IsNotEmpty() @IsPositive()
    hdl: number;
    
    @Field(() => Float) @IsNotEmpty() @IsPositive()
    ldl: number;

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    pacienteId: string;
}
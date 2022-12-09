import { Field, Float, InputType, ID } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';
import { MetodosPago, TipoPago } from '../../enum/payments.enum';

@InputType()
export class CreatePagoInput {

    @Field(() => Float) @IsPositive() @IsNotEmpty()
    cantidadRecibida: number;
    
    @Field(() => Float) @IsPositive() @IsNotEmpty()
    monto: number;

    @Field(() => TipoPago) @IsEnum(TipoPago) @IsNotEmpty()
    tipoPago: TipoPago;

    @Field(() => MetodosPago) @IsEnum(MetodosPago) @IsNotEmpty()
    metodoPago: MetodosPago;

    @Field(() => ID) @IsUUID() @IsNotEmpty()
    citaId: string;
}
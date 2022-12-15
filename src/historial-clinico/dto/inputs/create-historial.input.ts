import { Field, ID, InputType } from "@nestjs/graphql";
import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { EnfermedadesResponse } from "src/historial-clinico/enum/valid.response";

@InputType()
export class CreateHistorialInput {
    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    enfermedadesCardiovasculares: EnfermedadesResponse;

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    enfermedadesPulmonares: EnfermedadesResponse

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    enfermedadesMetabolicas: EnfermedadesResponse

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    tabaquismo: EnfermedadesResponse;

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    alcoholismo: EnfermedadesResponse;

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    sedentarismo: EnfermedadesResponse;

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    drogas: EnfermedadesResponse;

    @Field(() => EnfermedadesResponse) @IsNotEmpty() @IsEnum(EnfermedadesResponse)
    cafe: EnfermedadesResponse;

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    pacienteId: string;
}
import { registerEnumType } from '@nestjs/graphql';

export enum EnfermedadesResponse {
    si = "Si",
    no = "No"
}

registerEnumType(EnfermedadesResponse, { name: 'validResponse' })
import { registerEnumType } from '@nestjs/graphql';

export enum ValidRoles {
    recepcionista = "R",
    nutriologo = "N"
}

registerEnumType(ValidRoles, { name: 'validRoles' })
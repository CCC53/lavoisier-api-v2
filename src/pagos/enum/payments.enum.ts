import { registerEnumType } from '@nestjs/graphql';

export enum MetodosPago {
    tarjeta = "T",
    efectivo = "E"
}

export enum TipoPago {
    primero = 1,
    posterior = 2
}

registerEnumType(MetodosPago, { name: 'paymentMethod' });
registerEnumType(TipoPago, { name: 'paymentType' });
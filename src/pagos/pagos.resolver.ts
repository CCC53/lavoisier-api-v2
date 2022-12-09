import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';
import { CreatePagoInput } from './dto/inputs/create-pago.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver()
export class PagosResolver {
  constructor(private readonly pagosService: PagosService) {}

  @Query(() => [Pago], { name: 'pagos' })
  findAll() {
    return this.pagosService.findAll();
  }

  @Query(() => Pago, { name: 'pago' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.pagosService.findOne(id);
  }

  @Query(() => Pago, { name: 'pagoByCita' })
  findByCita(@Args('citaId', { type: () => ID }, ParseUUIDPipe) citaId: string) {
    return this.pagosService.findOneByCita(citaId);
  }

  @Mutation(() => Pago, { name: 'addPago' })
  create(@Args('record', { type: () => CreatePagoInput }) record: CreatePagoInput) {
    return this.pagosService.create(record);
  }
}

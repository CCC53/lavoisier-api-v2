import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';
import { CreatePagoInput } from './dto/inputs/create-pago.input';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { ValidRoles } from '../personal/enum/valid.roles';
import { Personal } from '../personal/entities/personal.entity';

@Resolver() @UseGuards(JwtGuard)
export class PagosResolver {
  constructor(private readonly pagosService: PagosService) {}

  @Query(() => [Pago], { name: 'pagos' })
  findAll(@ValidateRole(ValidRoles.recepcionista) personal: Personal) {
    return this.pagosService.findAll();
  }

  @Query(() => Pago, { name: 'pago' })
  findOne(@ValidateRole(ValidRoles.recepcionista) personal: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.pagosService.findOne(id);
  }

  @Query(() => Pago, { name: 'pagoByCita' })
  findByCita(@ValidateRole(ValidRoles.recepcionista) personal: Personal, @Args('citaId', { type: () => ID }, ParseUUIDPipe) citaId: string) {
    return this.pagosService.findOneByCita(citaId);
  }

  @Mutation(() => Pago, { name: 'addPago' })
  create(@ValidateRole(ValidRoles.recepcionista) personal: Personal, @Args('record', { type: () => CreatePagoInput }) record: CreatePagoInput) {
    return this.pagosService.create(record);
  }
}

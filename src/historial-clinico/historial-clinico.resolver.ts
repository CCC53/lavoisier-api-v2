import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { ValidRoles } from '../personal/enum/valid.roles';
import { Personal } from '../personal/entities/personal.entity';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { HistorialClinicoService } from './historial-clinico.service';
import { CreateHistorialInput, UpdateHistorialInput } from './dto/inputs/index';
import { PaginationArgs } from '../common/dto/args/pagination.args';

@Resolver() @UseGuards(JwtGuard)
export class HistorialClinicoResolver {
  constructor(private readonly historialClinicoService: HistorialClinicoService) {}

  @Query(() => [HistorialClinico], { name: 'historialesClinicos' })
  findALl(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args() pagination: PaginationArgs) {
    return this.historialClinicoService.findAll(pagination);
  }

  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOne(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.historialClinicoService.findOne(id);
  }
  
  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOneByPaciente(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.historialClinicoService.findOneByPaciente(pacienteId);
  }

  @Mutation(() => HistorialClinico, { name: 'addHistorial' })
  create(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () => CreateHistorialInput }) record: CreateHistorialInput) {
    return this.historialClinicoService.create(record);
  }

  @Mutation(() => HistorialClinico, { name: 'updateHistorial' })
  update(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () => UpdateHistorialInput }) record: UpdateHistorialInput) {
    return this.historialClinicoService.update(record);
  }
}
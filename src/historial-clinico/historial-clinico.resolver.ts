import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { HistorialClinicoService } from './historial-clinico.service';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { ValidateRole } from 'src/auth/decorators/validate-role.decorator';
import { Personal } from 'src/personal/entities/personal.entity';
import { ValidRoles } from 'src/personal/enum/valid.roles';

@Resolver()
export class HistorialClinicoResolver {
  constructor(private readonly historialClinicoService: HistorialClinicoService) {}

  @Query(() => [HistorialClinico], { name: 'historialesClinicos' })
  findALl(@ValidateRole(ValidRoles.nutriologo) personal: Personal) {
    return this.historialClinicoService.findAll();
  }

  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOne(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.historialClinicoService.findOne(id);
  }
  
  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOneByPaciente(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.historialClinicoService.findOneByPaciente(pacienteId);
  }
}
import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { HistorialClinicoService } from './historial-clinico.service';
import { HistorialClinico } from './entities/historial-clinico.entity';

@Resolver()
export class HistorialClinicoResolver {
  constructor(private readonly historialClinicoService: HistorialClinicoService) {}

  @Query(() => [HistorialClinico], { name: 'historialesClinicos' })
  findALl() {
    return this.historialClinicoService.findAll();
  }

  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.historialClinicoService.findOne(id);
  }
  
  @Query(() => HistorialClinico, { name: 'historialClinico' })
  findOneByPaciente(@Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.historialClinicoService.findOneByPaciente(pacienteId);
  }
}
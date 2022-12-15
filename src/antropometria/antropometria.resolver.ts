import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AntropometriaService } from './antropometria.service';
import { Antropometria } from './entities/antropometria.entity';
import { CreateAntropometricoInput, UpdateAntropometricoInput } from './dto/inputs/index';

@Resolver()
export class AntropometriaResolver {
  constructor(private readonly antropometriaService: AntropometriaService) {}

  @Query(() => [Antropometria], { name: 'antropometricos' })
  findAll(@Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.antropometriaService.findAllByPaciente(pacienteId);
  }

  @Query(() => Antropometria, { name: 'antropometrico' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.antropometriaService.findOne(id);
  }

  @Mutation(() => Antropometria, { name: 'addAntropometrico' })
  create(@Args('record', { type: () => CreateAntropometricoInput }) record: CreateAntropometricoInput) {
    return this.antropometriaService.create(record);
  }

  @Mutation(() => Antropometria, { name: 'updateAntropometrico' })
  update(@Args('record', { type: () => UpdateAntropometricoInput }) record: UpdateAntropometricoInput) {
    return this.antropometriaService.update(record);
  }

}

import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaboratorialService } from './laboratorial.service';
import { Laboratorial } from './entities/laboratorial.entity';
import { CreateLaboratorialInput, UpdateLaboratorialInput } from './dto/inputs/index';

@Resolver()
export class LaboratorialResolver {
  constructor(private readonly laboratorialService: LaboratorialService) {}

  @Query(() => [Laboratorial], { name: 'laboratoriales' })
  findAll(@Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.laboratorialService.findAllByPaciente(pacienteId);
  }

  @Query(() => Laboratorial, { name: 'laboratorial' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.laboratorialService.findOne(id);
  }

  @Mutation(() => Laboratorial, { name: 'addLaboratorial' })
  create(@Args('record', { type: () =>  CreateLaboratorialInput}) record: CreateLaboratorialInput) {
    return this.laboratorialService.create(record);
  }

  @Mutation(() => Laboratorial, { name: 'updateLaboratorial' })
  update(@Args('record', { type: () =>  UpdateLaboratorialInput}) record: UpdateLaboratorialInput) {
    return this.laboratorialService.update(record);
  }

}

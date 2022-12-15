import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AntropometriaService } from './antropometria.service';
import { Antropometria } from './entities/antropometria.entity';
import { CreateAntropometricoInput, UpdateAntropometricoInput } from './dto/inputs/index';
import { ValidateRole } from 'src/auth/decorators/validate-role.decorator';
import { Personal } from 'src/personal/entities/personal.entity';
import { ValidRoles } from 'src/personal/enum/valid.roles';

@Resolver()
export class AntropometriaResolver {
  constructor(private readonly antropometriaService: AntropometriaService) {}

  @Query(() => [Antropometria], { name: 'antropometricos' })
  findAll(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.antropometriaService.findAllByPaciente(pacienteId);
  }

  @Query(() => Antropometria, { name: 'antropometrico' })
  findOne(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.antropometriaService.findOne(id);
  }

  @Mutation(() => Antropometria, { name: 'addAntropometrico' })
  create(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () => CreateAntropometricoInput }) record: CreateAntropometricoInput) {
    return this.antropometriaService.create(record);
  }

  @Mutation(() => Antropometria, { name: 'updateAntropometrico' })
  update(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () => UpdateAntropometricoInput }) record: UpdateAntropometricoInput) {
    return this.antropometriaService.update(record);
  }

}

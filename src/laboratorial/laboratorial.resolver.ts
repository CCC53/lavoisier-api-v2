import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaboratorialService } from './laboratorial.service';
import { Laboratorial } from './entities/laboratorial.entity';
import { CreateLaboratorialInput, UpdateLaboratorialInput } from './dto/inputs/index';
import { ValidateRole } from 'src/auth/decorators/validate-role.decorator';
import { Personal } from 'src/personal/entities/personal.entity';
import { ValidRoles } from 'src/personal/enum/valid.roles';

@Resolver()
export class LaboratorialResolver {
  constructor(private readonly laboratorialService: LaboratorialService) {}

  @Query(() => [Laboratorial], { name: 'laboratoriales' })
  findAll(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('pacienteId', { type: () => ID }, ParseUUIDPipe) pacienteId: string) {
    return this.laboratorialService.findAllByPaciente(pacienteId);
  }

  @Query(() => Laboratorial, { name: 'laboratorial' })
  findOne(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.laboratorialService.findOne(id);
  }

  @Mutation(() => Laboratorial, { name: 'addLaboratorial' })
  create(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () =>  CreateLaboratorialInput}) record: CreateLaboratorialInput) {
    return this.laboratorialService.create(record);
  }

  @Mutation(() => Laboratorial, { name: 'updateLaboratorial' })
  update(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args('record', { type: () =>  UpdateLaboratorialInput}) record: UpdateLaboratorialInput) {
    return this.laboratorialService.update(record);
  }

}

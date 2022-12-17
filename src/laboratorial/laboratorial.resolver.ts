import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ValidRoles } from '../personal/enum/valid.roles';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { Personal } from '../personal/entities/personal.entity';
import { Laboratorial } from './entities/laboratorial.entity';
import { LaboratorialService } from './laboratorial.service';
import { CreateLaboratorialInput, UpdateLaboratorialInput } from './dto/inputs/index';
import { FindAllPaginationArgs } from '../common/dto/args/find-all-pagination.args';

@Resolver() @UseGuards(JwtGuard)
export class LaboratorialResolver {
  constructor(private readonly laboratorialService: LaboratorialService) {}

  @Query(() => [Laboratorial], { name: 'laboratoriales' })
  findAll(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args() findAllPaignation: FindAllPaginationArgs) {
    return this.laboratorialService.findAllByPaciente(findAllPaignation);
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

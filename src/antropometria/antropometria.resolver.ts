import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AntropometriaService } from './antropometria.service';
import { Antropometria } from './entities/antropometria.entity';
import { CreateAntropometricoInput, UpdateAntropometricoInput } from './dto/inputs/index';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FindAllPaginationArgs } from '../common/dto/args/find-all-pagination.args';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { ValidRoles } from '../personal/enum/valid.roles';
import { Personal } from '../personal/entities/personal.entity';

@Resolver() @UseGuards(JwtGuard)
export class AntropometriaResolver {
  constructor(private readonly antropometriaService: AntropometriaService) {}

  @Query(() => [Antropometria], { name: 'antropometricos' })
  findAll(@ValidateRole(ValidRoles.nutriologo) personal: Personal, @Args() findAllPagination: FindAllPaginationArgs) {
    return this.antropometriaService.findAllByPaciente(findAllPagination);
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
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';
import { CitasService } from './citas.service';
import { Cita } from './entities/cita.entity';
import { CreateCitaInput, UpdateCitaInput } from './dto/inputs/index';

@Resolver()
export class CitasResolver {
  constructor(private readonly citasService: CitasService) {}

  @Query(() => [Cita], { name: 'citas' })
  findAll() {
    return this.citasService.findAll();
  }

  @Query(() => Cita, { name: 'cita' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.citasService.findOne(id);
  }

  @Mutation(() => Cita, { name: 'addCita' })
  create(@Args('record', { type: () => CreateCitaInput }) record: CreateCitaInput) {
    return this.citasService.create(record);
  }

  @Mutation(() => Cita, { name: 'updateCita' })
  update(@Args('record', { type: () => UpdateCitaInput }) record: UpdateCitaInput) {
    return this.citasService.update(record);
  }

  @Mutation(() => Cita, { name: 'removeCita' })
  remove(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.citasService.remove(id);
  }
}

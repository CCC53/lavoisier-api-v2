import { ParseUUIDPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePacienteInput, UpdatePacienteInput } from './dto/inputs/index';
import { Paciente } from './entities/paciente.entity';
import { PacientesService } from './pacientes.service';

@Resolver()
export class PacientesResolver {
  constructor(private readonly pacientesService: PacientesService) {}

  @Query(() => [Paciente], { name: 'pacientes' })
  findAll(): Promise<Paciente[]> {
    return this.pacientesService.findAll();
  }

  @Query(() => Paciente, { name: 'paciente' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Paciente> {
    return this.pacientesService.findOne(id);
  }

  @Mutation(() => Paciente, { name: 'addPaciente' })
  create(@Args('record', { type: () => CreatePacienteInput }) record: CreatePacienteInput): Promise<Paciente> {
    return this.pacientesService.create(record);
  }

  @Mutation(() => Paciente, { name: 'updatePaciente' })
  update(@Args('record', { type: () => UpdatePacienteInput }) record: UpdatePacienteInput) {
    return this.pacientesService.update(record);
  }

  @Mutation(() => Paciente, { name: 'removePaciente' })
  remove(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string): Promise<Paciente> {
    return this.pacientesService.remove(id);
  }
}

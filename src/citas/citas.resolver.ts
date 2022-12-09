import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CitasService } from './citas.service';
import { Cita } from './entities/cita.entity';
import { CreateCitaInput } from './dto/inputs/create-cita.input';

@Resolver()
export class CitasResolver {
  constructor(private readonly citasService: CitasService) {}

  @Query(() => [Cita], { name: 'citas' })
  findAll() {
    return this.citasService.findAll();
  }

  @Mutation(() => Cita, { name: 'addCita' })
  create(@Args('record', { type: () => CreateCitaInput }) record: CreateCitaInput) {
    return this.citasService.create(record);
  }
}

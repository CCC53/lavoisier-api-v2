import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { PersonalService } from './personal.service';
import { Personal } from './entities/personal.entity';

@Resolver() @UseGuards(JwtGuard)
export class PersonalResolver {
  constructor(private readonly personalService: PersonalService) {}

  @Query(() => [Personal], { name: 'recepcionistas' })
  findAllRecepcionistas() {
    return this.personalService.findAllRecepcionistas();
  }

  @Query(() => Personal, { name: 'personal' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.personalService.findOne(id);
  }

  @Mutation(() => Personal, { name: 'removePersonal' })
  remove(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.personalService.remove(id);
  }
}

import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Personal } from './entities/personal.entity';
import { UpdateProfileInput } from '../auth/dto/inputs/update-profile.input';
import { PersonalService } from './personal.service';
import { ValidateRole } from '../auth/decorators/validate-role.decorator';
import { ValidRoles } from './enum/valid.roles';

@Resolver() @UseGuards(JwtGuard)
export class PersonalResolver {
  constructor(private readonly personalService: PersonalService) {}

  @Query(() => [Personal], { name: 'recepcionistas' })
  findAllRecepcionistas(@ValidateRole(ValidRoles.nutriologo) user: Personal) {
    return this.personalService.findAllRecepcionistas();
  }

  @Query(() => Personal, { name: 'personal' })
  findOne(@ValidateRole(ValidRoles.nutriologo) user: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.personalService.findOne(id);
  }

  @Mutation(() => Personal, { name: 'updateProfile' })
  updateProfile(@CurrentUser() { id }: Personal, @Args('record', { type: () => UpdateProfileInput }) record: UpdateProfileInput) {
    return this.personalService.updateProfile(record, id);
  }

  @Mutation(() => Personal, { name: 'removePersonal' })
  remove(@ValidateRole(ValidRoles.nutriologo) user: Personal, @Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.personalService.remove(id);
  }
}

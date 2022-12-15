import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalService } from './personal.service';
import { Personal } from './entities/personal.entity';
import { PersonalResolver } from './personal.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Personal])],
  providers: [PersonalResolver, PersonalService],
  exports: [PersonalService]
})
export class PersonalModule {}

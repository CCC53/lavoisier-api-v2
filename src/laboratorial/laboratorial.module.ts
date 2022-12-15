import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratorialService } from './laboratorial.service';
import { Laboratorial } from './entities/laboratorial.entity';
import { LaboratorialResolver } from './laboratorial.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Laboratorial])
  ],
  providers: [LaboratorialResolver, LaboratorialService]
})
export class LaboratorialModule {}

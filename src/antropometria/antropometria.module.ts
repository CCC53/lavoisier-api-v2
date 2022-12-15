import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometriaService } from './antropometria.service';
import { AntropometriaResolver } from './antropometria.resolver';
import { Antropometria } from './entities/antropometria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Antropometria])
  ],
  providers: [AntropometriaResolver, AntropometriaService]
})
export class AntropometriaModule {}

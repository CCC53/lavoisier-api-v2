import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasResolver } from './citas.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cita])
  ],
  providers: [CitasResolver, CitasService]
})
export class CitasModule {}

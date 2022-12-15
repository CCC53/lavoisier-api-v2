import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistorialClinicoService } from './historial-clinico.service';
import { HistorialClinicoResolver } from './historial-clinico.resolver';
import { HistorialClinico } from './entities/historial-clinico.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([HistorialClinico])
  ],
  providers: [HistorialClinicoResolver, HistorialClinicoService]
})
export class HistorialClinicoModule {}

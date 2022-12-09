import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PagosResolver } from './pagos.resolver';
import { PagosService } from './pagos.service';
import { Pago } from './entities/pago.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pago])
  ],
  providers: [PagosResolver, PagosService]
})
export class PagosModule {}
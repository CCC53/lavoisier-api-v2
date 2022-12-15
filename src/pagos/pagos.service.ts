import { Injectable, Logger, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { CreatePagoInput } from './dto/inputs/create-pago.input';

@Injectable()
export class PagosService {
    private logger = new Logger('PagosService')
    
    constructor(@InjectRepository(Pago) private pagoRepository: Repository<Pago>) {}

    async findAll() {
        try {
            const pagos = await this.pagoRepository.find();
            return pagos;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string) {
        try {
            const pago = await this.pagoRepository.findOne({ where: { id } });
            if (!pago) {
                throw new NotFoundException(`No hay pago con id ${id}`);
            }
            return pago;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOneByCita(citaId: string) {
        try {
            const pago = await this.pagoRepository.findOne({ where: { citaId } });
            if (!pago) {
                throw new NotFoundException(`No hay pago en la cita con id ${citaId}`);
            }
            return pago;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async create(record: CreatePagoInput) {
        try {
            const cambio = record.cantidadRecibida-record.monto;
            const pago = this.pagoRepository.create({ ...record, cambio });
            return await this.pagoRepository.save(pago);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

}

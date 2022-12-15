import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistorialClinicoService {
    private logger = new Logger("Historial Clinico Service");

    constructor(@InjectRepository(HistorialClinico) private historialRepository: Repository<HistorialClinico>) {}

    async findAll() {
        try {
            return await this.historialRepository.find();
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const historial = await this.historialRepository.findOne({ where: { id } });
            if (!historial) {
                throw new NotFoundException(`No hay historial con id ${id}`);
            }
            return historial;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOneByPaciente(pacienteId: string) {
        try {
            const historial = await this.historialRepository.findOne({ where: { pacienteId } });
            if (!historial) {
                throw new NotFoundException(`No hay historial con id ${pacienteId}`);
            }
            return historial;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async create() {}
}

import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistorialClinico } from './entities/historial-clinico.entity';
import { CreateHistorialInput, UpdateHistorialInput } from './dto/inputs/index';
import { PaginationArgs, getOffset } from '../common/dto/args/pagination.args';

@Injectable()
export class HistorialClinicoService {
    private logger = new Logger("Historial Clinico Service");

    constructor(@InjectRepository(HistorialClinico) private historialRepository: Repository<HistorialClinico>) {}

    async findAll({page, pageSize}: PaginationArgs) {
        try {
            return await this.historialRepository.find({take: pageSize, skip: getOffset({page, pageSize})});
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

    async create(record: CreateHistorialInput) {
        try {
            const historial = this.historialRepository.create(record);
            return await this.historialRepository.save(historial);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(record: UpdateHistorialInput) {
        try {
            const historial = await this.historialRepository.preload(record);
            if (!historial) {
                throw new NotFoundException(`No hay historial con id ${record.id}`);
            }
            return await this.historialRepository.save(historial);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

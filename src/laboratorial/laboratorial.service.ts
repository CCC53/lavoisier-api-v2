import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaboratorialInput, UpdateLaboratorialInput } from './dto/inputs/index';
import { Laboratorial } from './entities/laboratorial.entity';

@Injectable()
export class LaboratorialService {
    private logger = new Logger("Laboratorial Service");

    constructor(@InjectRepository(Laboratorial) private laboratorialRepository: Repository<Laboratorial>) {}

    async findAllByPaciente(pacienteId: string) {
        try {
            return await this.laboratorialRepository.find({ where: { pacienteId } });
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const laboratorial = await this.laboratorialRepository.findOne({ where: { id } });
            if (!laboratorial) {
                throw new NotFoundException(`No hay datos laboratoriales con id ${id}`);
            }
            return laboratorial;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(record: CreateLaboratorialInput) {
        try {
            const laboratorial = this.laboratorialRepository.create(record);
            return await this.laboratorialRepository.save(laboratorial);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(record: UpdateLaboratorialInput) {
        try {
            const laboratorial = await this.laboratorialRepository.preload(record);
            if (!laboratorial) {
                throw new NotFoundException(`No hay datos laboratoriales con id ${record.id}`);
            }
            return await this.laboratorialRepository.save(laboratorial)
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

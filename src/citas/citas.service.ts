import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaInput, UpdateCitaInput } from './dto/inputs/index';
@Injectable()
export class CitasService {
    private logger = new Logger("Citas Service");

    constructor(@InjectRepository(Cita) private readonly citaRepository: Repository<Cita>) {}

    async findAll() {
        try {
            const citas = await this.citaRepository.find();
            return citas;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const cita = await this.citaRepository.findOne({ where: { id } });
            if (!cita) {
                throw new NotFoundException(`No hay cita con el id ${id}`);
            }
            return cita;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(record: CreateCitaInput) {
        try {
            const cita = this.citaRepository.create(record);
            return await this.citaRepository.save(cita);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(record: UpdateCitaInput) {
        try {
            const cita = await this.citaRepository.preload(record);
            if (!cita) {
                throw new NotFoundException(`No hay paciente con id ${record.id}`);
            }
            return await this.citaRepository.save(cita);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: string) {
        try {
            const cita = await this.findOne(id);
            await this.citaRepository.remove(cita);
            return { ...cita, id } as Cita;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

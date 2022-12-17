import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paciente } from './entities/paciente.entity';
import { CreatePacienteInput, UpdatePacienteInput } from './dto/inputs/index';
import { PaginationArgs, getOffset } from '../common/dto/args/pagination.args';

@Injectable()
export class PacientesService {
    private logger = new Logger("UsersService");

    constructor(@InjectRepository(Paciente) private pacienteRepository: Repository<Paciente>) {}

    async findAll({pageSize, page}: PaginationArgs): Promise<Paciente[]> {
        try {
            const pacientes = await this.pacienteRepository.find({ take: pageSize, skip: getOffset({page, pageSize}) });
            return pacientes;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string): Promise<Paciente> {
        try {
            const paciente = await this.pacienteRepository.findOne({ where: { id } });
            if (!paciente) {
                throw new NotFoundException(`No hay paciente con id ${id}`);
            }
            return paciente;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(record: CreatePacienteInput): Promise<Paciente> {
        try {
            const paciente = this.pacienteRepository.create(record);
            return await this.pacienteRepository.save(paciente);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(record: UpdatePacienteInput) {
        try {
            const paciente = await this.pacienteRepository.preload(record);
            if (!paciente) {
                throw new NotFoundException(`No hay paciente con id ${record.id}`);
            }
            return await this.pacienteRepository.save(paciente);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async remove(id: string): Promise<Paciente> {
        try {
            const paciente = await this.findOne(id);
            await this.pacienteRepository.remove(paciente);
            return { ...paciente, id } as Paciente;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

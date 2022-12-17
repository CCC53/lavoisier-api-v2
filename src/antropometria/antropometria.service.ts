import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Antropometria } from './entities/antropometria.entity';
import { CreateAntropometricoInput, UpdateAntropometricoInput } from './dto/inputs/index';
import { getOffset } from '../common/dto/args/pagination.args';
import { FindAllPaginationArgs } from '../common/dto/args/find-all-pagination.args';

@Injectable()
export class AntropometriaService {
    private logger = new Logger('Antropometria Service');

    constructor(@InjectRepository(Antropometria) private antropometriaRepository: Repository<Antropometria>) {}

    async findAllByPaciente({page, pageSize, pacienteId}: FindAllPaginationArgs) {
        try {
            return await this.antropometriaRepository.find({ where: { pacienteId }, take: pageSize, skip: getOffset({page, pageSize}) });
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id: string) {
        try {
            const antropometrico = await this.antropometriaRepository.findOne({ where: { id } });
            if (!antropometrico) {
                throw new NotFoundException(`No hay antropometrico con id ${id}`);
            }
            return antropometrico;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async create(record: CreateAntropometricoInput) {
        try {
            const antropometrico = this.antropometriaRepository.create(record);
            return await this.antropometriaRepository.save(antropometrico);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(record: UpdateAntropometricoInput) {
        try {
            const antropometrico = await this.antropometriaRepository.preload(record);
            if (!antropometrico) {
                throw new NotFoundException(`No hay antropometrico con id ${record.id}`);
            }
            return await this.antropometriaRepository.save(antropometrico)
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

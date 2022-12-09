import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cita } from './entities/cita.entity';
import { CreateCitaInput } from './dto/inputs/create-cita.input';

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

    async create(record: CreateCitaInput) {
        try {
            const cita = this.citaRepository.create(record);
            return await this.citaRepository.save(cita);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}

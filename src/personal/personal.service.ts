import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hashSync } from 'bcrypt';
import { Personal } from './entities/personal.entity';
import { SignUpInput } from '../auth/dto/inputs/index';
import { ValidRoles } from './enum/valid.roles';
 
@Injectable()
export class PersonalService {
    private logger = new Logger("Personal Service")

    constructor(@InjectRepository(Personal) private personalRepository: Repository<Personal>) {}

    async create(record: SignUpInput) {
        try {
            const personal = this.personalRepository.create({
                ...record,
                password: hashSync(record.password, 10)
            });
            return await this.personalRepository.save(personal);
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findAllRecepcionistas() {
        try {
            return await this.personalRepository.find({ where: { rol: ValidRoles.recepcionista } })
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string) {
        try {
            const personal = await this.personalRepository.findOne({ where: { id } });
            if (!personal) {
                throw new NotFoundException(`Employer doesn't exist with id ${id}`);
            }
            return personal;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async findOneByEmail(email: string) {
        try {
            const personal = await this.personalRepository.findOne({ where: { email } });
            if (!personal) {
                throw new NotFoundException('Email or password incorrect');
            }
            return personal;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string) {
        try {
            const personal = await this.findOne(id);
            await this.personalRepository.remove(personal);
            return { ...personal, id } as Personal;
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error);
        }
    }
}

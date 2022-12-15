import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { PersonalService } from '../personal/personal.service';
import { AuthResponse } from './types/auth.response';
import { SigninInput, SignUpInput } from './dto/inputs/index';

@Injectable()
export class AuthService {
    constructor(private personalService: PersonalService, private jwtService: JwtService) {}

    private createToken(id: string) {
        return this.jwtService.sign({ id });
    }

    async signup(record: SignUpInput): Promise<AuthResponse> {
        const personal = await this.personalService.create(record);
        const token = this.createToken(personal.id);
        return { token, personal };
    }

    async signin({ email, password }: SigninInput): Promise<AuthResponse> {
        const personal = await this.personalService.findOneByEmail(email);
        if (!compareSync(password, personal.password)) {
            throw new NotFoundException('Email or password incorrect')
        }
        const token = this.createToken(personal.id);
        return { token, personal };
    }

    async validatePersonal(id: string) {
        const personal = await this.personalService.findOne(id);
        delete personal.password;
        return personal;
    }
}

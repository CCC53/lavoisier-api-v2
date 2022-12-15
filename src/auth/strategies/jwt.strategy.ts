import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt.payload";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService, private authService: AuthService) {
        super({
            secretOrKey: configService.get('JWT_SEED'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JwtPayload) {
        const { id, exp } = payload;
        const expire = new Date(exp*1000);
        if (expire < new Date()) {
            throw new UnauthorizedException('Token expired')   
        };
        const personal = await this.authService.validatePersonal(id);
        return personal;
    }
}
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PersonalModule } from '../personal/personal.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ secret: configService.get('JWT_SEED'), signOptions: { expiresIn: configService.get('JWT_EXPIRES')  } })
    }),
    PersonalModule
  ],
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports: [JwtModule, JwtStrategy, PassportModule]
})
export class AuthModule {}

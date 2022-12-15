import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PacientesModule } from './pacientes/pacientes.module';
import { CitasModule } from './citas/citas.module';
import { PagosModule } from './pagos/pagos.module';
import { AntropometriaModule } from './antropometria/antropometria.module';
import { LaboratorialModule } from './laboratorial/laboratorial.module';
import { HistorialClinicoModule } from './historial-clinico/historial-clinico.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true
    }),
    PacientesModule,
    CitasModule,
    PagosModule,
    AntropometriaModule,
    LaboratorialModule,
    HistorialClinicoModule
  ]
})
export class AppModule {}

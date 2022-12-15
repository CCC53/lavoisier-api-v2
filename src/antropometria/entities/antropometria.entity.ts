import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('antropometria') @ObjectType()
export class Antropometria {

    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('date') @Field(() => String)
    fecha: Date;

    @Column('float') @Field(() => Float)
    peso: number;

    @Column('float') @Field(() => Float)
    talla: number;

    @Column('float') @Field(() => Float)
    imc: number;

    @Column('float') @Field(() => Float)
    cintura: number;

    @Column('float') @Field(() => Float)
    cBrazo: number;

    @Column('float') @Field(() => Float)
    pTriceps: number;

    @Column('float') @Field(() => Float)
    pAbdominal: number;

    @Column('character varying') @Field(() => String)
    porcentajeGrasa: string;

    @ManyToOne(() => Paciente, paciente => paciente.antropometricos, { onDelete: 'CASCADE', lazy: true }) @JoinColumn({ name: 'pacienteId' })
    @Field(() => Paciente)
    paciente: Paciente;

    @Column()
    pacienteId: string;

}
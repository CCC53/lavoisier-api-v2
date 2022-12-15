import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EnfermedadesResponse } from "../enum/valid.response";
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('historial-clinico') @ObjectType()
export class HistorialClinico {

    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column({ name: 'enf_cardiovasculares', type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    enfermedadesCardiovasculares: EnfermedadesResponse;

    @Column({ name: 'enf_pulmonares', type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    enfermedadesPulmonares: EnfermedadesResponse;

    @Column({ name: 'enf_metabolicas', type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    enfermedadesMetabolicas: EnfermedadesResponse;

    @Column({ type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    tabaquismo: EnfermedadesResponse;

    @Column({ type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    alcoholismo: EnfermedadesResponse;

    @Column({ type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    sedentarismo: EnfermedadesResponse;

    @Column({ type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    drogas: EnfermedadesResponse;

    @Column({ type: 'enum', enum: EnfermedadesResponse }) @Field(() => EnfermedadesResponse)
    cafe: EnfermedadesResponse;

    @Column({ nullable: true  }) @Field(() => String, { nullable: true })
    alimentacion: string;

    @OneToOne(() => Paciente, paciente => paciente.id, { onDelete: 'CASCADE', lazy: true }) @JoinColumn({ name: 'pacienteId' })
    @Field(() => Paciente)
    paciente: Paciente;

    @Column()
    pacienteId: string;

}
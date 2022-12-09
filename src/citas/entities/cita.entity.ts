import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('citas') @ObjectType()
export class Cita {

    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('character varying') @Field(() => String)
    motivo: string;

    @Column('date') @Field(() => String)
    fecha: Date;

    @Column('character varying') @Field(() => String)
    horario: string;

    @ManyToOne(() => Paciente, paciente => paciente.citas, { onDelete: 'CASCADE', lazy: true }) @JoinColumn({ name: 'pacienteId' })
    @Field(() => Paciente)
    paciente: Paciente;

    @Column()
    pacienteId: string;
}
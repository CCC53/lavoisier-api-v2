import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from '../../pacientes/entities/paciente.entity';

@Entity('laboratorial') @ObjectType()
export class Laboratorial {
    
    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('date') @Field(() => String)
    fecha: Date;

    @Column('float') @Field(() => Float)
    glucosa: number;
    
    @Column('float') @Field(() => Float)
    insulina: number;
    
    @Column('float') @Field(() => Float)
    trigliceridos: number;
    
    @Column('float') @Field(() => Float)
    colesterolTotal: number;
    
    @Column('float') @Field(() => Float)
    hdl: number;

    @Column('float') @Field(() => Float)
    ldl: number;

    @ManyToOne(() => Paciente, paciente => paciente.laboratoriales, { onDelete: 'CASCADE', lazy: true }) @JoinColumn({ name: 'pacienteId' })
    @Field(() => Paciente)
    paciente: Paciente;

    @Column()
    pacienteId: string;
}
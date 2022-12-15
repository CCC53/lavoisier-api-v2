import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ValidGenres } from '../enum/valid.genres';
import { Cita } from '../../citas/entities/cita.entity';
import { Antropometria } from '../../antropometria/entities/antropometria.entity';
import { Laboratorial } from '../../laboratorial/entities/laboratorial.entity';

@Entity('pacientes') @ObjectType()
export class Paciente {

    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('character varying') @Field(() => String)
    nombre: string;

    @Column('date') @Field(() => String)
    nacimiento: Date;

    @Column({ type: 'enum', enum: ValidGenres }) @Field(() => ValidGenres)
    sexo: ValidGenres;

    @Column('character varying') @Field(() => String)
    telefono: string;

    @Column({ unique: true, type: 'character varying' }) @Field(() => String)
    email: string;

    @OneToMany(() => Cita, cita => cita.paciente, { onDelete: 'CASCADE', lazy: true }) @Field(() => [Cita])
    citas: Cita[];

    @OneToMany(() => Antropometria, antropometria => antropometria.paciente, { onDelete: 'CASCADE', lazy: true })
    @Field(() => [Antropometria])
    antropometricos: Antropometria[];

    @OneToMany(() => Laboratorial, laboratorial => laboratorial.paciente, { onDelete: 'CASCADE', lazy: true })
    @Field(() => [Laboratorial])
    laboratoriales: Laboratorial[];
}
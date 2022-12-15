import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ValidRoles } from "../enum/valid.roles";

@Entity('personal') @ObjectType()
export class Personal {
    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('character varying') @Field(() => String)
    nombre: string;

    @Column('character varying') @Field(() => String)
    telefono: string;

    @Column({ type: 'character varying', unique: true }) @Field(() => String)
    email: string;

    @Column('character varying')
    password: string;

    @Column({ enum: ValidRoles }) @Field(() => ValidRoles)
    rol: ValidRoles;
}
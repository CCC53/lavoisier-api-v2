import { Field, Float, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MetodosPago, TipoPago } from "../enum/payments.enum";
import { Cita } from '../../citas/entities/cita.entity';

@Entity('pagos') @ObjectType()
export class Pago {

    @PrimaryGeneratedColumn('uuid') @Field(() => ID)
    id: string;

    @Column('float') @Field(() => Float)
    monto: number;

    @Column({ name: 'metodo_pago', type: 'enum', enum: MetodosPago }) @Field(() => MetodosPago)
    metodoPago: MetodosPago;

    @Column({ name: 'tipo_pago', type: 'enum', enum: TipoPago }) @Field(() => TipoPago)
    tipoPago: TipoPago;

    @Column('float') @Field(() => Float)
    cantidadRecibida: number;

    @Column({ type: 'float' }) @Field(() => Float)
    cambio: number;

    @OneToOne(() => Cita, cita => cita.id, { onDelete: 'CASCADE', lazy: true }) @JoinColumn({ name: 'citaId' })
    @Field(() => Cita)
    cita: Cita;

    @Column()
    citaId: string;

}
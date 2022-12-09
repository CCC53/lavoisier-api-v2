import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreatePacienteInput } from './create-paciente.input';

@InputType()
export class UpdatePacienteInput extends PartialType(CreatePacienteInput) {

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    id: string;
}
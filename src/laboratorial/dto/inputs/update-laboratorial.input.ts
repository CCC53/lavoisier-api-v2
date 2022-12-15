import { Field, InputType, PartialType, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { CreateLaboratorialInput } from './create-laboratorial.input';

@InputType()
export class UpdateLaboratorialInput extends PartialType(CreateLaboratorialInput) {

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    id: string;
}
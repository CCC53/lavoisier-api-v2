import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { IsNotEmpty, IsUUID } from "class-validator";
import { CreateAntropometricoInput } from './create-antropometrico.input';

@InputType()
export class UpdateAntropometricoInput extends PartialType(CreateAntropometricoInput) {

    @Field(() => ID) @IsNotEmpty() @IsUUID()
    id: string;
} 
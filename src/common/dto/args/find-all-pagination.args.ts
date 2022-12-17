import { ArgsType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PaginationArgs } from './pagination.args';

@ArgsType()
export class FindAllPaginationArgs extends PaginationArgs {
    @Field(() => ID) @IsNotEmpty() @IsUUID()
    pacienteId: string;
}
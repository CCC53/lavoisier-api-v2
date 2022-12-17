import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

@ArgsType()
export class PaginationArgs {
    @Field(() => Int, { nullable: true }) @IsOptional() @IsInt() 
    pageSize?: number = 5;

    @Field(() => Int) @IsNotEmpty() @IsInt()
    page: number;
}

export const getOffset = ({page, pageSize}: PaginationArgs) => (page-1) * pageSize;
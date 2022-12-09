import { registerEnumType } from "@nestjs/graphql";

export enum ValidGenres {
    masculino = "M",
    fenemino = "F",
    otro = "O"
}

registerEnumType(ValidGenres, { name: 'validGenres' })
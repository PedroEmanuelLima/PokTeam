import * as Types from './Types';

export interface IPokemon {
    id: number,
    abilities: string[],
    name: string,
    image: string,
    stats: Types.statsType[],
    types: string[],
    species: Types.speciesType,
}

export interface IInforCurrentPage {
    previous: string | null,
    next: string | null,
    current: number
}
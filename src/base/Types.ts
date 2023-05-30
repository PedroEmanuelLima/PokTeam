import { IPokemonHome } from "./Interfaces";

export type statsType = {
    base_stat: number,
    name: string
}

export type speciesType = {
    name: string,
    evolves_from_species?: string,
    habitat: string
}

export type clickInType = 'next' | 'previous';
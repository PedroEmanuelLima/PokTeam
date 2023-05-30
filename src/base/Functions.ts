import axios from "axios";
import { IPokemon, IPokemonHome } from "./Interfaces";
import api from "../config";

function createPokemonObjectHome(
    responsePokemons: any,
): IPokemonHome {
    const types = responsePokemons.types.map((type: any) => type.type.name);

    const pokemon: IPokemonHome = {
        id: responsePokemons.id,
        name: responsePokemons.name,
        image: responsePokemons.sprites.other['official-artwork'].front_default,
        types: types,
    }

    return pokemon;
}

export async function expandPokemons(pokemonsResults: any[]): Promise<IPokemonHome[]> {
    const promises = pokemonsResults.map((pokemonItem: any) => {
        const name = pokemonItem.name || pokemonItem.pokemon.name;
        return api.get(`/pokemon/${name}`)
            .then(response => {
                return createPokemonObjectHome( response.data );
            });
    });

    const pokemons = await Promise.all(promises);
    return pokemons;
}

function createPokemonObjectFull(
    responsePokemons: any,
    responseSpecies: any,
    responseEvolution: any,
): IPokemon {
    const abilities = responsePokemons.abilities.map((ability: any) => ability.ability.name);
    const types = responsePokemons.types.map((type: any) => type.type.name);
    const stats = responsePokemons.stats.map((stats: any) => ({ base_stat: stats.base_stat, name: stats.stat.name }));
    const evolution = responseEvolution.chain.evolves_to.map((evolute: any) => {
        if (evolute.evolves_to.length) {
            return evolute.evolves_to[0]?.species?.name
        }
        return evolute.species?.name
    })
    const pokemon: IPokemon = {
        id: responsePokemons.id,
        name: responsePokemons.name,
        abilities: abilities,
        image: responsePokemons.sprites.other['official-artwork'].front_default,
        species: {
            name: responseSpecies.name,
            evolves_from_species: responseSpecies.evolves_from_species?.name,
            habitat: responseSpecies.habitat?.name || 'Desconhecido',
        },
        types: types,
        stats: stats,
        evolutionTo: evolution
    }

    return pokemon;
}

export async function expandFullPokemon(id: number): Promise<IPokemon> {
    const promises = api.get(`/pokemon/${id}`)
        .then(response => {
            const detailName = response.data;
            return axios.get(detailName.species.url)
                .then(response => {
                    const detailSpecies = response.data;
                    return axios.get(detailSpecies.evolution_chain.url)
                        .then(response => {
                            const detailEvolution = response.data;
                            return createPokemonObjectFull(detailName, detailSpecies, detailEvolution);
                        });
                });
        });

    const pokemon = await Promise.resolve(promises);
    return pokemon;
}
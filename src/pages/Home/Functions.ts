import axios from "axios";
import { IPokemon } from "../../base/Interfaces";
import api from "../../config";

function createPokemonObject(
    responsePokemons: any,
    responseSpecies: any
): IPokemon {
    const abilities = responsePokemons.abilities.map((ability: any) => ability.ability.name);
    const types = responsePokemons.types.map((type: any) => type.type.name);
    const stats = responsePokemons.stats.map((stats: any) => ({ base_stat: stats.base_stat, name: stats.stat.name }));

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
    }

    return pokemon;
}

export async function expandPokemons(pokemonsResults: any[]): Promise<IPokemon[]> {
    const promises = pokemonsResults.map((pokemonItem: any) => {
        const name = pokemonItem.name || pokemonItem.pokemon.name;
        return api.get(`/pokemon/${name}`)
            .then(response => {
                const detailName = response.data;
                return axios.get(detailName.species.url)
                    .then(response => {
                        const detailSpecies = response.data;
                        return createPokemonObject(detailName, detailSpecies);
                    });
            });
    });

    const pokemons = await Promise.all(promises);
    return pokemons;
}
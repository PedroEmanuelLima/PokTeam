import React, { useState, useEffect } from "react";
import {
    Container
} from 'reactstrap';

import './styles.css';
import api from "../../config";
import InpuAndFilter from "../../Components/InputAndFilter";
import CardList from "../../Components/CardList";
import { IInforCurrentPage, IPokemon, IPokemonHome } from "../../base/Interfaces";
import { expandPokemons } from "../../base/Functions";
import Loading from "../../Components/Loading";
import NotFound from "../../Components/NotFound";
import Paginate from "../../Components/Paginate";
import { clickInType } from "../../base/Types";

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [pokemonsList, setPokemonsList] = useState<IPokemonHome[]>([]);
    const [typesPokemons, setTypesPokemons] = useState<string[]>([]);
    const [typeSelected, setTypeSelected] = useState<string>('');
    const [nameSearch, setNameSearch] = useState<string>('');
    const [infoCurrentPage, setInfoCurrentPage] = useState<IInforCurrentPage | null>();

    async function handleSearchPokemon() {
        setLoading(true);
        try {
            // Não tem nome nem tipo
            if (!typeSelected.trim().length && !nameSearch.trim().length) {
                const response = await api.get('/pokemon/?offset=0&limit=40');
                setInfoCurrentPage({
                    current: 1,
                    next: response.data.next,
                    previous: response.data.previous
                })
                const pokemons = await expandPokemons(response.data.results);
                setPokemonsList(pokemons);
                setLoading(false)
                return;
            }
            // Tem nome mas não tem tipo
            if (!typeSelected.trim().length) {
                const response = await api.get(`/pokemon/${nameSearch.toLowerCase()}/`);
                const result = [response.data];
                const pokemons = await expandPokemons(result);
                setPokemonsList(pokemons);
                setInfoCurrentPage(null)
                setLoading(false);
                return;
            }

            // Tem nome e tipo
            const response = await api.get(`/type/${typeSelected}`);
            const pokemons = await expandPokemons(response.data.pokemon);
            const pokemonsFilter = pokemons.filter((item) => item.name.includes(nameSearch));
            setInfoCurrentPage(null)
            setPokemonsList(pokemonsFilter);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    async function handleCurrentPage(clickIn: clickInType) {
        setLoading(true)
        if (clickIn === 'next') {
            const nextUrl = infoCurrentPage?.next?.split('/') || [];
            const next = nextUrl[nextUrl?.length - 1];
            const response = await api.get(`/pokemon/${next}`);
            setInfoCurrentPage(prevState => ({
                current: prevState!.current + 1,
                next: response.data.next,
                previous: response.data.previous
            }))
            const pokemons = await expandPokemons(response.data.results);
            setPokemonsList(pokemons);
            setLoading(false)
            return;
        }

        const previousUrl = infoCurrentPage?.previous?.split('/') || [];
        const previous = previousUrl[previousUrl?.length - 1];
        const response = await api.get(`/pokemon/${previous}`);
        setInfoCurrentPage(prevState => ({
            current: prevState!.current - 1,
            next: response.data.next,
            previous: response.data.previous
        }))
        const pokemons = await expandPokemons(response.data.results);
        setPokemonsList(pokemons);
        setLoading(false)
    }

    useEffect(() => {
        async function fetchTypes() {
            try {
                const response = await api.get('/type/');
                const lista = response.data.results.map((type: any) => type.name);
                setTypesPokemons(lista);
            } catch (error) {
                console.log(error);
            }
        }

        fetchTypes();
    }, []);

    useEffect(() => {
        async function fetchPokemons() {
            setLoading(true)
            try {
                // Se tiver um nome
                if (nameSearch.trim().length) {
                    handleSearchPokemon();
                    return;
                }

                // Se não tiver um nome nem tipo
                if (!typeSelected.trim().length) {
                    const response = await api.get('/pokemon/?offset=0&limit=40');
                    setInfoCurrentPage({
                        current: 1,
                        next: response.data.next,
                        previous: response.data.previous
                    })
                    const pokemons = await expandPokemons(response.data.results);
                    setPokemonsList(pokemons);
                    setLoading(false)
                    return;
                }

                // Se tiver tipo
                const response = await api.get(`/type/${typeSelected}`);
                const pokemons = await expandPokemons(response.data.pokemon);
                setInfoCurrentPage(null)
                setPokemonsList(pokemons);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchPokemons();
    }, [typeSelected]);

    return (
        <Container>
            <InpuAndFilter
                setTypeSelected={setTypeSelected}
                typeSelected={typeSelected}
                typesPokemons={typesPokemons}
                searchValue={nameSearch}
                setSearchValue={setNameSearch}
                handleSearchPokemon={handleSearchPokemon}
            />

            {loading ? <Loading /> :
                !pokemonsList.length ?
                    <NotFound /> :
                    <>
                        <CardList lista={pokemonsList} />
                        {infoCurrentPage && <Paginate {...infoCurrentPage} handleCurrentPage={handleCurrentPage} />}
                    </>
            }
        </Container >
    )
}
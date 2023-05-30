import { createContext, ReactNode, useEffect, useState } from 'react';
import { AlertProps } from 'reactstrap';
import { IPokemonHome, ITeam } from '../base/Interfaces';
import { MAX_LENGTH_TEAM, TEAM_VARIABLE_NAME_IN_LOCALSTORAGE } from '../base/Contants';

interface TeamProviderProps {
    children: ReactNode;
}

interface TeamContextProps extends ITeam {
    flashMesageProps: AlertProps,
    onDismiss: () => void
}

export const TeamContext = createContext({} as TeamContextProps)

const TeamProvider = ({ children }: TeamProviderProps) => {

    const [flashMesageProps, setFlashMessageProps] = useState<AlertProps>({
        isOpen: false,
    })
    const [team, setTeam] = useState<IPokemonHome[]>([]);

    useEffect(() => {
        const teamInMemory = localStorage.getItem(TEAM_VARIABLE_NAME_IN_LOCALSTORAGE);
        setTeam(teamInMemory ? JSON.parse(teamInMemory) : []);
    }, []);

    const onDismiss = () => setFlashMessageProps({
        style: {
            display: 'none'
        },
        color: "none",
        isOpen: false,
    });

    const addPokemon = (pokemon: IPokemonHome) => {
        // Time está incompleto com menos de 5 pokemons
        if (team && !(team.length === MAX_LENGTH_TEAM)) {
            const updatedTeam = [...team, pokemon].splice(0, 5);
            setTeam(updatedTeam);
            localStorage.setItem(TEAM_VARIABLE_NAME_IN_LOCALSTORAGE, JSON.stringify(updatedTeam));
            return;
        }

        // Time está completo
        setFlashMessageProps({
            color: "danger",
            isOpen: true,
            children: "Seu time está completo.",
        })
        setTimeout(() => onDismiss(), 3000);
    }

    const removePokemon = (pokemon: IPokemonHome) => {
        const updatedTeam = team.filter((p) => p.id !== pokemon.id);
        setTeam(updatedTeam);
        localStorage.setItem(TEAM_VARIABLE_NAME_IN_LOCALSTORAGE, JSON.stringify(updatedTeam));
    }

    return (
        <TeamContext.Provider value={{
            team, flashMesageProps, onDismiss,
            addPokemon, removePokemon,
        }}>
            {children}
        </TeamContext.Provider>
    )
}

export default TeamProvider;

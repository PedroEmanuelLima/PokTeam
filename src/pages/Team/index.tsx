import React, { useContext } from 'react';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';

import CardList from '../../Components/CardList';
import { TeamContext } from '../../context/team.context';
import NotFound from '../../Components/NotFoundOrEmpty';

export default function Team() {

    const { team } = useContext(TeamContext);

    return(
        <Container className='pb-3'>
            <h1 className='text-center'>
                {team.length ? 'Seu time é:' : ''}
            </h1>

            {team.length ?
                <CardList
                    lista={team}
                /> :
                <NotFound
                    text={`Seu time está vazio:( Adicione pokemons acessando: `}
                    tag={<Link to='/'>aqui</Link>}
                />
        }
        </Container>
    )
}
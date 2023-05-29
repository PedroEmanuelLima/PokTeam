import React, { useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardFooter,
    Button
} from 'reactstrap';

import { IPokemonHome, IPokemon } from '../../base/Interfaces';
import PokeballLoadGif from './../../assets/pokeball_load.gif';
import './style.css';
import ModalMoreInfoPokemon from '../ModalMoreInfoPokemon';
import { expandFullPokemon } from '../../base/Functions';

interface ICardListPorps {
    lista: IPokemonHome[]
}

interface IModalProps{
    open: boolean,
    pokemon: IPokemon | null
}
export default function CardList({ lista }: ICardListPorps) {
    const [isLoading, setIsLoading] = useState(true);
    const [modalInformatios, setModalInformatios] = useState<IModalProps>({open: false, pokemon:  null});

    const toggleModal = async (id: number|null) => {
        if (!modalInformatios.open && id) {
            const reponsePokemon = await expandFullPokemon(id)
            setModalInformatios({
                open: !modalInformatios.open,
                pokemon: reponsePokemon
            });
            return;
        }
        setModalInformatios({
            open: !modalInformatios.open,
            pokemon: null
        });
    }

    const handleImageLoad = () => {
        setTimeout(() => setIsLoading(false), 500)
    };

    return (
        <>
            <ModalMoreInfoPokemon
                isOpen={modalInformatios.open}
                pokemon={modalInformatios.pokemon}
                toggleModal={toggleModal}
            />

            <Row className='mt-2'>
                {lista.map((pokemon) => (
                    <Col sm="6" md="3" xs='6' xxl='4' key={pokemon.id}>
                        <Card className='mt-4 text-center'>
                            {isLoading && <CardImg src={PokeballLoadGif} alt='loadImage' />}
                            <CardImg onLoad={handleImageLoad} top width="50%" src={pokemon.image} alt={pokemon.name} />
                            <CardBody>
                                <CardTitle tag='h3'>{pokemon.name}</CardTitle>
                                <CardSubtitle>{pokemon.types.map((type) => <span className='m-2' key={type}>{type}</span>)}</CardSubtitle>
                            </CardBody>
                            <CardFooter>
                                <Button className='bg-success btnFoter'>Adicionar a time</Button>
                                <Button
                                    className='bg-info btnFoter'
                                    onClick={() => toggleModal(pokemon.id)}
                                >Mais informações</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};

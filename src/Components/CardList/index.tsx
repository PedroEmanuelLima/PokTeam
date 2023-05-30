import React, { useState, useContext } from 'react';
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
import { TeamContext } from '../../context/team.context';

interface ICardListPorps {
    lista: IPokemonHome[],
    addPokemon(pokemon: IPokemonHome): void,
    removePokemon(pokemon: IPokemonHome): void
}

interface IModalProps {
    open: boolean,
    pokemon: IPokemon | null
}
export default function CardList({ lista, addPokemon, removePokemon }: ICardListPorps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [modalInformatios, setModalInformatios] = useState<IModalProps>({ open: false, pokemon: null });
    const [loadingFillPokemon, setloadingFillPokemon] = useState(true);

    const { team } = useContext(TeamContext);

    const toggleModal = async (id: number | null) => {
        setloadingFillPokemon(true);
        setModalInformatios({
            open: !modalInformatios.open,
            pokemon: null
        });
        if (!modalInformatios.open && id) {
            const reponsePokemon = await expandFullPokemon(id)
            setModalInformatios({
                open: !modalInformatios.open,
                pokemon: reponsePokemon
            });
            setloadingFillPokemon(false);
            return;
        }
        setModalInformatios({
            open: !modalInformatios.open,
            pokemon: null
        });
        setloadingFillPokemon(false);
    }

    const handleImageLoad = () => {
        setIsImageLoading(false);
    };

    return (
        <>
            <ModalMoreInfoPokemon
                loading={loadingFillPokemon}
                isOpen={modalInformatios.open}
                pokemon={modalInformatios.pokemon}
                toggleModal={toggleModal}
                key={modalInformatios.pokemon?.id}
            />

            <Row className='mt-2'>
                {lista.map((pokemon) => (
                    <Col className='col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2' key={pokemon.id}>
                        <Card className='mt-4 text-center'>
                            <CardImg
                                onError={handleImageLoad}
                                onLoad={handleImageLoad}
                                top width="50%"
                                src={isImageLoading ? PokeballLoadGif : pokemon.image}
                                alt={isImageLoading ? "Imagem de carregando" : pokemon.name}
                            />
                            <CardBody>
                                <CardTitle tag='h3'>{pokemon.name}</CardTitle>
                                <CardSubtitle>{pokemon.types.map((type) => <span className='m-2' key={type}>{type}</span>)}</CardSubtitle>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    className={`${team.some((p) => p.id === pokemon.id) ? 'bg-danger' : 'bg-success'} btnFoter`}
                                    onClick={() => team.some((p) => p.id === pokemon.id) ? removePokemon(pokemon) : addPokemon(pokemon)}
                                >
                                    {team.some((p) => p.id === pokemon.id) ? 'Remover do Time' : 'Adicionar ao Time'}
                                </Button>
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

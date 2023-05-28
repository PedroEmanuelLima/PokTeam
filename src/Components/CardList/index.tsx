import React, { useState } from 'react';
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

import { IPokemon } from '../../base/Interfaces';
import PokeballLoadGif from './../../assets/pokeball_load.gif';
import './style.css';

interface ICardListPorps {
    lista: IPokemon[]
}
export default function CardList({ lista }: ICardListPorps) {
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setTimeout(() => setIsLoading(false), 500)
    };

    return (
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
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

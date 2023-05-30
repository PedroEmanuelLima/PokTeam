import React from 'react';
import { IMAGE_POKEMON_SAD } from '../../base/Contants';

export default function NotFound() {
    return (
        <div style={{
            width: '100%',
            display: "flex",
            justifyContent: "center",
            paddingTop: '8%'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center',
                justifyContent: 'center'
            }}>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img src={IMAGE_POKEMON_SAD} alt="image sad"/>
                <h4 className='text-primary'>Não foi encontrado nenhum Pókemon :(</h4>
            </div>
        </div>
    )
}
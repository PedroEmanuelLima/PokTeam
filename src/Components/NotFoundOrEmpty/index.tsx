import React from 'react';

import { IMAGE_POKEMON_SAD } from '../../base/Contants';

interface NotFounProps {
    text: string,
    tag?: React.ReactNode
}

export default function NotFound({ text, tag }: NotFounProps) {
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
                <h4 className='text-primary'>
                    {text}
                    {tag}
                </h4>
            </div>
        </div>
    )
}
import React from 'react';
import { imageSadUrl } from '../../base/Contants';

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
                <img src={imageSadUrl} alt="image sad"/>
                <h4 className='text-primary'>Não foi encontrado nenhum Pókemon :(</h4>
            </div>
        </div>
    )
}
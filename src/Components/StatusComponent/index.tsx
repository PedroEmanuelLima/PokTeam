import React from 'react';
import './style.css'

interface IStatusProps{
    status: string,
    value: number
}

export default function StatusComponent({ status, value }: IStatusProps) {

    return(
        <div className='item-status'>
            <p className='text name-line'>{status}</p>
            <p className='text '>{value}</p>
        </div>
    )
}
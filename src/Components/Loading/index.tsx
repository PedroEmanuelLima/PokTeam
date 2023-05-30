import React from 'react';
import { Spinner } from 'reactstrap';

export default function Loading() {
    return (
        <div style={{
            width: '100%',
            display: "flex",
            justifyContent: "center",
            paddingTop: '10%',
            paddingBottom: '10%',
        }}>
            <Spinner
                color="warning"
                type="grow"
                style={{
                    height: '3rem',
                    width: '3rem'
                }}
            />
            <Spinner
                color="warning"
                type="grow"
                style={{
                    height: '3rem',
                    width: '3rem',
                    marginRight: 8,
                    marginLeft: 8,
                }}
            />
            <Spinner
                color="warning"
                type="grow"
                style={{
                    height: '3rem',
                    width: '3rem'
                }}
            />
        </div>
    )
}
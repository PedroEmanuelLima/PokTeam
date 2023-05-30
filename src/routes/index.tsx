import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Home from '../pages/Home';
import Team from '../pages/Team';
import NotFound from '../Components/NotFoundOrEmpty';

export default function RoutesApp() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="*" element={<NotFound
                text='Não encontramos nenhum resultado volte para o inicio: '
                tag={<Link to='/'>aqui</Link>}
            />} />
        </Routes>
    )
}
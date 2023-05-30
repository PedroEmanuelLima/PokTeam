import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Team from '../pages/Team';

export default function RoutesApp() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
        </Routes>
    )
}
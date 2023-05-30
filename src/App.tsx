import React, { useContext, useState, useEffect } from 'react';
import { Alert } from 'reactstrap';

import NavBar from './Components/NavBar';
import Home from './pages/Home';
import './app.css';
import { TeamContext } from './context/team.context';

function App() {

  const { flashMesageProps, onDismiss } = useContext(TeamContext);

  return (
    <>
      <NavBar
        expand={true}
        color="warning"
        fixed='top'
      />
      <div className="content">
        <Alert
          {...flashMesageProps}
          style={{
            position: 'fixed',
            width: '90%',
            left: '5%',
            zIndex: 8
          }}
          toggle={onDismiss}
        />
        <Home />
      </div>
    </>
  );
}

export default App;

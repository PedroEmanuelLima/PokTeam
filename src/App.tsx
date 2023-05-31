import React, { useContext } from 'react';
import { Alert } from 'reactstrap';

import NavBar from './Components/NavBar';
import './App.css';
import { TeamContext } from './context/team.context';
import { BrowserRouter  as Router } from 'react-router-dom';
import RoutesApp from './routes';

function App() {

  const { flashMesageProps, onDismiss } = useContext(TeamContext);

  return (
    <Router>
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
        <RoutesApp />
      </div>
    </Router>
  );
}

export default App;

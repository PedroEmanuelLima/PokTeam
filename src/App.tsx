import React from 'react';
import NavBar from './Components/NavBar';
import Home from './pages/Home';
import './app.css';

function App() {
  return (
    <>
      <NavBar
        expand={true}
        color="warning"
        fixed='top'
      />
      <div className="content">
        <Home />
      </div>
    </>
  );
}

export default App;

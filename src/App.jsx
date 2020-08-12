import React, { useState } from 'react';
import Modal from './Modal';
import './App.css';

function App() {
  //const [disable, setDisable] = useState(true);
  const [show, setShow] = useState(false);


  return (
    <div className="App">
      <button onClick={() => { setShow(true) }}>Open popup</button>
      <Modal show={show} clicked={() => { setShow(true) }}>
        <p>Hello</p>
      </Modal>
    </div>
  );
}

export default App;

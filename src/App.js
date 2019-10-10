import React from 'react';
import './index.css';
import background from './HeaderImage.jpg';

function App() {
  const styleObj = {
    color: 'red',
    border:'5px solid black',
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    minWidth: '100vw'
  };

  return (
    <div className='App' style={styleObj}>
      THIS IS TEXT ON THE DOM
    </div>
  );
}

export default App;

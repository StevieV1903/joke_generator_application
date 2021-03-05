import React, { useState } from 'react';
import './App.css';
import JokeContainer from "./JokeContainer.js";

const App = () => {

  //setting the state of isLoading as false
  const [ isLoading, setIsLoading ] = useState( false )

  //passing the state to the JokeContainer.js
  return (
    <div className="App"> 
      <JokeContainer isLoading={ isLoading } setIsLoading={ setIsLoading } />
    </div>
  );
}

export default App;

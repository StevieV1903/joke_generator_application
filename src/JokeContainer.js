import React, { useState } from 'react';
import "./JokeContainer.css";
import generate from "../src/assets/refresh.png";
import logo from "../src/assets/jester.png";

const JokeContainer = () => {

    const [ currentJoke, setCurrentJoke ] = useState( { } );
    const [ punchlineIsDisplayed, setPunchlineIsDisplayed ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( false )

    const handleJokeClick = () => {
            setIsLoading( true )
            fetch('https://official-joke-api.appspot.com/jokes/random')
                .then (( response ) => response.json())
                .then (( dataReturnedFromFetch ) => {
                    setCurrentJoke( dataReturnedFromFetch)
                    setIsLoading( false )
                    return dataReturnedFromFetch 
                }) 
                .catch((error) => console.error( error ))
                setPunchlineIsDisplayed( false ) 
        };

    const displayJokeSetup = () => {
        const jokeQuestion = currentJoke.setup;
        const jokeAnswer = currentJoke.punchline;
        return (
            <div>
            { isLoading ? <p className="loading">generating new joke...</p> : 
            <p className="joke"> { jokeQuestion }</p>
            }
            
            <button className="punchline-reveal-button" 
            onClick={() => setPunchlineIsDisplayed( true ) }>
                reveal punchline...
            </button>
            { punchlineIsDisplayed && 
            <p className="punchline"> ...{ jokeAnswer } &#128514; &#128514; &#128514;</p>
            }

            </div>
        )
    };

    return (
        <>
        <div>
            <h1 className="home-title-text">myJoke Generator <img className="logo" src={ logo }></img></h1>
    
            <p className="home-body-text">Stuck for a joke? Want to impress to your friends? <br/> Click on the button below to generate a random joke...</p>
            <button className="joke-generator-button" onClick={() => handleJokeClick() }>generate new joke <img className="generate" src={ generate } alt="generate joke"/></button>
        </div>
        
            { currentJoke.id && displayJokeSetup()} 
        </>
    )
};

export default JokeContainer;
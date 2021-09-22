import React, { useState, useEffect } from 'react';
import "./JokeContainer.css";
import generate from "../src/assets/refresh.png";
import logo from "../src/assets/jester.png";

const JokeContainer = ( { isLoading, setIsLoading } ) => {

    const [ currentJoke, setCurrentJoke ] = useState( [] );
    const [ punchlineIsDisplayed, setPunchlineIsDisplayed ] = useState( false );


    const handleJokeClick = () => {
            setIsLoading( true )
            console.log("isLoading", isLoading )
            // fetch('https://official-joke-api.appspot.com/jokes/random')
            fetch('https://twittezer.herokuapp.com/random')
                .then (( response ) => response.json())
                .then (( dataReturnedFromFetch ) => {
                    setCurrentJoke( dataReturnedFromFetch )
                    setIsLoading( false )
                    return dataReturnedFromFetch 
                }) 
                .catch(( error ) => console.error( error ))
                setPunchlineIsDisplayed( false ) 
                // console.log("currentJoke:", currentJoke)
        };

    const displayJokeSetup = () => {

        if( currentJoke.length > 0) {
        const jokeQuestion = currentJoke[0].joke_text;
        const jokeAnswer = currentJoke[0].joke_punchline;

        // console.log(jokeQuestion)
        return (
            <div>
                {/* when isLoading is true run... */}
                { isLoading && 
                    <div className="loading-container">
                    <p className="loading-text">generating joke...</p>
                        <div className="loading"></div>       
                    </div>
                }
                {/* when currentJoke.id & isLoading is false run... */}
                { currentJoke[0].joke_id && !isLoading && 
                    <div>
                    <p className="joke"> { jokeQuestion }</p>
            
                    <button className="punchline-reveal-button" onClick={() => setPunchlineIsDisplayed( true ) }>
                            reveal punchline...
                    </button>
                        { punchlineIsDisplayed && 
                        <p className="punchline"> ...{ jokeAnswer } &#128514; &#128514; &#128514;</p>
                        }
                    </div> }

            </div>
        )
                    }
    };

    return (
        <>
        <div>
            <h1 className="home-title-text">myJoke Generator <img className="logo" src={ logo }></img></h1>
    
            <p className="home-body-text">Stuck for a joke? Want to impress to your friends? <br/> Click on the button below to generate a random joke...</p>
            <p className="home-body-text">Please bear in mind the jokes are generated at random from an external API. Some users may find some of the jokes offensive or quite simply rubbish, for which I apologise in advance!!</p>
            
            <button className="joke-generator-button" onClick={() => handleJokeClick() }>generate new joke <img className="generate" src={ generate } alt="generate joke"/></button>
        </div>
        
            { displayJokeSetup() }
        </>
    )
};

export default JokeContainer;
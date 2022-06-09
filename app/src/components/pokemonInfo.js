// Styles
import '../styles/pokemonInfo.css';

// React and Axios
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonInfo = ({ pokemonName, unselect }) => {
  const [pokemon, setPokemon] = useState({});

  const exit = () => {
    unselect("");
  }

  useEffect(() => {
    /* If pokemon is already in local storage, retrieve it to 
    avoid making additional calls to the API. */
    const pokemonData = localStorage.getItem(pokemonName);
    
    /* Pokemon is not in local storage, this should not be 
    called unless the user deletes their local storage. */
    if (pokemonData === undefined) {
      const pokemonLink = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const parsedData = axios.get(pokemonLink).then(res => res.data);
      setPokemon(parsedData);
    } 
    
    // Pokemon is in local storage, set the data in our pokemon state.
    else {
      const parsedData = JSON.parse(pokemonData);
      setPokemon(parsedData);
    }
  }, [pokemonName]);

  return (
    <div className="flex overlay" onClick={() => exit()}>
      <div className="flex-col info-container">
        hi
      </div>
    </div>
  )
}

export default PokemonInfo;
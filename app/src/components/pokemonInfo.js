// Styles
import '../styles/pokemonInfo.css';

// React and Axios
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonInfo = ({ pokemonName, unselect }) => {
  const [pokemon, setPokemon] = useState({});

  // Return to the home page: pokedexPage
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
    pokemon.abilities === undefined ? null :
    <div className="flex-col info-container">
      <h1 className="pokemon-name">{pokemonName}</h1>
      <div className="flex entry-row">
        <div className="flex-col main-section">
          <h2 className="left section-header">INTRODUCTION</h2>
          <p className="left">{"Pokedex Entry #" + pokemon.id}</p>
          <p className="left">{"Height " + pokemon.height * 10 + "cm"}</p>
          <p className="left">{"Weight " + pokemon.weight / 10 + "kg"}</p>
          {pokemon.abilities.map((ability, idx) => {
            return <p className={"left ability " + pokemonName} key={idx}>{ability.ability.name}</p>
          })}
        </div>
        <img src={pokemon["sprites"]["other"]["official-artwork"]["front_default"]} alt={"An image of " + pokemonName} className="pokemon-image"></img>
        <div className="flex-col main-section">
          <h2 className="right section-header">FIRST 5 MOVES</h2>
          {pokemon.moves.slice(0, 5).map((move, idx) => {
            return <p className="right move" key={idx}>{move.move.name}</p>
          })}
        </div>
      </div>
      <button className={"exit-button " + pokemonName} onClick={() => exit()}>RETURN TO HOME</button>
    </div>
  )
}

export default PokemonInfo;
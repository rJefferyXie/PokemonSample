// Styles
import '../styles/pokedexPage.css';

// Constants
import PokemonLinks from '../constants/pokemonLinks';

// Components
import PokemonCard from '../components/pokemonCard';
import PokemonInfo from '../components/pokemonInfo';

// React + Axios
import { useEffect, useState } from 'react';
import axios from 'axios';

const PokedexPage = () => {
  const [pokedex, setPokedex] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");

  useEffect(() => {
    /* If pokemon are already stored in local storage, skip making the API calls
    and update pokedex. This should always run after the first page load. */
    const pokemon1 = localStorage.getItem("bulbasaur");
    const pokemon2 = localStorage.getItem("charmander");
    const pokemon3 = localStorage.getItem("squirtle");

    // This should be the default case, parse all pokemon strings and update pokedex.
    if (pokemon1 && pokemon2 && pokemon3) {
      const parsedPokemon1 = JSON.parse(pokemon1);
      const parsedPokemon2 = JSON.parse(pokemon2);
      const parsedPokemon3 = JSON.parse(pokemon3);
      setPokedex([parsedPokemon1, parsedPokemon2, parsedPokemon3]);
      return;
    }

    const getPokemonLink = async (link) => {
      const pokemonData = await axios.get(link).then(res => res.data);
      setPokedex(pokedex => [...pokedex, pokemonData]);

      /* Store the pokemon data in local storage to avoid making additional
      API calls in the future, resulting in lower wait times for the user. */
      localStorage.setItem(pokemonData.name, JSON.stringify(pokemonData));
    }

    /* This will make the API calls to the PokeAPI and store the data in local storage.
    This should only run on the first page load or if the user deletes their local storage. */ 
    PokemonLinks.map(link => getPokemonLink(link));
  }, []);

  return (
    <div className="flex pokedex">
      {selectedPokemon === "" ? pokedex.slice(0, 3).map((pokemon, idx) => {
        return <PokemonCard pokemonData={pokemon} key={idx} select={setSelectedPokemon}></PokemonCard>
      }) : <PokemonInfo pokemonName={selectedPokemon} unselect={setSelectedPokemon}></PokemonInfo>}
    </div>
  )
}

export default PokedexPage;
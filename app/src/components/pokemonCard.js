// Styles
import '../styles/pokemonCard.css';

const PokemonCard = ({ pokemonData, select }) => {

  // Updates the selectedPokemon state in pokedexPage to this card's pokemon name.
  const selectPokemon = (pokemonName) => {
    select(pokemonName);
  }

  return (
    <div className={"card-wrapper " + pokemonData.name + "-spinner"} onClick={() => selectPokemon(pokemonData.name)}>
      <div className={"flex-col card " + pokemonData.name}>
        <img className="pokemon-image-card" src={pokemonData["sprites"]["other"]["official-artwork"]["front_default"]} alt={"An image of " + pokemonData.name}></img>
        <p className="pokemon-name-card">{pokemonData.name}</p>
      </div>
  </div>
  )
}

export default PokemonCard;
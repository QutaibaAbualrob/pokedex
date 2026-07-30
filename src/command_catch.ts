import type { State } from "./state.js";

export async function commandCatch(
  state: State,
  pokemonName: string,
): Promise<void> {
  if (!pokemonName) {
    console.log("Usage: catch <pokemon-name>");
    return;
  }

  if (state.pokedex[pokemonName]) {
    console.log(`${pokemonName} is already in your Pokedex!`);
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);

  if (Math.random() * 400 > pokemon.base_experience) {
    console.log(`${pokemonName} was caught!`);
    state.pokedex[pokemonName] = pokemon;
  } else {
    console.log(`${pokemonName} escaped!`);
  }
}

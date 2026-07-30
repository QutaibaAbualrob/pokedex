import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  areaName: string,
): Promise<void> {
  if (!areaName) {
    console.log("Usage: explore <area-name>");
    return;
  }
  console.log(`Exploring ${areaName}...`);
  const data = await state.pokeAPI.fetchLocation(areaName);
  console.log("Found Pokemon:");
  for (const enc of data.pokemon_encounters) {
    console.log(` - ${enc.pokemon.name}`);
  }
}

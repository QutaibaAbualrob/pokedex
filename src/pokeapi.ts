import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  pokemon_encounters: { pokemon: { name: string; url: string } }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
  types: { type: { name: string } }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache: Cache;

  constructor(cacheMs = 300_000) {
    this.#cache = new Cache(cacheMs);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area/?offset=0&limit=20`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("  (using cached data)");
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching locations`);
    }
    const data = (await res.json()) as ShallowLocations;
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}/`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      console.log("  (using cached data)");
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching location`);
    }
    const data = (await res.json()) as Location;
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(name: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${name}/`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached) {
      console.log("  (using cached data)");
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching pokemon`);
    }
    const data = (await res.json()) as Pokemon;
    this.#cache.add(url, data);
    return data;
  }
}

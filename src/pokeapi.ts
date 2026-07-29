export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
};

export type Location = {
  // placeholder for future use
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area/?limit=20`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching locations`);
    }
    return res.json() as Promise<ShallowLocations>;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} fetching location`);
    }
    return res.json() as Promise<Location>;
  }
}

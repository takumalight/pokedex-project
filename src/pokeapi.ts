export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const locationAreasEndpoint = pageURL || `${PokeAPI.baseURL}/location-area?limit=20`;
    let response;
    try {
        response = await fetch(locationAreasEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json() as ShallowLocations;
    } catch (err) {
        throw new Error(`Failed to fetch location areas: ${err instanceof Error ? err.message : String(err)}`);
    }
    
  }

//   async fetchLocation(locationName: string): Promise<Location> {
//     // implement this
//   }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
};

// export type Location = {
//   // add properties here
// };
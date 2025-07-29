import { Cache } from "./pokecache.js"

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #pokeCache: Cache;

    constructor() {
        this.#pokeCache = new Cache(60000); // Cache entries expire after 60 seconds
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const locationAreasEndpoint = pageURL || `${PokeAPI.baseURL}/location-area`;

        // Attempt to retrieve from cache first
        const cacheData = this.#pokeCache.get(locationAreasEndpoint);
        if (cacheData !== undefined) {
            return cacheData as ShallowLocations;
        }

        let response;
        try {
            response = await fetch(locationAreasEndpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json() as ShallowLocations;
            // Add response to cache first
            this.#pokeCache.add(locationAreasEndpoint, data);

            return data;
        } catch (err) {
            throw new Error(`Failed to fetch location areas: ${err instanceof Error ? err.message : String(err)}`);
        }
    }

    async fetchEncounters(locationID: string): Promise<PokemonEncounters> {
        const locationURL = `${PokeAPI.baseURL}/location-area/${locationID}`;
        // Attempt to retrieve from cache first
        const cacheData = this.#pokeCache.get(locationURL);
        if (cacheData !== undefined) {
            return cacheData as PokemonEncounters;
        }

        let encounterList: PokemonEncounters = [];

        let response;
        try {
            response = await fetch(locationURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            for (const encounter of data.pokemon_encounters){
                encounterList.push(encounter["pokemon"]["name"]);
            }

            return encounterList;

        }catch (err) {
            throw new Error(`Failed to fetch location area: ${err instanceof Error? err.message : String(err)}`);
        }
    }
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

export type PokemonEncounters = string[];

// export type Location = {
//   encounter_method_rates: Array<{
//     encounter_method: {
//         name: string;
//         url: string;
//     },
//     version_details: Array<{
//         rate: number;
//         version: {
//             name: string;
//             url: string;
//         };
//     }>
//   }>;
//   game_index: number;
//   id: number;
//   location: {
//     name: string;
//     url: string;
//   };
//   name: string;
//   names: Array<{
//     language: {
//         name: string;
//         url: string;
//     };
//     name: string;
//   }>
//   pokemon_encounters: Array<{
//     pokemon: {
//         name: string;
//         url: string;
//     };
//     version_details: Array<{
//         encounter_details: Array<{
//             chance: number;
//             condition_values: Array<{
//                 name: string;
//                 url: string;
//             }>;
//             max_level: number;
//             method:{
//                 name: string;
//                 url: string;
//             }
//             min_level: number;
//         }>
//     }>
//   }>
// };
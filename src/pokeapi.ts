import { Cache } from "./pokecache.js";

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

    async fetchPokemon(pokemon_name: string): Promise<Pokemon> {
        const pokemonURL = `${PokeAPI.baseURL}/pokemon/${pokemon_name}`;
        // Attempt to retrieve from cache first
        const cacheData = this.#pokeCache.get(pokemonURL);
        if (cacheData !== undefined) {
            return cacheData as Pokemon;
        }

        let response;
        try {
            response = await fetch(pokemonURL);
            if (!response.ok) {
                throw new Error(`HTTP error! Cannot reach ${pokemonURL}! status: ${response.status}`);
            }

            const data = await response.json();

            const pokemonStats = parsePokemonStats(data);
            const pokemonTypes = parsePokemonTypes(data);
            
            return {
                name: data.name,
                height: data.height,
                weight: data.weight,
                stats: pokemonStats,
                types: pokemonTypes,
                base_experience: data.base_experience
            } as Pokemon;
        }catch (err) {
            throw new Error(`Failed to fetch pokemon: ${err instanceof Error? err.message : String(err)}`);
        }
    }
}

function parsePokemonStats(data: PokeAPIResponse): PokemonStat[] {
    let statArray: PokemonStat[] = [];

    for (const stat of data.stats){
        let newStat: PokemonStat = {
            name: stat.stat.name,
            val: stat.base_stat
        }
        statArray.push(newStat);
    }
    return statArray;
}

function parsePokemonTypes(data: PokeAPIResponse): string[] {
    let typeArray: string[] = [];

    for (const type of data.types){
        typeArray.push(type.type.name)
    }
    return typeArray;
}

interface PokeAPIResponse {
    name: string;
    height: number;
    weight: number;
    base_experience: number;
    stats: Array<{
        base_stat: number;
        stat: {
            name: string;
        };
    }>;
    types: Array<{
        type: {
            name: string;
        };
    }>;
    // Allow any other properties the API might return
    [key: string]: any;
}


export type Pokemon = {
    name: string;
    height: number;
    weight: number;
    stats: PokemonStat[];
    types: string[];
    base_experience: number;
};

export type PokemonStat = {
    name: string;
    val: number;
};

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

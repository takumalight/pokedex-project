import { Pokemon, PokemonStat } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log("You must provide the name of a pokemon.\nExample: [inspect vaporeon]");
        return;
    }

    if (state.pokedex[pokemonName]){
        const pokemon: Pokemon = state.pokedex[pokemonName];
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log("Stats:");
        const pokemonStats: PokemonStat[] = pokemon.stats;
        for (const stat of pokemonStats){
            console.log(`  - ${stat.name}: ${stat.val}`);
        }
        console.log("Types:")
        for (const type of pokemon.types) {
            console.log(`  - ${type}`);
        }
    } else {
        console.log(`You've not yet caught a(n) ${pokemonName}!`)
        return;
    }
}
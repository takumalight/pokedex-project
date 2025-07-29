import { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:")
    const pokedexEntries = state.pokedex;
    for (const entry in pokedexEntries) {
        console.log(`  - ${pokedexEntries[entry].name}`);
    }
}
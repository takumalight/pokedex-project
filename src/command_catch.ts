import { Pokemon } from './pokeapi';
import { State } from './state';

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];

    if (!pokemonName) {
        console.log("You must provide a pokemon name!\nExample: [catch bulbasaur]");
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    try{
        const pokemondata:Pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
            
        const catchScore = Math.random() * 300;

        if (catchScore > pokemondata.base_experience){
            state.pokedex[pokemonName] = pokemondata;
            console.log(`${pokemonName} was caught!`);
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    }catch (err) {
        console.error(`Failed to find ${pokemonName}. Make sure you typed it correctly!`)
    }
}
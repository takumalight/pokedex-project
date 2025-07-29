import { State } from './state';

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemon = args[0];
    console.log(`Throwing a Pokeball at ${pokemon}...`);

    const base_experience = await state.pokeAPI.fetchBaseExperience(pokemon);
    const catchScore = Math.random() * 300;

    if (catchScore > base_experience){
        state.pokedex[pokemon] = {
            name: pokemon
        }
        console.log(`${pokemon} was caught!`);
    } else {
        console.log(`${pokemon} escaped!`);
    }
}
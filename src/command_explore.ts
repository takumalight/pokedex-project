import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const locationID = args[0];
    console.log(`Exploring ${locationID}...`);

    const encounterList = await state.pokeAPI.fetchEncounters(locationID);
    console.log("Found Pokemon:");
    for (const encounter of encounterList) {
        console.log(` - ${encounter}`);
    }
}
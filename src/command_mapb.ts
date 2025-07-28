import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("you're on the first page");
        return;
    }
    const locationAreasJson = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
    state.nextLocationsURL = locationAreasJson.next || "";
    state.prevLocationsURL = locationAreasJson.previous || "";
    
    for (const result of locationAreasJson.results) {
        console.log(result.name);
    }
}

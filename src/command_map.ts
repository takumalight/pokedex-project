import { State } from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const locationAreasJson = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
    state.nextLocationsURL = locationAreasJson.next || "";
    state.prevLocationsURL = locationAreasJson.previous || "";
    
    for (const result of locationAreasJson.results) {
        console.log(result.name);
    }
}

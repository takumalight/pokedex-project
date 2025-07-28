import { State } from "./state.js";

export async function commandExit(state: State){
    console.log("Closing the Pokedex... Goodbye!");
    state.readlineInterface.close();
    process.exit(0);
}

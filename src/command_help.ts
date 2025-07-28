import { CLICommand } from "./command.js";

export function commandHelp(registry: Record<string, CLICommand>){
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    for (const registryKey in registry){
        console.log(`${registry[registryKey].name}: ${registry[registryKey].description}`);
    }
}
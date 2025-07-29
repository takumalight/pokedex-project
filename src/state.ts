import { createInterface, type Interface } from "readline";
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readlineInterface: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string;
    pokedex: Record<string, Pokemon>;
}

export function initState(): State {
    return {
        readlineInterface: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: "Pokedex > ",
        }),
        commands: {
            exit: {
                name: "exit",
                description: "Exits the pokedex",
                callback: commandExit,
            },
            help: {
                name: "help",
                description: "Displays a help message",
                callback: commandHelp,
            },
            map: {
                name: "map",
                description: "Displays the next 20 location areas in the Pokemon world",
                callback: commandMap,
            },
            mapb: {
                name: "mapb",
                description: "Displays the previous 20 location areas in the Pokemon world",
                callback: commandMapb
            },
            explore: {
                name: "explore",
                description: "Displays the species of Pokemon native to the location",
                callback: commandExplore
            },
            catch: {
                name: "catch",
                description: "Catches a Pokemon",
                callback: commandCatch
            }
        },
        pokeAPI: new PokeAPI(),
        nextLocationsURL: "",
        prevLocationsURL: "",
        pokedex: {}
    };
}

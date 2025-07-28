// import { createInterface } from 'node:readline';
import { CLICommand } from './state.js';
import { State } from './state.js';

export function startREPL(state: State) {
    state.readlineInterface.prompt();
    state.readlineInterface.on("line", (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            state.readlineInterface.prompt();
            return;
        }
        if (!state.commands[cleanedInput[0]]){
            console.log("Unknown command");
            state.readlineInterface.prompt();
            return;
        }
        const command: CLICommand = state.commands[cleanedInput[0]];
        command.callback(state);

        state.readlineInterface.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
}

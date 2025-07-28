import { CLICommand } from './state.js';
import { State } from './state.js';

export function startREPL(state: State) {
    state.readlineInterface.prompt();
    state.readlineInterface.on("line", async (input: string) => {
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
        try {
            await command.callback(state);
        } catch (error) {
            console.error(`Error executing command '${command.name}':`, error);
        }
        state.readlineInterface.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
}

import { createInterface } from 'node:readline';
import { getCommands } from './commands_registry.js';
import { CLICommand } from './command.js';

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    });

    rl.prompt();
    rl.on("line", (input: string) => {
        const cleanedInput = cleanInput(input);
        if (cleanedInput.length === 0) {
            rl.prompt();
            return;
        }
        const availableCommands = getCommands();
        if (!availableCommands[cleanedInput[0]]){
            console.log("Unknown command");
            rl.prompt();
            return;
        }
        const command: CLICommand = availableCommands[cleanedInput[0]];
        command.callback(availableCommands);

        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
}

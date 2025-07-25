import { createInterface } from 'node:readline';

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
        console.log(`Your command was: ${cleanedInput[0]}`);
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
}
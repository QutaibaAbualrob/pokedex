import { createInterface } from 'node:readline';

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();

    rl.on("line", (input: string) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        console.log(`Your command was: ${words[0]}`);
        rl.prompt();
    });
}

export default function cleanInput(input: string): string[] {
    return input
        .split(" ")
        .filter(word => word !== "")
        .map(word => word.toLowerCase());
}

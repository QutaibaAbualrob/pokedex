import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function startREPL() {
  const commands = getCommands();
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

    const commandName = words[0];
    const command = commands[commandName];

    if (command) {
      try {
        command.callback(commands);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Unknown command");
    }
    rl.prompt();
  });
}

export default function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .filter((word) => word !== "")
    .map((word) => word.toLowerCase());
}

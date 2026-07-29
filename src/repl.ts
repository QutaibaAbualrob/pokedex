import type { State } from "./state.js";

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (input: string) => {
    const words = cleanInput(input);
    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];
    if (command) {
      try {
        await command.callback(state);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Unknown command");
    }
    state.rl.prompt();
  });
}

export default function cleanInput(input: string): string[] {
  return input
    .split(" ")
    .filter((word) => word !== "")
    .map((word) => word.toLowerCase());
}

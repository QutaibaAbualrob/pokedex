export default function cleanInput(input: string): string[] {
    return input
        .split(" ")
        .filter(word => word !== "")
        .map(word => word.toLowerCase());
}


import { brightRed } from "../deps.ts";

export function printError(msg: string) {
  console.log(`${brightRed("ERROR:")} ${msg}`);
}

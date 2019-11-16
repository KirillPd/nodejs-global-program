import readline from "readline";

import { reverse as reverseString } from "./managers/string";

const readlineInstance = readline.createInterface({
  input: process.stdin
});

readlineInstance.on("line", line => console.log(reverseString(line)));

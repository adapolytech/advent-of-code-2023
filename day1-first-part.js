import { open } from "fs/promises";

/**
 * @param {String} line
 */
const getFirstAndLastDigit = (line) => {
  let [first, last] = [null, null];
  for (let index = 0; index < line.length; index++) {
    const [charAtIndexFromStart, charAtIndexFromEnd] = [line[index], line[line.length - (index + 1)]];
    if (!first && !Number.isNaN(Number(charAtIndexFromStart))) first = charAtIndexFromStart;
    if (!last && !Number.isNaN(Number(charAtIndexFromEnd))) last = charAtIndexFromEnd;
    if (first && last) return `${first}${last}`;
  }
};

let sum = 0;
const fileHandler = await open("input.txt");

for await (const line of fileHandler.readLines()) {
  const digit = getFirstAndLastDigit(line);
  sum = sum + parseInt(digit);
}
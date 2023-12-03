import { open } from "fs/promises";

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const digitsNumericValue = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9"
};

/**
 * @param {string} characters
 */
const isCharacterIncludeDigitNumber = (characters) => {
  if (characters.length < 3) return false;
  const matched = digits.find((digit) => characters.includes(digit));
  return matched;
};

/**
 *
 * @param {string} line
 */
const getFirstAndLast = (line) => {
  let [first, last] = [null, null];
  let lettersAccumulatorsFromStart = [];
  let lettersAccumulatorsFromEnd = [];

  for (let index = 0; index < line.length; index++) {
    const [charAtIndexFromStart, charAtIndexFromEnd] = [line[index], line[line.length - (index + 1)]];
    if (!first) {
      if (!Number.isNaN(Number(charAtIndexFromStart))) {
        first = charAtIndexFromStart;
      } else {
        lettersAccumulatorsFromStart.push(charAtIndexFromStart);
        const isDigitInLetter = isCharacterIncludeDigitNumber(lettersAccumulatorsFromStart.join(""));
        if (isDigitInLetter) first = digitsNumericValue[isDigitInLetter];
      }
    }
    if (!last) {
      if (!Number.isNaN(Number(charAtIndexFromEnd))) {
        last = charAtIndexFromEnd;
      } else {
        lettersAccumulatorsFromEnd.unshift(charAtIndexFromEnd);
        const isDigitInLetter = isCharacterIncludeDigitNumber(lettersAccumulatorsFromEnd.join(""));
        if (isDigitInLetter) last = digitsNumericValue[isDigitInLetter];
      }
    }
    if (first && last) return `${first}${last}`;
  }
};

let sum = 0;
const fileHandler = await open("input.txt");

for await (const line of fileHandler.readLines()) {
  const digit = getFirstAndLast(line);
  sum = sum + parseInt(digit);
}
console.log({ sum }); // => { sum: 56108 }

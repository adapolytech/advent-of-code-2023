import { readFileSync } from "fs";

const input = readFileSync("./day3/input.txt", "utf-8");

const fileLines = input.split("\n");

const numberValuesAndIndexes = new Map();
const symbolsValuesAndIndexes = new Map();

/**
 *
 * @param {string} line
 */
const getLinesNumberAndIndexes = (line) => {
  let startIndex = 0;
  const numbers = line.match(/\d+/g);
  return numbers?.map((number) => {
    const index = line.indexOf(number, startIndex);
    startIndex = index + number.length;
    return [index, number];
  });
};

const getLinesSymbolAndIndexes = (line) => {
  let startIndex = 0;
  const symbols = line.match(/[^0-9.]/g);
  return symbols?.map((number) => {
    const index = line.indexOf(number, startIndex);
    startIndex = index + 1;
    return [index, number];
  });
};

function isPartNumber(numberStartIndex, numberEndIndex, number, lineIndex, start, end) {
  if (!start) {
    const symbolsTopLine = symbolsValuesAndIndexes.get(lineIndex - 1);
    const symbolIndexMap = new Map(symbolsTopLine);
    for (let index = numberStartIndex - 1; index <= numberEndIndex; index++) {
      if (symbolIndexMap.has(index)) return number;
    }
  }
  const currentLineSymbol = new Map(symbolsValuesAndIndexes.get(lineIndex));
  if (currentLineSymbol.has(numberStartIndex - 1) || currentLineSymbol.has(numberEndIndex)) return number;
  if (!end) {
    const symbolsTopLine = getLinesSymbolAndIndexes(fileLines[lineIndex + 1]);
    const symbolIndexMap = new Map(symbolsTopLine);
    for (let index = numberStartIndex - 1; index <= numberEndIndex; index++) {
      if (symbolIndexMap.has(index)) return number;
    }
  }
  return false;
}

let total = 0;

for (let index = 0; index < fileLines.length; index++) {
  const numbers = getLinesNumberAndIndexes(fileLines[index]);
  const symbols = getLinesSymbolAndIndexes(fileLines[index]);
  numberValuesAndIndexes.set(index, numbers);
  symbolsValuesAndIndexes.set(index, symbols);
  numbers?.forEach(([startIndex, number]) => {
    const partNumber = isPartNumber(
      startIndex,
      startIndex + number.length,
      number,
      index,
      index === 0,
      index === fileLines.length - 1
    );
    if (partNumber) total += parseInt(partNumber);
  });
}

console.log({ total });

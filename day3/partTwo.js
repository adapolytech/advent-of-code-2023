import { readFileSync } from "fs";

const input = readFileSync("./day3/input.txt", "utf-8");

const fileLines = input.split("\n");

const lineNumbersMap = new Map();
const lineSymbolMap = new Map();

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
  return symbols?.map((symbol) => {
    const index = line.indexOf(symbol, startIndex);
    startIndex = index + symbol.length;
    return [index, symbol];
  });
};

const getLineStarSymbol = (line) => {
  let startIndex = 0;
  const symbols = line.match(/\*/g);
  return symbols?.map((number) => {
    const index = line.indexOf(number, startIndex);
    startIndex = index + 1;
    return [index, number];
  });
};

function isPartNumber(numberStartIndex, numberEndIndex, number, lineIndex, start, end) {
  if (!start) {
    const symbolsTopLine = lineSymbolMap.get(lineIndex - 1);
    const symbolIndexMap = new Map(symbolsTopLine);
    for (let index = numberStartIndex - 1; index <= numberEndIndex; index++) {
      if (symbolIndexMap.has(index)) return number;
    }
  }
  const currentLineSymbol = new Map(lineSymbolMap.get(lineIndex));
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
let partNumbers = [];
for (let index = 0; index < fileLines.length; index++) {
  const linePartNumbers = [];
  const numbers = getLinesNumberAndIndexes(fileLines[index]);
  const symbols = getLinesSymbolAndIndexes(fileLines[index]);
  lineNumbersMap.set(index, numbers);
  lineSymbolMap.set(index, symbols);
  numbers?.forEach(([startIndex, number]) => {
    const partNumber = isPartNumber(
      startIndex,
      startIndex + number.length,
      number,
      index,
      index === 0,
      index === fileLines.length - 1
    );
    if (partNumber) {
      linePartNumbers.push([partNumber, startIndex, startIndex + number.length]);
    }
  });
  partNumbers[index] = linePartNumbers;
}

const isGoldGear = (index, lineIndex) => {
  const topLinePartNumber = partNumbers[lineIndex - 1]?.filter(([number, startIndex, endIndex]) => {
    return startIndex - 2 < index && endIndex + 1 > index;
  });
  const currentLinePartNumber = partNumbers[lineIndex]?.filter(([number, startIndex, endIndex]) => {
    return startIndex === index + 1 || endIndex === index;
  });
  const bottomLinePartNumber = partNumbers[lineIndex + 1]?.filter(([number, startIndex, endIndex]) => {
    return startIndex - 2 < index && endIndex + 1 > index;
  });
  const partNumbers = [...(topLinePartNumber ?? []), ...(currentLinePartNumber ?? []), ...(bottomLinePartNumber ?? [])];
  if (partNumbers.length === 2) return parseInt(partNumbers[0][0]) * parseInt(partNumbers[1][0]);
  return false;
};

for (let index = 0; index < fileLines.length; index++) {
  const starSymboles = getLineStarSymbol(fileLines[index]);
  starSymboles?.forEach(([starIndex]) => {
    const result = isGoldGear(starIndex, index);
    if (result) total += result;
  });
}

console.log({ total });

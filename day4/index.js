import { open } from "fs/promises";

const fileHandler = await open("./day4/input.txt");
/**
 *
 * @param {number} matches
 */
const getWorthPoint = (matches) => {
  if (matches < 0) return 0;
  return Array.from({ length: matches }).reduce((prev) => {
    return prev ? prev + prev : 1;
  }, 0);
};

/**
 *
 * @param {string} line
 */
const getCardNumbers = (line) => {
  const [, cards] = line.split(":");
  const [winningNumbers, playerNumbers] = cards.split("|");
  return [winningNumbers.trim().split(" "), playerNumbers.trim("").split(" ")];
};

const getTotalMatch = (winningNumbers, playerNumbers) => {
  const winning = new Set(winningNumbers.filter(Boolean));
  const players = new Set(playerNumbers.filter(Boolean));
  const matches = [...winning].filter((value) => players.has(value));
  return matches.length;
};

async function partOne() {
  let sum = 0;
  for await (const line of fileHandler.readLines()) {
    const [winningNumbers, playerNumbers] = getCardNumbers(line);
    const totalMatched = getTotalMatch(winningNumbers, playerNumbers);
    const worth = getWorthPoint(totalMatched);
    sum += worth;
  }
  return sum;
}

const worth = await partOne();
console.log({ worth });

async function partTwo() {
  let cardMap = new Map();
  let index = 1;
  for await (const line of fileHandler.readLines()) {
    const [winningNumbers, playerNumbers] = getCardNumbers(line);
    const totalMatched = getTotalMatch(winningNumbers, playerNumbers);
    const totalCard = cardMap.has(index) ? cardMap.get(index) + 1 : 1;
    cardMap.set(index, totalCard);
    if (totalMatched) {
      for (let i = 1; i <= totalMatched; i++) {
        cardMap.has(index + i)
          ? cardMap.set(index + i, cardMap.get(index + i) + totalCard)
          : cardMap.set(index + i, totalCard);
      }
    }
    index++;
  }
  const totalScratchcards = [...cardMap.values()].reduce((prev, next) => prev + next, 0);
  return totalScratchcards;
}

const totalScratchcards = await partTwo();
console.log({ totalScratchcards });

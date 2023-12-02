import { open } from "fs/promises";

const bag = new Map([
  ["red", 12],
  ["green", 13],
  ["blue", 14]
]);

/**
 *
 * @param {string} game
 * @param {Array} cubesCount
 */
const isGamePossible = (cubesCount) => {
  const check = cubesCount.some((cubeCount) => {
    return Object.entries(cubeCount).some(([cube, count]) => {
      if (!bag.has(cube) || (bag.has(cube) && bag.get(cube) < count)) return true;
    });
  });
  return check ? false : true;
};

/**
 *
 * @param {string} line
 */
const retrieveCubCount = (line) => {
  const [game, sets] = line.split(":");
  const cubeSets = sets.split(";");
  const cubeCount = cubeSets.map((next) => {
    const parts = next.split(",");
    return parts.reduce(
      (prev, next) => {
        const [_, count, cube] = next.split(" ");
        prev[cube] ? (prev[cube] = prev[cube] + parseInt(count)) : (prev[cube] = parseInt(count));
        return prev;
      },
      { red: 0, green: 0, blue: 0 }
    );
  });

  const isPossible = isGamePossible(cubeCount);
  const [_, gameNumber] = game.split(" ");
  return isPossible ? parseInt(gameNumber) : false;
};

let sum = 0;

const fileHandler = await open("input.txt");

for await (const line of fileHandler.readLines()) {
  const game = retrieveCubCount(line);
  if (game) sum += game;
}
console.log({ sum }); // => { sum: 2076 }

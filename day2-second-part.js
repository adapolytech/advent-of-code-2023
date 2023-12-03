import { open } from "fs/promises";

/**
 *
 * @param {Array} cubesSet
 * @returns {number}
 */
const minimumCubesForGame = (cubesSet) => {
  const [first, ...remain] = cubesSet;
  const bag = new Map([
    ["red", first["red"]],
    ["green", first["green"]],
    ["blue", first["blue"]]
  ]);
  remain.forEach((set) => {
    if (bag.get("red") < set["red"]) bag.set("red", set["red"]);
    if (bag.get("green") < set["green"]) bag.set("green", set["green"]);
    if (bag.get("blue") < set["blue"]) bag.set("blue", set["blue"]);
  });
  return [...bag.values()].reduce((prev, next) => prev * next, 1);
};

/**
 *
 * @param {string} line
 */
const gamePower = (line) => {
  const [_game, sets] = line.split(":");
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
  return minimumCubesForGame(cubeCount);
};

let power = 0;

const fileHandler = await open("input.txt");

for await (const line of fileHandler.readLines()) {
  const game = gamePower(line);
  if (game) power += game;
}

console.log({ power }); // { power: 70950 }

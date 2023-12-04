import fs from "fs";

const MAX_RED_CUBES = 12;
const MAX_GREEN_CUBES = 13;
const MAX_BLUE_CUBES = 14;

enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

export function part1() {
  const file = fs.readFileSync("./src/02/input.txt", "utf-8");
  const gameList = file.split("\n");
  const possibleGameIds = [];

  for (const game of gameList) {
    if (isGameValid(game)) {
      possibleGameIds.push(extractId(game));
    }
  }

  return possibleGameIds.reduce((acc, curr) => acc + curr, 0);
}

export function part2() {
  const file = fs.readFileSync("./src/02/input.txt", "utf-8");
  const gameList = file.split("\n");

  //TODO
}

function extractId(input: string): number {
  const pattern = /Game (\d+):/;
  const match = input.match(pattern);

  if (match) {
    return Number(match[1]);
  }

  return 0;
}

function isGameValid(input: string): boolean {
  const colorPattern = /(\d+) (\w+)/g;
  const matches = Array.from(input.matchAll(colorPattern));

  for (const match of matches) {
    const count = Number(match[1]);
    const color = match[2];

    if (
      (color === Color.RED && count > MAX_RED_CUBES) ||
      (color === Color.GREEN && count > MAX_GREEN_CUBES) ||
      (color === Color.BLUE && count > MAX_BLUE_CUBES)
    ) {
      return false;
    }
  }
  return true;
}

function countColors(input: string): Record<string, number> {
  const colorPattern = /(\d+) (\w+)/g;
  const matches = Array.from(input.matchAll(colorPattern));

  const colorCount: Record<string, number> = {};

  for (const match of matches) {
    const count = Number(match[1]);
    const color = match[2];

    if (colorCount[color]) {
      colorCount[color] += count;
    } else {
      colorCount[color] = count;
    }
  }

  return colorCount;
}

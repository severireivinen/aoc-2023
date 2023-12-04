import fs from "fs";

const NUMBER_MAP = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

export function run() {
  const file = fs.readFileSync("./src/01/input.txt", "utf-8");
  const calibrationList = file.split("\n");
  const listOfIndividualSums = [];

  for (let i = 0; i < calibrationList.length; i++) {
    const element = calibrationList[i];

    const firstDigitNumber = getNumbersMap(element).sort(
      (a, b) => a.index - b.index
    )[0]?.value;

    const lastDigitNumber = getNumbersMap(element).sort(
      (a, b) => b.index - a.index
    )[0]?.value;

    if (firstDigitNumber && lastDigitNumber) {
      listOfIndividualSums.push(
        Number(`${firstDigitNumber}${lastDigitNumber}`)
      );
    }
  }

  return listOfIndividualSums.reduce((a, b) => a + b, 0);
}

function getNumbersMap(input: string): { value: number; index: number }[] {
  const characters = input.split("");
  const numericValuesWithIndex = findNumericValuesWithIndex(input, NUMBER_MAP);
  const numbersWithIndex = characters
    .map((character, index) => {
      if (Number(character)) {
        return { value: Number(character), index: index };
      }
      return null;
    })
    .filter(Boolean);

  const combined = [...numericValuesWithIndex, ...numbersWithIndex];

  return combined;
}

function findNumericValuesWithIndex(
  input: string,
  map: Record<number, string>
): { value: number; index: number }[] {
  const result = [];

  for (const number in NUMBER_MAP) {
    let index = input.indexOf(NUMBER_MAP[number]);

    while (index !== -1) {
      result.push({ value: Number(number), index: index });
      index = input.indexOf(NUMBER_MAP[number], index + 1);
    }
  }

  return result.length > 0 ? result : [];
}

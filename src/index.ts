import { run as task1 } from "./01/task.js";
import { part1 as task2 } from "./02/task.js";

function main() {
  const task1Result = task1();
  const task2Result = task2();

  console.log("Task 2:", task2Result);
}

main();

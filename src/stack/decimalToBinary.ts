import { Stack } from "./Stack";

function decimalToBinary(value: number): string {
  const stack = new Stack<number>();
  let num = value;
  let rem = 0;
  let binary = "";

  while (num > 0) {
    rem = Math.floor(num % 2);
    stack.push(rem);
    num = Math.floor(num / 2);
  }

  while (!stack.isEmpty()) {
    binary += stack.pop()!.toString();
  }

  return binary;
}

console.log(decimalToBinary(22));

import { Stack } from "./Stack";

function baseConverter(value: number, base: number): string {
  const stack = new Stack<number>();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = value;
  let digit = 0;
  let baseString = "";

  if (base < 2 || base > 36) {
    return "";
  }

  while (num > 0) {
    digit = Math.floor(num % base);
    stack.push(digit);
    num = Math.floor(num / base);
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()!];
  }

  return baseString;
}

console.log(baseConverter(12, 2)); // Binary
console.log(baseConverter(12, 8)); // Octal
console.log(baseConverter(12, 16)); // Hexadecimal

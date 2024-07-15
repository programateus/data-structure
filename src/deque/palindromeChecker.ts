import { Deque } from "./Deque";

function palindromeChecker(word: string): boolean {
  if (word.length <= 1) return true;

  const deque = new Deque<string>();
  const lowerString = word.toLocaleLowerCase().split("").join("");
  let isEqual = true;
  let firstChar = "";
  let lastChar = "";

  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString[i]);
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()!;
    lastChar = deque.removeBack()!;
    if (firstChar !== lastChar) isEqual = false;
  }

  return isEqual;
}

console.log(palindromeChecker("racecar"));
console.log(palindromeChecker("arara"));

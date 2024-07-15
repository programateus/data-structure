import { Queue } from "./Queue";

function hotPotato(people: string[], num: number) {
  const queue = new Queue<string>();
  const eliminated: string[] = [];

  for (const person of people) {
    queue.enqueue(person);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }

    eliminated.push(queue.dequeue()!);
  }

  return { eliminated, winner: queue.dequeue() };
}

const { eliminated, winner } = hotPotato(
  ["Bill", "David", "Susan", "Jane", "Kent", "Brad"],
  7
);

eliminated.forEach((name) =>
  console.log(`${name} was eliminated from the Hot Potato game.`)
);
console.log(`The winner is: ${winner}.`);

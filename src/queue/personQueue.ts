import { Queue } from "./Queue";

const personQueue = () => {
  const queue = new Queue<string>();
  queue.enqueue("John");
  queue.enqueue("Jane");
  queue.enqueue("Jack");
  queue.enqueue("Jill");

  console.log(queue.peek());
  console.log(queue.dequeue());
  console.log(queue.peek());
  console.log(queue.isEmpty());
  console.log(queue.size());
};

personQueue();

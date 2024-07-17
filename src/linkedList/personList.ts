import { DoublyLinkedList } from "./DoublyLinkedList";

const personList = () => {
  const list = new DoublyLinkedList<string>();

  list.push("John");
  list.push("Jane");
  list.push("Jack");
  list.push("Jill");
  list.push("Joe");
  list.push("Judy");

  list.forEach((person) => console.log(person));

  list.removeAt(2);
  console.log("===============================");

  list.forEach((person) => console.log(person));
};

personList();

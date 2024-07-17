import { DoublyNode } from "./DoublyNode";
import { LinkedList } from "./LinkedList";

export class DoublyLinkedList<T> extends LinkedList<T> {
  push(value: T): void {
    const node = new DoublyNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head as DoublyNode<T> | null | undefined;
      while (current?.getNext()) {
        current = current?.getNext() as DoublyNode<T> | null | undefined;
      }
      current?.setNext(node);
      node.setPrevious(current || null);
    }
    this.count++;
  }

  insert(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    const node = new DoublyNode(value);

    if (index === 0) {
      const current: DoublyNode<T> | null = this.head as DoublyNode<T> | null;
      current?.setPrevious(node);
      node.setNext(current);
      this.head = node;
      this.count++;
      return;
    }

    const current = this.getNodeAt(index) as DoublyNode<T> | null;
    const previous = current?.getPrevious() || null;
    node.setNext(current);
    node.setPrevious(previous);
    previous?.setNext(node);
    current?.setPrevious(node);
    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    if (this.count === 0) {
      return undefined;
    }

    if (index === 0) {
      const current = this.head;
      this.head = this.head?.getNext() || null;
      this.count--;
      return current?.getValue();
    }

    const current = this.getNodeAt(index) as DoublyNode<T> | null;
    const previous = current?.getPrevious();
    const next = current?.getNext() as DoublyNode<T> | null;
    previous?.setNext(next);
    next?.setPrevious(previous || null);
    this.count--;
    return current?.getValue();
  }
}

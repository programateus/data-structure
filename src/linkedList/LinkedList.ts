import { Node } from "./Node";

export class LinkedList<T> {
  protected head: Node<T> | null = null;
  protected count = 0;
  protected equalsFn: (a: T, b: T) => boolean = (a, b) => a === b;

  getHead(): Node<T> | null {
    return this.head;
  }

  push(value: T): void {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current: Node<T> | null | undefined = this.head;
      while (current?.getNext()) {
        current = current?.getNext();
      }
      current?.setNext(node);
    }
    this.count++;
  }

  remove(value: T): void {
    const index = this.indexOf(value);
    this.removeAt(index);
  }

  insert(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    const node = new Node<T>(value);

    if (index === 0) {
      const current = this.head;
      this.head = node;
      node.setNext(current);
      this.count++;
      return;
    }

    const previous = this.getNodeAt(index - 1);
    const current = previous?.getNext() || null;
    node.setNext(current);
    previous?.setNext(node);
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
      this.head = this.head?.getNext() || null;
      this.count--;
      return this.head?.getValue();
    }

    const previous = this.getNodeAt(index - 1);
    const current = previous?.getNext() || null;
    const next = current?.getNext() || null;
    previous?.setNext(next);
    this.count--;
    return current?.getValue();
  }

  getValueAt(index: number): T | undefined {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }
    const node = this.getNodeAt(index);
    return node?.getValue();
  }

  indexOf(value: T): number {
    let current = this.head;
    for (let i = 0; i < this.count && current !== null; i++) {
      if (this.equalsFn(value, current.getValue())) {
        return i;
      }
      current = current.getNext();
    }
    return -1;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  getNodeAt(index: number): Node<T> | null {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current?.getNext() || null;
    }

    return current;
  }

  forEach(callback: (value: T, index: number) => void): void {
    let current = this.head;
    for (let i = 0; i < this.count && current; i++) {
      callback(current.getValue(), i);
      current = current.getNext();
    }
  }
}

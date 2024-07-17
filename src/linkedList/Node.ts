export class Node<T> {
  protected value: T;
  protected next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  getNext(): Node<T> | null {
    return this.next;
  }

  setNext(next: Node<T> | null): void {
    this.next = next;
  }
}

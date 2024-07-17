import { Node } from "./Node";

export class DoublyNode<T> extends Node<T> {
  private previous: DoublyNode<T> | null = null;

  getPrevious(): DoublyNode<T> | null {
    return this.previous;
  }

  setPrevious(node: DoublyNode<T> | null): void {
    this.previous = node;
  }
}

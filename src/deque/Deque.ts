export class Deque<T> {
  private items: T[] = [];

  addFront(element: T): void {
    this.items.unshift(element);
  }

  addBack(element: T): void {
    this.items.push(element);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeBack(): T | undefined {
    return this.items.pop();
  }

  peekFront(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[0];
  }

  peekBack(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[this.items.length - 1];
  }

  clear(): void {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

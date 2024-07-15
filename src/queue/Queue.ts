export class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items.shift();
  }

  peek(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[0];
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

export class Queue<T> {
  private items: T[] = [];

  enqueue(...elements: T[]): void {
    this.items = this.items.concat(elements);
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

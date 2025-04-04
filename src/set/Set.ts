export class CustomSet<T> {
  private items: Array<T> = [];

  add(element: T): void {
    if (this.has(element)) {
      throw new Error("The element is already in set");
    }
    this.items.push(element);
  }

  remove(element: T): void {
    if (!this.has(element)) {
      throw new Error("The element is not present in set");
    }
    const index = this.items.findIndex((item) => element === item);
    this.items.splice(index, 1);
  }

  has(element: T): boolean {
    return this.items.find((item) => item === element) !== undefined;
  }

  clear(): void {
    while (this.items.length > 0) {
      this.items.pop();
    }
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length > 0;
  }

  values(): Array<T> {
    return this.items;
  }

  union(otherSet: CustomSet<T>): CustomSet<T> {
    const newSet = new CustomSet<T>();
    this.items.forEach((element) => {
      newSet.add(element);
    });
    otherSet.values().forEach((element) => {
      if (!newSet.has(element)) {
        newSet.add(element);
      }
    });
    return newSet;
  }

  intersection(otherSet: CustomSet<T>): CustomSet<T> {
    const newSet = new CustomSet<T>();
    this.items.forEach((item) => {
      if (otherSet.has(item)) {
        newSet.add(item);
      }
    });
    return newSet;
  }

  difference(otherSet: CustomSet<T>): CustomSet<T> {
    const newSet = new CustomSet<T>();
    this.items.forEach((item) => {
      if (!otherSet.has(item)) {
        newSet.add(item);
      }
    });
    return newSet;
  }

  isSubsetOf(otherSet: CustomSet<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }
    return this.values().every((value) => {
      if (!otherSet.values().includes(value)) {
        return false;
      }
      return true;
    });
  }
}

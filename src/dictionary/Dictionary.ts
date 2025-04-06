import { Item } from "./Item";

export class Dictionary<K, V> {
  private items: Item<K, V>[] = [];

  constructor(items: Item<K, V>[] = []) {
    this.items = items;
  }

  set(key: K, value: V): void {
    const item = this.get(key);
    if (item) {
      item.value = value;
      return;
    }
    this.items.push(new Item(key, value));
  }

  get(key: K): Item<K, V> | undefined {
    return this.items.find((item) => item.key === key);
  }

  has(key: K): boolean {
    return Boolean(this.items.find((item) => item.key === key));
  }

  hasValue(value: V): boolean {
    return Boolean(this.findValue(value));
  }

  hasKey(key: K): boolean {
    return Boolean(this.items.find((item) => item.key === key));
  }

  findValue(value: V): V | undefined {
    const item = this.items.find((item) => item.value === value);
    if (item) {
      return item.value;
    }
    return undefined;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    while (this.items.length > 0) {
      this.items.pop();
    }
  }

  keys(): K[] {
    return this.items.map((item) => item.key);
  }

  values(): V[] {
    return this.items.map((item) => item.value);
  }

  keyValues(): Item<K, V>[] {
    return this.items;
  }

  remove(key: K): boolean {
    const index = this.items.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

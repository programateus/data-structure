export class Item<K, V> {
  constructor(private _key: K, private _value: V) {}

  get key() {
    return this._key;
  }

  get value() {
    return this._value;
  }

  set key(key: K) {
    this._key = key;
  }

  set value(value: V) {
    this._value = value;
  }
}

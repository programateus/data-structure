export class BinaryNode {
  private _key: number;
  private _left: BinaryNode | null = null;
  private _right: BinaryNode | null = null;
  private _parent: BinaryNode | null = null;

  constructor(key: number) {
    this._key = key;
  }

  get key() {
    return this._key;
  }

  set key(value: number) {
    this._key = value;
  }

  get left() {
    return this._left;
  }

  set left(value: BinaryNode | null) {
    this._left = value;
  }

  get right() {
    return this._right;
  }

  set right(value: BinaryNode | null) {
    this._right = value;
  }

  get parent() {
    return this._parent;
  }

  set parent(value: BinaryNode | null) {
    this._parent = value;
  }
}

import { BinaryNode } from "./BinaryNode";

type TraverseCallback = (node: BinaryNode) => void;

export class BinarySearchTree {
  protected rootNode: BinaryNode | null = null;

  insert(key: number) {
    if (this.rootNode === null) {
      this.rootNode = new BinaryNode(key);
      return;
    }
    this.rootNode = this.insertNode(this.rootNode, key);
  }

  insertNode(node: BinaryNode, key: number): BinaryNode {
    if (key === node.key) {
      throw new Error("Key already in tree");
    }
    if (key < node.key) {
      if (node.left === null) {
        node.left = new BinaryNode(key);
        return node;
      }
      return this.insertNode(node.left, key);
    }
    if (key > node.key) {
      if (node.right === null) {
        node.right = new BinaryNode(key);
        return node;
      }
      return this.insertNode(node.right, key);
    }
    return node;
  }

  search(key: number) {
    return this.searchNode(this.rootNode, key);
  }

  searchNode(node: BinaryNode | null, key: number): boolean {
    if (!node) {
      return false;
    }
    if (key < node.key) {
      return this.searchNode(node.left, key);
    }
    if (key > node.key) {
      return this.searchNode(node.right, key);
    }
    return true;
  }

  inOrderTraverse(fn: TraverseCallback) {
    if (!this.rootNode) return;
    this.inOrderTraverseNode(this.rootNode, fn);
  }

  inOrderTraverseNode(node: BinaryNode, fn: TraverseCallback) {
    if (node.left) this.inOrderTraverseNode(node.left, fn);
    fn(node);
    if (node.right) this.inOrderTraverseNode(node.right, fn);
  }

  preOrderTraverse(fn: TraverseCallback) {
    if (!this.rootNode) return;
    this.preOrderTraverseNode(this.rootNode, fn);
  }

  preOrderTraverseNode(node: BinaryNode, fn: TraverseCallback) {
    fn(node);
    if (node.left) this.preOrderTraverseNode(node.left, fn);
    if (node.right) this.preOrderTraverseNode(node.right, fn);
  }

  postOrderTraverse(fn: TraverseCallback) {
    if (!this.rootNode) return;
    this.postOrderTraverseNode(this.rootNode, fn);
  }

  postOrderTraverseNode(node: BinaryNode, fn: TraverseCallback) {
    if (node.left) this.postOrderTraverseNode(node.left, fn);
    if (node.right) this.postOrderTraverseNode(node.right, fn);
    fn(node);
  }

  min(): BinaryNode | null {
    if (!this.rootNode) return null;
    return this.minNode(this.rootNode);
  }

  minNode(node: BinaryNode): BinaryNode | null {
    let current: BinaryNode = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max() {
    if (!this.rootNode) return null;
    return this.maxNode(this.rootNode);
  }

  maxNode(node: BinaryNode) {
    let current = node;
    if (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }

  remove(key: number) {
    this.rootNode = this.removeNode(this.rootNode, key);
  }

  removeNode(node: BinaryNode | null, key: number): BinaryNode | null {
    if (!node) {
      return null;
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      }

      if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.minNode(node.right);
      if (!aux) {
        node = null;
        return node;
      }
      node.key = aux.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
}

import { BinaryNode } from "./BinaryNode";
import { BinarySearchTree } from "./BinarySearchTree";

type BalanceFactor =
  | "UNBALANCED_RIGHT"
  | "SLIGHTLY_UNBALANCED_RIGHT"
  | "SLIGHTLY_UNBALANCED_LEFT"
  | "UNBALANCED_LEFT"
  | "BALANCED";

export class AVLTree extends BinarySearchTree {
  insertNode(node: BinaryNode, key: number): BinaryNode {
    node = super.insertNode(node, key);
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === "UNBALANCED_LEFT") {
      if (!node.left) return node;
      if (key < node.left.key) {
        const result = this.rotationLL(node);
        if (result) {
          node = result;
        }
      } else {
        const result = this.rotationLR(node);
        if (result) {
          node = result;
        }
        return node;
      }
    }

    if (balanceFactor === "UNBALANCED_RIGHT") {
      if (!node.right) return node;
      if (key > node.right.key) {
        const result = this.rotationRR(node);
        if (result) {
          node = result;
        }
      } else {
        const result = this.rotationRL(node);
        if (result) {
          node = result;
        }
      }
    }

    return node;
  }

  removeNode(node: BinaryNode, key: number): BinaryNode | null {
    const result = super.removeNode(node, key);
    if (!result) return result;
    node = result;
    const balanceFactor = this.getBalanceFactor(node);

    if (balanceFactor === "UNBALANCED_LEFT" && node.left) {
      const balanceFactorLeft = this.getBalanceFactor(node.left);
      if (
        balanceFactorLeft === "BALANCED" ||
        balanceFactorLeft === "SLIGHTLY_UNBALANCED_LEFT"
      ) {
        return this.rotationLL(node);
      }
      if (balanceFactorLeft === "SLIGHTLY_UNBALANCED_RIGHT") {
        return this.rotationLR(node);
      }
    }

    if (balanceFactor === "UNBALANCED_RIGHT" && node.right) {
      const balanceFactorRight = this.getBalanceFactor(node.right);
      if (
        balanceFactorRight === "BALANCED" ||
        balanceFactorRight === "SLIGHTLY_UNBALANCED_RIGHT"
      ) {
        return this.rotationRR(node);
      }
      if (balanceFactorRight === "SLIGHTLY_UNBALANCED_LEFT") {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  getNodeHeight(node: BinaryNode | null): number {
    if (node === null) return -1;
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  getBalanceFactor(node: BinaryNode): BalanceFactor {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);

    switch (heightDifference) {
      case -2:
        return "UNBALANCED_RIGHT";
      case -1:
        return "SLIGHTLY_UNBALANCED_RIGHT";
      case 1:
        return "SLIGHTLY_UNBALANCED_LEFT";
      case 2:
        return "UNBALANCED_LEFT";
      default:
        return "BALANCED";
    }
  }

  rotationLL(node: BinaryNode) {
    const tmp = node.left;
    if (!tmp) return null;
    node.left = tmp.right;
    tmp.right = node;
    return tmp;
  }

  rotationRR(node: BinaryNode) {
    const tmp = node.right;
    if (!tmp) return null;
    node.right = tmp.left;
    tmp.left = node;
    return tmp;
  }

  rotationLR(node: BinaryNode) {
    const tmp = node.left;
    if (!tmp) return null;
    node.left = this.rotationRR(tmp);
    return this.rotationLL(node);
  }

  rotationRL(node: BinaryNode) {
    const tmp = node.right;
    if (!tmp) return null;
    node.right = this.rotationLL(tmp);
    return this.rotationRR(node);
  }
}

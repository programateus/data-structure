# Lista Ligada (LinkedList)

As _arrays_ (listas) provavelmente são as estruturas de dados mais comum usada para armazenar um conjunto de dados. Cada linguagem tem sua própria implementação de arrays, mas na maioria delas, arrays são estruturas com tamanhos fixos, e inserir ou remover itens dela pode ser um processo custoso, pois os elementos precisam sofrer deslocamento na memória.
As listas ligadas armazenam uma coleção de elementos de forma sequencial, no entanto, diferente das _arrays_, seus elementos não são posicionados de forma contínua na memória. Cada elemento é constituído de um nó que armazena o valor propriamente dito e uma referência para o próximo elemento da lista ligada.
Uma das vantagens da lista ligada sobre as _arrays_ convencionais, é que os elementos não precisam ser deslocados quando é feito inserção ou remoção de itens na _array_. Entretanto, pelo fato de cada nó guardar uma referência para o próximo elemento, caso seja necessário acessar um nó no meio da lista, é preciso começar a pesquisa a partir do começo da lista (**head**).
Um exemplo da vida real de uma lista ligada é um trem, onde cada vagão é conectado com o anterior, e é possível remover um vagão, adicionar um novo e apenas reconecta-los.

Classe LinkedList:

```typescript
class Node<T> {
  private value: T;
  private next: Node<T>;
}

type EqualsFN = <T>(a: T, b: T) => boolean;

class LinkedList<T> {
  private count = 0;
  private head: Node<T>;
  private equalsFn: EqualsFN<T> = (a, b) => a === b;
}
```

Precisaremos de uma propriedade **count** que será responsável por armazenar a quantidade de itens na lista, a propriedade **head** armazena o nó inicial da lista e a propriedade **equalsFn** será usada para fornecer uma função de comparação na hora de procurar elementos na lista ligada. Teremos também os seguintes métodos na classe **LinkedList**:

- **push(value)**: método responsável por adicionar um novo elemento no final da lista;
- **insert(value, index)**: método responsável por adicionar um novo elemento em uma posição específica da lista;
- **getValueAt(index)**: esse método devolve o elemento na posição especificada da lista;
- **remove(value)**: esse método remove um elemento da lista;
- **indexOf(value)**: esse método retorna o índice do elemento na lista. Se o elemento não existir, ele retorna -1;
- **removeAt(index)**: método responsável por remover um elemento na posição especificada da lista;
- **isEmpty()**: esse método retorna _true_ caso **count** seja 0, ou _false_ caso **count** seja maior que 0;
- **size()**: esse método retorna a quantidade de itens na lista.

Implementação final da classe **LinkedList**:

```typescript
export class Node<T> {
  protected value: T;
  protected next: Node<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }

  getNext(): Node<T> | null {
    return this.next;
  }

  setNext(next: Node<T> | null): void {
    this.next = next;
  }
}

export class LinkedList<T> {
  protected head: Node<T> | null = null;
  protected count = 0;
  protected equalsFn: (a: T, b: T) => boolean = (a, b) => a === b;

  getHead(): Node<T> | null {
    return this.head;
  }

  push(value: T): void {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current: Node<T> | null | undefined = this.head;
      while (current?.getNext()) {
        current = current?.getNext();
      }
      current?.setNext(node);
    }
    this.count++;
  }

  remove(value: T): void {
    const index = this.indexOf(value);
    this.removeAt(index);
  }

  insert(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    const node = new Node<T>(value);

    if (index === 0) {
      const current = this.head;
      this.head = node;
      node.setNext(current);
      this.count++;
      return;
    }

    const previous = this.getNodeAt(index - 1);
    const current = previous?.getNext() || null;
    node.setNext(current);
    previous?.setNext(node);
    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    if (this.count === 0) {
      return undefined;
    }
    if (index === 0) {
      this.head = this.head?.getNext() || null;
      this.count--;
      return this.head?.getValue();
    }

    const previous = this.getNodeAt(index - 1);
    const current = previous?.getNext() || null;
    const next = current?.getNext() || null;
    previous?.setNext(next);
    this.count--;
    return current?.getValue();
  }

  getValueAt(index: number): T | undefined {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }
    const node = this.getNodeAt(index);
    return node?.getValue();
  }

  indexOf(value: T): number {
    let current = this.head;
    for (let i = 0; i < this.count && current !== null; i++) {
      if (this.equalsFn(value, current.getValue())) {
        return i;
      }
      current = current.getNext();
    }
    return -1;
  }

  isEmpty(): boolean {
    return this.count === 0;
  }

  size(): number {
    return this.count;
  }

  getNodeAt(index: number): Node<T> | null {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current?.getNext() || null;
    }

    return current;
  }

  forEach(callback: (value: T, index: number) => void): void {
    let current = this.head;
    for (let i = 0; i < this.count && current; i++) {
      callback(current.getValue(), i);
      current = current.getNext();
    }
  }
}
```

Também existe uma variação do algoritmo lista ligada, chamado lista duplamente ligada, onde cada nó também mantém uma referência para o nó anterior.
Exemplo da implementação da classe **DoublyLinkedList**:

```typescript
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

import { DoublyNode } from "./DoublyNode";
import { LinkedList } from "./LinkedList";

export class DoublyLinkedList<T> extends LinkedList<T> {
  push(value: T): void {
    const node = new DoublyNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.head as DoublyNode<T> | null | undefined;
      while (current?.getNext()) {
        current = current?.getNext() as DoublyNode<T> | null | undefined;
      }
      current?.setNext(node);
      node.setPrevious(current || null);
    }
    this.count++;
  }

  insert(value: T, index: number): void {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    const node = new DoublyNode(value);

    if (index === 0) {
      const current: DoublyNode<T> | null = this.head as DoublyNode<T> | null;
      current?.setPrevious(node);
      node.setNext(current);
      this.head = node;
      this.count++;
      return;
    }

    const current = this.getNodeAt(index) as DoublyNode<T> | null;
    const previous = current?.getPrevious() || null;
    node.setNext(current);
    node.setPrevious(previous);
    previous?.setNext(node);
    current?.setPrevious(node);
    this.count++;
  }

  removeAt(index: number): T | undefined {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index at ${index}`);
    }

    if (this.count === 0) {
      return undefined;
    }

    if (index === 0) {
      const current = this.head;
      this.head = this.head?.getNext() || null;
      this.count--;
      return current?.getValue();
    }

    const current = this.getNodeAt(index) as DoublyNode<T> | null;
    const previous = current?.getPrevious();
    const next = current?.getNext() as DoublyNode<T> | null;
    previous?.setNext(next);
    next?.setPrevious(previous || null);
    this.count--;
    return current?.getValue();
  }
}
```

Exemplo de uso da classe **LinkedList** ou **DoublyLinkedList**:

```typescript
import { DoublyLinkedList } from "./DoublyLinkedList";

const personList = () => {
  const list = new DoublyLinkedList<string>();

  list.push("John");
  list.push("Jane");
  list.push("Jack");
  list.push("Jill");
  list.push("Joe");
  list.push("Judy");

  list.forEach((person) => console.log(person));

  list.removeAt(2);
  console.log("===============================");

  list.forEach((person) => console.log(person));
};

personList();
```

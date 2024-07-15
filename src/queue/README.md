# Fila (Queue)

Uma fila é uma coleção ordenada de itens que obedece o princípio **FIFO** (First In First Out, ou seja, o primeiro que entra é o primeiro que sai), também conhecida como **first-come** **first-served**. A adição de elementos na fila é feito na cauda (tail) e a remoção, na frente. O elemento mais recente da fila deve esperar no final dela.
Um exemplo na vida real de uma fila pode ser uma típica fila de cinema, ou de supermercado.
Na computação podemos usar o exemplo de impressão, onde arquivos que vão ser imprimidos em uma impressora vão para uma fila para serem imprimidos.

Classe Queue:

```typescript
class Queue<T> {
  private items: T[] = [];
}
```

Precisaremos de uma estrutura de dados para armazenar a fila, nesse caso será usado um **Array**. Listaremos agora os seguintes métodos usados para remoção de elementos:

- **enqueue(element)**: esse método adiciona um novo elemento no final da fila;
- **dequeue()**: esse método remove o primeiro elemento da fila (o item que está na frente). Também devolve o elemento removido;
- **peek()**: devolve o primeiro elemento da fila (o primeiro que foi adicionado e o primeiro que será removido da fila). A fila não é modificada com esse método;
- **isEmpty()**: retorna _true_ se o tamanho da fila for igual a 0, ou _false_ caso a fila tenha itens;
- **size()**: retorna a quantidade de elementos existentes na fila;
- **clear()**: remove todos os itens da fila.

Implementação final:

```typescript
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
```

Exemplo de uso da classe Queue com o problema da Batata Quente:

```typescript
import { Queue } from "./Queue";

function hotPotato(people: string[], num: number) {
  const queue = new Queue<string>();
  const eliminated: string[] = [];

  for (const person of people) {
    queue.enqueue(person);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()!);
    }

    eliminated.push(queue.dequeue()!);
  }

  return { eliminated, winner: queue.dequeue() };
}

const { eliminated, winner } = hotPotato(
  ["Bill", "David", "Susan", "Jane", "Kent", "Brad"],
  7
);

eliminated.forEach((name) =>
  console.log(`${name} was eliminated from the Hot Potato game.`)
);
console.log(`The winner is: ${winner}.`);
```

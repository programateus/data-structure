# Deque

A estrutura **Deque** (double-ended queue ou fila de duas pontas) é uma fila especial que permite remover e adicionar itens das suas duas pontas.
Podemos usar como exemplo, uma fila de lanchonete, onde a pessoa que está sendo atendida sairá da fila após seu atendimento, e uma pessoa que está no final da fila pode simplesmente sair da fila por pressa.
Na ciência da computação, a aplicação mais comum de um deque é na armazenagem de lista de operações para desfazer ações (undo). Sempre que um usuário executa uma ação no software ela é adicionada ao deque. Após um determinado número de ações, as ações mais antigas são removidas do final do deque. Um deque basicamente implementa uma pilha e uma fila ao mesmo tempo.

Classe Queue:

```typescript
class Deque<T> {
  private items: T[] = [];
}
```

Como o deque é uma fila especial, precisaremos de métodos diferentes para seu funcionamento, mas manteremos os outros métodos **isEmpty**, **clear**, e **size**.
Teremos os métodos a seguir:

- **addFront(element)**: esse método adiciona um elemento na frente do deque;
- **addBack(element)**: esse método adiciona um elemento no final do deque;
- **removeFront()**: esse método remove o primeiro elemento do deque;
- **reomveBack()**: esse método remove o elemento no final do deque;
- **peekFront()**: esse método devolve o primeiro elemento do deque;
- peekBack(): esse método devolve o elemento no final do deque.

Implementação final:

```typescript
class Deque<T> {
  private items: T[] = [];

  addFront(element: T): void {
    this.items.unshift(element);
  }

  addBack(element: T): void {
    this.items.push(element);
  }

  removeFront(): T | undefined {
    return this.items.shift();
  }

  removeBack(): T | undefined {
    return this.items.pop();
  }

  peekFront(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[0];
  }

  peekBack(): T | undefined {
    if (this.items.length === 0) return undefined;
    return this.items[this.items.length - 1];
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

Exemplo de aplicação na Batata Quente:

```typescript
import { Deque } from "./Deque";

function palindromeChecker(word: string): boolean {
  if (word.length <= 1) return true;

  const deque = new Deque<string>();
  const lowerString = word.toLocaleLowerCase().split("").join("");
  let isEqual = true;
  let firstChar = "";
  let lastChar = "";

  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString[i]);
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront()!;
    lastChar = deque.removeBack()!;
    if (firstChar !== lastChar) isEqual = false;
  }

  return isEqual;
}

console.log(palindromeChecker("racecar"));
console.log(palindromeChecker("arara"));
```

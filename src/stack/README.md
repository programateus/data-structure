# Pilha (Stack)

Uma pilha é uma coleção ordenada de itens que obedece ao princípio **LIFO** (Last In First Out, ou seja, o primeiro a entrar é o ultimo a sair). A adição de novos itens ou a remoção de itens existentes ocorrem sempre na mesma extremidade. O final da pilha é conhecido como topo e o começo da pilha é conhecido como base.

Um exemplo da vida real de pilha pode ser pilhas de livros, ou de bandejas de uma lanchonete. Também é usada em navegadores para salvar o histórico, quando você clica em voltar, ele remove o item do topo.

Classe Stack baseada em array:

```typescript
class Stack<T> {
  private items: T[] = [];
}
```

Precisaremos de uma estrutura de dados para armazenar os itens da pilha, e poderemos usar uma array para isso. Como a pilha deve obedecer ao princípio LIFO, limitaremos as funcionalidades que estarão disponíveis a inserção e remoção de elementos.

Usaremos os seguintes métodos para finalizar a implementação da classe pilha:

- **push(element(s))**: método para adicionar um novo elemento ou vários elementos no topo da pilha;
- **pop()**: método para remover o elemento no topo da pilha;
- **peek()**: método que retorna o elemento no topo da pilha;
- **isEmpty()**: método que retorna _true_ caso a pilha não contenha nenhum item e false se o tamanho da pilha for maior que 0;
- **clear()**: remove todos os elementos da pilha;
- **size()**: método que retorna a quantidade total de elementos existentes na pilha.

Implementação final:

```typescript
class Stack<T> {
  private items: T[] = [];

  push(...elements: T[]): void {
    this.items.concat(elements);
  }

  pop(): void {
    this.items.pop();
  }

  peek(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }
}
```

Exemplo de aplicação no problema do decimal para binário:

```typescript
import { Stack } from "./Stack";

function decimalToBinary(value: number): string {
  const stack = new Stack<number>();
  let num = value;
  let rem = 0;
  let binary = "";

  while (num > 0) {
    rem = Math.floor(num % 2);
    stack.push(rem);
    num = Math.floor(num / 2);
  }

  while (!stack.isEmpty()) {
    binary += stack.pop()!.toString();
  }
  return binary;
}

console.log(decimalToBinary(22));
```

Conversor de decimal para base:

```typescript
import { Stack } from "./Stack";

function baseConverter(value: number, base: number): string {
  const stack = new Stack<number>();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let num = value;
  let digit = 0;
  let baseString = "";

  if (base < 2 || base > 36) {
    return "";
  }

  while (num > 0) {
    digit = Math.floor(num % base);
    stack.push(digit);
    num = Math.floor(num / base);
  }

  while (!stack.isEmpty()) {
    baseString += digits[stack.pop()!];
  }
  return baseString;
}

console.log(baseConverter(12, 2)); // Binary
console.log(baseConverter(12, 8)); // Octal
console.log(baseConverter(12, 16)); // Hexadecimal
```

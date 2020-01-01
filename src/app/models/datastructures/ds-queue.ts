export class Queue<T> {
    public _store: T[] = [];
    
    push(val: T) {
      this._store.push(val);
    }
    pop(): T | undefined {
      return this._store.shift();
    }
  }
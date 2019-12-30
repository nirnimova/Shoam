import { ObservableInput } from 'rxjs';

export class SizableChartQueue {
    _sizeLimit: number;
    _size: number = 0;
    public _store: number[][];

    constructor(
        size: number,
        fill?: number
    ) {
        this._sizeLimit = size;
        this._store = [];

        if (fill != null || fill != undefined) {
            this._size = size;
            for (let i = 0; i < this._size; i++) {
                this._store.push([i, fill]);
            }
        }
    }

    push(val: number) {
        if (this._size === this._sizeLimit) {
            this.pop();
        }

        this._store.push([this._size++, val]);
    }

    pop(): number[] | undefined {
        if (this._size > 0) {
            this._size--;
        }

        for(let i = 0; i < this._store.length; i++){
            let tmp = this._store[i];

            tmp[0] = i;
        }

        return this._store.shift();
    }
}
import { fNum, randomListItem, tenth } from "cobys-epic-engine/cobys-utils";

declare global {
    interface Number {
        fmt(round_to?: number, round_to_before_shorten?: number): string;
        isNum(): boolean;
        toPerc(): number;
    }
    interface String {
        toTitle(): string;
        isNum(): boolean;
    }
    interface Array<T> {
        randomItem(): T;
        remove<T>(item: T): T;
    }
    interface Window {
        scale: number
        max_width: boolean
        log: typeof console.log
    }
    interface Object {
        mapEntries<T, V = any>(this: T, callback: ((key: string, value: V)=> object)): T;
        eachEntries<T, V = any>(this: T, callback: ((key: string, value: V)=> void)): void;
    }
    interface Set<T> {
        popRandom(): T;
    }

    interface MouseEvent {
        target: HTMLElement
    }

    const log: typeof console.log;

    function parseInt(string: string | number, radix?: number): number
}

window.log = console.log;

Number.prototype.fmt = function(round_to?: number, round_to_before_shorten?: number) {
    return fNum(
        this.valueOf(),
        round_to,
    );
}

Number.prototype.isNum = function() {
    return !isNaN(this.valueOf());
}

Number.prototype.toPerc = function() {
    return tenth(this.valueOf() * 100);
}


String.prototype.toTitle = function() {
    return this.valueOf().split(" ").map(str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(" ");
}

String.prototype.isNum = function() {
    return !isNaN(parseFloat(this.valueOf()));
}


Array.prototype.randomItem = function<T>(): T {
    return randomListItem(this) as T;
}

Array.prototype.remove = function<T>(item: T): T {
    const index = this.findIndex((i)=> i == item);
    if (index < 0) return null;
    return this.splice(index, 1)[0];
}


Set.prototype.popRandom = function<T>(): T {
    const rand = [...this].randomItem();
    this.delete(rand);
    return rand;
}


Object.prototype.mapEntries = function<T, V = any>(this: T, callback: ((key: string, value: V)=> [string, V])): T {
    return Object.fromEntries(
        Object.entries(this)
        .map(
            ([k, v])=> callback(k, v)
        )
    ) as T;
}

Object.prototype.eachEntries = function<T, V = any>(this: T, callback: ((key: string, value: V)=> void)): void {
    Object.entries(this)
    .forEach(
        ([k, v])=> callback(k, v)
    )
}

export default {}
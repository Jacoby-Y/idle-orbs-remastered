import { fNum, randomListItem, tenth } from "cobys-epic-engine/cobys-utils";

declare global {
    interface Number {
        fmt(round_to?: number): string;
        isNum(): boolean;
        toPerc(): number;
    }
    interface String {
        toTitle(): string;
        isNum(): boolean;
    }
    interface Array<T> {
        randomItem<T>(): T
    }
    interface Window {
        scale: number
        max_width: boolean
        log: typeof console.log
        _: <T>(inp: T)=> T;
    }

    const log: typeof console.log;
    const _: <T>(inp: T)=> T;
}

window.log = console.log;
window._ = function<T>(inp: T) { return inp; };


Number.prototype.fmt = function(round_to?: number) {
    return fNum(
        this.valueOf(),
        round_to
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

export default {}
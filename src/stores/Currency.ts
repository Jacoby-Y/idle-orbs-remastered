import { derived, get, writable } from "svelte/store";
import { DEV } from "./General";
import { floorRound } from "cobys-epic-engine/cobys-utils";
import { addTrackerStat } from "../scripts/Tracker/Tracker";
import signal from "cobys-epic-engine/signal";


//#region | Cash ($)
export const max_cash = 1e15;
let deci = 0;
export const cash = writable(0); // 1e14
cash.subscribe((v)=>{
	// if (get(got_cash) == false && v > 0) got_cash.set(true);

	if (v < 0) {
		deci = 0;
		return cash.set(0);
	}
 
	if (v == 0) {
		return 0;
	}

	if (v > max_cash) {
		deci = 0;
		cash.set(max_cash);

		// if (!game_stats.has_maxed_cash) {
		// 	game_stats.has_maxed_cash = true;
		// 	signal.emit("update-game-stats");
		// }
		return;
	}

	if (Math.floor(v) == v) return;
	deci += v - Math.floor(v);
	if (deci >= 1) {
		v += Math.floor(deci);
		deci -= Math.floor(deci);
		cash.set(Math.floor(v));
	} else {
		cash.set(Math.floor(v));
	}
});

export const cash_str = derived(cash, (value)=>{
	if (value < 1000) return (value + floorRound(deci, 2)).fmt(1);
	return value.fmt() + (value >= max_cash ? " (Max)" : "");
});


export function addCash(value: number) {
	if (isNaN(value)) throw `Can't add to cash, value is NaN!`;

    cash.update(v => v + value);

	addTrackerStat("total_cash_made", value);

    // add to game stats
}

export function spendCash(value: number) {
	cash.update(v => v - value);

	// addGameStat("total_cash_spent", value);
}

export function getCash() {
	return get(cash);
}
//#endregion

//#region | Mana (₪)
export const mana = writable(0);

export const mana_str = derived(mana, (value)=>{
	if (value < 1000) return value + floorRound(deci, 2);
	return value.fmt();
});


export function addMana(value: number) {
	if (isNaN(value)) throw `Can't add to mana, value is NaN!`;

    mana.update(v => v + value);

	addTrackerStat("total_mana_made", value);
}

export function spendMana(value: number) {
	mana.update(v => v - value);
}

export function getMana() {
	return get(mana);
}
//#endregion


export type CurrencyType = ("Cash" | "Mana");

export type Currency = {
	add: (value: number)=> void
	spend: (value: number)=> void
	get: ()=> number
	symbol: string
}

export const Currencies: { [key in CurrencyType]: Currency } = {
	Cash: {
		add: addCash,
		spend: spendCash,
		get: getCash,
		symbol: "$",
	},
	Mana: {
		add: addMana,
		spend: spendMana,
		get: getMana,
		symbol: "₪",
	},
}


/// For debug purposes
window.onkeydown = ({ key })=>{
	if (!DEV) return;
	if (key == "0") {
		deci = 0;
		cash.set(0);
	}
	else if (!isNaN(parseInt(key))) addCash(10 ** (parseInt(key) + 3));
	if (key == "m") addMana(100);
	if (key == "M") addMana(1000);

}

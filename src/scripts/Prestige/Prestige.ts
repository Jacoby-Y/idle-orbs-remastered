import { derived, get } from "svelte/store";
import { tracker } from "../Tracker/Tracker";
import { addMana, cash, getCash } from "../../stores/Currency";
import { shop_upgrade_levels } from "../Upgrades/ShopUpgrades";
import { orb_upgrade_levels } from "../Upgrades/OrbUpgrades";
import { resetOrbs } from "../Orbs/Orbs";
import { $stats } from "../GlobalStats/GlobalStats";


export const prestige_cost = derived(tracker, ({ prestige_count: c })=> 1_000_000 * (1.2 ** c));


export function calcManaGain(cash = getCash()) {
    return Math.round((cash / 5000) ** (0.7 - (0.05 * get(tracker).prestige_count)));
}

export function doPrestige() {
    if (getCash() < get(prestige_cost)) return;

    shop_upgrade_levels.update(v => (v.eachEntries((key)=> v[key] = 0), v));
    orb_upgrade_levels.update(v => (v.eachEntries((key)=>{ v[key].value = 0; v[key].weight = 0 }), v));

    resetOrbs();

    addMana(calcManaGain());
    cash.set(-1);
    cash.set($stats.starting_cash);
}

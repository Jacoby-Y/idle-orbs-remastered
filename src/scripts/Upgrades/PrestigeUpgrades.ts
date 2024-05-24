import { writable } from "svelte/store";
import { $stats } from "../GlobalStats/GlobalStats";

export let $prestige_upgrade_levels = {
    orb_value: 0,
    starting_cash: 0,
}

export const prestige_upgrade_levels = writable($prestige_upgrade_levels);
prestige_upgrade_levels.subscribe(v => $prestige_upgrade_levels = v);

export const prestige_upgrade_ids = ["orb_value", "starting_cash"];

export const prestige_upgrades: Record<string, PrestigeUpgrade> = {
    orb_value: {
        init_stat_change: 0,
        stat_change: 0.2,
        name: "Orb Value: +20%",
        get hint() { return `[${Math.round($stats?.orb_value * 100 - 100).fmt(1)}%]` },
        desc: "Increases Orb value",
        init_cost: 10,
        mult: 1.2,
        cost: 0,
    },
    starting_cash: {
        init_stat_change: 0,
        stat_change: 100,
        name: "Starting Cash: +100",
        get hint() { return `[$${$stats?.starting_cash.fmt(1)}]` },
        desc: "Increases cash you start with after prestiging",
        init_cost: 5,
        mult: 1,
        cost: 0,
    },
    // secret_orb: {
    //     init_stat_change: 0,
    //     stat_change: 0.2,
    //     name: "Unlock a Secret Orb",
    //     get hint() { return `[]` },
    //     desc: "Something",
    //     init_cost: 10,
    //     mult: 1.2,
    //     cost: 0,
    // },
}


// Add cash getters
Object.entries(prestige_upgrades).forEach(([id, upgr]) => {
    Object.defineProperty(upgr, "cost", {
        get() {
            return Math.round(this.init_cost * (this.mult ** $prestige_upgrade_levels[id]));
        }
    })
});

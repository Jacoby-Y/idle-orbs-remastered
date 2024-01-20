import { writable } from "svelte/store";

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
        name: "Orb Value: +0.2",
        get hint() { return `[]` },
        desc: "Something",
        init_cost: 10,
        mult: 1.2,
        cost: 0,
    },
    starting_cash: {
        init_stat_change: 0,
        stat_change: 0.2,
        name: "Starting Cash: +100",
        get hint() { return `[]` },
        desc: "Something",
        init_cost: 10,
        mult: 1.2,
        cost: 0,
    },
    secret_orb: {
        init_stat_change: 0,
        stat_change: 0.2,
        name: "Unlock a Secret Orb",
        get hint() { return `[]` },
        desc: "Something",
        init_cost: 10,
        mult: 1.2,
        cost: 0,
    },
}
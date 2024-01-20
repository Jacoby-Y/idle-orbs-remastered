import { writable } from "svelte/store";
import type { GlobalStats } from "../GlobalStats/GlobalStats";


let $stats: GlobalStats = null;

export let $shop_upgrade_levels: { [key in ShopUpgradeID]: number } = {
    orb_value: 0,
    idle_speed: 0,
    burst_chance: 0,
    burst_amount: 0,
    // starting_cash: 0,
    new_orb: 0
}

export const shop_upgrade_levels = writable($shop_upgrade_levels);
shop_upgrade_levels.subscribe(v => $shop_upgrade_levels = v);


export const shop_upgrade_ids = ["orb_value", "idle_speed", "burst_chance", "burst_amount", "new_orb"];

export const shop_upgrades: { [key in ShopUpgradeID]: ShopUpgrade } = {
    orb_value: {
        desc: "Increases the value multiplier of all Orbs",
        init_stat_change: 1,
        stat_change: 0.2,
        get name() { return `Orb Value: +0.2` },
        get hint() { return `[${$stats?.orb_value.fmt(1)}]` },
        init_cost: 250,
        mult: 1.2,
        cost: 1
    },
    idle_speed: {
        desc: "Idley spawn Orbs at half value",
        init_stat_change: 0,
        stat_change: 0.5,
        get name() { return `Idle Spawning: +0.5/sec` },
        get hint() { return `[${$stats?.idle_speed.fmt(1)}/sec]` },
        init_cost: 500,
        mult: 1.2,
        cost: 1
    },
    burst_chance: {
        desc: "Increase chance to spawn a burst of Orbs",
        init_stat_change: 0,
        stat_change: 0.01,
        get name() { return `Burst Chance: +1%` },
        get hint() { return `[${$stats?.burst_chance.toPerc().fmt(1)}%]` },
        init_cost: 500,
        mult: 2,
        cost: 1
    },
    burst_amount: {
        desc: "Increase burst amount",
        init_stat_change: 2,
        stat_change: 1,
        get name() { return `Burst Amount: +1` },
        get hint() { return `[${$stats?.burst_amount.fmt(0)}]` },
        init_cost: 1000,
        mult: 10,
        cost: 1
    },
    /// Should definitely be a prestige upgrade
    // starting_cash: {
    //     desc: "Increase cash you start with after each prestige",
    //     init_stat_change: 0,
    //     stat_change: 100,
    //     get name() { return `Starting Cash: +100` },
    //     get hint() { return `[${$stats?.starting_cash.fmt(0)}]` },
    //     init_cost: 1000,
    //     mult: 1.5,
    //     cost: 1
    // },
    new_orb: {
        desc: "Unlock a new Orb for you to upgrade and spawn",
        get name() { return `Unlock New Orb` },
        get hint() { return `[${$shop_upgrade_levels.new_orb}]` },
        init_cost: 5000,
        mult: 10,
        cost: 1
    }
}


// Add cash getters
Object.entries(shop_upgrades).forEach(([id, upgr]) => {
    Object.defineProperty(upgr, "cost", {
        get() {
            return this.init_cost * (this.mult ** $shop_upgrade_levels[id]);
        }
    })
});


// For fixing import issues with GlobalStats.ts
import("../GlobalStats/GlobalStats").then(({ stats })=>{
    stats.subscribe(v => $stats = v);
    shop_upgrade_levels.update(_);
});
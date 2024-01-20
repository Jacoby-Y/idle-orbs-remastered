import { derived, get } from "svelte/store";
import { shop_upgrades, shop_upgrade_levels } from "../Upgrades/ShopUpgrades";


export type GlobalStats = {
    orb_value: number
    idle_speed: number
    burst_chance: number
    burst_amount: number
    starting_cash: number
}


export const stats = derived([/*orb_upgrade_levels, */shop_upgrade_levels], ([/*orb_lvl, */shop_lvl])=>({
    orb_value: shop_upgrades.orb_value.init_stat_change + shop_upgrades.orb_value.stat_change * shop_lvl.orb_value,
    idle_speed: shop_upgrades.idle_speed.init_stat_change + shop_upgrades.idle_speed.stat_change * shop_lvl.idle_speed,
    burst_chance: shop_upgrades.burst_chance.init_stat_change + shop_upgrades.burst_chance.stat_change * shop_lvl.burst_chance,
    burst_amount: shop_upgrades.burst_amount.init_stat_change + shop_upgrades.burst_amount.stat_change * shop_lvl.burst_amount,
    // starting_cash: shop_upgrades.starting_cash.init_stat_change + shop_upgrades.starting_cash.stat_change * shop_lvl.starting_cash,
}) as GlobalStats);

export let $stats = get(stats);
stats.subscribe(v => $stats = v);
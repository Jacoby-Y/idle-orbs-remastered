import { derived, get } from "svelte/store";
import { shop_upgrades, shop_upgrade_levels } from "../Upgrades/ShopUpgrades";
import { prestige_upgrade_levels, prestige_upgrades, type prestige_upgrade_ids } from "../Upgrades/PrestigeUpgrades";


export type GlobalStats = {
    orb_value: number
    idle_speed: number
    burst_chance: number
    burst_amount: number
    starting_cash: number
}


export const stats = derived([/*orb_upgrade_levels, */shop_upgrade_levels, prestige_upgrade_levels], ([/*orb_lvl,*/ shop_lvl, prest_lvl])=>({
    orb_value: shopVal("orb_value") + prestVal("orb_value"),
    idle_speed: shopVal("idle_speed"),
    burst_chance: shopVal("burst_chance"),
    burst_amount: shopVal("burst_amount"),
    starting_cash: prestVal("starting_cash"),
}) as GlobalStats);

export let $stats = get(stats);
stats.subscribe(v => $stats = v);


function shopVal(id: ShopUpgradeID) {
    return shop_upgrades[id].init_stat_change + shop_upgrades[id].stat_change * get(shop_upgrade_levels)[id];
}

function prestVal(id: string) {
    return prestige_upgrades[id].init_stat_change + prestige_upgrades[id].stat_change * get(prestige_upgrade_levels)[id];
}

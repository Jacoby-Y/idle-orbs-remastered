import { derived, writable } from "svelte/store";
import { OrbType } from "../Orbs/const"
import { randomWeight } from "cobys-epic-engine/cobys-utils";
import { shop_upgrade_levels } from "./ShopUpgrades";


export type OrbSubUpgrade = BaseUpgrade<{
    /** Starting value of the stat */
    init_stat: number
    /** Change in the stat per level */
    stat_change_per_level: number
    /** Use a getter to calculate stat value */
    readonly stat_change: number
    /** Level of stat_change where it gets an upgrade (probably only to be used for weight) */
    stat_upgrade?: number
    levelUp(): void
}>;

type OrbUpgrades = {
    [key in OrbType]: {
        weight: OrbSubUpgrade,
        value: OrbSubUpgrade,
    }
}


export let $orb_upgrade_levels: OrbUpgradeLevels = {
    [OrbType.Basic]: {
        weight: 0,
        value: 0
    },
    [OrbType.Light]: {
        weight: 0,
        value: 0
    },
    [OrbType.Spawner]: {
        weight: 0,
        value: 0
    },
    [OrbType.Sniper]: {
        weight: 0,
        value: 0
    }
}

export const orb_upgrade_levels = writable($orb_upgrade_levels);
orb_upgrade_levels.subscribe(v => $orb_upgrade_levels = v);

export const orb_upgrade_types: OrbType[] = [OrbType.Basic, OrbType.Light, OrbType.Spawner, OrbType.Sniper];

export const unlocked_orbs = derived(shop_upgrade_levels, ({ new_orb })=> new Set([
    OrbType.Basic,
    new_orb >= 1 ? OrbType.Light : null,
    new_orb >= 2 ? OrbType.Spawner : null,
    new_orb >= 3 ? OrbType.Sniper : null,
].filter(type => type != null)));

export const orb_upgrades: OrbUpgrades = {
    //@ts-ignore// I don't know how to tell TS that this is fine
    [OrbType.Basic]: {
        ...createOrbUpgrade(OrbType.Basic, "value", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 1,
            stat_change_per_level: 1,
        }),
        ...createOrbUpgrade(OrbType.Basic, "weight", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 0.5,
            stat_change_per_level: 0.1,
            /// Can't figure this out. Doesn't really matter anyway. I'll get to it later?
            // stat_upgrade: 0.5,
        }),
    },
    //@ts-ignore// I don't know how to tell TS that this is fine
    [OrbType.Light]: {
        ...createOrbUpgrade(OrbType.Light, "value", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 1,
            stat_change_per_level: 1,
        }),
        ...createOrbUpgrade(OrbType.Light, "weight", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 0,
            stat_change_per_level: 0.1,
        }),
    },
    //@ts-ignore// I don't know how to tell TS that this is fine
    [OrbType.Spawner]: {
        ...createOrbUpgrade(OrbType.Spawner, "value", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 1,
            stat_change_per_level: 1,
        }),
        ...createOrbUpgrade(OrbType.Spawner, "weight", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 0,
            stat_change_per_level: 0.1,
        }),
    },
    //@ts-ignore// I don't know how to tell TS that this is fine
    [OrbType.Sniper]: {
        ...createOrbUpgrade(OrbType.Sniper, "value", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 1,
            stat_change_per_level: 1,
        }),
        ...createOrbUpgrade(OrbType.Sniper, "weight", {
            init_cost: 100,
            mult: 1.2,
            init_stat: 0,
            stat_change_per_level: 0.1,
        }),
    }
}

export const orb_upgrade_array = orb_upgrade_types.map(type => orb_upgrades[type]);

/////////////////////////// FUNCTIONS \\\\\\\\\\\\\\\\\\\\\\\\\\\

export function getOrbWeightPerc(type: OrbType) {
    const [min, chance] = weightChance(orb_upgrades[type].weight);

    const weight_total = getTotalWeight();
    const mean = chance / weight_total;
    const mean2 = isFinite(mean) ? mean : 0;

    return [min, mean2];
}

export function getRandomWeightedOrbs() {
    const random_type = (
        getTotalWeight() > 0 ?
        randomWeight(
            orb_upgrade_array.map((upgr, i) => [orb_upgrade_types[i], weightChance(upgr.weight)[1]])
        ) :
        null
    );

    return orb_upgrade_array.map((upgr, i) => {
        const [min, _chance] = weightChance(upgr.weight);
        const orb_type = orb_upgrade_types[i];

        return [orb_type, min + (random_type == orb_type ? 1 : 0)] as [OrbType, number];
    }).filter(([type, spawns])=> spawns > 0);
}

/** function (`2.5`) => `[2, 0.5]` */
export function weightChance(upgr: OrbSubUpgrade): [number, number] {
    const weight = upgr.stat_change;
    return [Math.floor(weight), weight % (upgr.stat_upgrade ?? 1)];
}


type OrbSubUpgradePart = {
    init_cost: number
    mult: number
    init_stat: number
    stat_change_per_level: number
    stat_upgrade?: number
}

function createOrbUpgrade(orb_type: OrbType, upgr_type: ("weight" | "value"), upgr_part: OrbSubUpgradePart): { [key: string]: OrbSubUpgrade } {
    return {
        [upgr_type]: {
            ...upgr_part,
            get cost() { return this.init_cost * (this.mult ** $orb_upgrade_levels[orb_type][upgr_type]) },
            get stat_change() { return this.init_stat + this.stat_change_per_level * $orb_upgrade_levels[orb_type][upgr_type] },
            levelUp() {
                orb_upgrade_levels.update(v => (
                    v[orb_type][upgr_type]++,
                    v
                ));
            }
        }
    }
}

function getTotalWeight() {
    return orb_upgrade_array.reduce((p, c)=> p + weightChance(c.weight)[1], 0);
}
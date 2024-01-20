
type BaseUpgrade<T = any> = {
    name?: string
    hint?: string
    init_cost: number
    mult: number
    cost: number
} & T

type ShopUpgradeID = ("orb_value" | "idle_speed" | "burst_chance" | "burst_amount" | "new_orb");

type ShopUpgrade = BaseUpgrade<{
    desc: string
    init_stat_change?: number
    stat_change?: number
}>;

type OrbUpgradeLevels = {
    [key in OrbType]?: {
        weight: number
        value: number
    }
}

type PrestigeUpgrade = BaseUpgrade<{
    desc: string
    init_stat_change?: number
    stat_change?: number
}>;
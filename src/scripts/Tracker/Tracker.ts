import { writable } from "svelte/store";

export let $tracker = {
    total_cash_made: 0,
    total_mana_made: 0,

    prestige_count: 0,

    manual_orbs_spawned: 0,
    idle_orbs_spawned: 0,

    secret: 0,
}

export const tracker = writable<typeof $tracker>($tracker);
tracker.subscribe(v => $tracker = v);


export function addTrackerStat(key: keyof (typeof $tracker), value: number) {
    tracker.update(t => (
        t[key] += value,
        t
    ));
}
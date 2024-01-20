import { writable } from "svelte/store";

const $tracker = {
    total_cash_made: 0,
    total_mana_made: 0,
}

export const tracker = writable<typeof $tracker>($tracker);


export function addTrackerStat(key: keyof (typeof $tracker), value: number) {
    tracker.update(t => (
        t[key] += value,
        t
    ));
}
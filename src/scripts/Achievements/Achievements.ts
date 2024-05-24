import type { get } from "svelte/store";
import { $tracker } from "../Tracker/Tracker";


export default [
    {
        tracker_id: "total_cash_made",
        title: "Cash made",
        goal: 1_000_000_000,
    },
    {
        tracker_id: "total_mana_made",
        title: "Mana made",
        goal: 10_000,
    },
    {
        tracker_id: "manual_orbs_spawned",
        title: "Manually spawned Orbs",
        goal: 1_000,
    },
    {
        tracker_id: "idle_orbs_spawned",
        title: "Idly spawned Orbs",
        goal: 10_000,
    },
] as {
    tracker_id: keyof typeof $tracker
    title: string
    goal: number
}[];


import { time } from "cobys-epic-engine/runner";
import { stats } from "../GlobalStats/GlobalStats";
import { spawnOrb, spawnWeightedOrbs } from "../Orbs/Orbs";

let idle_speed = 0;

stats.subscribe(v => idle_speed = v.idle_speed);


let spawn_time = 0;
const getCooldown = ()=> 1000 / idle_speed;

export function idleUpdate() {
    if (idle_speed <= 0) return;

    spawn_time -= time.delta;

    if (spawn_time <= 0) {
        spawn_time = getCooldown();
        spawnWeightedOrbs(true);
    }
}
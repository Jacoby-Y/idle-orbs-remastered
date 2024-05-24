import { beginAndFill, canvas, canvas_size, fillCircle, fillRect, strokeCircle } from "cobys-epic-engine/draw";
import { OrbType, spawn_angle, type Orb, orb_radius, orb_const } from "./const";
import { chances, randomListItem } from "cobys-epic-engine/cobys-utils";
import { $mouse } from "../../stores/General";
import { time } from "cobys-epic-engine/runner";
import signal from "cobys-epic-engine/signal";
import { collideOrb } from "../Collider/Collider";
import { spawner_position } from "../Spawner/const";
import { collectorAttractOrb, tryCollectOrb } from "../Collectors/Collectors";
import { getRandomWeightedOrbs } from "../Upgrades/OrbUpgrades";
import { $stats } from "../GlobalStats/GlobalStats";
import { addCash } from "../../stores/Currency";
import { $settings, RenderMode } from "../Settings/Settings";
import { tracker } from "../Tracker/Tracker";


let orbs: Orb[] = [];


export function orbUpdate() {
    // canvasMouseOffset();
    for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        collideOrb(orb);
        collectorAttractOrb(orb);
        drawOrb(orb);
        moveOrb(orb);

        const [mult, side] = tryCollectOrb(orb);

        if (mult == 0) continue;

        collectOrb(orb, mult, side);

        orbs.splice(i, 1);
        i--;
    }
}

let click_time = 0;
const click_debounce = 100;
export function spawnWeightedOrbs(mini = false) {
    if (performance.now() - click_time < click_debounce) return;
    click_time = performance.now();

    const random_spawn_orbs = getRandomWeightedOrbs();
    const burst_amount = chances($stats.burst_chance) * $stats.burst_amount;

    for (let i = 0; i < random_spawn_orbs.length; i++) {
        const [orb_type, amount] = random_spawn_orbs[i];
        
        for (let j = 0; j < amount + burst_amount; j++) {
            spawnOrb(orb_type, mini);
        }
    }
}

export function spawnOrb(type: OrbType, mini = false): Orb {
    if (mini) tracker.update(v => (v.idle_orbs_spawned++, v));
    else tracker.update(v => (v.manual_orbs_spawned++, v));

    const ang = spawn_angle + (Math.random() * 0.8 - 0.4);
    const speed = ((orb_const[type].speed_mult ?? 1) * (1 + Math.random() * 0.1)) * 0.5;

    const new_orb: Orb = {
        ...spawner_position,
        vx: Math.cos(ang) * speed,
        vy: Math.sin(ang) * speed,
        mini,
        type,
    }

    orbs.push(new_orb);

    orb_const[new_orb.type].onSpawn?.(new_orb);



    return new_orb;
}

function drawOrb(orb: Orb) {
    const r = orb_radius / (orb.mini ? 2 : 1);
    const r2 = r * 2;
    const { x, y } = orb;
    const color = orb_const[orb.type].color;

    switch ($settings.render_mode) {
        case RenderMode.Circle:
            fillCircle(
                x, y,
                r,
                color
            );
            break;
        case RenderMode.Wireframe:
            strokeCircle(
                x, y,
                r,
                color, 
                2
            );
            break;
        case RenderMode.Square:
            fillRect(
                x-r, y-r,
                r2, r2,
                color
            );
            break;
        case RenderMode.Pixelated:
            fillRect(
                Math.floor((x-r) / r2)*r2, Math.floor((y-r) / r2)*r2,
                r2, r2,
                color
            );
            break;
        case RenderMode.Sand:
            fillRect(
                x-2, y-2,
                4, 4,
                color
            )
            break;
    }
}

function moveOrb(orb: Orb) {
    orb.x += orb.vx * (time.delta / 1);
    orb.y += orb.vy * (time.delta / 1);

    // orb.vx -= 0.001;
    // orb.vy += 0.001;

    let radius = orb_radius / (orb.mini ? 2 : 1);

    if (orb.x < radius) {
        orb.x = radius;
        orb.vx *= -1;
    }
    else if (orb.x > canvas_size.w - radius) {
        orb.x = canvas_size.w - radius;
        orb.vx *= -1;
    }

    if (orb.y < radius) {
        orb.y = radius;
        orb.vy *= -1;
    }
    else if (orb.y > canvas_size.h - radius) {
        orb.y = canvas_size.h - radius;
        orb.vy *= -1;
    }
}

function collectOrb(orb: Orb, mult: number, side: number) {
    orb_const[orb.type].onCollect?.(orb, side);

    const value = getOrbValue(orb.type) * mult / (orb.mini ? 2 : 1);
    addCash(value);
}

function getOrbValue(type: OrbType) {
    return orb_const[type].base_value * $stats.orb_value
}


export function resetOrbs() {
    orbs = [];
}


let prev_click = performance.now();
signal.listen("ClickCanvas", ()=>{
    if (performance.now() - prev_click < 100) return;
    prev_click = performance.now();

    spawnWeightedOrbs();

    /// Other orb ideas?
    // spawnOrb(OrbType.Gold);
    // spawnOrb(OrbType.Mana);
    // spawnOrb(OrbType.Turret);
    // spawnOrb(OrbType.Overcharge);
    // spawnOrb(OrbType.Light);
});

// setInterval(clickSpawnOrb, 500);
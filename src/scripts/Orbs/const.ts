import { canvas } from "cobys-epic-engine/draw"
import { $mouse } from "../../stores/General"
import { spawnOrb } from "./Orbs";
import { originDistance } from "cobys-epic-engine/cobys-utils";
import { time } from "cobys-epic-engine/runner";

export enum OrbType {
    Basic = "Basic",
    Light = "Light",
    Spawner = "Spawner",
    Sniper = "Sniper",
    Gold = "Gold",
    Mana = "Mana",
    Turret = "Turret",
    Overcharge = "Overcharge",
    Spark = "Spark",
    Chaos = "Chaos",
}

export type Orb<T = any> = {
    x: number
    y: number
    vx: number
    vy: number
    mini: boolean
    type: OrbType
} & T;

type OrbConst = {
    [key in OrbType]: {
        name: string
        desc: string
        color: string

        speed_mult?: number
        base_value: number

        onSpawn?(orb: Orb): void
        onCollect?(orb: Orb, side: number): void
    }
}


export const orb_const: OrbConst = {
    [OrbType.Basic]: {
        name: "Basic",
        desc: "Just your basic orb... I guess",
        color: "#E0E0E0",
        base_value: 1,
    },
    [OrbType.Light]: {
        name: "Light",
        desc: "A fast moving, low mass alternative to the Basic Orb",
        color: "#4DD0E1",
        speed_mult: 1.3,
        base_value: 1,
    },
    [OrbType.Spawner]: {
        name: "Spawner",
        desc: "A special Orb that spawns smaller versions of itself when it gets collected",
        color: "#FFB74D",
        base_value: 0.8,

        onCollect(orb: Orb, side: number) {
            if (orb.mini) return;

            const speed = originDistance(orb.vx, orb.vy);

            for (let i = 0; i < 3; i++) {
                const ang = (Math.PI/2 * side - (Math.PI/2)) + (Math.random() * 0.6 - 0.3);

                const mini = spawnOrb(OrbType.Spawner, true);
                mini.x = orb.x;
                mini.y = orb.y;
                mini.vx = Math.cos(ang) * speed;
                mini.vy = Math.sin(ang) * speed;

                mini.mini = true;

                mini.x += mini.vx * time.delta;
                mini.y += mini.vy * time.delta;
            }
        }
    },
    [OrbType.Sniper]: {
        name: "Sniper",
        desc: "A tactical Orb that shoots at the mouse when spawned",
        color: "#AED581",
        speed_mult: 2,

        onSpawn(orb: Orb) {
            const to_mouse = 
                Math.atan2($mouse.y - orb.y, $mouse.x - canvas.getBoundingClientRect().x / window.scale - orb.x)
                + (Math.random() * 0.1 - 0.05);
            orb.vx = Math.cos(to_mouse);
            orb.vy = Math.sin(to_mouse);
        },
        base_value: 0.5,
    },
    [OrbType.Gold]: {
        name: "Gold",
        desc: "Very high value orb",
        color: "#FFEA00",
        base_value: 3,
    },
    [OrbType.Mana]: {
        name: "Mana",
        desc: "Has a chance to give you mana upon getting collected",
        color: "#1DE9B6",
        base_value: 1,
    },
    [OrbType.Turret]: {
        name: "Turret",
        desc: "Situates itself after being spawned and start shooting down other Orbs",
        color: "#B0BEC5",
        base_value: 1,
    },
    [OrbType.Overcharge]: {
        name: "Overcharge",
        desc: "Upon collecting, shocks nearby Orbs, transforming them into sparks",
        color: "#536DFE",
        base_value: 1,
    },
    [OrbType.Spark]: {
        name: "Spark",
        desc: "Just a lil guy",
        color: "#8C9EFF",
        base_value: 0.5,
    },
    [OrbType.Chaos]: {
        name: "Chaos",
        desc: "Spits out wisps of Chaos Fire",
        color: "#F44336",
        base_value: 1,
    },
}

export const spawn_angle = 0.7;

export const orb_radius = 10;
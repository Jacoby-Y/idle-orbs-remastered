import { canvas_size, fillRect, fillText, strokeLine, strokeRect } from "cobys-epic-engine/draw";
import type { Orb } from "../Orbs/const";
import { pointInRect } from "cobys-epic-engine/cobys-utils";

const collectors = [
    {
        x: 0, y: 1080 - 200,
        w: 300, h: 200,
        color: "#AFB42B",
        mult: 1
    },
    {
        x: 1920*0.666 - 300, y: 0,
        w: 300, h: 200,
        color: "#689F38",
        mult: 2
    },
    {
        x: 1920*0.666 - 300, y: 1080 - 200,
        w: 300, h: 200,
        color: "#388E3C",
        mult: 3
    },
]


export function collectorsUpdate() {
    drawCollectors();
}

/** If return == 0: no collection. If return > 0: Use that as orb value multiplier for collecting orb */
export function tryCollectOrb(orb: Orb): [number, number] {
    for (let i = 0; i < collectors.length; i++) {
        const { x, y, w, h, mult } = collectors[i];
        
        if (pointInRect(orb.x, orb.y, x, y, w, h)) {
            const top = Math.abs(orb.y - y);
            const bottom = Math.abs(orb.y - (y + h));
            const left = Math.abs(orb.x - x);
            const right = Math.abs(orb.x - (x + w));

            const closest = Math.min(top, bottom, left, right);
            
            return [mult, [top, right, bottom, left].indexOf(closest)];
        }
    }

    return [0, -1];
}

export function collectorAttractOrb(orb: Orb) {
    const attract_speed = 0.005;

    if (orb.x < canvas_size.center.x && orb.y > canvas_size.center.y) {
        orb.vx -= attract_speed;
        orb.vy += attract_speed;

        // strokeLine(orb.x, orb.y, orb.x - 20, orb.y + 20, "red", 2);
    }
    
    if (orb.x > canvas_size.center.x && orb.y < canvas_size.center.y) {
        orb.vx += attract_speed;
        orb.vy -= attract_speed;

        // strokeLine(orb.x, orb.y, orb.x + 20, orb.y - 20, "red", 2);
    }
    
    if (orb.x > canvas_size.center.x && orb.y > canvas_size.center.y) {
        orb.vx += attract_speed;
        orb.vy += attract_speed;

        // strokeLine(orb.x, orb.y, orb.x + 20, orb.y + 20, "red", 2);
    }

    // for (let i = 0; i < collectors.length; i++) {
    //     const { x, y, w, h } = collectors[i];


        
    //     if (orb.x > x && orb.x < x + w) {
    //         orb.vy += Math.abs(y - orb.y) / canvas_size.h * 0.01 * (orb.y < y ? 1 : -1);

    //         // strokeLine(orb.x, orb.y, orb.x, orb.y + 50 * (orb.y < y ? 1 : -1), "lime", 2);
    //     }

    //     if (orb.y > y && orb.y < y + h) {
    //         orb.vx += Math.abs(x - orb.x) / canvas_size.w * 0.01 * (orb.x < x ? 1 : -1);

    //         // strokeLine(orb.x, orb.y, orb.x + 50 * (orb.x < x ? 1 : -1), orb.y, "red", 2);
    //     }
    // }
}

function drawCollectors() {
    for (let i = 0; i < collectors.length; i++) {
        const { x, y, w, h, color, mult } = collectors[i];
        
        fillRect(x, y, w, h, color);
        strokeRect(x - 10, y - 10, w + 20, h + 20, color, 2);
        fillText(`x${mult}`, x + w/2, y + h/2 + 15, "#FFFFFF", 50);
    }
}
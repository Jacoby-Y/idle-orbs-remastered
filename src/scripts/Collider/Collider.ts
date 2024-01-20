import { fillCircle, strokeCircle } from "cobys-epic-engine/draw";
import { collider_color, collider_pos, collider_radius, collider_ring_color } from "./const";
import { orb_radius, type Orb } from "../Orbs/const";
import { originDistance, pointDistance2, pointInRect } from "cobys-epic-engine/cobys-utils";
import { time } from "cobys-epic-engine/runner";

export function colliderUpdate() {
    fillCircle(collider_pos.x, collider_pos.y, collider_radius, collider_color);
    strokeCircle(collider_pos.x, collider_pos.y, collider_radius, collider_ring_color, 6);
}

export function checkOrbCollision(orb: Orb) {
    const in_rect = pointInRect(
        orb.x, orb.y,
        collider_pos.x - collider_radius - orb_radius,
        collider_pos.y - collider_radius - orb_radius,
        collider_radius * 2 + orb_radius * 2,
        collider_radius * 2 + orb_radius * 2,
    );

    if (!in_rect) return false;

    return pointDistance2(orb, collider_pos) < collider_radius + orb_radius;
}

export function collideOrb(orb: Orb) {
    if (!checkOrbCollision(orb)) return;

    const off_angle = (Math.atan2(orb.y - collider_pos.y, orb.x - collider_pos.x) + Math.PI * 2) % (Math.PI * 2);
    const vect = (Math.atan2(orb.vy, orb.vx) + Math.PI * 3) % (Math.PI * 2);

    // Difference between the opposite of the vector angle and the bounce off angle
    // const diff = Math.max(off_angle, vect) - Math.min(off_angle, vect);
    // const use_bounce = Math.min(0, 1 - diff / 2);

    const speed = originDistance(orb.vx, orb.vy);

    orb.vx = Math.cos(off_angle) * speed;
    orb.vy = Math.sin(off_angle) * speed;
    
    orb.x += orb.vx * time.delta;
    orb.y += orb.vy * time.delta;
}

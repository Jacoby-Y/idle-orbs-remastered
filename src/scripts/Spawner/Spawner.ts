import { fillCircle } from "cobys-epic-engine/draw";
import { spawner_color, spawner_position, spawner_radius } from "./const";

export function spawnerUpdate() {
    fillCircle(
        spawner_position.x, spawner_position.y,
        spawner_radius,
        spawner_color
    );
}

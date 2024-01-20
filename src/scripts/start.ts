import { startGame as _startGame, runner } from "cobys-epic-engine/runner";
import { clearCanvas } from "cobys-epic-engine/draw";
import { orbUpdate } from "./Orbs/Orbs";
import { colliderUpdate } from "./Collider/Collider";
import { spawnerUpdate } from "./Spawner/Spawner";
import { collectorsUpdate } from "./Collectors/Collectors";
import { idleUpdate } from "./Idle/Idle";

export function startGame() {
    runner.add(()=>{
        clearCanvas();
        orbUpdate();
        colliderUpdate();
        spawnerUpdate();
        collectorsUpdate();
        idleUpdate();
    });

    _startGame();
}
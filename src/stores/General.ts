import { get, writable } from "svelte/store";
import jobs from "cobys-epic-engine/jobs";
import { time } from "cobys-epic-engine/runner";


export let $mouse = {
    x: 0,
    y: 0,
}

export const mouse = writable($mouse);
mouse.subscribe(v => {
    $mouse.x = v?.x || 0;
    $mouse.y = v?.y || 0;
});

export const FPS = writable(60);

export const DEV = import.meta.env.MODE == "development";


jobs.add(1000, ()=>{
    
    FPS.set(time.fps);

    return 1000;
});
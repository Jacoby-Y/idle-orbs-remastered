import { writable } from "svelte/store";


export enum RenderMode {
    Circle = "Circle",
    Wireframe = "Wireframe",
    Square = "Square",
    Pixelated = "Pixelated",
    Sand = "Sand",
    None = "None",
}


export let $settings = {
    render_mode: RenderMode.Circle,
    scale: 1,
}

export const settings = writable($settings);
settings.subscribe(v => $settings = v);

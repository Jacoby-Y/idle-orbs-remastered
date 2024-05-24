<script lang="ts">
    import { onMount } from "svelte";
    import { startGame } from "../scripts/start";
    import { setCanvas, setScale } from "cobys-epic-engine/draw";
    import signal from "cobys-epic-engine/signal";
    
    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    
    onMount(()=>{
        ctx = canvas.getContext("2d"); 
        
        canvas.width = 1920 * (1/3 * 2);
        canvas.height = 1080;

        setCanvas(canvas);

        startGame();
    });
    
    function clickCanvas() {
        signal.emit("ClickCanvas");
    }

    signal.listen("SetScale", (scale: number)=>{
        canvas.style.scale = `${1 / scale}`.slice(0, 5);
    });
    
</script>

<main>
    <canvas bind:this={canvas} on:mousedown={clickCanvas} />
</main>

<style lang="scss">
    main {
        position: absolute;
        right: 0;
        top: 0;
        border-left: 2px solid #37474F;

        width: calc(1920px * (1/3 * 2));
        height: 1080;

        transition-duration: 0.3s;
        transform: translate(50%, 0);
        cursor: pointer;
        
        &:hover {
            transform: translate(0, 0);
        }
    }

    canvas {
        image-rendering: pixelated;
        transform-origin: top left;
    }
</style>

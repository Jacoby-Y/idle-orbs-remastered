<script lang="ts">
    import { onMount } from "svelte";
    import Game from "./components/Game.svelte";
    import Menus from "./components/Menus.svelte";
    import { mouse } from "./stores/General";

    let main;

    onMount(()=>{
        window.onresize(null);
    });
    window.onresize = ()=>{
        let scale = 1;
        const w = document.body.clientWidth;
        const h = document.body.clientHeight;
        
        if (w*(1080/1920) >= h) {
            scale = h/1080;
            window.max_width = false;
        } else {
            scale = w/1920;
            window.max_width = true;
        }

        window.scale = scale;
        
        main.style.transform = `translate(-50%, -50%) scale(${(scale)}, ${(scale)})`;
    }

    function mouseMove(e: MouseEvent) {
        const [w, h] = [document.body.clientWidth, document.body.clientHeight];
        const scale = window.scale;
        if (window.max_width) {
            mouse.update(v => (
                v.x = e.clientX / scale, // - (!window.max_width ? document.body.clientWidth - 1920 * scale : 0) / 2,
                v.y = e.clientY / scale - (h - (main.clientHeight*scale)) / 2 / scale,// - (window.max_width ? document.body.clientHeight - 1080 * scale : 0),
                // v.y = e.clientY / scale - (h - (main.clientHeight*scale)) / 2 / scale,// - (window.max_width ? document.body.clientHeight - 1080 * scale : 0),
                v
            ));
        } else {
            mouse.update(v => (
                v.x = e.clientX / scale, // - (!window.max_width ? document.body.clientWidth - 1920 * scale : 0) / 2,
                // v.x = e.clientX / scale - (w - (main.clientWidth*scale)) / 2 / scale, // - (!window.max_width ? document.body.clientWidth - 1920 * scale : 0) / 2,
                v.y = e.clientY / scale, // - (window.max_width ? document.body.clientHeight - 1080 * scale : 0),
                v
            ));
        }
    }
</script>

<main bind:this={main} on:mousemove={mouseMove}>
    <Menus />
    <Game />
</main>

<style>
    main {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 1920px;
        height: 1080px;
        overflow: hidden;
        background-color: #263238;
    }
</style>
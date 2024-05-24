<script lang="ts">
    import { setScale } from "cobys-epic-engine/draw";
    import { RenderMode, settings } from "../../scripts/Settings/Settings";


    const render_modes = [
        RenderMode.Circle,
        RenderMode.Wireframe,
        RenderMode.Square,
        RenderMode.Pixelated,
        RenderMode.Sand,
        RenderMode.None,
    ];

    $: setScale($settings.scale);
    
</script>

<main>
    <div class="settings-item">
        <h2 class="item-name">Render Mode</h2>
        <div class="btn-group">
            {#each render_modes as mode}
                <button
                    on:click={()=> $settings.render_mode = mode}
                    class:selected={$settings.render_mode == mode}
                    >
                    {mode}
                </button>
            {/each}
        </div>
    </div>
    <div class="settings-item">
        <h2 class="item-name">Resolution: {Math.round($settings.scale * 1080)}p</h2>
        <!-- <h2 class="item-name">Scale: {$settings.scale.toPerc()}%</h2> -->
        <input type="range" min="0.1" max="1" step="0.1" bind:value={$settings.scale}>
    </div>
</main>

<style lang="scss">
    main {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 4rem;
    }

    .settings-item {
        .item-name {
            text-align: center;
            margin-bottom: 1rem;
        }

        input {
            width: 100%;
        }
    }

    .btn-group {
        display: flex;
        justify-content: center;
        gap: -1px;
        
        button {
            padding: 0.5rem;
            flex-grow: 1;
            scale: 1.01 1;
            font-size: 1.3rem;
            font-weight: normal;

            &.selected {
                background-color: #56727f;
            }

            &:hover {
                scale: 1.05 1.1;
                z-index: 10;
            }
        }
    }
</style>

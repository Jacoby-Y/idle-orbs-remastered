<script lang="ts">
    import Achievements from "../../scripts/Achievements/Achievements";
    import { tracker } from "../../scripts/Tracker/Tracker";

    
</script>

<main>
    {#each Achievements as { tracker_id, goal, title }}
    {@const track = $tracker[tracker_id]}
    {@const perc = Math.min(1, track / goal).toPerc()}
    {@const done = track >= goal}
        <div class="ach">
            <h3>
                {title}
                {#if done}
                    <i style="padding-left: 1rem;">
                        (Done!) 
                    </i>
                {/if}
                <b style="float: right;">
                    {track.fmt(2, 2)} 
                    {#if !done}
                        / {goal.fmt(2, 2)}
                    {/if}
                </b>
            </h3>
            <div class="bar-wrapper">
                <div class="bar" style="width: {perc}%;"></div>
            </div>
        </div>
    {/each}
</main>

<style lang="scss">
    main {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .ach {
        padding: 1rem;
        background-color: #455a64;
        position: relative;

        .bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border: 5px solid #3cab29;
            border-right: none;
            border-left: none;
        }
    }
</style>

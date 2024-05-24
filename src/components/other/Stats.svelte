<script lang="ts">
    import { stats } from "../../scripts/GlobalStats/GlobalStats";
    import { FPS } from "../../stores/General";

    
</script>

<main>
    <h3>FPS: {$FPS}</h3>
    <h3>Orb Value: x{$stats.orb_value.fmt(1)}</h3>
</main>

<style lang="scss">
    main {
        padding: 2rem;
        font-size: 1.5rem;
        line-height: 2.5rem;

        h3 {
            font-weight: normal;
        }
    }
</style>

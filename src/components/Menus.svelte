<script lang="ts">
    import Other from "./Other.svelte";
    import Upgrades from "./Upgrades.svelte";
</script>

<main>
    <Upgrades />
    <Other />
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 33.333% 33.333% 33.333%;
        grid-template-rows: 100%;

        height: 100%;
    }
</style>

<script lang="ts">
    import Stats from "./other/Stats.svelte";
    import Nav from "./Nav.svelte";

    let tabs = ["Stats", "Settings", "Achievements"];
    let chosen_tab = tabs[0];

    const tab_comps = {
        Stats: Stats,
    }

</script>

<main>
    <Nav {tabs} show_currencies={false} bind:chosen_tab />
    <svelte:component this={tab_comps[chosen_tab]} />
</main>

<style lang="scss">
    main {
        border-right: 2px solid #37474F;
        padding-top: 4rem;
        position: relative;

        &::after {
            content: "Other Stuff";
            position: absolute;
            left: 50%;
            top: 2rem;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: #90A4AE;
        }
    }
</style>

<script lang="ts">
    import Shop from "./upgrades/Shop.svelte";
    import Nav from "./Nav.svelte";
    import Orbs from "./upgrades/Orbs.svelte";

    let tabs = ["Orbs", "Shop", "Prestige", "Secret"];
    let chosen_tab = tabs[0];

    const tab_comps = {
        Orbs: Orbs,
        Shop: Shop,
        Prestige: null,
        Secret: null,
    }

</script>

<main>
    <Nav {tabs} bind:chosen_tab />
    <svelte:component this={tab_comps[chosen_tab]} />
</main>

<style lang="scss">
    main {
        border-right: 2px solid #37474F;
    }
</style>
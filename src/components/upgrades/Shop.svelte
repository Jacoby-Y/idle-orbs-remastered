<script lang="ts">
    import { shop_upgrade_ids, shop_upgrade_levels, shop_upgrades } from "../../scripts/Upgrades/ShopUpgrades";
    import { cash, getCash, spendCash } from "../../stores/Currency";

    function clickUpgrade(upgr: ShopUpgrade, id: string) {
        if (getCash() < upgr.cost) return;
        if ($shop_upgrade_levels[id] >= upgr.max_level) return;

        spendCash(upgr.cost);
        shop_upgrade_levels.update(v => (
            v[id]++,
            v
        ));
    }
</script>

<main>
    {#key $shop_upgrade_levels}
        {#each shop_upgrade_ids as id, i}
        {@const upgr = shop_upgrades[id]}
        {@const maxed = $shop_upgrade_levels[id] >= upgr.max_level}
        {@const no_afford = $cash < upgr.cost}
            <div class="button-wrapper">
                <button on:click={()=> clickUpgrade(upgr, id)} class:maxed>
                    {upgr.name}
                    {#if !maxed}
                        <h3 class="cost" class:no-afford={no_afford}>${upgr.cost.fmt(1)}</h3>
                    {/if}
                    <h3 class="hint">{maxed ? "Maxed" : upgr.hint}</h3>
                </button>
                <h3 class="desc">{upgr.desc}</h3>
            </div>

            {#if [1, 3].includes(i)}
                <hr>
            {/if}
        {/each}
    {/key}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        // gap: 4rem;
        padding: 4rem 2rem;
        padding-top: 5.5rem;
    }

    .button-wrapper {
        position: relative;
        margin-bottom: 4rem;

        button {
            width: 100%;
            padding: 1.5rem;

            &.maxed {
                filter: brightness(80%);
            }
        }

        button:hover + .desc {
            opacity: 1;
            transform: translate(1rem, 0);
        }

        .desc {
            position: absolute;
            left: 100%;
            top: 0;
            transform: translate(2rem, 0);
            width: 15rem;
            background-color: #37474F;
            padding: 1rem 1.2rem;
            opacity: 0;
            transition-duration: 0.3s;
            pointer-events: none;
            z-index: 10;
        }
    }

    hr {
        margin-top: -1.5rem;
        margin-bottom: 4rem;
        border: 1px solid #455a64;
    }
</style>

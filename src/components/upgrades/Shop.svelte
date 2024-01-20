<script lang="ts">
    import { shop_upgrade_ids, shop_upgrade_levels, shop_upgrades } from "../../scripts/Upgrades/ShopUpgrades";
    import { getCash, spendCash } from "../../stores/Currency";

    function clickUpgrade(upgr: ShopUpgrade, id: string) {
        if (getCash() < upgr.cost) return;

        spendCash(upgr.cost);
        shop_upgrade_levels.update(v => (
            v[id]++,
            v
        ));
    }
</script>

<main>
    {#key $shop_upgrade_levels}
        {#each shop_upgrade_ids as name}
        {@const upgr = shop_upgrades[name]}
            <div class="button-wrapper">
                <button on:click={()=> clickUpgrade(upgr, name)}>
                    {upgr.name}
                    <h3 class="cost">${upgr.cost.fmt(1)}</h3>
                    <h3 class="hint">{upgr.hint}</h3>
                </button>
                <h3 class="desc">{upgr.desc}</h3>
            </div>
        {/each}
    {/key}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        padding: 4rem 2rem;
        padding-top: 5.5rem;
    }

    .button-wrapper {
        position: relative;

        button {
            width: 100%;
            padding: 1.5rem;
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
</style>

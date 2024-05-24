<script lang="ts">
    import { calcManaGain, doPrestige, prestige_cost } from "../../scripts/Prestige/Prestige";
    import { prestige_upgrade_ids, prestige_upgrade_levels, prestige_upgrades } from "../../scripts/Upgrades/PrestigeUpgrades";
    import { cash, getMana, mana, spendMana } from "../../stores/Currency";

    function clickUpgrade(upgr: ShopUpgrade, id: string) {
        if (getMana() < upgr.cost) return;
        if ($prestige_upgrade_levels[id] >= upgr.max_level) return;

        spendMana(upgr.cost);
        prestige_upgrade_levels.update(v => (
            v[id]++,
            v
        ));
    }
</script>

<main>
    <div class="button-wrapper">
        <button on:click={doPrestige}>
            Prestige

            <h3 class="cost" class:no-afford={$cash < $prestige_cost}>${$prestige_cost.fmt()}</h3>
            <h3 class="hint">+₪{calcManaGain($cash).fmt()}</h3>
        </button>
        <h3 class="desc">Reset game in exchange for Mana</h3>
    </div>

    {#key $prestige_upgrade_levels}
        {#each prestige_upgrade_ids as id, i}
        {@const upgr = prestige_upgrades[id]}
        {@const maxed = false}
        <!-- {@const maxed = $prestige_upgrade_levels[id] >= upgr.max_level} -->
        {@const no_afford = $mana < upgr.cost}
            <div class="button-wrapper">
                <button on:click={()=> clickUpgrade(upgr, id)} class:maxed>
                    {upgr.name}
                    {#if !maxed}
                        <h3 class="cost mana" class:no-afford={no_afford}>₪{upgr.cost.fmt(1)}</h3>
                    {/if}
                    <h3 class="hint">{maxed ? "Maxed" : upgr.hint}</h3>
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
</style>

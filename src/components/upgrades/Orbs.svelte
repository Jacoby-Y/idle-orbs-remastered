<script lang="ts">
    import { orb_upgrade_types, unlocked_orbs, orb_upgrades, getOrbWeightPerc, type OrbSubUpgrade, orb_upgrade_levels } from "../../scripts/Upgrades/OrbUpgrades";
    import { orb_const } from "../../scripts/Orbs/const";
    import { getCash, spendCash } from "../../stores/Currency";

    
    function buyUpgrade(sub: OrbSubUpgrade) {
        if (getCash() < sub.cost) return;

        spendCash(sub.cost);
        sub.levelUp();
    }

</script>

<main>
    {#key $orb_upgrade_levels}
        {#each orb_upgrade_types as upgr_type}
            {#if $unlocked_orbs.has(upgr_type)}
            {@const upgr = orb_upgrades[upgr_type]}
            {@const [min_weight, chance_weight] = getOrbWeightPerc(upgr_type)}
                <div class="upgrade-wrapper">
                    <h3 class="name">
                        {upgr_type}
                    </h3>
                    <h3 class="stats">
                        {#if min_weight > 0} {min_weight.fmt(1)} + {/if}
                        {Math.round(chance_weight.toPerc())}%
                        <br>
                        ${upgr.value.stat_change.fmt(1)}
                    </h3>
                    <button on:click={()=> buyUpgrade(upgr.weight)}>
                        Weight +1
                        <h3 class="cost">${upgr.weight.cost.fmt(1)}</h3>
                        <h3 class="hint">[{(upgr.weight.stat_change * 10).fmt(1)}]</h3>
                    </button>
                    <button on:click={()=> buyUpgrade(upgr.value)}>
                        Value +1
                        <h3 class="cost">${upgr.value.cost.fmt(1)}</h3>
                    </button>
        
                    <h3 class="hint-icon">
                        ?
                    </h3>
        
                    <h3 class="desc">
                        {orb_const[upgr_type].desc}
                    </h3>
                </div>
            {:else}
                <div class="upgrade-wrapper locked">
                    <h3>???</h3>
                </div>
            {/if}
        {/each}
    {/key}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        gap: 4rem;
        // padding: 2rem;
        padding-top: 3.5rem;
    }

    .upgrade-wrapper {
        display: grid;
        grid-template-columns: 8rem 1fr repeat(2, max-content);
        position: relative;
        padding: 2rem;
        // gap: 10px;
        
        .name, .stats {
            font-size: 1.3rem;
            padding: 1rem 1.2rem;
            border: 2px solid #455A64;
            text-align: center;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .name {
            border-right-style: dashed;
        }

        .stats {
            border-left: none
        }

        button {
            background-color: #455A64;
            padding: 1rem 2rem;

            &:first-of-type {
                margin: 0 10px;
            }
        }

        .hint-icon:hover + .desc {
            transform: translate(-1rem, -50%);
            opacity: 1;
        }

        .desc {
            position: absolute;
            left: 100%;
            top: 50%;
            background-color: #37474F;
            width: 15rem;
            padding: 1rem 1.2rem;
            transform: translate(0, -50%);
            opacity: 0;
            pointer-events: none;
            transition-duration: 0.3s;
        }

        .hint-icon {
            position: absolute;
            top: 2rem;
            left: 2rem;
            transform: translate(-50%, -50%);
            background-color: #37474F;
            border: 2px solid #455A64;
            width: 1.8rem;
            height: 1.8rem;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            cursor: pointer;
        }
    }

    .upgrade-wrapper.locked {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #455A64;
        margin: 0 2rem;
        font-size: 1.5rem;
        padding: 0;
        height: 5.2rem;
    }
</style>

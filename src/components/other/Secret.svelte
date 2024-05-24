<script lang="ts">
    import { tracker } from "../../scripts/Tracker/Tracker";
    import { cash, mana, spendCash, spendMana } from "../../stores/Currency";


    const numbers = new Set([1,2,3,4,5,6]);
    const secret_1 = numbers.popRandom();
    const secret_2 = numbers.popRandom();

    const cash_cost = 100_000_000;
    const mana_cost = 10_000;


    function unlockSecret() {
        if ($cash < cash_cost) return;
        if ($mana < mana_cost) return;

        spendCash(cash_cost);
        spendMana(mana_cost);

        tracker.update(v => (v.secret++, v));
    }
    
</script>

<main>
    {#if $tracker.secret}
        <img src="./secret-{secret_1}.gif" alt="Secret {secret_1}">
        <h1>Hampters (:</h1>
        <img src="./secret-{secret_2}.gif" alt="Secret {secret_2}">

        <a href="https://tenor.com/search/hampter-gifs" target="_blank" class="ref">Gifs from Tenor</a>
    {:else}
        <button on:click={unlockSecret}>
            Unlock Super Top Secret Stuff
            <h3 class="cost" class:no-afford={$cash < cash_cost}>
                ${cash_cost.fmt()}
            </h3>
            <h3 class="cost mana" class:no-afford={$mana < mana_cost}>
                ₪{mana_cost.fmt()}
            </h3>
        </button>
    {/if}
</main>

<style lang="scss">
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        gap: 2rem;
        position: relative;
    }

    img {
        width: 30rem;
        height: 20rem;
        object-fit: contain;
    }

    .ref {
        position: absolute;
        top: 2rem;
        left: 2.2rem;
        color: aqua;
        font-size: 1.5rem;
    }

    button {
        .cost:not(.mana) {
            bottom: calc(100% + 1.8rem);
        }
    }
</style>

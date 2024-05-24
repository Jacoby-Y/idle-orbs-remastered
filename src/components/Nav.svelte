<script lang="ts">
    import { cash_str, mana_str } from "../stores/Currency";
    
    export let tabs: string[];
    export let chosen_tab: string;
    export let show_currencies = true;

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<main>
    {#if show_currencies}
        <div class="currencies">
            <h3 class="cash">${$cash_str}</h3>
            <h3 class="mana">₪{$mana_str}</h3>
        </div>
    {/if}
    
    <nav>
        {#each tabs as tab}
            <h3 on:click={()=>{ chosen_tab = tab }} class:selected={chosen_tab == tab}>{tab}</h3>
        {/each}
    </nav>
</main>

<style lang="scss">
    .currencies {
        display: flex;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        font-size: 1.5rem;
    }

    nav {
        display: flex;
        justify-content: center;
        gap: 1rem;
        padding: 0 2rem;
        border-bottom: 2px solid #455A64;

        h3 {
            position: relative;
            top: 2px;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            text-align: center;
            min-width: max-content;
            width: 100%;
            max-width: 10rem;
            padding: 0.5rem 1.5rem;
            cursor: pointer;
            border: 2px solid #455A64;
            transition-duration: 0.1s;
            font-size: 1.4rem;

            &:not(.selected) {
                background-color: #455A64;
            }

            &.selected {
                border-bottom-color: #263238;
            }

            &:hover {
                scale: 1 1.05;
                transform: translate(0, -1px);
            }

            &:active {
                scale: 1.05 1;
                transform: translate(0, 0px);
            }
        }
    }
</style>

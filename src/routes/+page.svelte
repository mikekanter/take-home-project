<script lang="ts">
  import { getSessionContext, initSessionContext } from '$lib/contexts/session'
  import { initWatchlists } from '$lib/contexts/watchlists'
  import { initActiveWatchlist } from '$lib/contexts/active-watchlist'
  import LoginForm from './components/login-form.svelte'
  import MainView from './components/main-view.svelte'
  initSessionContext()
  initWatchlists()
  initActiveWatchlist()
  let sessionToken = getSessionContext()
</script>

{#if !$sessionToken}
<div class="contents-flex">
  <LoginForm />
</div>
{:else}
<MainView />
{/if}

<style>
  :global(:root) {
    --lcd-turquoise-normal: #33B3A6;
    --lcd-turquoise-darkest: #26867D;
    --lcd-red: #d35211;
    --font-size: 18px;
  }

  :global(p, span, button, div) {
    font-size: var(--font-size);
  }


  :global(input) {
    background: transparent;
    color: var(--lcd-turquoise-normal);
    border: transparent;
    border-bottom: 1px solid var(--lcd-turquoise-normal);
  }

  :global(input:focus) {
    filter: brightness(130%);
    outline: none;
  }

  :global(input::placeholder) {
    color: var(--lcd-turquoise-darkest);
  }

  :global(button) {
    background: transparent;
    color: var(--lcd-turquoise-normal);
    font-weight: 700;
    /* text-transform: uppercase; */
    border: 3px solid var(--lcd-turquoise-normal);
    border-radius: 50px;
    padding-top: 4px;
    padding-bottom: 4px;
    text-align: center;
    vertical-align: center;
    cursor: pointer;
    align-content: center;
    display: inline-block;
    text-transform: uppercase;
  }

  :global(button:disabled) {
    filter: brightness(50%);
    cursor: not-allowed;
  }

  :global(button:not(:disabled):hover) {
    filter: brightness(115%);
  }
  :global(button:not(:disabled):active:hover) {
    filter: brightness(85%);
  }

  :global(*) {
    /* font-size: var(--font-size); */
    color: var(--lcd-turquoise-normal);
  }

  :global(*)::selection {
    color: #030303;
    background: var(--lcd-turquoise-normal);
  }

  .contents-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    background: #030303;
  }
</style>

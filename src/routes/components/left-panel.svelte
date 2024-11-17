<script lang="ts">
  import { onMount } from 'svelte'
  import { getWatchlists } from '$lib/requests/watchlists'
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from '$lib/contexts/session'
	import AddWatchlistForm from './add-watchlist-form.svelte'
  import WatchlistItem from './watchlist-item.svelte'
  let sessionToken = getSessionContext()

  let watchlists = getWatchlistsContext()

  let loading = $state(true)

  onMount(async () => {
    const wls = await getWatchlists($sessionToken)
    $watchlists = wls
    loading = false
  })
</script>

<div class="left-panel">
  {#if loading}
    <div>Loading watchlists. Please wait...</div>
  {:else}
  <div style="margin-bottom:10px; padding-left: 10px; padding-right: 10px;">
    <AddWatchlistForm />
  </div>
    {#if $watchlists.length === 0}
      <div>No watchlists. Please create a watchlist.</div>
    {:else}
      <div class="watchlist-list">
        {#each $watchlists as watchlist (watchlist.name)}
          <WatchlistItem watchlist={watchlist} />
        {/each}
      </div>
    {/if}
  {/if}
</div>

<style>
  .left-panel {
    grid-area: left;
    border-right: 1px solid var(--lcd-turquoise-darkest);
    height: 100%;
    width: 100%;
    /* position: absolute; */
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    overflow-y: scroll;
  }
  .watchlist-list {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-template-rows: 1fr 1fr auto;
    margin-top: 20px;
  }
</style>

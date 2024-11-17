<script lang="ts">
  import { onMount } from 'svelte'
  import { getWatchlists } from '$lib/requests/watchlists'
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from '$lib/contexts/session'
	import { getActiveWatchlist } from '$lib/contexts/active-watchlist'
  import LeftPanel from './left-panel.svelte'
	import StockPanel from './stock-panel.svelte'

  let sessionToken = getSessionContext()

  let watchlists = getWatchlistsContext()
  let activeWatchlist = getActiveWatchlist()

  let loading = $state(true)

  onMount(async () => {
    const wls = await getWatchlists($sessionToken)
    $watchlists = wls
    loading = false
  })
</script>

<div class="container">
  <div class="top-bar"><h1>{$activeWatchlist || 'select a watchlist'}</h1></div>
  <LeftPanel />
  <StockPanel />
</div>

<style>
  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-areas: 'header header'
                          'left stocks';
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 1fr 5fr;
  }
  .top-bar {
    grid-area: header;
    align-content:center;
    justify-content: center;
    text-align: center;
    vertical-align: center;
    grid-row: 1 / 2;
    grid-column: 1 / 3;
    color: var(--lcd-turquoise-normal);
    border-bottom: 5px ridge var(--lcd-turquoise-normal);
  }
</style>

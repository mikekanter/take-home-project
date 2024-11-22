<script lang="ts">
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from "$lib/contexts/session"
  import { getActiveWatchlist } from '$lib/contexts/active-watchlist'
	import AddSymbolForm from "./add-symbol-form.svelte"
	import { derived } from "svelte/store"
  import { getMarketData } from '$lib/requests/market-data'
	import { updateWatchlist } from '$lib/requests/watchlists'
  let sessionToken = getSessionContext()
  let watchlists = getWatchlistsContext()
  let activeWatchlistName = getActiveWatchlist()
  let activeWatchlist = derived([watchlists, activeWatchlistName], ([wls, activeName]) =>
    wls.find((wl) => wl.name === activeName)
  )
  /** interval to clear */
  let clear = $state(0)
  /** The stocks that are displayed. */
  let stocks: Array<{
    symbol: string
    bid: string
    ask: string
    last: string
  }> = $state([])

  $effect(() => {
    let currentEntries = $activeWatchlist?.['watchlist-entries'] ?? []
    if (!currentEntries.length) {
      stocks = []
    }
    async function updateStocks() {
        if ($activeWatchlist) {
          const stockArr = await Promise.all(currentEntries.map(async (we) => {
            const { symbol, bid, ask, last } = await getMarketData($sessionToken, we.symbol)
            return {
              symbol,
              bid,
              ask,
              last,
            }
          }))
          stocks = stockArr
        }
    }
    // initial update
    updateStocks()
    // set interval to update every 5 seconds
    clear = setInterval(updateStocks, 5000)
    return () => clearInterval(clear)
  })
</script>

<div class="stock-area">
  <div>
  <h2>Stocks</h2>
  {#if !$activeWatchlist}
      <div>No active watchlist. Please select a watchlist to view stocks.</div>
  {:else}
    <AddSymbolForm />
    <div class="stock-list">
      <div class="grid-head">Symbol</div>
      <div class="grid-head">Bid price</div>
      <div class="grid-head">Ask price</div>
      <div class="grid-head">Last price</div>
      {#each stocks as stock (`${$activeWatchlist.name}-${stock.symbol}`)}
        <div class="symbol-cell">
          <div>{stock.symbol}</div>
          <button
            title={`Remove ${stock.symbol} from watchlist`}
            onclick={async () => {
              // Remove stock from watchlist
              // update watchlist via api
              const response = await updateWatchlist($sessionToken, $activeWatchlist.name,
                ($activeWatchlist?.['watchlist-entries'] ?? []).filter((x) =>
                  x.symbol !== stock.symbol
                )
              )
              // update watchlist in state
              $watchlists = $watchlists.map((wl) => {
                if (wl.name === $activeWatchlist.name) {
                  return response
                } else {
                  return wl
                }
              })
            }}
          >X</button>
        </div>
        <div>{stock.bid}</div>
        <div>{stock.ask}</div>
        <div>{stock.last}</div>
      {/each}
    </div>

  {/if}
  </div>
</div>

<style>
.stock-area {
  grid-area: stocks;
  overflow-y: scroll;
}

.stock-area > div {
  padding: 10px;
}

.stock-list > div {
  align-self: center;
}
.stock-list {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 2fr 2fr 2fr;
}
.grid-head {
  font-weight: 700;
}
.symbol-cell {
  display: grid;
  grid-template-columns: 4fr 1fr;
  align-items: center;
}
button {
  color: var(--lcd-red);
  border: none;
}
</style>

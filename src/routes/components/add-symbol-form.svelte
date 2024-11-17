<script lang="ts">
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from '$lib/contexts/session'
  import { getActiveWatchlist } from '$lib/contexts/active-watchlist'
	import { derived } from 'svelte/store'
	import { getSymbol } from '$lib/requests/symbol'
	import { updateWatchlist } from '$lib/requests/watchlists'
  let sessionToken = getSessionContext()
  let watchlists = getWatchlistsContext()
  let activeWatchlistName = getActiveWatchlist()

  let activeWatchlist = derived([watchlists, activeWatchlistName], ([wls, activeName]) => {
    if (activeWatchlist === undefined) {
      return undefined
    } else {
      return wls.find((wl) => wl.name === activeName)
    }
  })

  let isAdding = $state(false)
  let isFormOpen = $state(false)
  let symbolName = $state('')
</script>

{#if !isFormOpen || !$activeWatchlist}
  <button
    class="form-area"
    onclick={() => {
    isFormOpen = true
    }}>
    + Add Symbol To Watchlist
  </button>
{:else}
<form
  class="form-area"
  onsubmit={async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      isAdding = true
      // we are just assuming that the instrument-type is Equity, since symbol search is disabled.
      let tastySymbol = {
        symbol: symbolName,
        'instrument-type': 'Equity',
      }
      // symbol search is turned off because the API endpoint is unavailable
      const doSymbolSearch = false
      if (doSymbolSearch) {
        // Ensure that symbol is valid
        tastySymbol = await getSymbol($sessionToken, symbolName)
        if (!tastySymbol?.symbol) {
          console.log('symbol not found')
          return
        }
      }
      let currentWatchlistEntries = $activeWatchlist?.['watchlist-entries'] ?? []
      // do not duplicate the entry
      if (currentWatchlistEntries.some((we) => we.symbol === symbolName)) {
        console.log(`watchlist already has symbol ${symbolName}`)
        return
      }
      // update the watchlist via api.
      await updateWatchlist($sessionToken, $activeWatchlist.name, [
        ...currentWatchlistEntries, {
        symbol: tastySymbol.symbol,
        'instrument-type': tastySymbol['instrument-type'],
      }])
      // update state
      $watchlists = $watchlists?.map((wl) => {
        if (wl.name === $activeWatchlist?.name) {
          return {
            ...wl,
            'watchlist-entries': [
              ...currentWatchlistEntries,
              {
                symbol: tastySymbol.symbol,
                'instrument-type': tastySymbol['instrument-type'],
              },
            ],
          }
        } else {
          return wl
        }
      }) ?? []
      // reset / close form
      isAdding = false
      symbolName = ''
      isFormOpen = false
    } catch (e) {
      console.error(e)
    }
  }}>
  <label for="symbol name">Add symbol: </label>
  <input
    autofocus
    autocomplete="off"
    name="symbol name"
    bind:value={symbolName}
    placeholder="symbol name"
    onkeydown={(e) => {
      if (e.key === 'Escape') {
        symbolName = ''
        isFormOpen = false
      }
    }}
  />
  <div>
    <button type="submit" disabled={isAdding || !symbolName}>Create</button>
    <button
      class="cancel"
      onclick={() => {
        // reset / close form
        symbolName = ''
        isFormOpen = false
      }}
    >
      cancel
    </button>
  </div>
</form>
{/if}

<style>
  .form-area {
    margin-bottom: 20px;
  }
</style>

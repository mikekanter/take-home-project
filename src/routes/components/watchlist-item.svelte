<script lang="ts">
  import { type TastyWatchlist } from '$lib/types'
  import { deleteWatchlist } from '$lib/requests/watchlists'
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from '$lib/contexts/session'
  import { getActiveWatchlist } from '$lib/contexts/active-watchlist'
  let watchlists = getWatchlistsContext()
  let activeWatchlistName = getActiveWatchlist()
  let sessionToken = getSessionContext()
  let isDeleting = $state(false)
  let props: {
    watchlist: TastyWatchlist
  } = $props()
  let { watchlist } = props
</script>

<button
  class={`activate ${$activeWatchlistName === watchlist.name ? 'active-watchlist' : ''}`}
  onclick={() => {
    $activeWatchlistName = watchlist.name
  }}
>
  {watchlist.name}
</button>
<button
  class="delete"
  disabled={isDeleting}
  onclick={async () => {
    try {
      isDeleting = true
      await deleteWatchlist($sessionToken, watchlist.name)
      $watchlists = $watchlists.filter((wl) => wl.name !== watchlist.name)
      if ($activeWatchlistName === watchlist.name) {
        $activeWatchlistName = undefined
      }
      isDeleting = false
    } catch (e) {
      console.error(e)
    }
  }}>
  delete
</button>

<style>
  button.activate {
    font-size: 14pt;
    border: transparent !important;
    text-wrap: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    overflow: hidden;
    align-content: center;
    line-clamp: 1;
  }
  button.activate:hover {
    text-decoration: underline;
  }
  button.active-watchlist {
    text-decoration: underline;
  }

  button.delete {
    color: var(--lcd-red);
    border: 3px solid var(--lcd-red);
  }
</style>

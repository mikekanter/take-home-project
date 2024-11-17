<script lang="ts">
	import { getWatchlistsContext } from '$lib/contexts/watchlists'
  import { getSessionContext } from '$lib/contexts/session'
  import { createWatchlist } from '$lib/requests/watchlists'
  let sessionToken = getSessionContext()
  let watchlists = getWatchlistsContext()
  let newWatchlistName = $state('')
  let isCreating = $state(false)
  let isFormOpen = $state(false)
</script>

{#if !isFormOpen}
  <button onclick={() => {
    isFormOpen = true
  }}>
    + Add watchlist
  </button>
{:else}
<form
  onsubmit={async (e) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      isCreating = true
      const wl = await createWatchlist($sessionToken, newWatchlistName)
      $watchlists.push(wl)
      isCreating = false
      newWatchlistName = ''
      isFormOpen = false
    } catch (e) {
      console.error(e)
    }
  }}>
  <label for="watchlist name">Add watchlist: </label>
  <input
    autofocus
    autocomplete="off"
    name="watchlist name"
    bind:value={newWatchlistName}
    placeholder="watchlist name"
    onkeydown={(e) => {
      if (e.key === 'Escape') {
        newWatchlistName = ''
        isFormOpen = false
      }
    }}
  />
  <div>
    <button type="submit" disabled={isCreating}>Create</button>
    <button
      class="cancel"
      onclick={() => {
        newWatchlistName = ''
        isFormOpen = false
      }}
    >
      cancel
    </button>
  </div>
</form>
{/if}

<style>
  input {
    margin-bottom: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  button.cancel {
    border: none;
  }
</style>

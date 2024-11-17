<script lang="ts">
  import { login } from '$lib/requests/auth-request'
  import { getSessionContext } from "$lib/contexts/session"

  let sessionToken = getSessionContext()
  let username = $state('')
  let password = $state('')
  let isLoggingIn = $state(false)
  let errorMessage = $state('')
</script>

{#if isLoggingIn}
  <div>Logging in. Please wait...</div>
{:else}
<form
    class="form-container"
    onsubmit={async (e) => {
      e.preventDefault()
      e.stopPropagation()
      try {
        isLoggingIn = true
        const result = await login(username, password)
        $sessionToken = result?.data?.['session-token'] ?? ''
        if (!$sessionToken) {
          errorMessage = result?.error?.message ?? 'Error logging in.'
        } else {
          errorMessage = ''
        }
        isLoggingIn = false
      } catch (e: any) {
        console.error(e)
      }
    }}
  >
  <label for="username">Username: </label>
  <div>
    <input name="username" autocomplete="off" bind:value={username} />
  </div>
  <label for="password">Password: </label>
  <div>
    <input name="password" autocomplete="off" bind:value={password} />
  </div>
  <button
    disabled={!username || !password || isLoggingIn}
    type="submit"
  >Login</button>
  <span aria-hidden={!!errorMessage}>{errorMessage}</span>
</form>
{/if}

<style>
  .form-container {
    display: grid;
    row-gap: 1em;
    width: 300px;
    grid-template-rows: auto;
    grid-template-columns: 1fr 1fr;
  }

  label {
    font-weight: 700;
  }
  span {
    grid-column-start: 1;
    grid-column-end: 3;
    color: var(--lcd-red);
  }

  button {
    grid-column: 1 / 3;
  }
</style>

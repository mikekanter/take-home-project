import { type Writable, writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

export function initActiveWatchlist() {
	let activeWatchlist = writable<string | undefined>()
	setContext('activeWatchlist', activeWatchlist)
}

export function getActiveWatchlist() {
	return getContext<Writable<string | undefined>>('activeWatchlist')
}

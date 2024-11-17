import { type Writable, writable } from 'svelte/store'
import { type TastyWatchlist } from '../types'
import { getContext, setContext } from 'svelte'

export function initWatchlists() {
	let watchlists = writable<TastyWatchlist[]>([])
	setContext('watchlists', watchlists)
}

export function getWatchlistsContext() {
	return getContext<Writable<TastyWatchlist[]>>('watchlists')
}

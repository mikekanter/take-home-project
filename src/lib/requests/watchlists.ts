import { type TastyWatchlist } from '$lib/types'
import { authRequest } from './auth-request'

export async function getWatchlists(sessionToken: string) {
	const response = await authRequest(`/watchlists`, sessionToken)
	const body = await response.json()
	return (body?.data?.items?.map((item: Partial<TastyWatchlist>) => {
		return {
			'watchlist-entries': [],
			...item,
		}
	}) ?? []) as TastyWatchlist[]
}

export async function createWatchlist(sessionToken: string, name: string) {
	const response = await authRequest(`/watchlists`, sessionToken, {
		method: 'POST',
		body: JSON.stringify({
			name,
			'watchlist-entries': [],
		}),
	})

	const body = await response.json()
	return body?.data as TastyWatchlist
}

export async function updateWatchlist(
	sessionToken: string,
	watchlistName: string,
	entries: TastyWatchlist['watchlist-entries'],
) {
	const response = await authRequest(`/watchlists/${watchlistName}`, sessionToken, {
		method: 'PUT',
		body: JSON.stringify({
			name: watchlistName,
			'watchlist-entries': entries,
		}),
	})
	const body = await response.json()
	return body?.data as TastyWatchlist
}

export async function deleteWatchlist(sessionToken: string, watchlistName: string) {
	const response = await authRequest(`/watchlists/${watchlistName}`, sessionToken, {
		method: 'DELETE',
	})
	const body: TastyWatchlist = await response.json()
	return body
}

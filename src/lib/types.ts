export type TastySymbol = {
	symbol: string
	description?: string
	'listed-market'?: string
	'price-increments'?: string
	'trading-hours'?: string
	options?: boolean
	'instrument-type': string
	/** in cents */
	// bidPrice: number
	// askPrice: number
	// lastPrice: number
}

export type TastyWatchlist = {
	name: string
	'watchlist-entries': {
		symbol: string
		'instrument-type': string
	}[]
	'cms-id'?: string
	'group-name'?: string
	'order-index'?: number
}

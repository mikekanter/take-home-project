import { authRequest } from './auth-request'

export async function getMarketData(sessionToken: string, symbol: string) {
	const response = await authRequest(`/market-data/${symbol}`, sessionToken, {
		method: 'GET',
	})
	const body = await response.json()
	return body?.data
}

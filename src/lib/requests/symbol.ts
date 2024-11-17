import { authRequest } from './auth-request'
import { type TastySymbol } from '$lib/types'

export async function getSymbol(sessionToken: string, symbol: string) {
	const response = await authRequest(`/symbols/search/${symbol}`, sessionToken, {
		method: 'GET',
	})
	const body = await response.json()
	return body?.data as TastySymbol
}

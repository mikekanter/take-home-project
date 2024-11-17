import { type Writable, writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'

export function initSessionContext() {
	let sessionToken = writable<string>('')
	setContext('sessionToken', sessionToken)
}

export function getSessionContext() {
	return getContext<Writable<string>>('sessionToken')
}

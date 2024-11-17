type LoginResponse = {
	data?: {
		user: {
			email: string
			username: string
			'external-id': string
		}
		'session-token': string
		'remember-token'?: string
		'session-expiration': string
	}
	context?: string
	error?: {
		code: string
		message: string
	}
}

const endpoints = {
	createSession: 'https://api.cert.tastyworks.com/sessions' as const,
}

export async function login(username: string, password: string) {
	let response: Response = await fetch(endpoints.createSession, {
		method: 'POST',
		body: JSON.stringify({
			login: username,
			password,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const body: LoginResponse = await response.json()
	return body
}

const BASE_URL = 'https://api.cert.tastyworks.com'

export function authRequest(path: string, sessionToken: string, opts?: RequestInit) {
	if (!sessionToken) {
		throw new Error('Session token not available')
	}
	return fetch(`${BASE_URL}${path}`, {
		...(opts ?? {}),
		headers: {
			'Content-Type': 'application/json',
			...(opts?.headers ?? {}),
			Authorization: sessionToken,
		},
	})
}

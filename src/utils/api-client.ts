import { env } from 'cloudflare:workers'
import { hcWithType } from '@hexcuit/server'

export function createApiClient() {
	return hcWithType(env.API_BASE_URL, {
		headers: { 'x-api-key': env.API_KEY },
	})
}

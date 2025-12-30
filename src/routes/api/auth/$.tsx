import { env } from 'cloudflare:workers'
import { createFileRoute } from '@tanstack/react-router'
import { createAuth } from '~/lib/auth'

export const Route = createFileRoute('/api/auth/$')({
	server: {
		handlers: {
			GET: ({ request }: { request: Request }) => {
				const auth = createAuth(env.DB)
				return auth.handler(request)
			},
			POST: ({ request }: { request: Request }) => {
				const auth = createAuth(env.DB)
				return auth.handler(request)
			},
		},
	},
})

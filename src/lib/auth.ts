import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '~/db/schema'

export type Auth = ReturnType<typeof createAuth>

export function createAuth(db: D1Database) {
	const drizzleDb = drizzle(db, { schema })

	return betterAuth({
		database: drizzleAdapter(drizzleDb, {
			provider: 'sqlite',
			usePlural: true,
		}),
		baseURL: process.env.APP_URL,
		secret: process.env.BETTER_AUTH_SECRET,
		socialProviders: {
			discord: {
				clientId: process.env.DISCORD_CLIENT_ID as string,
				clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
				scope: ['identify', 'guilds'],
			},
		},
		session: {
			cookieCache: {
				enabled: true,
				maxAge: 60 * 60 * 24 * 7, // 7 days
			},
		},
	})
}

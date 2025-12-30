import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './drizzle',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
		databaseId: 'fb1c9bfa-e803-44ea-858f-6c75d1fdc93c',
		token: process.env.CLOUDFLARE_API_TOKEN as string,
	},
})

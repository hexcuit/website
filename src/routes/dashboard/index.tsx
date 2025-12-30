import { env } from 'cloudflare:workers'
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/d1'
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import * as schema from '~/db/schema'
import { createAuth } from '~/lib/auth'

const MANAGE_GUILD = 1n << 5n
const ADMINISTRATOR = 1n << 3n

function hasGuildManagePermission(permissions: string): boolean {
	const perms = BigInt(permissions)
	return (perms & ADMINISTRATOR) !== 0n || (perms & MANAGE_GUILD) !== 0n
}

type DiscordGuild = {
	id: string
	name: string
	icon: string | null
	permissions: string
}

const getManagedGuilds = createServerFn().handler(async (): Promise<DiscordGuild[]> => {
	const request = getRequest()
	const auth = createAuth(env.DB)
	const session = await auth.api.getSession({ headers: request?.headers ?? new Headers() })

	if (!session?.user?.id) return []

	// Get access token from accounts table
	const db = drizzle(env.DB, { schema })
	const discordAccount = await db
		.select()
		.from(schema.accounts)
		.where(eq(schema.accounts.userId, session.user.id))
		.then((accounts) => accounts.find((a) => a.providerId === 'discord'))

	if (!discordAccount?.accessToken) return []

	// Fetch guilds from Discord API
	const res = await fetch('https://discord.com/api/v10/users/@me/guilds', {
		headers: { Authorization: `Bearer ${discordAccount.accessToken}` },
	})

	if (!res.ok) return []

	const guilds: DiscordGuild[] = await res.json()
	return guilds.filter((g) => hasGuildManagePermission(g.permissions))
})

export const Route = createFileRoute('/dashboard/')({
	loader: async () => {
		const guilds = await getManagedGuilds()
		return { guilds }
	},
	component: DashboardIndex,
})

function DashboardIndex() {
	const { guilds } = Route.useLoaderData()

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold'>ギルド一覧</h1>
				<p className='text-muted-foreground'>管理権限のあるギルドが表示されます</p>
			</div>

			{guilds.length === 0 ? (
				<p className='text-muted-foreground'>管理できるギルドがありません</p>
			) : (
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{guilds.map((guild) => (
						<a key={guild.id} href={`/dashboard/${guild.id}`}>
							<Card className='transition-colors hover:bg-muted/50'>
								<CardHeader className='flex flex-row items-center gap-4'>
									{guild.icon ? (
										<img
											src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
											alt={guild.name}
											className='size-12 rounded-full'
										/>
									) : (
										<div className='flex size-12 items-center justify-center rounded-full bg-muted'>
											{guild.name.charAt(0)}
										</div>
									)}
									<div>
										<CardTitle className='text-lg'>{guild.name}</CardTitle>
										<CardDescription>{guild.id}</CardDescription>
									</div>
								</CardHeader>
							</Card>
						</a>
					))}
				</div>
			)}
		</div>
	)
}

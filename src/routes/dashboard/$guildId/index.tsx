import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { createApiClient } from '~/utils/api-client'

type GuildSettings = {
	initialRating: number
	kFactor: number
	placementGamesRequired: number
}

const getGuildSettings = createServerFn()
	.inputValidator((data: { guildId: string }) => data)
	.handler(async ({ data }): Promise<GuildSettings | null> => {
		const client = createApiClient()
		const res = await client.v1.guilds[':guildId'].settings.$get({
			param: { guildId: data.guildId },
		})

		if (!res.ok) return null
		return res.json()
	})

export const Route = createFileRoute('/dashboard/$guildId/')({
	loader: async ({ params }) => {
		const settings = await getGuildSettings({ data: { guildId: params.guildId } })
		return { guildId: params.guildId, settings }
	},
	component: GuildDashboard,
})

function GuildDashboard() {
	const { guildId, settings } = Route.useLoaderData()

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold'>ギルド設定</h1>
				<p className='text-muted-foreground'>ID: {guildId}</p>
			</div>

			{settings ? (
				<Card>
					<CardHeader>
						<CardTitle>レーティング設定</CardTitle>
						<CardDescription>ギルドのレーティングシステムの設定</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div className='grid gap-4 md:grid-cols-3'>
							<div>
								<p className='text-sm font-medium'>初期レーティング</p>
								<p className='text-muted-foreground'>{settings.initialRating}</p>
							</div>
							<div>
								<p className='text-sm font-medium'>K Factor</p>
								<p className='text-muted-foreground'>{settings.kFactor}</p>
							</div>
							<div>
								<p className='text-sm font-medium'>プレースメント戦数</p>
								<p className='text-muted-foreground'>{settings.placementGamesRequired}</p>
							</div>
						</div>
						<Button asChild>
							<a href={`/dashboard/${guildId}/settings`}>設定を編集</a>
						</Button>
					</CardContent>
				</Card>
			) : (
				<Card>
					<CardContent className='py-8 text-center'>
						<p className='text-muted-foreground'>このギルドはまだ Hexcuit Bot を使用していません</p>
						<Button className='mt-4' asChild>
							<a
								href='https://discord.com/oauth2/authorize?client_id=1413060641811337256'
								target='_blank'
								rel='noreferrer'
							>
								Bot を招待
							</a>
						</Button>
					</CardContent>
				</Card>
			)}
		</div>
	)
}

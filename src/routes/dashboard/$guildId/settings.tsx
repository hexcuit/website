import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { useState } from 'react'
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

const updateGuildSettings = createServerFn({ method: 'POST' })
	.inputValidator((data: { guildId: string; settings: Partial<GuildSettings> }) => data)
	.handler(async ({ data }) => {
		const client = createApiClient()
		const res = await client.v1.guilds[':guildId'].settings.$patch({
			param: { guildId: data.guildId },
			json: data.settings,
		})

		if (!res.ok) throw new Error('Failed to update settings')
		return res.json()
	})

export const Route = createFileRoute('/dashboard/$guildId/settings')({
	loader: async ({ params }) => {
		const settings = await getGuildSettings({ data: { guildId: params.guildId } })
		return { guildId: params.guildId, settings }
	},
	component: GuildSettingsPage,
})

function GuildSettingsPage() {
	const { guildId, settings } = Route.useLoaderData()
	const [initialRating, setInitialRating] = useState(settings?.initialRating ?? 1000)
	const [kFactor, setKFactor] = useState(settings?.kFactor ?? 32)
	const [saving, setSaving] = useState(false)

	const handleSave = async () => {
		setSaving(true)
		try {
			await updateGuildSettings({
				data: {
					guildId,
					settings: { initialRating, kFactor },
				},
			})
			alert('設定を保存しました')
		} catch {
			alert('保存に失敗しました')
		} finally {
			setSaving(false)
		}
	}

	if (!settings) {
		return (
			<div className='text-center'>
				<p className='text-muted-foreground'>このギルドの設定が見つかりません</p>
				<Button className='mt-4' asChild>
					<a href={`/dashboard/${guildId}`}>戻る</a>
				</Button>
			</div>
		)
	}

	return (
		<div className='space-y-6'>
			<div>
				<h1 className='text-2xl font-bold'>設定を編集</h1>
				<p className='text-muted-foreground'>ID: {guildId}</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>レーティング設定</CardTitle>
					<CardDescription>ギルドのレーティングシステムの設定を変更できます</CardDescription>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div>
						<label htmlFor='initialRating' className='block text-sm font-medium'>
							初期レーティング
						</label>
						<input
							id='initialRating'
							type='number'
							value={initialRating}
							onChange={(e) => setInitialRating(Number(e.target.value))}
							className='mt-1 block w-full rounded-md border px-3 py-2'
						/>
					</div>
					<div>
						<label htmlFor='kFactor' className='block text-sm font-medium'>
							K Factor
						</label>
						<input
							id='kFactor'
							type='number'
							value={kFactor}
							onChange={(e) => setKFactor(Number(e.target.value))}
							className='mt-1 block w-full rounded-md border px-3 py-2'
						/>
					</div>
					<div className='flex gap-4'>
						<Button onClick={handleSave} disabled={saving}>
							{saving ? '保存中...' : '保存'}
						</Button>
						<Button variant='outline' asChild>
							<a href={`/dashboard/${guildId}`}>キャンセル</a>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

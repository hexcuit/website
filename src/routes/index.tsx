import { createFileRoute } from '@tanstack/react-router'
import { CommandItem, FeatureCard, Hero } from '~/components/home'
import { Section } from '~/components/layout'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<>
			<Hero />

			<Section title='機能' className='bg-secondary/50'>
				<div className='grid md:grid-cols-3 gap-6'>
					<FeatureCard
						title='ランク登録'
						description='Riot IDを登録してLoLランクを取得。チームメンバーのランクを一覧表示できます。'
					/>
					<FeatureCard
						title='チームバランシング'
						description='登録されたランク情報を元に、公平なチーム分けを自動で行います。'
					/>
					<FeatureCard title='募集機能' description='カスタムゲームの募集を作成し、参加者を管理できます。' />
				</div>
			</Section>

			<Section title='コマンド'>
				<div className='max-w-4xl mx-auto space-y-4'>
					<CommandItem command='/register' description='Riot IDを登録してランク情報を取得' />
					<CommandItem command='/team balance' description='ランクを考慮したバランスの取れたチーム分け' />
					<CommandItem command='/team random' description='完全ランダムでチーム分け' />
					<CommandItem command='/recruit create' description='カスタムゲームの募集を作成' />
					<CommandItem command='/recruit anonymous' description='匿名でカスタムゲームの募集を作成' />
				</div>
			</Section>
		</>
	)
}

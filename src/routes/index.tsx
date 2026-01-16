import { createFileRoute } from '@tanstack/react-router'

import { CommandItem, FeatureCard, Hero } from '~/components/home'
import { Section } from '~/components/layout/section'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<>
			<Hero />

			<Section title="機能" className="bg-secondary/50">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					<FeatureCard
						title="ランク登録"
						description="LoLランクを手動登録。チーム分けやバランシングの基準として使用されます。"
					/>
					<FeatureCard
						title="チームバランシング"
						description="登録されたランク情報を元に、公平なチーム分けを自動で行います。"
					/>
					<FeatureCard
						title="キュー機能"
						description="カスタムゲームの募集を作成し、参加者を管理。ランク戦では投票で勝敗報告。"
					/>
					<FeatureCard
						title="サーバー内ランク"
						description="Eloレーティングシステム。投票で勝敗確定後レート更新。統計カードと試合履歴も確認可能。"
					/>
				</div>
			</Section>

			<Section title="コマンド">
				<div className="max-w-4xl mx-auto space-y-4">
					<CommandItem command="/register" description="LoLランク（ティア・ディビジョン）を登録" />
					<CommandItem
						command="/team balance"
						description="ランクを考慮したバランスの取れたチーム分け"
					/>
					<CommandItem command="/team random" description="完全ランダムでチーム分け" />
					<CommandItem command="/queue create" description="カスタムゲームの募集を作成" />
					<CommandItem command="/queue anonymous" description="匿名でカスタムゲームの募集を作成" />
					<CommandItem
						command="/queue rank"
						description="サーバー内ランク戦の募集を作成（投票で勝敗報告）"
					/>
					<CommandItem command="/stats" description="サーバー内ランクと統計カードを表示" />
					<CommandItem command="/ranking" description="サーバー内ランキングを表示" />
				</div>
			</Section>
		</>
	)
}

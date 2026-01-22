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

			<Section title="機能" className="bg-secondary/30">
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
					<FeatureCard
						icon="rank"
						title="ランク登録"
						description="LoLランクを手動登録。チーム分けやバランシングの基準として使用されます。"
						index={0}
					/>
					<FeatureCard
						icon="balance"
						title="チームバランシング"
						description="登録されたランク情報を元に、公平なチーム分けを自動で行います。"
						index={1}
					/>
					<FeatureCard
						icon="queue"
						title="キュー機能"
						description="カスタムゲームの募集を作成し、参加者を管理。ランク戦では投票で勝敗報告。"
						index={2}
					/>
					<FeatureCard
						icon="stats"
						title="サーバー内ランク"
						description="Eloレーティングシステム。投票で勝敗確定後レート更新。統計カードと試合履歴も確認可能。"
						index={3}
					/>
				</div>
			</Section>

			<Section title="コマンド">
				<div className="mx-auto max-w-4xl space-y-3">
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

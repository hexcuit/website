import { createFileRoute, Link } from '@tanstack/react-router'

import { Section } from '~/components/layout/section'

export const Route = createFileRoute('/features')({
	component: Features,
})

function Features() {
	return (
		<>
			<section className="px-4 py-16">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-4 text-4xl font-bold">機能紹介</h1>
					<p className="text-lg text-muted-foreground">
						HexcuitはLeague of Legendsプレイヤー向けのDiscord Botです
					</p>
				</div>
			</section>

			<Section title="ランク登録" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						LoLのランク（ティア・ディビジョン）を手動で登録します。チーム分けのバランシングに使用されます。
					</p>
					<div className="space-y-2 rounded-lg bg-background p-4">
						<code className="text-primary">/register tier:[ティア] division:[ディビジョン]</code>
						<p className="text-sm text-muted-foreground">例: /register tier:ゴールド division:IV</p>
					</div>
					<ul className="list-inside list-disc space-y-1 text-muted-foreground">
						<li>Iron〜Challengerまでのティアを選択</li>
						<li>ディビジョン（I〜IV）を選択</li>
						<li>チームバランシングの基準として使用</li>
					</ul>
				</div>
			</Section>

			<Section title="チームバランシング">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						ボイスチャンネルのメンバーを、ランクを考慮してバランスの取れた2チームに分けます。
					</p>
					<div className="space-y-3 rounded-lg bg-secondary/50 p-4">
						<div>
							<code className="text-primary">/team balance</code>
							<p className="mt-1 text-sm text-muted-foreground">ランクを考慮したバランス分け</p>
						</div>
						<div>
							<code className="text-primary">/team random</code>
							<p className="mt-1 text-sm text-muted-foreground">完全ランダムで分け</p>
						</div>
					</div>
					<ul className="list-inside list-disc space-y-1 text-muted-foreground">
						<li>VCに参加中のメンバーを自動検出</li>
						<li>除外オプションで特定メンバーを対象外に</li>
						<li>チーム合計レートの差を最小化</li>
					</ul>
				</div>
			</Section>

			<Section title="キュー機能" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						カスタムゲームの募集を作成し、参加者をボタンで管理できます。
					</p>
					<div className="space-y-3 rounded-lg bg-background p-4">
						<div>
							<code className="text-primary">/queue create [description]</code>
							<p className="mt-1 text-sm text-muted-foreground">通常募集（参加者名を表示）</p>
						</div>
						<div>
							<code className="text-primary">/queue anonymous [description]</code>
							<p className="mt-1 text-sm text-muted-foreground">匿名募集（参加者数のみ表示）</p>
						</div>
						<div>
							<code className="text-primary">/queue rank [description]</code>
							<p className="mt-1 text-sm text-muted-foreground">
								ランク戦募集（投票で勝敗報告、レート変動）
							</p>
						</div>
					</div>
					<ul className="list-inside list-disc space-y-1 text-muted-foreground">
						<li>定員10人で自動締切</li>
						<li>ボタンで参加/キャンセル</li>
						<li>募集作成者が終了を管理</li>
					</ul>
				</div>
			</Section>

			<Section title="投票システム">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						ランク戦（/queue rank）では、試合終了後に参加者が投票で勝敗を報告します。
					</p>
					<div className="rounded-lg bg-secondary/50 p-4">
						<div className="mb-4 grid grid-cols-3 gap-4 text-center">
							<div className="rounded border border-blue-500/50 bg-blue-500/20 p-3">
								<span className="font-semibold text-blue-400">BLUE Win</span>
							</div>
							<div className="rounded border border-red-500/50 bg-red-500/20 p-3">
								<span className="font-semibold text-red-400">RED Win</span>
							</div>
							<div className="rounded border border-gray-500/50 bg-gray-500/20 p-3">
								<span className="font-semibold text-gray-400">DRAW</span>
							</div>
						</div>
						<p className="text-center text-sm text-muted-foreground">10人中6票以上で結果確定</p>
					</div>
					<ul className="list-inside list-disc space-y-1 text-muted-foreground">
						<li>投票は何度でも変更可能</li>
						<li>過半数に達した時点で自動確定</li>
						<li>確定後はレートが即座に更新</li>
						<li>試合履歴に自動記録</li>
					</ul>
				</div>
			</Section>

			<Section title="サーバー内ランク" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						Discordサーバー独自のランクシステム。カスタムゲームの勝敗でレートが変動します。
					</p>
					<div className="space-y-3 rounded-lg bg-background p-4">
						<div>
							<code className="text-primary">/stats [@user]</code>
							<p className="mt-1 text-sm text-muted-foreground">統計カード画像を表示</p>
						</div>
						<div>
							<code className="text-primary">/ranking [limit]</code>
							<p className="mt-1 text-sm text-muted-foreground">サーバー内ランキングを表示</p>
						</div>
					</div>
					<div className="rounded-lg bg-background p-4">
						<h4 className="mb-2 font-semibold">ランクティア</h4>
						<div className="flex flex-wrap gap-2 text-sm">
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#6B5344', color: 'white' }}
							>
								Iron
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#8B6914', color: 'white' }}
							>
								Bronze
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#7B8B8B', color: 'white' }}
							>
								Silver
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#FFD700', color: 'black' }}
							>
								Gold
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#00CED1', color: 'black' }}
							>
								Platinum
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#50C878', color: 'black' }}
							>
								Emerald
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#B9F2FF', color: 'black' }}
							>
								Diamond
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#9370DB', color: 'white' }}
							>
								Master
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#DC143C', color: 'white' }}
							>
								Grandmaster
							</span>
							<span
								className="rounded px-2 py-1"
								style={{ backgroundColor: '#00BFFF', color: 'black' }}
							>
								Challenger
							</span>
						</div>
					</div>
					<ul className="list-inside list-disc space-y-1 text-muted-foreground">
						<li>初回5試合はプレイスメント期間（変動2倍）</li>
						<li>Eloレーティングシステムで公平な変動</li>
						<li>統計カード画像で戦績を可視化</li>
						<li>直近5試合の履歴を表示</li>
						<li>連勝/連敗トラッキング</li>
					</ul>
					<div className="pt-4 text-center">
						<Link to="/ranking-system" className="text-primary hover:underline">
							ランクシステムの詳細を見る →
						</Link>
					</div>
				</div>
			</Section>
		</>
	)
}

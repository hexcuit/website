import { createFileRoute } from '@tanstack/react-router'

import { Section } from '~/components/layout/section'

export const Route = createFileRoute('/ranking-system')({
	component: RankingSystem,
})

function RankingSystem() {
	return (
		<>
			<section className="px-4 py-16">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-4 text-4xl font-bold">ランクシステム</h1>
					<p className="text-lg text-muted-foreground">
						サーバー独自のEloレーティングシステムの詳細
					</p>
				</div>
			</section>

			<Section title="レーティングシステム概要" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						HexcuitはEloレーティングシステムを採用しています。試合の勝敗に応じてレートが変動し、サーバー内での実力を数値化します。
					</p>
					<div className="rounded-lg bg-background p-4">
						<div className="grid grid-cols-2 gap-4 text-center">
							<div>
								<p className="text-3xl font-bold text-primary">1200</p>
								<p className="text-sm text-muted-foreground">初期レート</p>
							</div>
							<div>
								<p className="text-3xl font-bold text-primary">±16</p>
								<p className="text-sm text-muted-foreground">通常時の変動</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<Section title="Placementシステム">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						最初の5試合はPlacement期間として、レートの変動が通常の2倍になります。
						これにより、少ない試合数で適正レートに近づくことができます。
					</p>
					<div className="rounded-lg bg-secondary/50 p-4">
						<div className="grid grid-cols-2 gap-6">
							<div className="space-y-2">
								<h4 className="font-semibold">Placement期間（1〜5試合目）</h4>
								<ul className="space-y-1 text-sm text-muted-foreground">
									<li>勝利: +32 レート</li>
									<li>敗北: -32 レート</li>
									<li>引き分け: 変動なし</li>
								</ul>
							</div>
							<div className="space-y-2">
								<h4 className="font-semibold">通常期間（6試合目以降）</h4>
								<ul className="space-y-1 text-sm text-muted-foreground">
									<li>勝利: +16 レート</li>
									<li>敗北: -16 レート</li>
									<li>引き分け: 変動なし</li>
								</ul>
							</div>
						</div>
					</div>
					<p className="text-sm text-muted-foreground">
						※ K値（変動幅）はサーバー設定でカスタマイズ可能です。
					</p>
				</div>
			</Section>

			<Section title="試合フロー" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">ランク戦は以下の流れで進行します。</p>
					<div className="rounded-lg bg-background p-6">
						<div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
							<div className="flex-1 rounded-lg bg-secondary/50 p-4">
								<div className="mb-2 text-2xl">1</div>
								<h4 className="font-semibold">キュー作成</h4>
								<p className="mt-1 text-xs text-muted-foreground">/queue rank</p>
							</div>
							<div className="text-2xl text-muted-foreground">→</div>
							<div className="flex-1 rounded-lg bg-secondary/50 p-4">
								<div className="mb-2 text-2xl">2</div>
								<h4 className="font-semibold">10人参加</h4>
								<p className="mt-1 text-xs text-muted-foreground">ボタンで参加</p>
							</div>
							<div className="text-2xl text-muted-foreground">→</div>
							<div className="flex-1 rounded-lg bg-secondary/50 p-4">
								<div className="mb-2 text-2xl">3</div>
								<h4 className="font-semibold">チーム分け</h4>
								<p className="mt-1 text-xs text-muted-foreground">レート考慮</p>
							</div>
							<div className="text-2xl text-muted-foreground">→</div>
							<div className="flex-1 rounded-lg bg-secondary/50 p-4">
								<div className="mb-2 text-2xl">4</div>
								<h4 className="font-semibold">投票</h4>
								<p className="mt-1 text-xs text-muted-foreground">勝敗報告</p>
							</div>
							<div className="text-2xl text-muted-foreground">→</div>
							<div className="flex-1 rounded-lg bg-secondary/50 p-4">
								<div className="mb-2 text-2xl">5</div>
								<h4 className="font-semibold">確定</h4>
								<p className="mt-1 text-xs text-muted-foreground">レート更新</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<Section title="投票システム">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						試合終了後、参加者が勝敗を投票で報告します。過半数の投票で試合結果が確定します。
					</p>
					<div className="space-y-3 rounded-lg bg-secondary/50 p-4">
						<div className="grid grid-cols-3 gap-4 text-center">
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
					</ul>
				</div>
			</Section>

			<Section title="ランクティア" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						レートに応じてランクティアが決定されます。League of
						Legendsと同じティア名を使用しています。
					</p>
					<div className="rounded-lg bg-background p-4">
						<div className="grid grid-cols-2 gap-3 md:grid-cols-5">
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#6B5344' }}>
								<span className="text-sm font-semibold text-white">Iron</span>
								<p className="text-xs text-white/70">〜1099</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#8B6914' }}>
								<span className="text-sm font-semibold text-white">Bronze</span>
								<p className="text-xs text-white/70">1100〜1199</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#7B8B8B' }}>
								<span className="text-sm font-semibold text-white">Silver</span>
								<p className="text-xs text-white/70">1200〜1299</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#FFD700' }}>
								<span className="text-sm font-semibold text-black">Gold</span>
								<p className="text-xs text-black/70">1300〜1399</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#00CED1' }}>
								<span className="text-sm font-semibold text-black">Platinum</span>
								<p className="text-xs text-black/70">1400〜1499</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#50C878' }}>
								<span className="text-sm font-semibold text-black">Emerald</span>
								<p className="text-xs text-black/70">1500〜1599</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#B9F2FF' }}>
								<span className="text-sm font-semibold text-black">Diamond</span>
								<p className="text-xs text-black/70">1600〜1699</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#9370DB' }}>
								<span className="text-sm font-semibold text-white">Master</span>
								<p className="text-xs text-white/70">1700〜1799</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#DC143C' }}>
								<span className="text-sm font-semibold text-white">Grandmaster</span>
								<p className="text-xs text-white/70">1800〜1899</p>
							</div>
							<div className="rounded p-2 text-center" style={{ backgroundColor: '#00BFFF' }}>
								<span className="text-sm font-semibold text-black">Challenger</span>
								<p className="text-xs text-black/70">1900〜</p>
							</div>
						</div>
					</div>
				</div>
			</Section>

			<Section title="統計カード">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						<code className="text-primary">/stats [@user]</code>{' '}
						コマンドで、詳細な統計カード画像を表示できます。
					</p>
					<div className="rounded-lg bg-secondary/50 p-4">
						<h4 className="mb-3 font-semibold">表示される情報</h4>
						<ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								現在のレートとティア
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								勝敗数と勝率
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								最高レート（ピーク）
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								連勝/連敗数
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								サーバー内順位
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								直近5試合の履歴
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								レーティング推移グラフ
							</li>
							<li className="flex items-center gap-2">
								<span className="h-2 w-2 rounded-full bg-primary" />
								Placement進捗
							</li>
						</ul>
					</div>
				</div>
			</Section>

			<Section title="連勝/連敗トラッキング" className="bg-secondary/50">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">連勝・連敗が記録され、統計カードに表示されます。</p>
					<div className="rounded-lg bg-background p-4">
						<div className="grid grid-cols-2 gap-4 text-center">
							<div className="rounded border border-green-500/50 bg-green-500/20 p-3">
								<span className="font-semibold text-green-400">連勝中</span>
								<p className="mt-1 text-sm text-muted-foreground">正の値で表示（例: 3連勝）</p>
							</div>
							<div className="rounded border border-red-500/50 bg-red-500/20 p-3">
								<span className="font-semibold text-red-400">連敗中</span>
								<p className="mt-1 text-sm text-muted-foreground">負の値で表示（例: 2連敗）</p>
							</div>
						</div>
					</div>
					<p className="text-sm text-muted-foreground">
						引き分けの場合、連勝/連敗はリセットされます。
					</p>
				</div>
			</Section>

			<Section title="サーバー設定">
				<div className="mx-auto max-w-3xl space-y-4">
					<p className="text-muted-foreground">
						サーバー管理者は以下の設定をカスタマイズできます。
					</p>
					<div className="rounded-lg bg-secondary/50 p-4">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-border">
									<th className="py-2 text-left font-semibold">設定項目</th>
									<th className="py-2 text-left font-semibold">デフォルト</th>
									<th className="py-2 text-left font-semibold">説明</th>
								</tr>
							</thead>
							<tbody className="text-muted-foreground">
								<tr className="border-b border-border/50">
									<td className="py-2">初期レート</td>
									<td className="py-2">1200</td>
									<td className="py-2">新規参加者の初期レート</td>
								</tr>
								<tr className="border-b border-border/50">
									<td className="py-2">K値（通常）</td>
									<td className="py-2">32</td>
									<td className="py-2">通常時のレート変動幅（±16）</td>
								</tr>
								<tr className="border-b border-border/50">
									<td className="py-2">K値（Placement）</td>
									<td className="py-2">64</td>
									<td className="py-2">Placement期間の変動幅（±32）</td>
								</tr>
								<tr>
									<td className="py-2">Placement試合数</td>
									<td className="py-2">5</td>
									<td className="py-2">Placement期間の試合数</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Section>
		</>
	)
}

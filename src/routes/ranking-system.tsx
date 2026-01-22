import { createFileRoute } from '@tanstack/react-router'

import { GlitchText } from '~/components/effects/glitch-text'
import { GridBackground } from '~/components/effects/grid-background'
import { Magnetic } from '~/components/effects/magnetic'
import { ScrollReveal } from '~/components/effects/scroll-reveal'
import { Section } from '~/components/layout/section'

export const Route = createFileRoute('/ranking-system')({
	component: RankingSystem,
})

function RankingSystem() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
				<GridBackground />

				{/* Gradient orbs */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div
						className="absolute top-1/3 -left-20 h-80 w-80 animate-pulse rounded-full bg-cyber/20 blur-[100px]"
						style={{ animationDuration: '5s' }}
					/>
					<div
						className="absolute top-1/4 -right-20 h-96 w-96 animate-pulse rounded-full bg-neon/20 blur-[120px]"
						style={{ animationDelay: '1.5s', animationDuration: '4s' }}
					/>
				</div>

				{/* Corner decorations */}
				<div className="pointer-events-none absolute inset-8">
					<svg className="absolute top-0 left-0 h-20 w-20 text-cyber/30" viewBox="0 0 100 100">
						<path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
						<circle cx="0" cy="0" r="3" fill="currentColor" className="animate-pulse" />
					</svg>
					<svg className="absolute top-0 right-0 h-20 w-20 text-neon/30" viewBox="0 0 100 100">
						<path d="M100 40 L100 0 L60 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
					</svg>
				</div>

				<div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
					<ScrollReveal direction="scale" duration={0.8}>
						<h1 className="mb-6 text-5xl font-black tracking-wider md:text-6xl">
							<GlitchText className="gradient-text" intensity="medium">
								ランクシステム
							</GlitchText>
						</h1>
					</ScrollReveal>
					<ScrollReveal direction="up" delay={0.2}>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
							サーバー独自の<span className="font-semibold text-cyber">Eloレーティング</span>
							システムの詳細
						</p>
					</ScrollReveal>
				</div>

				{/* Scroll indicator line */}
				<div className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-cyber/50 to-transparent" />
			</section>

			<Section title="レーティングシステム概要" icon="stats">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						HexcuitはEloレーティングシステムを採用しています。試合の勝敗に応じてレートが変動し、サーバー内での実力を数値化します。
					</p>
					<div className="grid gap-6 sm:grid-cols-2">
						<Magnetic strength={0.1}>
							<div className="group rounded-xl border border-neon/30 bg-neon/5 p-6 text-center transition-all duration-300 hover:border-neon/60 hover:shadow-[0_0_30px_var(--neon-glow)]">
								<p className="text-5xl font-black text-neon">1200</p>
								<p className="mt-2 text-muted-foreground">初期レート</p>
							</div>
						</Magnetic>
						<Magnetic strength={0.1}>
							<div className="group rounded-xl border border-cyber/30 bg-cyber/5 p-6 text-center transition-all duration-300 hover:border-cyber/60 hover:shadow-[0_0_30px_var(--cyber-glow)]">
								<p className="text-5xl font-black text-cyber">±16</p>
								<p className="mt-2 text-muted-foreground">通常時の変動</p>
							</div>
						</Magnetic>
					</div>
				</div>
			</Section>

			<Section title="Placementシステム" icon="placement" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						最初の5試合はPlacement期間として、勝利時のレート上昇が通常の2倍になります。
						敗北してもレートは下がらないため、安心してランク戦に挑戦できます。
					</p>
					<div className="grid gap-6 sm:grid-cols-2">
						<div className="rounded-xl border border-electric/30 bg-electric/5 p-6">
							<h4 className="mb-4 text-lg font-bold text-electric">Placement期間</h4>
							<p className="mb-2 text-sm text-muted-foreground">1〜5試合目</p>
							<ul className="space-y-2 text-foreground">
								<li className="flex items-center gap-2">
									<span className="text-green-400">▲</span> 勝利: +32 レート
								</li>
								<li className="flex items-center gap-2">
									<span className="text-gray-400">―</span> 敗北: 変動なし
								</li>
								<li className="flex items-center gap-2">
									<span className="text-gray-400">―</span> 引き分け: 変動なし
								</li>
							</ul>
						</div>
						<div className="rounded-xl border border-border/50 bg-surface/50 p-6">
							<h4 className="mb-4 text-lg font-bold text-foreground">通常期間</h4>
							<p className="mb-2 text-sm text-muted-foreground">6試合目以降</p>
							<ul className="space-y-2 text-foreground">
								<li className="flex items-center gap-2">
									<span className="text-green-400">▲</span> 勝利: +16 レート
								</li>
								<li className="flex items-center gap-2">
									<span className="text-red-400">▼</span> 敗北: -16 レート
								</li>
								<li className="flex items-center gap-2">
									<span className="text-gray-400">―</span> 引き分け: 変動なし
								</li>
							</ul>
						</div>
					</div>
					<p className="text-sm text-muted-foreground">
						※ K値（変動幅）はサーバー設定でカスタマイズ可能です。
					</p>
				</div>
			</Section>

			<Section title="試合フロー" icon="flow">
				<div className="mx-auto max-w-4xl space-y-6">
					<p className="text-lg text-muted-foreground">ランク戦は以下の流れで進行します。</p>
					<div className="rounded-xl border border-border/50 bg-surface/50 p-8">
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							{[
								{ step: 1, title: 'キュー作成', desc: '/queue rank', color: 'neon' },
								{ step: 2, title: '10人参加', desc: 'ボタンで参加', color: 'cyber' },
								{ step: 3, title: 'チーム分け', desc: 'レート考慮', color: 'electric' },
								{ step: 4, title: '投票', desc: '勝敗報告', color: 'neon' },
								{ step: 5, title: '確定', desc: 'レート更新', color: 'cyber' },
							].map((item, i) => (
								<div key={item.step} className="contents">
									<Magnetic strength={0.1}>
										<div
											className={`flex-1 rounded-xl border p-4 text-center transition-all duration-300 hover:scale-105 ${
												item.color === 'neon'
													? 'border-neon/30 bg-neon/5 hover:border-neon/60 hover:shadow-[0_0_20px_var(--neon-glow)]'
													: item.color === 'cyber'
														? 'border-cyber/30 bg-cyber/5 hover:border-cyber/60 hover:shadow-[0_0_20px_var(--cyber-glow)]'
														: 'border-electric/30 bg-electric/5 hover:border-electric/60'
											}`}
										>
											<div
												className={`mb-2 text-2xl font-black ${
													item.color === 'neon'
														? 'text-neon'
														: item.color === 'cyber'
															? 'text-cyber'
															: 'text-electric'
												}`}
											>
												{item.step}
											</div>
											<h4 className="font-semibold text-foreground">{item.title}</h4>
											<p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
										</div>
									</Magnetic>
									{i < 4 && (
										<div className="hidden text-2xl text-muted-foreground/50 md:block">→</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</Section>

			<Section title="投票システム" icon="vote" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						試合終了後、参加者が勝敗を投票で報告します。過半数の投票で試合結果が確定します。
					</p>
					<div className="rounded-xl border border-border/50 bg-surface/50 p-6">
						<div className="mb-6 grid grid-cols-3 gap-4 text-center">
							<Magnetic strength={0.1}>
								<div className="rounded-lg border-2 border-blue-500/50 bg-blue-500/20 p-4 transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
									<span className="text-lg font-bold text-blue-400">BLUE Win</span>
								</div>
							</Magnetic>
							<Magnetic strength={0.1}>
								<div className="rounded-lg border-2 border-red-500/50 bg-red-500/20 p-4 transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
									<span className="text-lg font-bold text-red-400">RED Win</span>
								</div>
							</Magnetic>
							<Magnetic strength={0.1}>
								<div className="rounded-lg border-2 border-gray-500/50 bg-gray-500/20 p-4 transition-all duration-300 hover:border-gray-500">
									<span className="text-lg font-bold text-gray-400">DRAW</span>
								</div>
							</Magnetic>
						</div>
						<p className="text-center font-medium text-foreground">10人中6票以上で結果確定</p>
					</div>
					<ul className="space-y-3 text-muted-foreground">
						<FeatureItem>投票は何度でも変更可能</FeatureItem>
						<FeatureItem>過半数に達した時点で自動確定</FeatureItem>
						<FeatureItem>確定後はレートが即座に更新</FeatureItem>
					</ul>
				</div>
			</Section>

			<Section title="ランクティア" icon="tier">
				<div className="mx-auto max-w-4xl space-y-6">
					<p className="text-lg text-muted-foreground">
						レートに応じてランクティアが決定されます。League of
						Legendsと同じティア名を使用しています。
					</p>
					<div className="rounded-xl border border-border/50 bg-surface/50 p-6">
						<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
							{[
								{ name: 'Iron', range: '〜1099', bg: '#6B5344', text: 'white' },
								{ name: 'Bronze', range: '1100〜1199', bg: '#8B6914', text: 'white' },
								{ name: 'Silver', range: '1200〜1299', bg: '#7B8B8B', text: 'white' },
								{ name: 'Gold', range: '1300〜1399', bg: '#FFD700', text: 'black' },
								{ name: 'Platinum', range: '1400〜1499', bg: '#00CED1', text: 'black' },
								{ name: 'Emerald', range: '1500〜1599', bg: '#50C878', text: 'black' },
								{ name: 'Diamond', range: '1600〜1699', bg: '#B9F2FF', text: 'black' },
								{ name: 'Master', range: '1700〜1799', bg: '#9370DB', text: 'white' },
								{ name: 'Grandmaster', range: '1800〜1899', bg: '#DC143C', text: 'white' },
								{ name: 'Challenger', range: '1900〜', bg: '#00BFFF', text: 'black' },
							].map((tier) => (
								<Magnetic key={tier.name} strength={0.1}>
									<div
										className="rounded-lg p-3 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
										style={{ backgroundColor: tier.bg, color: tier.text }}
									>
										<span className="text-sm font-bold">{tier.name}</span>
										<p className="mt-1 text-xs opacity-80">{tier.range}</p>
									</div>
								</Magnetic>
							))}
						</div>
					</div>
				</div>
			</Section>

			<Section title="統計カード" icon="card" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						<code className="rounded bg-neon/10 px-2 py-1 text-neon">/stats [@user]</code>{' '}
						コマンドで、詳細な統計カード画像を表示できます。
					</p>
					<div className="rounded-xl border border-border/50 bg-surface/50 p-6">
						<h4 className="mb-4 font-semibold text-foreground">表示される情報</h4>
						<div className="grid grid-cols-2 gap-3 text-sm">
							{[
								'現在のレートとティア',
								'勝敗数と勝率',
								'最高レート（ピーク）',
								'連勝/連敗数',
								'サーバー内順位',
								'直近5試合の履歴',
								'レーティング推移グラフ',
								'Placement進捗',
							].map((item) => (
								<div key={item} className="flex items-center gap-2 text-muted-foreground">
									<span className="h-2 w-2 rounded-full bg-neon" />
									{item}
								</div>
							))}
						</div>
					</div>
				</div>
			</Section>

			<Section title="連勝/連敗トラッキング" icon="streak">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						連勝・連敗が記録され、統計カードに表示されます。
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<Magnetic strength={0.1}>
							<div className="rounded-xl border-2 border-green-500/50 bg-green-500/10 p-6 text-center transition-all duration-300 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
								<span className="text-2xl font-bold text-green-400">連勝中</span>
								<p className="mt-2 text-sm text-muted-foreground">正の値で表示（例: 3連勝）</p>
							</div>
						</Magnetic>
						<Magnetic strength={0.1}>
							<div className="rounded-xl border-2 border-red-500/50 bg-red-500/10 p-6 text-center transition-all duration-300 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
								<span className="text-2xl font-bold text-red-400">連敗中</span>
								<p className="mt-2 text-sm text-muted-foreground">負の値で表示（例: 2連敗）</p>
							</div>
						</Magnetic>
					</div>
					<p className="text-sm text-muted-foreground">
						引き分けの場合、連勝/連敗はリセットされます。
					</p>
				</div>
			</Section>

			<Section title="サーバー設定" icon="settings" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						サーバー管理者は以下の設定をカスタマイズできます。
					</p>
					<div className="overflow-hidden rounded-xl border border-border/50">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-border/50 bg-surface/80">
									<th className="px-4 py-3 text-left font-semibold text-foreground">設定項目</th>
									<th className="px-4 py-3 text-left font-semibold text-foreground">デフォルト</th>
									<th className="px-4 py-3 text-left font-semibold text-foreground">説明</th>
								</tr>
							</thead>
							<tbody className="text-muted-foreground">
								{[
									{ item: '初期レート', default: '1200', desc: '新規参加者の初期レート' },
									{ item: 'K値（通常）', default: '32', desc: '通常時のレート変動幅（±16）' },
									{
										item: 'K値（Placement）',
										default: '64',
										desc: 'Placement期間の勝利時変動幅（+32）',
									},
									{ item: 'Placement試合数', default: '5', desc: 'Placement期間の試合数' },
								].map((row, i) => (
									<tr
										key={row.item}
										className={`border-b border-border/30 transition-colors hover:bg-surface/50 ${i === 3 ? 'border-b-0' : ''}`}
									>
										<td className="px-4 py-3 font-medium text-foreground">{row.item}</td>
										<td className="px-4 py-3">
											<code className="rounded bg-neon/10 px-2 py-0.5 text-neon">
												{row.default}
											</code>
										</td>
										<td className="px-4 py-3">{row.desc}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</Section>
		</>
	)
}

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
	<li className="flex items-start gap-3">
		<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber" />
		<span>{children}</span>
	</li>
)

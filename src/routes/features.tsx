import { createFileRoute, Link } from '@tanstack/react-router'

import { GlitchText } from '~/components/effects/glitch-text'
import { GridBackground } from '~/components/effects/grid-background'
import { Magnetic } from '~/components/effects/magnetic'
import { ScrollReveal } from '~/components/effects/scroll-reveal'
import { Section } from '~/components/layout/section'

export const Route = createFileRoute('/features')({
	component: Features,
})

function Features() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-20">
				<GridBackground />

				{/* Gradient orbs */}
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div
						className="absolute top-1/4 -left-20 h-80 w-80 animate-pulse rounded-full bg-neon/20 blur-[100px]"
						style={{ animationDuration: '4s' }}
					/>
					<div
						className="absolute -right-20 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyber/20 blur-[120px]"
						style={{ animationDelay: '1s', animationDuration: '5s' }}
					/>
				</div>

				{/* Corner decorations */}
				<div className="pointer-events-none absolute inset-8">
					<svg className="absolute top-0 left-0 h-20 w-20 text-neon/30" viewBox="0 0 100 100">
						<path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
						<circle cx="0" cy="0" r="3" fill="currentColor" className="animate-pulse" />
					</svg>
					<svg className="absolute top-0 right-0 h-20 w-20 text-cyber/30" viewBox="0 0 100 100">
						<path d="M100 40 L100 0 L60 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
					</svg>
				</div>

				<div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
					<ScrollReveal direction="scale" duration={0.8}>
						<h1 className="mb-6 text-5xl font-black tracking-wider md:text-6xl">
							<GlitchText className="gradient-text" intensity="medium">
								機能紹介
							</GlitchText>
						</h1>
					</ScrollReveal>
					<ScrollReveal direction="up" delay={0.2}>
						<p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
							Hexcuitは<span className="font-semibold text-foreground">League of Legends</span>
							プレイヤー向けの
							<span className="font-semibold text-neon">Discord Bot</span>です
						</p>
					</ScrollReveal>
				</div>

				{/* Scroll indicator line */}
				<div className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 bg-linear-to-b from-transparent via-neon/50 to-transparent" />
			</section>

			<Section title="ランク登録" icon="register">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						LoLのランク（ティア・ディビジョン）を手動で登録します。チーム分けのバランシングに使用されます。
					</p>
					<div className="group rounded-xl border border-neon/20 bg-neon/5 p-5 transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_30px_var(--neon-glow)]">
						<code className="text-lg font-semibold text-neon">
							/register tier:[ティア] division:[ディビジョン]
						</code>
						<p className="mt-2 text-sm text-muted-foreground">
							例: /register tier:ゴールド division:IV
						</p>
					</div>
					<ul className="space-y-3 text-muted-foreground">
						<FeatureItem>Iron〜Challengerまでのティアを選択</FeatureItem>
						<FeatureItem>ディビジョン（I〜IV）を選択</FeatureItem>
						<FeatureItem>チームバランシングの基準として使用</FeatureItem>
					</ul>
				</div>
			</Section>

			<Section title="チームバランシング" icon="team" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						ボイスチャンネルのメンバーを、ランクを考慮してバランスの取れた2チームに分けます。
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<CommandCard
							command="/team balance"
							description="ランクを考慮したバランス分け"
							color="neon"
						/>
						<CommandCard command="/team random" description="完全ランダムで分け" color="cyber" />
					</div>
					<ul className="space-y-3 text-muted-foreground">
						<FeatureItem>VCに参加中のメンバーを自動検出</FeatureItem>
						<FeatureItem>除外オプションで特定メンバーを対象外に</FeatureItem>
						<FeatureItem>チーム合計レートの差を最小化</FeatureItem>
					</ul>
				</div>
			</Section>

			<Section title="キュー機能" icon="queue">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						カスタムゲームの募集を作成し、参加者をボタンで管理できます。
					</p>
					<div className="space-y-3">
						<CommandCard
							command="/queue create [description]"
							description="通常募集（参加者名を表示）"
							color="neon"
						/>
						<CommandCard
							command="/queue anonymous [description]"
							description="匿名募集（参加者数のみ表示）"
							color="cyber"
						/>
						<CommandCard
							command="/queue rank [description]"
							description="ランク戦募集（投票で勝敗報告、レート変動）"
							color="electric"
						/>
					</div>
					<ul className="space-y-3 text-muted-foreground">
						<FeatureItem>定員10人で自動締切</FeatureItem>
						<FeatureItem>ボタンで参加/キャンセル</FeatureItem>
						<FeatureItem>募集作成者が終了を管理</FeatureItem>
					</ul>
				</div>
			</Section>

			<Section title="投票システム" icon="vote" variant="alt">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						ランク戦（/queue rank）では、試合終了後に参加者が投票で勝敗を報告します。
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
						<FeatureItem>試合履歴に自動記録</FeatureItem>
					</ul>
				</div>
			</Section>

			<Section title="サーバー内ランク" icon="rank">
				<div className="mx-auto max-w-3xl space-y-6">
					<p className="text-lg text-muted-foreground">
						Discordサーバー独自のランクシステム。カスタムゲームの勝敗でレートが変動します。
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<CommandCard command="/stats [@user]" description="統計カード画像を表示" color="neon" />
						<CommandCard
							command="/ranking [limit]"
							description="サーバー内ランキングを表示"
							color="cyber"
						/>
					</div>
					<div className="rounded-xl border border-border/50 bg-surface/50 p-6">
						<h4 className="mb-4 font-semibold text-foreground">ランクティア</h4>
						<div className="flex flex-wrap gap-2">
							{[
								{ name: 'Iron', bg: '#6B5344', text: 'white' },
								{ name: 'Bronze', bg: '#8B6914', text: 'white' },
								{ name: 'Silver', bg: '#7B8B8B', text: 'white' },
								{ name: 'Gold', bg: '#FFD700', text: 'black' },
								{ name: 'Platinum', bg: '#00CED1', text: 'black' },
								{ name: 'Emerald', bg: '#50C878', text: 'black' },
								{ name: 'Diamond', bg: '#B9F2FF', text: 'black' },
								{ name: 'Master', bg: '#9370DB', text: 'white' },
								{ name: 'Grandmaster', bg: '#DC143C', text: 'white' },
								{ name: 'Challenger', bg: '#00BFFF', text: 'black' },
							].map((tier) => (
								<span
									key={tier.name}
									className="rounded-md px-3 py-1.5 text-sm font-semibold transition-transform duration-200 hover:scale-105"
									style={{ backgroundColor: tier.bg, color: tier.text }}
								>
									{tier.name}
								</span>
							))}
						</div>
					</div>
					<ul className="space-y-3 text-muted-foreground">
						<FeatureItem>初回5試合はプレイスメント期間（変動2倍）</FeatureItem>
						<FeatureItem>Eloレーティングシステムで公平な変動</FeatureItem>
						<FeatureItem>統計カード画像で戦績を可視化</FeatureItem>
						<FeatureItem>直近5試合の履歴を表示</FeatureItem>
						<FeatureItem>連勝/連敗トラッキング</FeatureItem>
					</ul>
					<div className="pt-4 text-center">
						<Magnetic strength={0.15}>
							<Link
								to="/ranking-system"
								className="inline-flex items-center gap-2 rounded-lg border border-cyber/30 bg-cyber/10 px-6 py-3 font-semibold text-cyber transition-all duration-300 hover:border-cyber/60 hover:bg-cyber/20 hover:shadow-[0_0_20px_var(--cyber-glow)]"
							>
								ランクシステムの詳細を見る
								<span className="transition-transform duration-300 group-hover:translate-x-1">
									→
								</span>
							</Link>
						</Magnetic>
					</div>
				</div>
			</Section>
		</>
	)
}

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
	<li className="flex items-start gap-3">
		<span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
		<span>{children}</span>
	</li>
)

const CommandCard = ({
	command,
	description,
	color,
}: {
	command: string
	description: string
	color: 'neon' | 'cyber' | 'electric'
}) => {
	const colorClasses = {
		neon: 'border-neon/20 hover:border-neon/50 text-neon hover:shadow-[0_0_20px_var(--neon-glow)]',
		cyber:
			'border-cyber/20 hover:border-cyber/50 text-cyber hover:shadow-[0_0_20px_var(--cyber-glow)]',
		electric: 'border-electric/20 hover:border-electric/50 text-electric',
	}

	return (
		<div
			className={`rounded-xl border bg-surface/50 p-4 transition-all duration-300 ${colorClasses[color]}`}
		>
			<code
				className={`font-semibold ${color === 'neon' ? 'text-neon' : color === 'cyber' ? 'text-cyber' : 'text-electric'}`}
			>
				{command}
			</code>
			<p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
		</div>
	)
}

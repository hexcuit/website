import { GlitchText, GridBackground, Particles } from '~/components/effects'
import { Button } from '~/components/ui/button'
import { config } from '~/config'

export const Hero = () => {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			{/* Background effects */}
			<GridBackground />
			<Particles count={40} />

			{/* Animated gradient orbs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="absolute -left-40 top-1/4 h-80 w-80 animate-pulse rounded-full bg-neon/20 blur-[100px]" />
				<div
					className="absolute -right-40 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-cyber/20 blur-[120px]"
					style={{ animationDelay: '1s' }}
				/>
				<div
					className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-electric/10 blur-[80px]"
					style={{ animationDelay: '2s' }}
				/>
			</div>

			{/* Corner decorations */}
			<div className="pointer-events-none absolute inset-6 md:inset-12">
				<svg className="absolute left-0 top-0 h-24 w-24 text-neon/30" viewBox="0 0 100 100">
					<path d="M0 30 L0 0 L30 0" fill="none" stroke="currentColor" strokeWidth="2" />
					<circle cx="0" cy="0" r="3" fill="currentColor" />
				</svg>
				<svg className="absolute right-0 top-0 h-24 w-24 text-cyber/30" viewBox="0 0 100 100">
					<path d="M100 30 L100 0 L70 0" fill="none" stroke="currentColor" strokeWidth="2" />
					<circle cx="100" cy="0" r="3" fill="currentColor" />
				</svg>
				<svg className="absolute bottom-0 left-0 h-24 w-24 text-cyber/30" viewBox="0 0 100 100">
					<path d="M0 70 L0 100 L30 100" fill="none" stroke="currentColor" strokeWidth="2" />
					<circle cx="0" cy="100" r="3" fill="currentColor" />
				</svg>
				<svg className="absolute bottom-0 right-0 h-24 w-24 text-neon/30" viewBox="0 0 100 100">
					<path d="M100 70 L100 100 L70 100" fill="none" stroke="currentColor" strokeWidth="2" />
					<circle cx="100" cy="100" r="3" fill="currentColor" />
				</svg>
			</div>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
				{/* Logo */}
				<div className="mb-10 flex justify-center">
					<div className="relative">
						{/* Glow layers */}
						<div
							className="absolute inset-0 rounded-3xl bg-neon/30 blur-2xl animate-pulse"
							style={{ animationDuration: '3s' }}
						/>
						<div
							className="absolute inset-0 rounded-3xl bg-cyber/20 blur-3xl animate-pulse"
							style={{ animationDuration: '4s' }}
						/>

						<img
							src="/hexcuit.png"
							alt="Hexcuit"
							className="relative z-10 h-36 w-36 rounded-3xl shadow-2xl ring-2 ring-neon/20 md:h-44 md:w-44 float"
						/>

						{/* Orbiting ring */}
						<div className="absolute inset-0 -m-4 rounded-full border border-dashed border-neon/20 animate-[spin_20s_linear_infinite]" />
					</div>
				</div>

				{/* Title */}
				<h1 className="mb-8 text-6xl font-black tracking-widest md:text-8xl lg:text-9xl">
					<GlitchText
						className="gradient-text-animated drop-shadow-lg"
						autoGlitch
						glitchInterval={6000}
					>
						HEXCUIT
					</GlitchText>
				</h1>

				{/* Subtitle */}
				<p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
					<span className="font-semibold text-foreground">League of Legends</span> のランク管理と{' '}
					<span className="text-cyber">チームバランシング</span> 機能を提供する
					<br className="hidden sm:block" />
					次世代の <span className="font-semibold text-neon">Discord Bot</span>
				</p>

				{/* CTA */}
				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
					<Button
						asChild
						size="lg"
						className="group relative h-14 overflow-hidden border-2 border-neon bg-neon/10 px-10 text-base font-bold uppercase tracking-wider text-neon backdrop-blur-sm transition-all duration-300 hover:bg-neon hover:text-background hover:shadow-lg hover:shadow-neon/25"
					>
						<a href={config.discord.inviteUrl} target="_blank" rel="noopener noreferrer">
							<span className="relative z-10 flex items-center gap-2">
								<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
									<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
								</svg>
								Botを招待
							</span>
							<div className="absolute inset-0 -z-10 translate-y-full bg-linear-to-t from-neon to-cyber transition-transform duration-300 group-hover:translate-y-0" />
						</a>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="h-14 border-border/50 px-10 text-base font-semibold uppercase tracking-wider backdrop-blur-sm transition-all hover:border-cyber/50 hover:bg-cyber/5"
					>
						<a href={config.discord.serverUrl} target="_blank" rel="noopener noreferrer">
							サポートサーバー
						</a>
					</Button>
				</div>

				{/* Badges */}
				<div className="mt-16 flex flex-wrap items-center justify-center gap-4">
					<Badge icon="open" label="オープンソース" color="neon" />
					<Badge icon="free" label="無料で利用可能" color="cyber" />
					<Badge icon="active" label="アクティブ開発中" color="electric" />
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
				<div className="flex flex-col items-center gap-3">
					<span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground/60">
						Scroll
					</span>
					<div className="relative h-10 w-6 rounded-full border-2 border-muted-foreground/30">
						<div className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 animate-bounce rounded-full bg-neon" />
					</div>
				</div>
			</div>
		</section>
	)
}

const Badge = ({
	icon,
	label,
	color,
}: {
	icon: 'open' | 'free' | 'active'
	label: string
	color: 'neon' | 'cyber' | 'electric'
}) => {
	const colorClasses = {
		neon: 'border-neon/30 bg-neon/5 text-neon',
		cyber: 'border-cyber/30 bg-cyber/5 text-cyber',
		electric: 'border-electric/30 bg-electric/5 text-electric',
	}

	const iconPaths = {
		open: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		free: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
		active:
			'M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
	}

	return (
		<div
			className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm ${colorClasses[color]}`}
		>
			<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
				<path d={iconPaths[icon]} />
			</svg>
			<span>{label}</span>
		</div>
	)
}

import {
	GlitchText,
	GridBackground,
	Particles,
	Magnetic,
	TextReveal,
	ScrollReveal,
} from '~/components/effects'
import { Button } from '~/components/ui/button'
import { config } from '~/config'

export const Hero = () => {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden">
			{/* Background effects */}
			<GridBackground />
			<Particles count={50} />

			{/* Animated gradient orbs */}
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div
					className="absolute top-1/4 -left-40 h-96 w-96 animate-pulse rounded-full bg-neon/20 blur-[120px]"
					style={{ animationDuration: '4s' }}
				/>
				<div
					className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-cyber/20 blur-[150px]"
					style={{ animationDelay: '1s', animationDuration: '5s' }}
				/>
				<div
					className="absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 animate-pulse rounded-full bg-electric/15 blur-[100px]"
					style={{ animationDelay: '2s', animationDuration: '6s' }}
				/>
				{/* Moving orb */}
				<div className="absolute h-40 w-40 animate-[orbit_20s_linear_infinite] rounded-full bg-neon/30 blur-[80px]" />
			</div>

			{/* Geometric decorations */}
			<div className="pointer-events-none absolute inset-6 md:inset-12">
				{/* Corner brackets */}
				<svg className="absolute top-0 left-0 h-32 w-32 text-neon/40" viewBox="0 0 100 100">
					<path d="M0 40 L0 0 L40 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
					<circle cx="0" cy="0" r="4" fill="currentColor" className="animate-pulse" />
					<circle cx="40" cy="0" r="2" fill="currentColor" />
					<circle cx="0" cy="40" r="2" fill="currentColor" />
				</svg>
				<svg className="absolute top-0 right-0 h-32 w-32 text-cyber/40" viewBox="0 0 100 100">
					<path d="M100 40 L100 0 L60 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
					<circle
						cx="100"
						cy="0"
						r="4"
						fill="currentColor"
						className="animate-pulse"
						style={{ animationDelay: '0.5s' }}
					/>
				</svg>
				<svg className="absolute bottom-0 left-0 h-32 w-32 text-cyber/40" viewBox="0 0 100 100">
					<path d="M0 60 L0 100 L40 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
					<circle
						cx="0"
						cy="100"
						r="4"
						fill="currentColor"
						className="animate-pulse"
						style={{ animationDelay: '1s' }}
					/>
				</svg>
				<svg className="absolute right-0 bottom-0 h-32 w-32 text-neon/40" viewBox="0 0 100 100">
					<path d="M100 60 L100 100 L60 100" fill="none" stroke="currentColor" strokeWidth="1.5" />
					<circle
						cx="100"
						cy="100"
						r="4"
						fill="currentColor"
						className="animate-pulse"
						style={{ animationDelay: '1.5s' }}
					/>
				</svg>

				{/* Floating lines */}
				<div className="absolute top-1/4 left-1/4 h-px w-24 origin-left animate-[scale-x_3s_ease-in-out_infinite] bg-gradient-to-r from-neon/50 to-transparent" />
				<div
					className="absolute right-1/4 bottom-1/3 h-px w-32 origin-right animate-[scale-x_4s_ease-in-out_infinite] bg-gradient-to-l from-cyber/50 to-transparent"
					style={{ animationDelay: '1s' }}
				/>
			</div>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
				{/* Logo */}
				<ScrollReveal direction="scale" duration={1} className="mb-10 flex justify-center">
					<Magnetic strength={0.15} radius={150}>
						<div className="relative">
							{/* Multi-layer glow */}
							<div
								className="absolute inset-0 animate-pulse rounded-3xl bg-neon/40 blur-3xl"
								style={{ animationDuration: '3s' }}
							/>
							<div
								className="absolute inset-0 animate-pulse rounded-3xl bg-cyber/30 blur-[60px]"
								style={{ animationDuration: '4s', animationDelay: '1s' }}
							/>
							<div className="absolute -inset-4 animate-[spin_30s_linear_infinite] rounded-[2rem] border border-neon/20" />
							<div className="absolute -inset-8 animate-[spin_40s_linear_infinite_reverse] rounded-[2.5rem] border border-dashed border-cyber/10" />

							<img
								src="/hexcuit.png"
								alt="Hexcuit"
								className="float relative z-10 h-40 w-40 rounded-3xl shadow-2xl ring-2 ring-neon/30 transition-transform duration-500 hover:scale-105 md:h-48 md:w-48"
							/>

							{/* Pulsing ring */}
							<div
								className="absolute inset-0 -m-2 animate-ping rounded-[1.75rem] border-2 border-neon/30"
								style={{ animationDuration: '2s' }}
							/>
						</div>
					</Magnetic>
				</ScrollReveal>

				{/* Title */}
				<h1 className="mb-8 text-6xl font-black tracking-[0.15em] md:text-8xl lg:text-9xl">
					<GlitchText
						className="gradient-text-animated drop-shadow-lg"
						autoGlitch
						glitchInterval={5000}
						intensity="intense"
					>
						HEXCUIT
					</GlitchText>
				</h1>

				{/* Subtitle with text reveal */}
				<div className="mx-auto mb-12 max-w-2xl">
					<p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
						<TextReveal
							animation="slide-up"
							stagger={0.01}
							trigger="scroll"
							className="font-semibold text-foreground"
						>
							League of Legends
						</TextReveal>{' '}
						<TextReveal animation="fade" delay={0.3} trigger="scroll">
							のランク管理と
						</TextReveal>{' '}
						<TextReveal
							animation="slide-up"
							delay={0.5}
							trigger="scroll"
							className="font-medium text-cyber"
						>
							チームバランシング
						</TextReveal>{' '}
						<TextReveal animation="fade" delay={0.7} trigger="scroll">
							機能を提供する
						</TextReveal>
						<br className="hidden sm:block" />
						<TextReveal animation="slide-up" delay={0.9} trigger="scroll">
							次世代の
						</TextReveal>{' '}
						<TextReveal
							animation="blur"
							delay={1.1}
							trigger="scroll"
							className="font-semibold text-neon"
						>
							Discord Bot
						</TextReveal>
					</p>
				</div>

				{/* CTA */}
				<ScrollReveal
					direction="up"
					delay={0.3}
					className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
				>
					<Magnetic strength={0.2}>
						<Button
							asChild
							size="lg"
							className="group relative h-14 overflow-hidden border-2 border-neon bg-neon/10 px-10 text-base font-bold tracking-wider text-neon uppercase backdrop-blur-sm transition-all duration-500 hover:bg-neon hover:text-background hover:shadow-[0_0_30px_var(--neon-glow)] active:scale-95"
						>
							<a href={config.discord.inviteUrl} target="_blank" rel="noopener noreferrer">
								<span className="relative z-10 flex items-center gap-2">
									<svg
										className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
									</svg>
									Botを招待
								</span>
								<div className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-t from-neon via-neon to-cyber transition-transform duration-500 group-hover:translate-y-0" />
							</a>
						</Button>
					</Magnetic>
					<Magnetic strength={0.15}>
						<Button
							asChild
							variant="outline"
							size="lg"
							className="h-14 border-border/50 px-10 text-base font-semibold tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:border-cyber/50 hover:bg-cyber/5 hover:shadow-[0_0_20px_var(--cyber-glow)] active:scale-95"
						>
							<a href={config.discord.serverUrl} target="_blank" rel="noopener noreferrer">
								サポートサーバー
							</a>
						</Button>
					</Magnetic>
				</ScrollReveal>

				{/* Badges */}
				<ScrollReveal
					direction="up"
					delay={0.5}
					className="mt-16 flex flex-wrap items-center justify-center gap-4"
				>
					<Badge icon="open" label="オープンソース" color="neon" delay={0} />
					<Badge icon="free" label="無料で利用可能" color="cyber" delay={0.1} />
					<Badge icon="active" label="アクティブ開発中" color="electric" delay={0.2} />
				</ScrollReveal>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2">
				<ScrollReveal direction="fade" delay={1.5}>
					<div className="flex flex-col items-center gap-3">
						<span className="font-mono text-xs tracking-[0.3em] text-muted-foreground/60 uppercase">
							Scroll
						</span>
						<div className="relative h-12 w-7 rounded-full border-2 border-muted-foreground/30 p-1">
							<div className="h-2 w-full animate-[scroll-indicator_2s_ease-in-out_infinite] rounded-full bg-neon" />
						</div>
					</div>
				</ScrollReveal>
			</div>
		</section>
	)
}

const Badge = ({
	icon,
	label,
	color,
	delay,
}: {
	icon: 'open' | 'free' | 'active'
	label: string
	color: 'neon' | 'cyber' | 'electric'
	delay: number
}) => {
	const colorClasses = {
		neon: 'border-neon/30 bg-neon/5 text-neon hover:bg-neon/10 hover:border-neon/50 hover:shadow-[0_0_15px_var(--neon-glow)]',
		cyber:
			'border-cyber/30 bg-cyber/5 text-cyber hover:bg-cyber/10 hover:border-cyber/50 hover:shadow-[0_0_15px_var(--cyber-glow)]',
		electric:
			'border-electric/30 bg-electric/5 text-electric hover:bg-electric/10 hover:border-electric/50',
	}

	const iconPaths = {
		open: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
		free: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z',
		active:
			'M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z',
	}

	return (
		<Magnetic strength={0.1}>
			<div
				className={`flex cursor-default items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-all duration-300 ${colorClasses[color]}`}
				style={{ animationDelay: `${delay}s` }}
			>
				<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
					<path d={iconPaths[icon]} />
				</svg>
				<span>{label}</span>
			</div>
		</Magnetic>
	)
}

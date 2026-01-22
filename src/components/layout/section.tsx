import type { ReactNode } from 'react'

import { ScrollReveal, TextReveal } from '~/components/effects'
import { cn } from '~/lib/utils'

interface SectionProps {
	children: ReactNode
	className?: string
	title?: string
	subtitle?: string
	id?: string
}

export const Section = ({ children, className, title, subtitle, id }: SectionProps) => {
	return (
		<section id={id} className={cn('relative px-4 py-24 md:py-32', className)}>
			{/* Animated side decorations */}
			<div className="pointer-events-none absolute inset-y-0 left-0 w-px overflow-hidden">
				<div className="h-full w-full animate-[shimmer-v_8s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-neon/30 to-transparent" />
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-px overflow-hidden">
				<div className="h-full w-full animate-[shimmer-v_8s_ease-in-out_infinite_reverse] bg-gradient-to-b from-transparent via-cyber/30 to-transparent" />
			</div>

			{/* Animated corner accents */}
			<div className="pointer-events-none absolute top-4 left-4 md:top-8 md:left-8">
				<div className="relative h-16 w-16">
					<div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-neon/40 to-transparent" />
					<div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-neon/40 to-transparent" />
					<div className="absolute top-0 left-0 h-2 w-2 animate-pulse rounded-full bg-neon/50" />
				</div>
			</div>
			<div className="pointer-events-none absolute right-4 bottom-4 md:right-8 md:bottom-8">
				<div className="relative h-16 w-16">
					<div className="absolute right-0 bottom-0 h-full w-0.5 bg-gradient-to-t from-cyber/40 to-transparent" />
					<div className="absolute right-0 bottom-0 h-0.5 w-full bg-gradient-to-l from-cyber/40 to-transparent" />
					<div
						className="absolute right-0 bottom-0 h-2 w-2 animate-pulse rounded-full bg-cyber/50"
						style={{ animationDelay: '1s' }}
					/>
				</div>
			</div>

			<div className="mx-auto max-w-6xl">
				{title && (
					<div className="mb-16 text-center">
						{/* Section label with animation */}
						<ScrollReveal direction="fade" duration={0.6}>
							<div className="mb-4 flex items-center justify-center gap-3">
								<div className="h-px w-8 bg-gradient-to-r from-transparent to-neon/50" />
								<span className="font-mono text-xs tracking-[0.3em] text-neon/70 uppercase">
									Section
								</span>
								<div className="h-px w-8 bg-gradient-to-l from-transparent to-neon/50" />
							</div>
						</ScrollReveal>

						{/* Title with text reveal */}
						<h2 className="mb-4 text-4xl font-black tracking-wider md:text-5xl">
							<TextReveal animation="slide-up" type="chars" stagger={0.02} trigger="scroll">
								{title}
							</TextReveal>
						</h2>

						{/* Subtitle */}
						{subtitle && (
							<ScrollReveal direction="up" delay={0.3}>
								<p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
							</ScrollReveal>
						)}

						{/* Decorative line with animation */}
						<ScrollReveal direction="scale" delay={0.4}>
							<div className="mx-auto mt-6 flex items-center justify-center gap-2">
								<div className="h-1 w-1 animate-pulse rounded-full bg-neon/50" />
								<div className="h-px w-16 bg-gradient-to-r from-neon/50 to-cyber/50" />
								<div className="h-2 w-2 rotate-45 animate-[spin_10s_linear_infinite] border border-primary/50" />
								<div className="h-px w-16 bg-gradient-to-r from-cyber/50 to-neon/50" />
								<div
									className="h-1 w-1 animate-pulse rounded-full bg-cyber/50"
									style={{ animationDelay: '0.5s' }}
								/>
							</div>
						</ScrollReveal>
					</div>
				)}
				<div>{children}</div>
			</div>
		</section>
	)
}

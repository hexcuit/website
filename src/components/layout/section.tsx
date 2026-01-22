import type { ReactNode } from 'react'

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
			{/* Side decorations */}
			<div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-neon/20 to-transparent" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-cyber/20 to-transparent" />

			{/* Corner accents */}
			<div className="pointer-events-none absolute left-4 top-4 h-12 w-12 border-l-2 border-t-2 border-neon/20 md:left-8 md:top-8" />
			<div className="pointer-events-none absolute bottom-4 right-4 h-12 w-12 border-b-2 border-r-2 border-cyber/20 md:bottom-8 md:right-8" />

			<div className="mx-auto max-w-6xl">
				{title && (
					<div className="mb-16 text-center">
						{/* Section label */}
						<div className="mb-4 flex items-center justify-center gap-3">
							<div className="h-px w-8 bg-gradient-to-r from-transparent to-neon/50" />
							<span className="font-mono text-xs uppercase tracking-[0.3em] text-neon/70">
								Section
							</span>
							<div className="h-px w-8 bg-gradient-to-l from-transparent to-neon/50" />
						</div>

						{/* Title */}
						<h2 className="mb-4 text-4xl font-black tracking-wider md:text-5xl">{title}</h2>

						{/* Subtitle */}
						{subtitle && <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>}

						{/* Decorative line */}
						<div className="mx-auto mt-6 flex items-center justify-center gap-2">
							<div className="h-1 w-1 rounded-full bg-neon/50" />
							<div className="h-px w-16 bg-gradient-to-r from-neon/50 to-cyber/50" />
							<div className="h-2 w-2 rotate-45 border border-primary/50" />
							<div className="h-px w-16 bg-gradient-to-r from-cyber/50 to-neon/50" />
							<div className="h-1 w-1 rounded-full bg-cyber/50" />
						</div>
					</div>
				)}
				<div>{children}</div>
			</div>
		</section>
	)
}

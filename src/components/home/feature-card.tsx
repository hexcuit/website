import { Award, Scale, Swords, Users } from 'lucide-react'

import { cn } from '~/lib/utils'

interface FeatureCardProps {
	title: string
	description: string
	icon?: 'rank' | 'balance' | 'queue' | 'stats'
	index?: number
}

const iconMap = {
	rank: Award,
	balance: Scale,
	queue: Users,
	stats: Swords,
}

export const FeatureCard = ({ title, description, icon, index = 0 }: FeatureCardProps) => {
	const Icon = icon ? iconMap[icon] : null

	const accentColors = ['neon', 'cyber', 'electric', 'neon'] as const
	const accent = accentColors[index % 4]

	return (
		<div className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
			{/* Top gradient line */}
			<div
				className={cn(
					'absolute left-0 right-0 top-0 h-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100',
					accent === 'neon' && 'bg-linear-to-r from-transparent via-neon to-transparent',
					accent === 'cyber' && 'bg-linear-to-r from-transparent via-cyber to-transparent',
					accent === 'electric' && 'bg-linear-to-r from-transparent via-electric to-transparent',
				)}
			/>

			{/* Corner decorations */}
			<div className="absolute right-0 top-0">
				<svg
					className={cn(
						'h-16 w-16 transition-colors duration-300',
						accent === 'neon' && 'text-neon/20 group-hover:text-neon/40',
						accent === 'cyber' && 'text-cyber/20 group-hover:text-cyber/40',
						accent === 'electric' && 'text-electric/20 group-hover:text-electric/40',
					)}
					viewBox="0 0 100 100"
				>
					<path d="M100 0 L100 40 L95 40 L95 5 L60 5 L60 0 Z" fill="currentColor" />
				</svg>
			</div>
			<div className="absolute bottom-0 left-0">
				<svg
					className={cn(
						'h-16 w-16 transition-colors duration-300',
						accent === 'neon' && 'text-neon/20 group-hover:text-neon/40',
						accent === 'cyber' && 'text-cyber/20 group-hover:text-cyber/40',
						accent === 'electric' && 'text-electric/20 group-hover:text-electric/40',
					)}
					viewBox="0 0 100 100"
				>
					<path d="M0 100 L0 60 L5 60 L5 95 L40 95 L40 100 Z" fill="currentColor" />
				</svg>
			</div>

			{/* Icon */}
			{Icon && (
				<div
					className={cn(
						'mb-5 flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300',
						accent === 'neon' &&
							'border-neon/20 bg-neon/5 group-hover:border-neon/40 group-hover:shadow-lg group-hover:shadow-neon/20',
						accent === 'cyber' &&
							'border-cyber/20 bg-cyber/5 group-hover:border-cyber/40 group-hover:shadow-lg group-hover:shadow-cyber/20',
						accent === 'electric' &&
							'border-electric/20 bg-electric/5 group-hover:border-electric/40 group-hover:shadow-lg group-hover:shadow-electric/20',
					)}
				>
					<Icon
						className={cn(
							'h-7 w-7 transition-colors duration-300',
							accent === 'neon' && 'text-neon/70 group-hover:text-neon',
							accent === 'cyber' && 'text-cyber/70 group-hover:text-cyber',
							accent === 'electric' && 'text-electric/70 group-hover:text-electric',
						)}
					/>
				</div>
			)}

			{/* Content */}
			<h3 className="mb-3 font-display text-lg font-bold tracking-wider">{title}</h3>
			<p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

			{/* Index number */}
			<div
				className={cn(
					'absolute bottom-4 right-4 font-mono text-4xl font-bold opacity-5 transition-opacity duration-300 group-hover:opacity-10',
					accent === 'neon' && 'text-neon',
					accent === 'cyber' && 'text-cyber',
					accent === 'electric' && 'text-electric',
				)}
			>
				0{index + 1}
			</div>
		</div>
	)
}

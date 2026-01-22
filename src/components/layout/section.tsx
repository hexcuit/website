import { useEffect, useRef, useState, type ReactNode } from 'react'

import { ScrollReveal } from '~/components/effects/scroll-reveal'
import { TextReveal } from '~/components/effects/text-reveal'
import { cn } from '~/lib/utils'

interface SectionProps {
	children: ReactNode
	className?: string
	title?: string
	subtitle?: string
	id?: string
	icon?: string
	variant?: 'default' | 'alt'
}

export const Section = ({
	children,
	className,
	title,
	subtitle,
	id,
	variant = 'default',
}: SectionProps) => {
	const sectionRef = useRef<HTMLElement>(null)
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
	const [isInView, setIsInView] = useState(false)

	// Track mouse position for ambient glow
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!sectionRef.current) return
		const rect = sectionRef.current.getBoundingClientRect()
		setMousePosition({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		})
	}

	// Track visibility for animations
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true)
				}
			},
			{ threshold: 0.1 },
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<section
			ref={sectionRef}
			id={id}
			onMouseMove={handleMouseMove}
			className={cn(
				'relative overflow-hidden px-4 py-20 md:py-28',
				variant === 'alt' && 'bg-surface/30',
				className,
			)}
		>
			{/* Mouse-following ambient glow */}
			<div
				className={cn(
					'pointer-events-none absolute h-125 w-125 rounded-full blur-[150px] transition-all duration-300',
					variant === 'alt' ? 'bg-cyber/5' : 'bg-neon/5',
				)}
				style={{
					left: mousePosition.x - 250,
					top: mousePosition.y - 250,
					opacity: isInView ? 0.5 : 0,
				}}
			/>

			{/* Animated side decorations */}
			<div className="pointer-events-none absolute inset-y-0 left-0 w-px overflow-hidden">
				<div
					className={cn(
						'h-full w-full animate-[shimmer-v_8s_ease-in-out_infinite] bg-linear-to-b from-transparent to-transparent',
						variant === 'alt' ? 'via-cyber/30' : 'via-neon/30',
					)}
				/>
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-px overflow-hidden">
				<div
					className={cn(
						'h-full w-full animate-[shimmer-v_8s_ease-in-out_infinite_reverse] bg-linear-to-b from-transparent to-transparent',
						variant === 'alt' ? 'via-neon/30' : 'via-cyber/30',
					)}
				/>
			</div>

			{/* Animated corner accents with enhanced styling */}
			<div className="pointer-events-none absolute top-4 left-4 md:top-8 md:left-8">
				<div className="relative h-16 w-16 md:h-20 md:w-20">
					<svg viewBox="0 0 100 100" className="h-full w-full">
						{/* Outer bracket */}
						<path
							d="M0 60 L0 0 L60 0"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							className={cn(
								'transition-all duration-700',
								variant === 'alt' ? 'text-cyber/40' : 'text-neon/40',
								isInView ? 'opacity-100' : 'opacity-0',
							)}
							style={{
								strokeDasharray: 200,
								strokeDashoffset: isInView ? 0 : 200,
								transition: 'stroke-dashoffset 1s ease-out',
							}}
						/>
						{/* Pulsing dot */}
						<circle
							cx="0"
							cy="0"
							r="4"
							fill="currentColor"
							className={cn('animate-pulse', variant === 'alt' ? 'text-cyber/60' : 'text-neon/60')}
						/>
					</svg>
				</div>
			</div>
			<div className="pointer-events-none absolute right-4 bottom-4 md:right-8 md:bottom-8">
				<div className="relative h-16 w-16 md:h-20 md:w-20">
					<svg viewBox="0 0 100 100" className="h-full w-full">
						<path
							d="M100 40 L100 100 L40 100"
							fill="none"
							stroke="currentColor"
							strokeWidth="1"
							className={cn(
								'transition-all duration-700',
								variant === 'alt' ? 'text-neon/40' : 'text-cyber/40',
								isInView ? 'opacity-100' : 'opacity-0',
							)}
							style={{
								strokeDasharray: 200,
								strokeDashoffset: isInView ? 0 : 200,
								transition: 'stroke-dashoffset 1s ease-out 0.3s',
							}}
						/>
						<circle
							cx="100"
							cy="100"
							r="4"
							fill="currentColor"
							className={cn('animate-pulse', variant === 'alt' ? 'text-neon/60' : 'text-cyber/60')}
							style={{ animationDelay: '1s' }}
						/>
					</svg>
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-6xl">
				{title && (
					<div className="mb-12 text-center">
						{/* Title with text reveal */}
						<h2 className="mb-4 text-3xl font-bold tracking-wide md:text-4xl">
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
						<ScrollReveal direction="scale" delay={0.2}>
							<div className="mx-auto mt-6 flex items-center justify-center gap-2">
								<div
									className={cn(
										'h-1 w-1 animate-pulse rounded-full',
										variant === 'alt' ? 'bg-cyber/50' : 'bg-neon/50',
									)}
								/>
								<div
									className={cn(
										'h-px w-12 bg-linear-to-r',
										variant === 'alt' ? 'from-cyber/50 to-neon/50' : 'from-neon/50 to-cyber/50',
									)}
								/>
								<div className="relative h-2 w-2">
									<div className="absolute inset-0 rotate-45 animate-[spin_10s_linear_infinite] border border-primary/50" />
								</div>
								<div
									className={cn(
										'h-px w-12 bg-linear-to-r',
										variant === 'alt' ? 'from-neon/50 to-cyber/50' : 'from-cyber/50 to-neon/50',
									)}
								/>
								<div
									className={cn(
										'h-1 w-1 animate-pulse rounded-full',
										variant === 'alt' ? 'bg-neon/50' : 'bg-cyber/50',
									)}
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

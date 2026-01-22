'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Award, Scale, Swords, Users } from 'lucide-react'
import { useRef, useState } from 'react'

import { TiltCard } from '~/components/effects/magnetic'
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
	const cardRef = useRef<HTMLDivElement>(null)
	const glowRef = useRef<HTMLDivElement>(null)
	const shimmerRef = useRef<HTMLDivElement>(null)
	const iconRef = useRef<HTMLDivElement>(null)
	const particlesRef = useRef<HTMLDivElement>(null)
	const [isHovered, setIsHovered] = useState(false)

	const accentColors = ['neon', 'cyber', 'electric', 'neon'] as const
	const accent = accentColors[index % 4]

	const accentColorValues = {
		neon: 'rgb(0, 255, 136)',
		cyber: 'rgb(0, 212, 255)',
		electric: 'rgb(157, 0, 255)',
	}

	// Mouse follow glow effect
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!cardRef.current || !glowRef.current) return
		const rect = cardRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		gsap.to(glowRef.current, {
			x: x - 100,
			y: y - 100,
			duration: 0.3,
			ease: 'power2.out',
		})
	}

	// Icon float animation
	useGSAP(() => {
		if (!iconRef.current) return

		gsap.to(iconRef.current, {
			y: -5,
			duration: 2,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
		})
	}, [])

	// Hover animations
	const handleMouseEnter = () => {
		setIsHovered(true)

		// Shimmer animation
		if (shimmerRef.current) {
			gsap.fromTo(
				shimmerRef.current,
				{ x: '-100%', opacity: 0 },
				{
					x: '200%',
					opacity: 1,
					duration: 0.8,
					ease: 'power2.inOut',
				},
			)
		}

		// Icon pulse
		if (iconRef.current) {
			gsap.to(iconRef.current, {
				scale: 1.1,
				duration: 0.3,
				ease: 'back.out(2)',
			})
		}

		// Spawn particles
		if (particlesRef.current) {
			const particles = particlesRef.current.children
			Array.from(particles).forEach((particle, i) => {
				gsap.fromTo(
					particle,
					{
						opacity: 0,
						scale: 0,
						x: 0,
						y: 0,
					},
					{
						opacity: 1,
						scale: 1,
						x: (Math.random() - 0.5) * 100,
						y: (Math.random() - 0.5) * 100,
						duration: 0.5,
						delay: i * 0.05,
						ease: 'power2.out',
					},
				)
				gsap.to(particle, {
					opacity: 0,
					scale: 0,
					duration: 0.3,
					delay: 0.5 + i * 0.05,
				})
			})
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)

		if (iconRef.current) {
			gsap.to(iconRef.current, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<TiltCard maxTilt={8} glare className="h-full">
			<div
				ref={cardRef}
				onMouseMove={handleMouseMove}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="group relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/60 p-6 backdrop-blur-md transition-colors duration-300 hover:border-primary/30"
			>
				{/* Mouse follow glow */}
				<div
					ref={glowRef}
					className={cn(
						'pointer-events-none absolute h-50 w-50 rounded-full opacity-0 blur-3xl transition-opacity duration-300',
						isHovered && 'opacity-30',
						accent === 'neon' && 'bg-neon',
						accent === 'cyber' && 'bg-cyber',
						accent === 'electric' && 'bg-electric',
					)}
					style={{ transform: 'translate(-50%, -50%)' }}
				/>

				{/* Shimmer effect */}
				<div
					ref={shimmerRef}
					className="pointer-events-none absolute inset-0 -translate-x-full opacity-0"
					style={{
						background: `linear-gradient(90deg, transparent, ${accentColorValues[accent]}20, transparent)`,
						width: '50%',
					}}
				/>

				{/* Animated border */}
				<div className="absolute inset-0 rounded-2xl">
					{/* Top line */}
					<div
						className={cn(
							'absolute top-0 left-0 h-px bg-linear-to-r from-transparent to-transparent transition-all duration-500',
							isHovered ? 'w-full' : 'w-0',
							accent === 'neon' && 'via-neon',
							accent === 'cyber' && 'via-cyber',
							accent === 'electric' && 'via-electric',
						)}
					/>
					{/* Right line */}
					<div
						className={cn(
							'absolute top-0 right-0 w-px bg-linear-to-b from-transparent to-transparent transition-all delay-100 duration-500',
							isHovered ? 'h-full' : 'h-0',
							accent === 'neon' && 'via-neon',
							accent === 'cyber' && 'via-cyber',
							accent === 'electric' && 'via-electric',
						)}
					/>
					{/* Bottom line */}
					<div
						className={cn(
							'absolute right-0 bottom-0 h-px bg-linear-to-l from-transparent to-transparent transition-all delay-200 duration-500',
							isHovered ? 'w-full' : 'w-0',
							accent === 'neon' && 'via-neon',
							accent === 'cyber' && 'via-cyber',
							accent === 'electric' && 'via-electric',
						)}
					/>
					{/* Left line */}
					<div
						className={cn(
							'absolute bottom-0 left-0 w-px bg-linear-to-t from-transparent to-transparent transition-all delay-300 duration-500',
							isHovered ? 'h-full' : 'h-0',
							accent === 'neon' && 'via-neon',
							accent === 'cyber' && 'via-cyber',
							accent === 'electric' && 'via-electric',
						)}
					/>
				</div>

				{/* Corner decorations */}
				<div className="absolute top-0 right-0 overflow-hidden">
					<svg
						className={cn(
							'h-20 w-20 transition-all duration-500',
							isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-20',
							accent === 'neon' && 'text-neon',
							accent === 'cyber' && 'text-cyber',
							accent === 'electric' && 'text-electric',
						)}
						viewBox="0 0 100 100"
					>
						<path d="M100 0 L100 40 L95 40 L95 5 L60 5 L60 0 Z" fill="currentColor" />
						<path
							d="M100 0 L100 25 L95 25 L95 5 L75 5 L75 0 Z"
							fill="currentColor"
							className={cn(
								'transition-opacity duration-300',
								isHovered ? 'opacity-100' : 'opacity-0',
							)}
						/>
					</svg>
				</div>

				{/* Particles on hover */}
				<div ref={particlesRef} className="pointer-events-none absolute inset-0">
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className={cn(
								'absolute top-1/2 left-1/2 h-1 w-1 rounded-full opacity-0',
								accent === 'neon' && 'bg-neon',
								accent === 'cyber' && 'bg-cyber',
								accent === 'electric' && 'bg-electric',
							)}
						/>
					))}
				</div>

				{/* Scan line effect */}
				<div
					className={cn(
						'pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300',
						isHovered && 'opacity-100',
					)}
				>
					<div
						className={cn(
							'absolute h-px w-full animate-[scan_2s_linear_infinite]',
							accent === 'neon' && 'bg-neon/30',
							accent === 'cyber' && 'bg-cyber/30',
							accent === 'electric' && 'bg-electric/30',
						)}
						style={{
							boxShadow: `0 0 10px ${accentColorValues[accent]}`,
						}}
					/>
				</div>

				{/* Icon */}
				{Icon && (
					<div
						ref={iconRef}
						className={cn(
							'relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300',
							accent === 'neon' && 'border-neon/30 bg-neon/10',
							accent === 'cyber' && 'border-cyber/30 bg-cyber/10',
							accent === 'electric' && 'border-electric/30 bg-electric/10',
							isHovered && accent === 'neon' && 'border-neon/60 shadow-lg shadow-neon/30',
							isHovered && accent === 'cyber' && 'border-cyber/60 shadow-lg shadow-cyber/30',
							isHovered &&
								accent === 'electric' &&
								'border-electric/60 shadow-lg shadow-electric/30',
						)}
					>
						{/* Icon glow ring */}
						<div
							className={cn(
								'absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
								isHovered && 'animate-pulse opacity-100',
								accent === 'neon' && 'shadow-[inset_0_0_20px_rgba(0,255,136,0.3)]',
								accent === 'cyber' && 'shadow-[inset_0_0_20px_rgba(0,212,255,0.3)]',
								accent === 'electric' && 'shadow-[inset_0_0_20px_rgba(157,0,255,0.3)]',
							)}
						/>
						<Icon
							className={cn(
								'relative z-10 h-7 w-7 transition-all duration-300',
								accent === 'neon' && 'text-neon',
								accent === 'cyber' && 'text-cyber',
								accent === 'electric' && 'text-electric',
								isHovered && 'drop-shadow-lg',
							)}
						/>
					</div>
				)}

				{/* Content */}
				<h3
					className={cn(
						'relative z-10 mb-3 font-display text-lg font-bold tracking-wider transition-colors duration-300',
						isHovered &&
							accent === 'neon' &&
							'text-neon drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]',
						isHovered &&
							accent === 'cyber' &&
							'text-cyber drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]',
						isHovered &&
							accent === 'electric' &&
							'text-electric drop-shadow-[0_0_10px_rgba(157,0,255,0.5)]',
					)}
				>
					{title}
				</h3>
				<p className="relative z-10 text-sm leading-relaxed text-muted-foreground">{description}</p>

				{/* Index number with glitch effect */}
				<div
					className={cn(
						'absolute right-4 bottom-4 font-mono text-5xl font-bold transition-all duration-300',
						isHovered ? 'opacity-20' : 'opacity-5',
						accent === 'neon' && 'text-neon',
						accent === 'cyber' && 'text-cyber',
						accent === 'electric' && 'text-electric',
					)}
					style={
						isHovered
							? {
									textShadow: `2px 0 ${accentColorValues[accent]}, -2px 0 ${accentColorValues[accent === 'neon' ? 'cyber' : 'neon']}`,
								}
							: undefined
					}
				>
					0{index + 1}
				</div>

				{/* Data stream decoration */}
				<div
					className={cn(
						'absolute right-4 bottom-0 left-4 flex h-6 items-center gap-1 overflow-hidden opacity-0 transition-opacity duration-300',
						isHovered && 'opacity-40',
					)}
				>
					{[...Array(20)].map((_, i) => (
						<div
							key={i}
							className={cn(
								'h-0.5 rounded-full',
								accent === 'neon' && 'bg-neon',
								accent === 'cyber' && 'bg-cyber',
								accent === 'electric' && 'bg-electric',
							)}
							style={{
								width: Math.random() * 20 + 5,
								opacity: Math.random() * 0.5 + 0.3,
								animation: `pulse ${Math.random() * 2 + 1}s infinite`,
							}}
						/>
					))}
				</div>
			</div>
		</TiltCard>
	)
}

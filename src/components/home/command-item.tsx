'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Check, ChevronRight, Copy, Terminal } from 'lucide-react'
import { useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface CommandItemProps {
	command: string
	description: string
	index?: number
}

export const CommandItem = ({ command, description, index = 0 }: CommandItemProps) => {
	const [copied, setCopied] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)
	const glowRef = useRef<HTMLDivElement>(null)
	const chevronRef = useRef<HTMLDivElement>(null)
	const codeRef = useRef<HTMLElement>(null)
	const scanLineRef = useRef<HTMLDivElement>(null)
	const borderRef = useRef<HTMLDivElement>(null)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(command)
		setCopied(true)

		// Copy success animation
		if (containerRef.current) {
			gsap.fromTo(
				containerRef.current,
				{ boxShadow: '0 0 0 0 rgba(0, 255, 136, 0)' },
				{
					boxShadow: '0 0 30px 5px rgba(0, 255, 136, 0.3)',
					duration: 0.3,
					yoyo: true,
					repeat: 1,
				},
			)
		}

		setTimeout(() => setCopied(false), 2000)
	}

	// Mouse follow glow
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!containerRef.current || !glowRef.current) return
		const rect = containerRef.current.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		gsap.to(glowRef.current, {
			x: x - 75,
			y: y - 75,
			duration: 0.2,
			ease: 'power2.out',
		})
	}

	// Hover animations
	const handleMouseEnter = () => {
		setIsHovered(true)

		// Chevron animation
		if (chevronRef.current) {
			gsap.to(chevronRef.current, {
				x: 8,
				scale: 1.2,
				duration: 0.3,
				ease: 'back.out(2)',
			})
		}

		// Code text glitch
		if (codeRef.current) {
			const originalText = command
			const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
			let iterations = 0

			const glitchInterval = setInterval(() => {
				if (!codeRef.current) return

				codeRef.current.textContent = originalText
					.split('')
					.map((_char, i) => {
						if (i < iterations) return originalText[i]
						return chars[Math.floor(Math.random() * chars.length)]
					})
					.join('')

				iterations += 1

				if (iterations > originalText.length) {
					clearInterval(glitchInterval)
					if (codeRef.current) codeRef.current.textContent = originalText
				}
			}, 30)
		}

		// Scan line animation
		if (scanLineRef.current) {
			gsap.fromTo(
				scanLineRef.current,
				{ top: 0, opacity: 0.5 },
				{
					top: '100%',
					opacity: 0,
					duration: 0.8,
					ease: 'none',
				},
			)
		}

		// Border beam animation
		if (borderRef.current) {
			gsap.to(borderRef.current, {
				'--beam-position': '100%',
				duration: 1,
				ease: 'none',
			})
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)

		if (chevronRef.current) {
			gsap.to(chevronRef.current, {
				x: 0,
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		if (codeRef.current) {
			codeRef.current.textContent = command
		}
	}

	// Floating animation for terminal icon
	useGSAP(() => {
		if (index === 0) return // Only animate some items for variety

		const container = containerRef.current
		if (!container) return

		gsap.to(container, {
			y: -2,
			duration: 2 + index * 0.5,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
		})
	}, [index])

	return (
		<div
			ref={containerRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm transition-colors duration-300 hover:border-neon/30 hover:bg-card/60"
		>
			{/* Mouse follow glow */}
			<div
				ref={glowRef}
				className={cn(
					'pointer-events-none absolute h-37.5 w-37.5 rounded-full bg-neon/20 opacity-0 blur-2xl transition-opacity duration-300',
					isHovered && 'opacity-100',
				)}
			/>

			{/* Scan line effect */}
			<div
				ref={scanLineRef}
				className="pointer-events-none absolute right-0 left-0 h-px bg-linear-to-r from-transparent via-neon to-transparent opacity-0"
				style={{ boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' }}
			/>

			{/* Left accent bar with gradient animation */}
			<div className="absolute top-0 bottom-0 left-0 w-1 overflow-hidden">
				<div
					className={cn(
						'h-full w-full transition-all duration-500',
						isHovered
							? 'animate-[gradient-y_2s_linear_infinite] bg-linear-to-b from-neon via-cyber to-neon'
							: 'bg-linear-to-b from-neon/30 via-cyber/30 to-neon/30',
					)}
				/>
			</div>

			{/* Border beam effect */}
			<div
				ref={borderRef}
				className={cn(
					'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300',
					isHovered && 'opacity-100',
				)}
				style={{
					background: `linear-gradient(90deg, transparent, rgba(0, 255, 136, 0.5), transparent)`,
					backgroundSize: '200% 100%',
					backgroundPosition: 'var(--beam-position, 0%) 0',
					maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					maskComposite: 'exclude',
					padding: '1px',
				}}
			/>

			{/* Content */}
			<div className="relative flex items-center gap-4 px-5 py-4 pl-6">
				{/* Terminal icon - only show on first item */}
				{index === 0 && (
					<div className="hidden shrink-0 sm:block">
						<Terminal
							className={cn(
								'h-4 w-4 transition-all duration-300',
								isHovered ? 'scale-110 text-neon' : 'text-muted-foreground/40',
							)}
						/>
					</div>
				)}

				{/* Command prompt */}
				<div className="flex min-w-0 flex-1 items-center gap-3">
					<div ref={chevronRef}>
						<ChevronRight
							className={cn(
								'h-4 w-4 shrink-0 transition-colors duration-300',
								isHovered ? 'text-neon' : 'text-muted-foreground/60',
							)}
						/>
					</div>
					<code
						ref={codeRef}
						className={cn(
							'truncate font-mono text-sm font-semibold tracking-wide transition-all duration-300',
							isHovered ? 'text-neon drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]' : 'text-foreground',
						)}
					>
						{command}
					</code>
				</div>

				{/* Description - desktop */}
				<p
					className={cn(
						'hidden max-w-sm shrink-0 text-right text-sm transition-colors duration-300 lg:block',
						isHovered ? 'text-foreground/80' : 'text-muted-foreground',
					)}
				>
					{description}
				</p>

				{/* Copy button */}
				<button
					onClick={handleCopy}
					className={cn(
						'relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border transition-all duration-300',
						copied
							? 'border-neon bg-neon/20 text-neon'
							: 'border-border/50 bg-background/50 text-muted-foreground hover:border-neon/50 hover:bg-neon/10 hover:text-neon',
					)}
					title={copied ? 'コピーしました' : 'コピー'}
				>
					{/* Button glow */}
					<div
						className={cn(
							'absolute inset-0 opacity-0 transition-opacity duration-300',
							copied && 'animate-pulse opacity-100',
						)}
						style={{
							background: 'radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%)',
						}}
					/>
					{copied ? (
						<Check className="relative z-10 h-4 w-4 animate-[scale-in_0.2s_ease-out]" />
					) : (
						<Copy className="relative z-10 h-4 w-4" />
					)}
				</button>
			</div>

			{/* Description - mobile */}
			<div className="border-t border-border/20 px-5 py-3 pl-6 lg:hidden">
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			{/* Bottom gradient line */}
			<div
				className={cn(
					'absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-neon/50 to-transparent transition-opacity duration-300',
					isHovered ? 'opacity-100' : 'opacity-0',
				)}
			/>

			{/* Corner decorations */}
			<div
				className={cn(
					'absolute top-2 right-2 h-2 w-2 border-t border-r transition-all duration-300',
					isHovered ? 'scale-110 border-neon/60' : 'border-border/30',
				)}
			/>
			<div
				className={cn(
					'absolute bottom-2 left-2 h-2 w-2 border-b border-l transition-all duration-300',
					isHovered ? 'scale-110 border-neon/60' : 'border-border/30',
				)}
			/>

			{/* Data bits decoration */}
			<div
				className={cn(
					'absolute top-1/2 right-14 flex -translate-y-1/2 gap-0.5 opacity-0 transition-opacity duration-300',
					isHovered && 'opacity-40',
				)}
			>
				{[...Array(8)].map((_, i) => (
					<div
						key={i}
						className="h-1 w-1 rounded-full bg-neon"
						style={{
							opacity: Math.random() > 0.5 ? 1 : 0.3,
							animation: `pulse ${0.5 + Math.random()}s infinite`,
						}}
					/>
				))}
			</div>
		</div>
	)
}

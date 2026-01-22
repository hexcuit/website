'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface AnimatedLinkProps {
	children: React.ReactNode
	className?: string
	href?: string
	onClick?: () => void
	variant?: 'underline' | 'glow' | 'slide' | 'bracket'
	color?: 'neon' | 'cyber' | 'foreground'
}

export const AnimatedLink = ({
	children,
	className,
	href,
	onClick,
	variant = 'underline',
	color = 'neon',
}: AnimatedLinkProps) => {
	const linkRef = useRef<HTMLAnchorElement>(null)
	const lineRef = useRef<HTMLSpanElement>(null)
	const textRef = useRef<HTMLSpanElement>(null)
	const glowRef = useRef<HTMLSpanElement>(null)
	const [isHovered, setIsHovered] = useState(false)

	const colorClasses = {
		neon: 'text-neon',
		cyber: 'text-cyber',
		foreground: 'text-foreground',
	}

	const handleMouseEnter = () => {
		setIsHovered(true)

		if (variant === 'underline' && lineRef.current) {
			gsap.fromTo(
				lineRef.current,
				{ scaleX: 0, transformOrigin: 'left center' },
				{ scaleX: 1, duration: 0.4, ease: 'power3.out' },
			)
		}

		if (variant === 'glow' && glowRef.current) {
			gsap.to(glowRef.current, {
				opacity: 1,
				scale: 1.2,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		if (variant === 'slide' && textRef.current) {
			gsap.to(textRef.current, {
				y: -2,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		// Magnetic-like subtle movement
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				scale: 1.02,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)

		if (variant === 'underline' && lineRef.current) {
			gsap.to(lineRef.current, {
				scaleX: 0,
				transformOrigin: 'right center',
				duration: 0.3,
				ease: 'power2.in',
			})
		}

		if (variant === 'glow' && glowRef.current) {
			gsap.to(glowRef.current, {
				opacity: 0,
				scale: 1,
				duration: 0.3,
			})
		}

		if (variant === 'slide' && textRef.current) {
			gsap.to(textRef.current, {
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		}

		if (linkRef.current) {
			gsap.to(linkRef.current, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const Component = href ? 'a' : 'button'

	return (
		<Component
			ref={linkRef as React.RefObject<HTMLAnchorElement & HTMLButtonElement>}
			href={href}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'relative inline-flex cursor-pointer items-center gap-1 transition-colors duration-300',
				!isHovered && 'text-muted-foreground',
				isHovered && colorClasses[color],
				className,
			)}
		>
			{/* Glow background */}
			{variant === 'glow' && (
				<span
					ref={glowRef}
					className={cn(
						'pointer-events-none absolute inset-0 -z-10 rounded-lg opacity-0 blur-xl',
						color === 'neon' && 'bg-neon/30',
						color === 'cyber' && 'bg-cyber/30',
						color === 'foreground' && 'bg-foreground/10',
					)}
				/>
			)}

			{/* Bracket decorations */}
			{variant === 'bracket' && (
				<>
					<span
						className={cn(
							'transition-all duration-300',
							isHovered ? 'mr-1 opacity-100' : 'mr-0 opacity-0',
							colorClasses[color],
						)}
					>
						[
					</span>
				</>
			)}

			{/* Text content */}
			<span ref={textRef} className="relative">
				{children}
			</span>

			{variant === 'bracket' && (
				<span
					className={cn(
						'transition-all duration-300',
						isHovered ? 'ml-1 opacity-100' : 'ml-0 opacity-0',
						colorClasses[color],
					)}
				>
					]
				</span>
			)}

			{/* Underline */}
			{variant === 'underline' && (
				<span
					ref={lineRef}
					className={cn(
						'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0',
						color === 'neon' && 'bg-linear-to-r from-neon via-neon to-cyber',
						color === 'cyber' && 'bg-linear-to-r from-cyber via-cyber to-neon',
						color === 'foreground' && 'bg-foreground',
					)}
					style={{
						boxShadow:
							color !== 'foreground'
								? `0 0 10px var(--${color}-glow), 0 0 20px var(--${color}-glow)`
								: 'none',
					}}
				/>
			)}
		</Component>
	)
}

// Animated nav link with active state
interface AnimatedNavLinkProps {
	children: React.ReactNode
	isActive?: boolean
	className?: string
	onClick?: () => void
}

export const AnimatedNavLink = ({
	children,
	isActive = false,
	className,
	onClick,
}: AnimatedNavLinkProps) => {
	const linkRef = useRef<HTMLButtonElement>(null)
	const dotRef = useRef<HTMLSpanElement>(null)
	const [isHovered, setIsHovered] = useState(false)

	useGSAP(() => {
		if (dotRef.current && isActive) {
			gsap.to(dotRef.current, {
				keyframes: [{ scale: 1 }, { scale: 1.3 }, { scale: 1 }],
				duration: 2,
				repeat: -1,
				ease: 'sine.inOut',
			})
		}
	}, [isActive])

	const handleMouseEnter = () => {
		setIsHovered(true)
		if (linkRef.current && !isActive) {
			gsap.to(linkRef.current, {
				x: 4,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				x: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<button
			type="button"
			ref={linkRef}
			onClick={onClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'relative flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium transition-colors duration-300',
				isActive && 'text-neon',
				!isActive && isHovered && 'text-foreground',
				!isActive && !isHovered && 'text-muted-foreground',
				className,
			)}
		>
			{/* Active indicator dot */}
			<span
				ref={dotRef}
				className={cn(
					'h-1.5 w-1.5 rounded-full transition-all duration-300',
					isActive && 'bg-neon shadow-[0_0_10px_var(--neon-glow)]',
					!isActive && isHovered && 'scale-100 bg-foreground/50',
					!isActive && !isHovered && 'scale-0 bg-transparent',
				)}
			/>
			{children}

			{/* Hover glow effect */}
			<span
				className={cn(
					'pointer-events-none absolute inset-0 -z-10 rounded-lg transition-opacity duration-300',
					isHovered && !isActive && 'opacity-100',
					(!isHovered || isActive) && 'opacity-0',
				)}
				style={{
					background:
						'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
				}}
			/>
		</button>
	)
}

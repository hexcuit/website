import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useEffect } from 'react'

import { cn } from '~/lib/utils'

interface GlitchTextProps {
	children: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
	glitchOnHover?: boolean
	autoGlitch?: boolean
	glitchInterval?: number
	intensity?: 'subtle' | 'medium' | 'intense'
	revealOnMount?: boolean
}

export const GlitchText = ({
	children,
	className,
	as: Component = 'span',
	glitchOnHover = true,
	autoGlitch = false,
	glitchInterval = 5000,
	intensity = 'medium',
	revealOnMount = false,
}: GlitchTextProps) => {
	const textRef = useRef<HTMLElement>(null)
	const charsRef = useRef<HTMLSpanElement[]>([])
	const [isGlitching, setIsGlitching] = useState(false)
	const [isRevealed, setIsRevealed] = useState(!revealOnMount)

	const intensityConfig = {
		subtle: { skew: 5, x: 3, duration: 0.03 },
		medium: { skew: 10, x: 5, duration: 0.05 },
		intense: { skew: 20, x: 10, duration: 0.04 },
	}

	const config = intensityConfig[intensity]

	// Character reveal animation on mount
	useEffect(() => {
		if (!revealOnMount || isRevealed) return

		const chars = charsRef.current.filter(Boolean)
		if (chars.length === 0) return

		gsap.set(chars, { opacity: 0, y: 20, rotateX: -90 })

		gsap.to(chars, {
			opacity: 1,
			y: 0,
			rotateX: 0,
			duration: 0.6,
			stagger: 0.03,
			ease: 'back.out(1.7)',
			onComplete: () => setIsRevealed(true),
		})
	}, [revealOnMount, isRevealed])

	const triggerGlitch = () => {
		if (!textRef.current || isGlitching) return
		setIsGlitching(true)

		const tl = gsap.timeline({
			onComplete: () => setIsGlitching(false),
		})

		// More dramatic glitch sequence
		tl.to(textRef.current, {
			skewX: config.skew,
			scaleX: 1.02,
			duration: config.duration,
			ease: 'power2.inOut',
		})
			.to(textRef.current, {
				skewX: -config.skew * 0.8,
				x: -config.x,
				filter: 'hue-rotate(90deg)',
				duration: config.duration,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: config.skew * 0.5,
				x: config.x * 0.6,
				filter: 'hue-rotate(-90deg)',
				duration: config.duration,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: -config.skew * 0.3,
				x: -config.x * 0.4,
				scaleX: 0.98,
				duration: config.duration,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: 0,
				x: 0,
				scaleX: 1,
				filter: 'hue-rotate(0deg)',
				duration: 0.1,
				ease: 'power2.out',
			})

		// Animate individual characters for more chaos
		if (intensity === 'intense') {
			const chars = charsRef.current.filter(Boolean)
			chars.forEach((char, i) => {
				gsap.to(char, {
					y: gsap.utils.random(-5, 5),
					opacity: gsap.utils.random(0.5, 1),
					duration: 0.05,
					delay: i * 0.01,
					yoyo: true,
					repeat: 3,
				})
			})
		}
	}

	useGSAP(() => {
		if (!autoGlitch) return

		const interval = setInterval(triggerGlitch, glitchInterval)
		return () => clearInterval(interval)
	}, [autoGlitch, glitchInterval])

	// Split text into characters for individual animation
	const characters = children.split('')

	return (
		<Component
			ref={textRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
			className={cn('glitch relative inline-block', className)}
			data-text={children}
			onMouseEnter={glitchOnHover ? triggerGlitch : undefined}
			style={{ perspective: '1000px' }}
		>
			{characters.map((char, i) => (
				<span
					key={i}
					ref={(el) => {
						if (el) charsRef.current[i] = el
					}}
					className="inline-block"
					style={{
						display: char === ' ' ? 'inline' : 'inline-block',
						transformStyle: 'preserve-3d',
					}}
				>
					{char === ' ' ? '\u00A0' : char}
				</span>
			))}
		</Component>
	)
}

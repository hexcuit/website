import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

import { cn } from '~/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
	children: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
	type?: 'chars' | 'words' | 'lines'
	delay?: number
	stagger?: number
	duration?: number
	trigger?: 'scroll' | 'mount' | 'none'
	animation?: 'slide-up' | 'fade' | 'blur' | 'clip' | 'wave'
}

export const TextReveal = ({
	children,
	className,
	as: Component = 'span',
	type = 'chars',
	delay = 0,
	stagger = 0.02,
	duration = 0.5,
	trigger = 'scroll',
	animation = 'slide-up',
}: TextRevealProps) => {
	const containerRef = useRef<HTMLElement>(null)
	const elementsRef = useRef<HTMLSpanElement[]>([])

	// Split text based on type
	const splitText = () => {
		switch (type) {
			case 'chars':
				return children.split('').map((char, i) => ({
					key: i,
					content: char === ' ' ? '\u00A0' : char,
					isSpace: char === ' ',
				}))
			case 'words':
				return children.split(' ').map((word, i) => ({
					key: i,
					content: word,
					isSpace: false,
				}))
			case 'lines':
				return children.split('\n').map((line, i) => ({
					key: i,
					content: line,
					isSpace: false,
				}))
		}
	}

	const elements = splitText()

	useGSAP(() => {
		if (!containerRef.current || trigger === 'none') return

		const items = elementsRef.current.filter(Boolean)
		if (items.length === 0) return

		// Set initial state
		const initialState: gsap.TweenVars = {}
		const animateState: gsap.TweenVars = {}

		switch (animation) {
			case 'slide-up':
				initialState.y = 40
				initialState.opacity = 0
				animateState.y = 0
				animateState.opacity = 1
				break
			case 'fade':
				initialState.opacity = 0
				animateState.opacity = 1
				break
			case 'blur':
				initialState.opacity = 0
				initialState.filter = 'blur(10px)'
				animateState.opacity = 1
				animateState.filter = 'blur(0px)'
				break
			case 'clip':
				initialState.clipPath = 'inset(100% 0 0 0)'
				animateState.clipPath = 'inset(0% 0 0 0)'
				break
			case 'wave':
				initialState.y = 20
				initialState.opacity = 0
				initialState.rotateX = -90
				animateState.y = 0
				animateState.opacity = 1
				animateState.rotateX = 0
				break
		}

		gsap.set(items, initialState)

		const animationConfig: gsap.TweenVars = {
			...animateState,
			duration,
			delay,
			stagger: {
				each: stagger,
				ease: animation === 'wave' ? 'sine.inOut' : 'none',
			},
			ease: 'power3.out',
		}

		if (trigger === 'scroll') {
			animationConfig.scrollTrigger = {
				trigger: containerRef.current,
				start: 'top 85%',
			}
		}

		gsap.to(items, animationConfig)
	}, [animation, delay, duration, stagger, trigger])

	return (
		<Component
			ref={containerRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
			className={cn('inline-block', className)}
			style={{ perspective: animation === 'wave' ? '1000px' : undefined }}
		>
			{elements.map(({ key, content, isSpace }) => (
				<span
					key={key}
					ref={(el) => {
						if (el) elementsRef.current[key] = el
					}}
					className={cn(
						'inline-block',
						type === 'words' && !isSpace && 'mr-[0.25em]',
						type === 'lines' && 'block',
					)}
					style={{
						transformStyle: animation === 'wave' ? 'preserve-3d' : undefined,
					}}
				>
					{content}
				</span>
			))}
		</Component>
	)
}

// Typewriter effect
interface TypewriterProps {
	children: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
	speed?: number
	delay?: number
	cursor?: boolean
}

export const Typewriter = ({
	children,
	className,
	as: Component = 'span',
	speed = 50,
	delay = 0,
	cursor = true,
}: TypewriterProps) => {
	const textRef = useRef<HTMLElement>(null)

	useGSAP(
		() => {
			if (!textRef.current) return

			const text = children
			let currentIndex = 0
			textRef.current.textContent = ''

			const startTyping = () => {
				const typeInterval = setInterval(() => {
					if (!textRef.current) return
					if (currentIndex < text.length) {
						textRef.current.textContent = text.slice(0, currentIndex + 1)
						currentIndex++
					} else {
						clearInterval(typeInterval)
					}
				}, speed)

				return typeInterval
			}

			const delayTimeout = setTimeout(startTyping, delay)

			return () => clearTimeout(delayTimeout)
		},
		{ dependencies: [children, speed, delay] },
	)

	return (
		<Component
			ref={textRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
			className={cn(cursor && 'cursor-blink', className)}
		/>
	)
}

// Scramble text effect
interface ScrambleTextProps {
	children: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
	trigger?: 'hover' | 'scroll' | 'mount'
}

export const ScrambleText = ({
	children,
	className,
	as: Component = 'span',
	trigger = 'hover',
}: ScrambleTextProps) => {
	const textRef = useRef<HTMLElement>(null)
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

	const scramble = () => {
		if (!textRef.current) return

		const originalText = children
		let iteration = 0

		const interval = setInterval(() => {
			if (!textRef.current) return

			textRef.current.textContent = originalText
				.split('')
				.map((char, index) => {
					if (char === ' ') return ' '
					if (index < iteration) return originalText[index]
					return chars[Math.floor(Math.random() * chars.length)]
				})
				.join('')

			iteration += 1 / 3

			if (iteration >= originalText.length) {
				clearInterval(interval)
				textRef.current.textContent = originalText
			}
		}, 30)
	}

	useGSAP(() => {
		if (trigger === 'mount') {
			scramble()
		} else if (trigger === 'scroll' && textRef.current) {
			ScrollTrigger.create({
				trigger: textRef.current,
				start: 'top 85%',
				onEnter: scramble,
				once: true,
			})
		}
	}, [trigger])

	return (
		<Component
			ref={textRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
			className={cn('font-mono', className)}
			onMouseEnter={trigger === 'hover' ? scramble : undefined}
		>
			{children}
		</Component>
	)
}

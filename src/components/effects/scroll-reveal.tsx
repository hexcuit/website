import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, type ReactNode } from 'react'

import { cn } from '~/lib/utils'

gsap.registerPlugin(ScrollTrigger)

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'blur'

interface ScrollRevealProps {
	children: ReactNode
	className?: string
	direction?: RevealDirection
	delay?: number
	duration?: number
	distance?: number
	once?: boolean
	threshold?: number
}

export const ScrollReveal = ({
	children,
	className,
	direction = 'up',
	delay = 0,
	duration = 0.8,
	distance = 60,
	once = true,
	threshold = 0.2,
}: ScrollRevealProps) => {
	const elementRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!elementRef.current) return

		const element = elementRef.current

		// Set initial state based on direction
		const initialState: gsap.TweenVars = { opacity: 0 }
		const animateState: gsap.TweenVars = { opacity: 1 }

		switch (direction) {
			case 'up':
				initialState.y = distance
				animateState.y = 0
				break
			case 'down':
				initialState.y = -distance
				animateState.y = 0
				break
			case 'left':
				initialState.x = distance
				animateState.x = 0
				break
			case 'right':
				initialState.x = -distance
				animateState.x = 0
				break
			case 'scale':
				initialState.scale = 0.8
				animateState.scale = 1
				break
			case 'blur':
				initialState.filter = 'blur(10px)'
				animateState.filter = 'blur(0px)'
				break
		}

		gsap.set(element, initialState)

		gsap.to(element, {
			...animateState,
			duration,
			delay,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: element,
				start: `top ${100 - threshold * 100}%`,
				toggleActions: once ? 'play none none none' : 'play reverse play reverse',
			},
		})
	}, [direction, delay, duration, distance, once, threshold])

	return (
		<div ref={elementRef} className={cn(className)}>
			{children}
		</div>
	)
}

// Staggered children reveal
interface StaggerRevealProps {
	children: ReactNode
	className?: string
	childClassName?: string
	stagger?: number
	direction?: RevealDirection
	duration?: number
	distance?: number
}

export const StaggerReveal = ({
	children,
	className,
	childClassName,
	stagger = 0.1,
	direction = 'up',
	duration = 0.6,
	distance = 40,
}: StaggerRevealProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!containerRef.current) return

		const items = containerRef.current.querySelectorAll('.stagger-item')
		if (items.length === 0) return

		const initialState: gsap.TweenVars = { opacity: 0 }
		const animateState: gsap.TweenVars = { opacity: 1 }

		switch (direction) {
			case 'up':
				initialState.y = distance
				animateState.y = 0
				break
			case 'down':
				initialState.y = -distance
				animateState.y = 0
				break
			case 'left':
				initialState.x = distance
				animateState.x = 0
				break
			case 'right':
				initialState.x = -distance
				animateState.x = 0
				break
			case 'scale':
				initialState.scale = 0.8
				animateState.scale = 1
				break
		}

		gsap.set(items, initialState)

		gsap.to(items, {
			...animateState,
			duration,
			stagger,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: containerRef.current,
				start: 'top 80%',
			},
		})
	}, [stagger, direction, duration, distance])

	return (
		<div ref={containerRef} className={cn(className)}>
			{Array.isArray(children)
				? children.map((child, i) => (
						<div key={i} className={cn('stagger-item', childClassName)}>
							{child}
						</div>
					))
				: children}
		</div>
	)
}

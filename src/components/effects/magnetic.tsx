import gsap from 'gsap'
import { useRef, type ReactNode, type MouseEvent } from 'react'

import { cn } from '~/lib/utils'

interface MagneticProps {
	children: ReactNode
	className?: string
	strength?: number
	radius?: number
}

export const Magnetic = ({ children, className, strength = 0.3, radius = 100 }: MagneticProps) => {
	const elementRef = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!elementRef.current) return

		const rect = elementRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		const distanceX = e.clientX - centerX
		const distanceY = e.clientY - centerY
		const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

		if (distance < radius) {
			const power = (radius - distance) / radius
			gsap.to(elementRef.current, {
				x: distanceX * strength * power,
				y: distanceY * strength * power,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		if (!elementRef.current) return
		gsap.to(elementRef.current, {
			x: 0,
			y: 0,
			duration: 0.5,
			ease: 'elastic.out(1, 0.3)',
		})
	}

	return (
		<div
			ref={elementRef}
			className={cn('inline-block', className)}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</div>
	)
}

// Tilt card effect
interface TiltCardProps {
	children: ReactNode
	className?: string
	maxTilt?: number
	glare?: boolean
}

export const TiltCard = ({ children, className, maxTilt = 10, glare = true }: TiltCardProps) => {
	const cardRef = useRef<HTMLDivElement>(null)
	const glareRef = useRef<HTMLDivElement>(null)

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return

		const rect = cardRef.current.getBoundingClientRect()
		const centerX = rect.left + rect.width / 2
		const centerY = rect.top + rect.height / 2
		const percentX = (e.clientX - centerX) / (rect.width / 2)
		const percentY = (e.clientY - centerY) / (rect.height / 2)

		gsap.to(cardRef.current, {
			rotateY: percentX * maxTilt,
			rotateX: -percentY * maxTilt,
			duration: 0.3,
			ease: 'power2.out',
		})

		if (glare && glareRef.current) {
			const glareX = 50 + percentX * 30
			const glareY = 50 + percentY * 30
			gsap.to(glareRef.current, {
				background: `radial-gradient(circle at ${glareX}% ${glareY}%, oklch(1 0 0 / 0.15) 0%, transparent 50%)`,
				duration: 0.3,
			})
		}
	}

	const handleMouseLeave = () => {
		if (!cardRef.current) return
		gsap.to(cardRef.current, {
			rotateY: 0,
			rotateX: 0,
			duration: 0.5,
			ease: 'power2.out',
		})

		if (glare && glareRef.current) {
			gsap.to(glareRef.current, {
				background: 'transparent',
				duration: 0.3,
			})
		}
	}

	return (
		<div style={{ perspective: '1000px' }}>
			<div
				ref={cardRef}
				className={cn('relative', className)}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				style={{ transformStyle: 'preserve-3d' }}
			>
				{children}
				{glare && (
					<div ref={glareRef} className="pointer-events-none absolute inset-0 rounded-[inherit]" />
				)}
			</div>
		</div>
	)
}

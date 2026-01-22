'use client'

import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface CursorGlowProps {
	className?: string
	size?: number
	color?: 'neon' | 'cyber' | 'mixed'
	intensity?: 'low' | 'medium' | 'high'
}

export const CursorGlow = ({
	className,
	size = 400,
	color = 'mixed',
	intensity = 'medium',
}: CursorGlowProps) => {
	const glowRef = useRef<HTMLDivElement>(null)
	const innerGlowRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVisible] = useState(false)
	const [isHoveringInteractive, setIsHoveringInteractive] = useState(false)

	const opacityMap = {
		low: 0.1,
		medium: 0.2,
		high: 0.35,
	}

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (!glowRef.current || !innerGlowRef.current) return

			// Check if hovering over an interactive element
			const target = e.target as HTMLElement
			const isInteractive = Boolean(
				target.tagName === 'A' ||
				target.tagName === 'BUTTON' ||
				target.closest('a') ||
				target.closest('button') ||
				target.getAttribute('role') === 'button' ||
				target.classList.contains('cursor-pointer'),
			)

			setIsHoveringInteractive(isInteractive)

			// Animate main glow
			gsap.to(glowRef.current, {
				x: e.clientX - size / 2,
				y: e.clientY - size / 2,
				duration: 0.5,
				ease: 'power2.out',
			})

			// Animate inner glow (faster follow)
			gsap.to(innerGlowRef.current, {
				x: e.clientX - 50,
				y: e.clientY - 50,
				duration: 0.2,
				ease: 'power2.out',
			})
		}

		const handleMouseEnter = () => setIsVisible(true)
		const handleMouseLeave = () => setIsVisible(false)

		window.addEventListener('mousemove', handleMouseMove)
		document.body.addEventListener('mouseenter', handleMouseEnter)
		document.body.addEventListener('mouseleave', handleMouseLeave)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
			document.body.removeEventListener('mouseenter', handleMouseEnter)
			document.body.removeEventListener('mouseleave', handleMouseLeave)
		}
	}, [size])

	// Don't render on mobile/touch devices
	const [isMobile, setIsMobile] = useState(true)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.matchMedia('(hover: none)').matches || window.innerWidth < 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => window.removeEventListener('resize', checkMobile)
	}, [])

	if (isMobile) return null

	return (
		<>
			{/* Main large glow */}
			<div
				ref={glowRef}
				className={cn(
					'pointer-events-none fixed top-0 left-0 z-[1] rounded-full blur-[100px] transition-opacity duration-500',
					isVisible ? 'opacity-100' : 'opacity-0',
					className,
				)}
				style={{
					width: size,
					height: size,
					opacity: isVisible ? opacityMap[intensity] : 0,
					background:
						color === 'mixed'
							? `radial-gradient(circle, var(--neon-glow) 0%, var(--cyber-glow) 50%, transparent 70%)`
							: color === 'neon'
								? `radial-gradient(circle, var(--neon-glow) 0%, transparent 70%)`
								: `radial-gradient(circle, var(--cyber-glow) 0%, transparent 70%)`,
				}}
			/>

			{/* Inner smaller glow for interactive elements */}
			<div
				ref={innerGlowRef}
				className={cn(
					'pointer-events-none fixed top-0 left-0 z-[2] h-[100px] w-[100px] rounded-full blur-xl transition-all duration-300',
					isHoveringInteractive ? 'scale-150 opacity-60' : 'scale-100 opacity-0',
				)}
				style={{
					background: `radial-gradient(circle, var(--neon) 0%, transparent 70%)`,
				}}
			/>
		</>
	)
}

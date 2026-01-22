import gsap from 'gsap'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Magnetic } from '~/components/effects/magnetic'
import { useTheme } from '~/components/theme-provider'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()
	const buttonRef = useRef<HTMLButtonElement>(null)
	const raysRef = useRef<HTMLDivElement>(null)
	const starsRef = useRef<HTMLDivElement>(null)
	const [isAnimating, setIsAnimating] = useState(false)
	const [mounted, setMounted] = useState(false)

	// Wait for client-side hydration
	useEffect(() => {
		setMounted(true)
	}, [])

	// Compute isDark only on client
	const isDark = mounted
		? theme === 'dark' ||
			(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
		: false

	const toggleTheme = () => {
		if (isAnimating) return
		setIsAnimating(true)

		// Animate the button
		if (buttonRef.current) {
			gsap.to(buttonRef.current, {
				scale: 0.9,
				duration: 0.1,
				yoyo: true,
				repeat: 1,
				ease: 'power2.inOut',
			})
		}

		// Rays animation for sun
		if (!isDark && raysRef.current) {
			gsap.fromTo(
				raysRef.current.children,
				{ scale: 1, opacity: 1 },
				{
					scale: 0,
					opacity: 0,
					duration: 0.3,
					stagger: 0.02,
					ease: 'power2.in',
				},
			)
		}

		// Stars animation for moon
		if (isDark && starsRef.current) {
			gsap.fromTo(
				starsRef.current.children,
				{ scale: 1, opacity: 1 },
				{
					scale: 0,
					opacity: 0,
					duration: 0.3,
					stagger: 0.02,
					ease: 'power2.in',
				},
			)
		}

		// Change theme after animation
		setTimeout(() => {
			if (theme === 'system') {
				const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
					? 'dark'
					: 'light'
				setTheme(systemTheme === 'dark' ? 'light' : 'dark')
			} else {
				setTheme(theme === 'dark' ? 'light' : 'dark')
			}
			setIsAnimating(false)
		}, 150)
	}

	// Don't render until mounted to avoid hydration mismatch
	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" aria-label="Toggle theme" className="h-9 w-9">
				<span className="h-5 w-5" />
			</Button>
		)
	}

	return (
		<Magnetic strength={0.2}>
			<Button
				ref={buttonRef}
				variant="ghost"
				size="icon"
				onClick={toggleTheme}
				aria-label="Toggle theme"
				className="group relative h-9 w-9 overflow-hidden"
			>
				{/* Background glow */}
				<span
					className={cn(
						'absolute inset-0 rounded-lg transition-all duration-500',
						isDark
							? 'bg-cyber/0 group-hover:bg-cyber/10'
							: 'bg-amber-500/0 group-hover:bg-amber-500/10',
					)}
				/>

				{/* Sun with rays */}
				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center transition-all duration-500',
						isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
					)}
				>
					<Sun className="relative z-10 h-5 w-5 text-amber-500 transition-transform duration-300 group-hover:scale-110" />
					{/* Sun rays */}
					<div ref={raysRef} className="absolute inset-0">
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="absolute top-1/2 left-1/2 h-1 w-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/60"
								style={{
									transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-12px)`,
								}}
							/>
						))}
					</div>
				</div>

				{/* Moon with stars */}
				<div
					className={cn(
						'absolute inset-0 flex items-center justify-center transition-all duration-500',
						isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0',
					)}
				>
					<Moon className="relative z-10 h-5 w-5 text-cyber transition-transform duration-300 group-hover:scale-110" />
					{/* Stars */}
					<div ref={starsRef} className="absolute inset-0">
						<div
							className="absolute h-1 w-1 animate-pulse rounded-full bg-cyber/80"
							style={{ top: '15%', right: '20%' }}
						/>
						<div
							className="absolute h-0.5 w-0.5 animate-pulse rounded-full bg-cyber/60"
							style={{ top: '25%', left: '25%', animationDelay: '0.3s' }}
						/>
						<div
							className="absolute h-0.5 w-0.5 animate-pulse rounded-full bg-cyber/60"
							style={{ bottom: '30%', right: '15%', animationDelay: '0.6s' }}
						/>
					</div>
				</div>

				{/* Ripple effect on click */}
				<span className="absolute inset-0 scale-0 rounded-lg bg-current opacity-10 transition-transform duration-300 group-active:scale-100" />
			</Button>
		</Magnetic>
	)
}

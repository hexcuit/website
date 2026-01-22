import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

interface ParticlesProps {
	count?: number
	className?: string
}

export const Particles = ({ count = 50, className }: ParticlesProps) => {
	const containerRef = useRef<HTMLDivElement>(null)

	useGSAP(
		() => {
			if (!containerRef.current) return

			const particles = containerRef.current.querySelectorAll('.particle')

			for (const particle of particles) {
				const duration = gsap.utils.random(3, 8)
				const delay = gsap.utils.random(0, 5)

				gsap.to(particle, {
					y: gsap.utils.random(-100, -300),
					x: gsap.utils.random(-50, 50),
					opacity: 0,
					duration,
					delay,
					repeat: -1,
					ease: 'power1.out',
				})
			}
		},
		{ scope: containerRef },
	)

	return (
		<div
			ref={containerRef}
			className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
		>
			{Array.from({ length: count }).map((_, i) => (
				<div
					key={i}
					className="particle absolute h-1 w-1 rounded-full bg-neon opacity-60"
					style={{
						left: `${Math.random() * 100}%`,
						top: `${Math.random() * 100}%`,
						transform: `scale(${Math.random() * 1.5 + 0.5})`,
					}}
				/>
			))}
		</div>
	)
}

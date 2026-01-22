import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export const GridBackground = () => {
	const containerRef = useRef<HTMLDivElement>(null)
	const linesRef = useRef<SVGGElement>(null)

	useGSAP(
		() => {
			if (!linesRef.current) return

			const lines = linesRef.current.querySelectorAll('.grid-line')
			const glowLines = linesRef.current.querySelectorAll('.glow-line')

			// Subtle pulse on grid lines
			gsap.fromTo(
				lines,
				{ opacity: 0.03 },
				{
					opacity: 0.08,
					duration: 3,
					stagger: {
						each: 0.1,
						from: 'random',
						repeat: -1,
						yoyo: true,
					},
					ease: 'sine.inOut',
				},
			)

			// Animated glow lines
			for (const line of glowLines) {
				gsap.fromTo(
					line,
					{ strokeDashoffset: 1000 },
					{
						strokeDashoffset: 0,
						duration: gsap.utils.random(8, 15),
						repeat: -1,
						ease: 'none',
						delay: gsap.utils.random(0, 5),
					},
				)
			}
		},
		{ scope: containerRef },
	)

	const gridSize = 80
	const lineCountH = 15
	const lineCountV = 25

	return (
		<div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
			{/* Animated gradient background */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,oklch(from_var(--neon)_l_c_h_/_0.15),transparent_50%)]" />
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,oklch(from_var(--cyber)_l_c_h_/_0.1),transparent_50%)]" />

			<svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="grid-gradient-h" x1="0%" y1="0%" x2="100%" y2="0%">
						<stop offset="0%" stopColor="var(--neon)" stopOpacity="0" />
						<stop offset="50%" stopColor="var(--neon)" stopOpacity="0.3" />
						<stop offset="100%" stopColor="var(--neon)" stopOpacity="0" />
					</linearGradient>
					<linearGradient id="grid-gradient-v" x1="0%" y1="0%" x2="0%" y2="100%">
						<stop offset="0%" stopColor="var(--cyber)" stopOpacity="0" />
						<stop offset="50%" stopColor="var(--cyber)" stopOpacity="0.3" />
						<stop offset="100%" stopColor="var(--cyber)" stopOpacity="0" />
					</linearGradient>
					<filter id="glow-strong">
						<feGaussianBlur stdDeviation="3" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<g ref={linesRef}>
					{/* Static grid lines */}
					{Array.from({ length: lineCountH }).map((_, i) => (
						<line
							key={`h-${i}`}
							className="grid-line"
							x1="0"
							y1={i * gridSize}
							x2="100%"
							y2={i * gridSize}
							stroke="var(--neon)"
							strokeWidth="1"
							opacity="0.05"
						/>
					))}
					{Array.from({ length: lineCountV }).map((_, i) => (
						<line
							key={`v-${i}`}
							className="grid-line"
							x1={i * gridSize}
							y1="0"
							x2={i * gridSize}
							y2="100%"
							stroke="var(--cyber)"
							strokeWidth="1"
							opacity="0.05"
						/>
					))}

					{/* Animated glow lines */}
					<line
						className="glow-line"
						x1="0"
						y1="30%"
						x2="100%"
						y2="30%"
						stroke="url(#grid-gradient-h)"
						strokeWidth="2"
						strokeDasharray="20 80"
						filter="url(#glow-strong)"
					/>
					<line
						className="glow-line"
						x1="0"
						y1="70%"
						x2="100%"
						y2="70%"
						stroke="url(#grid-gradient-h)"
						strokeWidth="2"
						strokeDasharray="30 70"
						filter="url(#glow-strong)"
					/>
					<line
						className="glow-line"
						x1="25%"
						y1="0"
						x2="25%"
						y2="100%"
						stroke="url(#grid-gradient-v)"
						strokeWidth="2"
						strokeDasharray="15 85"
						filter="url(#glow-strong)"
					/>
					<line
						className="glow-line"
						x1="75%"
						y1="0"
						x2="75%"
						y2="100%"
						stroke="url(#grid-gradient-v)"
						strokeWidth="2"
						strokeDasharray="25 75"
						filter="url(#glow-strong)"
					/>
				</g>
			</svg>

			{/* Vignette effect */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_75%)]" />
		</div>
	)
}

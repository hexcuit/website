import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

import { cn } from '~/lib/utils'

interface GridBackgroundProps {
	className?: string
}

export const GridBackground = ({ className }: GridBackgroundProps) => {
	const svgRef = useRef<SVGSVGElement>(null)

	useGSAP(
		() => {
			if (!svgRef.current) return

			const lines = svgRef.current.querySelectorAll('.grid-line')

			for (const line of lines) {
				gsap.fromTo(
					line,
					{ opacity: 0.03 },
					{
						opacity: 0.08,
						duration: gsap.utils.random(2, 4),
						repeat: -1,
						yoyo: true,
						ease: 'sine.inOut',
						delay: gsap.utils.random(0, 2),
					},
				)
			}
		},
		{ scope: svgRef },
	)

	return (
		<div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
			<svg
				ref={svgRef}
				className="absolute inset-0 h-full w-full"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs>
					<pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
						<path
							className="grid-line text-neon/10"
							d="M 60 0 L 0 0 0 60"
							fill="none"
							stroke="currentColor"
							strokeWidth="0.5"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#grid)" />
			</svg>

			{/* Radial gradient overlay */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
		</div>
	)
}

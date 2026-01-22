import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState } from 'react'

import { cn } from '~/lib/utils'

interface GlitchTextProps {
	children: string
	className?: string
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'p'
	glitchOnHover?: boolean
	autoGlitch?: boolean
	glitchInterval?: number
}

export const GlitchText = ({
	children,
	className,
	as: Component = 'span',
	glitchOnHover = true,
	autoGlitch = false,
	glitchInterval = 5000,
}: GlitchTextProps) => {
	const textRef = useRef<HTMLElement>(null)
	const [isGlitching, setIsGlitching] = useState(false)

	const triggerGlitch = () => {
		if (!textRef.current || isGlitching) return
		setIsGlitching(true)

		const tl = gsap.timeline({
			onComplete: () => setIsGlitching(false),
		})

		tl.to(textRef.current, {
			skewX: 10,
			duration: 0.05,
			ease: 'power2.inOut',
		})
			.to(textRef.current, {
				skewX: -8,
				x: -5,
				duration: 0.05,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: 5,
				x: 3,
				duration: 0.05,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: -3,
				x: -2,
				duration: 0.05,
				ease: 'power2.inOut',
			})
			.to(textRef.current, {
				skewX: 0,
				x: 0,
				duration: 0.1,
				ease: 'power2.out',
			})
	}

	useGSAP(() => {
		if (!autoGlitch) return

		const interval = setInterval(triggerGlitch, glitchInterval)
		return () => clearInterval(interval)
	}, [autoGlitch, glitchInterval])

	return (
		<Component
			ref={textRef as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>}
			className={cn('glitch relative inline-block', className)}
			data-text={children}
			onMouseEnter={glitchOnHover ? triggerGlitch : undefined}
		>
			{children}
		</Component>
	)
}

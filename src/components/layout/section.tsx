import type { ReactNode } from 'react'

import { cn } from '~/lib/utils'

interface SectionProps {
	children: ReactNode
	className?: string
	title?: string
}

export const Section = ({ children, className, title }: SectionProps) => {
	return (
		<section className={cn('py-16 px-4', className)}>
			<div className="max-w-5xl mx-auto">
				{title && <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>}
				{children}
			</div>
		</section>
	)
}

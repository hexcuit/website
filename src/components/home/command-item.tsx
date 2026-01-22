import { Check, ChevronRight, Copy } from 'lucide-react'
import { useState } from 'react'

import { cn } from '~/lib/utils'

interface CommandItemProps {
	command: string
	description: string
}

export const CommandItem = ({ command, description }: CommandItemProps) => {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(command)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:border-neon/30 hover:bg-card/60 hover:translate-x-2">
			{/* Left accent bar */}
			<div className="absolute bottom-0 left-0 top-0 w-1 bg-linear-to-b from-neon/50 via-cyber/50 to-neon/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

			{/* Content */}
			<div className="flex items-center gap-4 px-5 py-4">
				{/* Command prompt */}
				<div className="flex min-w-0 flex-1 items-center gap-3">
					<ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-all group-hover:text-neon group-hover:translate-x-1" />
					<code className="truncate font-mono text-sm font-semibold tracking-wide text-foreground">
						{command}
					</code>
				</div>

				{/* Description - desktop */}
				<p className="hidden max-w-sm shrink-0 text-right text-sm text-muted-foreground lg:block">
					{description}
				</p>

				{/* Copy button */}
				<button
					onClick={handleCopy}
					className={cn(
						'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200',
						copied
							? 'border-neon/50 bg-neon/10 text-neon'
							: 'border-border/50 bg-background/50 text-muted-foreground hover:border-neon/50 hover:bg-neon/5 hover:text-neon',
					)}
					title={copied ? 'コピーしました' : 'コピー'}
				>
					{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
				</button>
			</div>

			{/* Description - mobile */}
			<div className="border-t border-border/20 px-5 py-3 lg:hidden">
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>

			{/* Hover line effect */}
			<div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-neon/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		</div>
	)
}

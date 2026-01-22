import { Link } from '@tanstack/react-router'
import { FaDiscord, FaGithub } from 'react-icons/fa'

import { Button } from '~/components/ui/button'
import { config } from '~/config'
import { useGithubVersions } from '~/hooks/use-github-versions'

import { ThemeToggle } from './theme-toggle'

export const Header = () => {
	const { versions, loading } = useGithubVersions()

	return (
		<header className="fixed left-0 right-0 top-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl">
			{/* Top neon line */}
			<div className="h-px w-full bg-gradient-to-r from-transparent via-neon/50 to-transparent" />

			<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link
					to="/"
					className="font-display text-lg font-bold tracking-[0.2em] text-foreground transition-colors hover:text-neon"
				>
					HEXCUIT
				</Link>

				{/* Navigation */}
				<div className="flex items-center gap-1">
					{/* Version badges - desktop */}
					<div className="mr-4 hidden items-center gap-2 lg:flex">
						<VersionBadge
							href={`https://github.com/${config.github.repos.server}/releases`}
							label="srv"
							version={loading ? '...' : versions.server || '-'}
							color="neon"
						/>
						<VersionBadge
							href={`https://github.com/${config.github.repos.bot}/releases`}
							label="bot"
							version={loading ? '...' : versions.bot || '-'}
							color="cyber"
						/>
					</div>

					{/* Nav links */}
					<NavLink to="/" exact>
						Home
					</NavLink>
					<NavLink to="/features">機能</NavLink>
					<NavLink to="/ranking-system">ランク</NavLink>

					{/* Divider */}
					<div className="mx-2 h-5 w-px bg-border/30" />

					{/* Social icons */}
					<Button
						variant="ghost"
						size="icon"
						className="h-9 w-9 text-muted-foreground transition-all hover:bg-[#5865F2]/10 hover:text-[#5865F2]"
						asChild
					>
						<a
							href={config.discord.serverUrl}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Discord"
						>
							<FaDiscord className="h-4 w-4" />
						</a>
					</Button>
					<Button
						variant="ghost"
						size="icon"
						className="h-9 w-9 text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
						asChild
					>
						<a
							href={config.github.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<FaGithub className="h-4 w-4" />
						</a>
					</Button>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}

const NavLink = ({
	to,
	children,
	exact,
}: {
	to: string
	children: React.ReactNode
	exact?: boolean
}) => (
	<Link
		to={to}
		activeProps={{ className: 'text-neon neon-glow-sm' }}
		activeOptions={{ exact }}
		className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
	>
		{children}
	</Link>
)

const VersionBadge = ({
	href,
	label,
	version,
	color,
}: {
	href: string
	label: string
	version: string
	color: 'neon' | 'cyber'
}) => (
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer"
		className={`group flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-xs transition-all ${
			color === 'neon'
				? 'border-neon/20 bg-neon/5 hover:border-neon/40 hover:bg-neon/10'
				: 'border-cyber/20 bg-cyber/5 hover:border-cyber/40 hover:bg-cyber/10'
		}`}
	>
		<span
			className={`h-1.5 w-1.5 rounded-full ${
				color === 'neon' ? 'bg-neon' : 'bg-cyber'
			} group-hover:animate-pulse`}
		/>
		<span className="text-muted-foreground">{label}</span>
		<span className="text-foreground">{version}</span>
	</a>
)

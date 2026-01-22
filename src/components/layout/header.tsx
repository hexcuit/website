import { Link } from '@tanstack/react-router'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'

import { Magnetic } from '~/components/effects/magnetic'
import { Button } from '~/components/ui/button'
import { config } from '~/config'
import { useGithubVersions } from '~/hooks/use-github-versions'
import { cn } from '~/lib/utils'

import { ThemeToggle } from './theme-toggle'

export const Header = () => {
	const { versions, loading } = useGithubVersions()
	const [scrolled, setScrolled] = useState(false)
	const headerRef = useRef<HTMLElement>(null)
	const logoRef = useRef<HTMLAnchorElement>(null)

	// Track scroll position
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Logo hover animation
	const handleLogoHover = () => {
		if (logoRef.current) {
			gsap.to(logoRef.current, {
				scale: 1.05,
				duration: 0.3,
				ease: 'back.out(2)',
			})
		}
	}

	const handleLogoLeave = () => {
		if (logoRef.current) {
			gsap.to(logoRef.current, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<header
			ref={headerRef}
			className={cn(
				'fixed top-0 right-0 left-0 z-50 transition-all duration-500',
				scrolled
					? 'border-b border-border/50 bg-background/80 shadow-lg shadow-neon/5 backdrop-blur-xl'
					: 'border-b border-transparent bg-background/40 backdrop-blur-md',
			)}
		>
			{/* Top neon line with animation */}
			<div className="relative h-px w-full overflow-hidden">
				<div
					className={cn(
						'absolute inset-0 bg-linear-to-r from-transparent via-neon/60 to-transparent transition-opacity duration-500',
						scrolled ? 'opacity-100' : 'opacity-50',
					)}
				/>
				<div className="absolute inset-0 animate-[shimmer_3s_linear_infinite] bg-linear-to-r from-transparent via-white/30 to-transparent" />
			</div>

			<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
				{/* Logo with glitch effect on hover */}
				<Magnetic strength={0.1} radius={80}>
					<Link
						ref={logoRef}
						to="/"
						onMouseEnter={handleLogoHover}
						onMouseLeave={handleLogoLeave}
						className="group relative font-display text-lg font-bold tracking-[0.2em] text-foreground transition-colors hover:text-neon"
					>
						<span className="relative z-10">HEXCUIT</span>
						{/* Glow effect */}
						<span className="absolute inset-0 -z-10 rounded-lg bg-neon/0 blur-xl transition-all duration-300 group-hover:bg-neon/20" />
						{/* Underline */}
						<span className="absolute -bottom-1 left-0 h-px w-0 bg-linear-to-r from-neon to-cyber transition-all duration-300 group-hover:w-full" />
					</Link>
				</Magnetic>

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

					{/* Divider with pulse */}
					<div className="relative mx-2 h-5 w-px bg-border/30">
						<div className="absolute inset-0 animate-[shimmer-v_2s_linear_infinite] bg-linear-to-b from-transparent via-neon/50 to-transparent" />
					</div>

					{/* Social icons with hover effects */}
					<Magnetic strength={0.15}>
						<Button
							variant="ghost"
							size="icon"
							className="group relative h-9 w-9 overflow-hidden text-muted-foreground transition-all hover:bg-[#5865F2]/10 hover:text-[#5865F2]"
							asChild
						>
							<a
								href={config.discord.serverUrl}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="Discord"
							>
								<FaDiscord className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
								<span className="absolute inset-0 scale-0 rounded-lg bg-[#5865F2]/20 transition-transform duration-300 group-hover:scale-100" />
							</a>
						</Button>
					</Magnetic>
					<Magnetic strength={0.15}>
						<Button
							variant="ghost"
							size="icon"
							className="group relative h-9 w-9 overflow-hidden text-muted-foreground transition-all hover:bg-foreground/5 hover:text-foreground"
							asChild
						>
							<a
								href={config.github.url}
								target="_blank"
								rel="noopener noreferrer"
								aria-label="GitHub"
							>
								<FaGithub className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
								<span className="absolute inset-0 scale-0 rounded-lg bg-foreground/10 transition-transform duration-300 group-hover:scale-100" />
							</a>
						</Button>
					</Magnetic>
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
}) => {
	const linkRef = useRef<HTMLAnchorElement>(null)

	const handleMouseEnter = () => {
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				y: -2,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<Link
			ref={linkRef}
			to={to}
			activeProps={{
				className:
					'text-neon after:scale-x-100 after:bg-neon after:shadow-[0_0_10px_var(--neon-glow)]',
			}}
			activeOptions={{ exact }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-3/4 after:-translate-x-1/2 after:scale-x-0 after:bg-foreground/50 after:transition-all after:duration-300 hover:text-foreground hover:after:scale-x-100"
		>
			{children}
		</Link>
	)
}

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
}) => {
	const [isHovered, setIsHovered] = useState(false)
	const badgeRef = useRef<HTMLAnchorElement>(null)
	const dotRef = useRef<HTMLSpanElement>(null)

	const handleMouseEnter = () => {
		setIsHovered(true)
		if (badgeRef.current) {
			gsap.to(badgeRef.current, {
				scale: 1.05,
				duration: 0.3,
				ease: 'back.out(2)',
			})
		}
		if (dotRef.current) {
			gsap.to(dotRef.current, {
				scale: 1.5,
				duration: 0.3,
			})
		}
	}

	const handleMouseLeave = () => {
		setIsHovered(false)
		if (badgeRef.current) {
			gsap.to(badgeRef.current, {
				scale: 1,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
		if (dotRef.current) {
			gsap.to(dotRef.current, {
				scale: 1,
				duration: 0.3,
			})
		}
	}

	return (
		<a
			ref={badgeRef}
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className={cn(
				'group relative flex items-center gap-1.5 overflow-hidden rounded-md border px-2 py-1 font-mono text-xs transition-all',
				color === 'neon'
					? 'border-neon/20 bg-neon/5 hover:border-neon/50 hover:bg-neon/10 hover:shadow-[0_0_15px_var(--neon-glow)]'
					: 'border-cyber/20 bg-cyber/5 hover:border-cyber/50 hover:bg-cyber/10 hover:shadow-[0_0_15px_var(--cyber-glow)]',
			)}
		>
			{/* Shimmer effect on hover */}
			<span
				className={cn(
					'pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-500',
					isHovered && 'translate-x-full',
				)}
			/>
			<span
				ref={dotRef}
				className={cn(
					'relative h-1.5 w-1.5 rounded-full',
					color === 'neon' ? 'bg-neon' : 'bg-cyber',
					isHovered && 'animate-pulse',
				)}
			/>
			<span className="text-muted-foreground">{label}</span>
			<span className="text-foreground">{version}</span>
		</a>
	)
}

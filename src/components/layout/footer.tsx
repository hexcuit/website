import { Link } from '@tanstack/react-router'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { FaDiscord, FaGithub } from 'react-icons/fa'

import { Magnetic } from '~/components/effects/magnetic'
import { config } from '~/config'
import { cn } from '~/lib/utils'

// Social icon with hover animation
const SocialIcon = ({
	href,
	icon,
	label,
	hoverColor,
	delay,
}: {
	href: string
	icon: React.ReactNode
	label: string
	hoverColor: string
	delay: number
}) => {
	const iconRef = useRef<HTMLAnchorElement>(null)

	const handleMouseEnter = () => {
		if (iconRef.current) {
			gsap.to(iconRef.current, {
				scale: 1.1,
				y: -3,
				duration: 0.3,
				ease: 'back.out(2)',
			})
		}
	}

	const handleMouseLeave = () => {
		if (iconRef.current) {
			gsap.to(iconRef.current, {
				scale: 1,
				y: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	return (
		<Magnetic strength={0.2}>
			<a
				ref={iconRef}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-colors"
				aria-label={label}
				style={{ animationDelay: `${delay}s` }}
			>
				<span
					className="relative z-10 transition-colors duration-300 group-hover:text-(--hover-color)"
					style={{ '--hover-color': hoverColor } as React.CSSProperties}
				>
					{icon}
				</span>
				<span
					className="absolute inset-0 scale-0 rounded-lg transition-transform duration-300 group-hover:scale-100"
					style={{ backgroundColor: `color-mix(in oklch, ${hoverColor} 20%, transparent)` }}
				/>
			</a>
		</Magnetic>
	)
}

// Footer link with hover animation
const FooterLink = ({
	children,
	to,
	href,
	delay,
}: {
	children: React.ReactNode
	to?: string
	href?: string
	delay: number
}) => {
	const linkRef = useRef<HTMLLIElement>(null)

	const handleMouseEnter = () => {
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				x: 6,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const handleMouseLeave = () => {
		if (linkRef.current) {
			gsap.to(linkRef.current, {
				x: 0,
				duration: 0.3,
				ease: 'power2.out',
			})
		}
	}

	const linkClassName =
		'group relative inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary'

	return (
		<li
			ref={linkRef}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			style={{ animationDelay: `${delay}s` }}
		>
			{to ? (
				<Link to={to} className={linkClassName}>
					<span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
					{children}
				</Link>
			) : (
				<a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
					<span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-3" />
					{children}
				</a>
			)}
		</li>
	)
}

export const Footer = () => {
	const footerRef = useRef<HTMLElement>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.1 },
		)

		if (footerRef.current) {
			observer.observe(footerRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<footer ref={footerRef} className="relative border-t border-border/50 bg-surface/50">
			{/* Animated top accent line */}
			<div className="absolute top-0 right-0 left-0 h-px overflow-hidden">
				<div
					className={cn(
						'h-full w-full bg-linear-to-r from-transparent via-neon/40 to-transparent transition-all duration-1000',
						isVisible ? 'opacity-100' : 'opacity-0',
					)}
				/>
				<div className="absolute inset-0 animate-[shimmer_4s_linear_infinite] bg-linear-to-r from-transparent via-cyber/30 to-transparent" />
			</div>

			{/* Decorative corner elements */}
			<div className="pointer-events-none absolute top-0 left-0 h-20 w-20 overflow-hidden opacity-20">
				<svg viewBox="0 0 100 100" className="h-full w-full text-neon">
					<path d="M0 50 L0 0 L50 0" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle cx="0" cy="0" r="3" fill="currentColor" className="animate-pulse" />
				</svg>
			</div>
			<div className="pointer-events-none absolute top-0 right-0 h-20 w-20 overflow-hidden opacity-20">
				<svg viewBox="0 0 100 100" className="h-full w-full text-cyber">
					<path d="M100 50 L100 0 L50 0" fill="none" stroke="currentColor" strokeWidth="1" />
					<circle
						cx="100"
						cy="0"
						r="3"
						fill="currentColor"
						className="animate-pulse"
						style={{ animationDelay: '0.5s' }}
					/>
				</svg>
			</div>

			<div className="mx-auto max-w-6xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-3">
					{/* Brand */}
					<div
						className={cn(
							'transition-all duration-700',
							isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
						)}
					>
						<Magnetic strength={0.1}>
							<h3 className="inline-block font-display text-lg font-bold tracking-wider transition-colors hover:text-neon">
								HEXCUIT
							</h3>
						</Magnetic>
						<p className="mt-2 text-sm text-muted-foreground">
							League of Legendsのランク管理と
							<br />
							チームバランシング機能を提供
						</p>
						<div className="mt-4 flex gap-3">
							<SocialIcon
								href={config.discord.serverUrl}
								icon={<FaDiscord className="h-4 w-4" />}
								label="Discord"
								hoverColor="#5865F2"
								delay={0}
							/>
							<SocialIcon
								href={config.github.url}
								icon={<FaGithub className="h-4 w-4" />}
								label="GitHub"
								hoverColor="var(--foreground)"
								delay={0.1}
							/>
						</div>
					</div>

					{/* Quick Links */}
					<div
						className={cn(
							'transition-all delay-100 duration-700',
							isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
						)}
					>
						<h4 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
							リンク
						</h4>
						<ul className="space-y-2">
							<FooterLink to="/" delay={0}>
								ホーム
							</FooterLink>
							<FooterLink to="/features" delay={0.05}>
								機能
							</FooterLink>
							<FooterLink to="/ranking-system" delay={0.1}>
								ランクシステム
							</FooterLink>
							<FooterLink href={config.discord.inviteUrl} delay={0.15}>
								Botを招待
							</FooterLink>
						</ul>
					</div>

					{/* Legal */}
					<div
						className={cn(
							'transition-all delay-200 duration-700',
							isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
						)}
					>
						<h4 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
							法的情報
						</h4>
						<ul className="space-y-2">
							<FooterLink to="/terms" delay={0}>
								利用規約
							</FooterLink>
							<FooterLink to="/privacy" delay={0.05}>
								プライバシーポリシー
							</FooterLink>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div
					className={cn(
						'mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-6 transition-all delay-300 duration-700 sm:flex-row',
						isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
					)}
				>
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} Hexcuit. All rights reserved.
					</p>
					<p className="group text-xs text-muted-foreground">
						<span className="group-hover:neon-glow-sm font-mono text-neon/70 transition-all duration-300 group-hover:text-neon">
							&lt;/&gt;
						</span>{' '}
						with{' '}
						<span className="inline-block text-primary transition-transform duration-300 group-hover:scale-125">
							♥
						</span>{' '}
						for the LoL community
					</p>
				</div>
			</div>

			{/* Background decoration */}
			<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
				<div
					className={cn(
						'absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-neon/5 blur-[100px] transition-all duration-1000',
						isVisible ? 'opacity-100' : 'opacity-0',
					)}
				/>
				<div
					className={cn(
						'absolute -right-20 -bottom-20 h-60 w-60 rounded-full bg-cyber/5 blur-[100px] transition-all delay-200 duration-1000',
						isVisible ? 'opacity-100' : 'opacity-0',
					)}
				/>
			</div>
		</footer>
	)
}

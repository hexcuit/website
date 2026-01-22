import { Link } from '@tanstack/react-router'
import { FaDiscord, FaGithub } from 'react-icons/fa'

import { config } from '~/config'

export const Footer = () => {
	return (
		<footer className="relative border-t border-border/50 bg-surface/50">
			{/* Top accent line */}
			<div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

			<div className="mx-auto max-w-6xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-3">
					{/* Brand */}
					<div>
						<h3 className="font-display text-lg font-bold tracking-wider">HEXCUIT</h3>
						<p className="mt-2 text-sm text-muted-foreground">
							League of Legendsのランク管理と
							<br />
							チームバランシング機能を提供
						</p>
						<div className="mt-4 flex gap-3">
							<a
								href={config.discord.serverUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-[#5865F2]/50 hover:text-[#5865F2]"
								aria-label="Discord"
							>
								<FaDiscord className="h-4 w-4" />
							</a>
							<a
								href={config.github.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-all hover:border-foreground/50 hover:text-foreground"
								aria-label="GitHub"
							>
								<FaGithub className="h-4 w-4" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
							リンク
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									ホーム
								</Link>
							</li>
							<li>
								<Link
									to="/features"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									機能
								</Link>
							</li>
							<li>
								<Link
									to="/ranking-system"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									ランクシステム
								</Link>
							</li>
							<li>
								<a
									href={config.discord.inviteUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									Botを招待
								</a>
							</li>
						</ul>
					</div>

					{/* Legal */}
					<div>
						<h4 className="mb-3 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
							法的情報
						</h4>
						<ul className="space-y-2">
							<li>
								<Link
									to="/terms"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									利用規約
								</Link>
							</li>
							<li>
								<Link
									to="/privacy"
									className="text-sm text-foreground/80 transition-colors hover:text-primary"
								>
									プライバシーポリシー
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-6 sm:flex-row">
					<p className="text-xs text-muted-foreground">
						&copy; {new Date().getFullYear()} Hexcuit. All rights reserved.
					</p>
					<p className="text-xs text-muted-foreground">
						<span className="font-mono text-neon/70">&lt;/&gt;</span> with{' '}
						<span className="text-primary">♥</span> for the LoL community
					</p>
				</div>
			</div>
		</footer>
	)
}

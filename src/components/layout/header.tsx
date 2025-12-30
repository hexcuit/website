import { Link } from '@tanstack/react-router'
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { Button } from '~/components/ui/button'
import { config } from '~/config'
import { useGithubVersions } from '~/hooks/use-github-versions'
import { ThemeToggle } from './theme-toggle'

export const Header = () => {
	const { versions, loading } = useGithubVersions()

	return (
		<header className='border-b sticky top-0 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50'>
			<nav className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
				<Link to='/' className='text-xl font-bold'>
					Hexcuit
				</Link>
				<div className='flex items-center gap-6'>
					<div className='hidden sm:flex items-center gap-4 text-xs text-muted-foreground'>
						<a
							href={`https://github.com/${config.github.repos.server}/releases`}
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-foreground transition-colors'
						>
							server: {loading ? '...' : versions.server || '-'}
						</a>
						<a
							href={`https://github.com/${config.github.repos.bot}/releases`}
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-foreground transition-colors'
						>
							bot: {loading ? '...' : versions.bot || '-'}
						</a>
					</div>
					<Link to='/' activeProps={{ className: 'text-primary' }} activeOptions={{ exact: true }}>
						Home
					</Link>
					<Link to='/features' activeProps={{ className: 'text-primary' }}>
						機能
					</Link>
					<Link to='/ranking-system' activeProps={{ className: 'text-primary' }}>
						ランクシステム
					</Link>
					<Button variant='ghost' size='icon' asChild>
						<a href={config.discord.serverUrl} target='_blank' rel='noopener noreferrer' aria-label='Discord'>
							<FaDiscord className='h-5 w-5' />
						</a>
					</Button>
					<Button variant='ghost' size='icon' asChild>
						<a href={config.github.url} target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
							<FaGithub className='h-5 w-5' />
						</a>
					</Button>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}

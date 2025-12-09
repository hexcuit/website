import { Link } from '@tanstack/react-router'
import { Github } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { config } from '~/config'
import { ThemeToggle } from './theme-toggle'

export const Header = () => {
	return (
		<header className='border-b'>
			<nav className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
				<Link to='/' className='text-xl font-bold'>
					Hexcuit
				</Link>
				<div className='flex items-center gap-6'>
					<Link to='/' activeProps={{ className: 'text-primary' }} activeOptions={{ exact: true }}>
						Home
					</Link>
					<Button variant='ghost' size='icon' asChild>
						<a href={config.github.url} target='_blank' rel='noopener noreferrer' aria-label='GitHub'>
							<Github className='h-5 w-5' />
						</a>
					</Button>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}

import { Link } from '@tanstack/react-router'
import { ThemeToggle } from './theme-toggle'

export function Header() {
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
					<ThemeToggle />
				</div>
			</nav>
		</header>
	)
}

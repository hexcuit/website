import { Moon, Sun } from 'lucide-react'

import { useTheme } from '~/components/theme-provider'
import { Button } from '~/components/ui/button'

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			setTheme(systemTheme === 'dark' ? 'light' : 'dark')
		} else {
			setTheme(theme === 'dark' ? 'light' : 'dark')
		}
	}

	return (
		<Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
			<Sun className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button>
	)
}

/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'
import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { Header } from '~/components/layout'
import { NotFound } from '~/components/not-found'
import { ThemeProvider } from '~/components/theme-provider'
import { config } from '~/config'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

const themeScript = `
(function() {
  const storageKey = '${config.theme.storageKey}';
  const theme = localStorage.getItem(storageKey);
  const root = document.documentElement;

  if (theme === 'dark' || theme === 'light') {
    root.classList.add(theme);
  } else {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.classList.add(systemTheme);
  }
})();
`

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			...seo({
				title: 'Hexcuit | League of Legends Discord Bot',
				description: 'LoLランク管理とチームバランシング機能を提供するDiscord Bot',
			}),
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{ rel: 'icon', href: '/favicon.ico' },
		],
		scripts: [
			{
				children: themeScript,
			},
		],
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang='ja' suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className='min-h-screen bg-background text-foreground'>
				<ThemeProvider defaultTheme={config.theme.defaultTheme} storageKey={config.theme.storageKey}>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
				<TanStackRouterDevtools position='bottom-right' />
				<Scripts />
			</body>
		</html>
	)
}

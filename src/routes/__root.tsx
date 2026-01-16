import type { ReactNode } from 'react'

/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { Footer } from '~/components/layout/footer'
import { Header } from '~/components/layout/header'
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
			{ rel: 'icon', href: '/hexcuit.png' },
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
		<html lang="ja" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body className="min-h-screen bg-background text-foreground">
				<ThemeProvider
					defaultTheme={config.theme.defaultTheme}
					storageKey={config.theme.storageKey}
				>
					<div className="flex min-h-screen flex-col">
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</div>
				</ThemeProvider>
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
			</body>
		</html>
	)
}

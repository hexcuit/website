/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { ReactNode } from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { Header } from '~/components/layout'
import { NotFound } from '~/components/NotFound'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

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
	}),
	errorComponent: DefaultCatchBoundary,
	notFoundComponent: () => <NotFound />,
	shellComponent: RootDocument,
})

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang='ja'>
			<head>
				<HeadContent />
			</head>
			<body className='min-h-screen bg-background text-foreground'>
				<Header />
				<main>{children}</main>
				<TanStackRouterDevtools position='bottom-right' />
				<Scripts />
			</body>
		</html>
	)
}

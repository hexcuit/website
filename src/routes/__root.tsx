/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Link, Scripts } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
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

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang='ja'>
			<head>
				<HeadContent />
			</head>
			<body>
				<header className='border-b border-gray-200 dark:border-gray-800'>
					<nav className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
						<Link to='/' className='text-xl font-bold'>
							Hexcuit
						</Link>
						<div className='flex gap-6'>
							<Link
								to='/'
								activeProps={{ className: 'text-blue-600 dark:text-blue-400' }}
								activeOptions={{ exact: true }}
							>
								Home
							</Link>
						</div>
					</nav>
				</header>
				<main>{children}</main>
				<TanStackRouterDevtools position='bottom-right' />
				<Scripts />
			</body>
		</html>
	)
}

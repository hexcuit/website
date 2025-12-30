import { env } from 'cloudflare:workers'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import { createAuth } from '~/lib/auth'

const getSession = createServerFn().handler(async () => {
	const cfEnv = env as Env
	const request = getRequest()
	const auth = createAuth(cfEnv.DB)
	const session = await auth.api.getSession({
		headers: request?.headers ?? new Headers(),
	})
	return session
})

export const Route = createFileRoute('/dashboard')({
	beforeLoad: async () => {
		const session = await getSession()
		if (!session) {
			throw redirect({ to: '/auth/login' })
		}
		return { session }
	},
	component: DashboardLayout,
})

function DashboardLayout() {
	return (
		<div className='flex min-h-screen'>
			<aside className='w-64 border-r bg-muted/40 p-4'>
				<nav className='space-y-2'>
					<a href='/dashboard' className='block rounded-md px-3 py-2 hover:bg-muted'>
						ギルド一覧
					</a>
				</nav>
			</aside>
			<main className='flex-1 p-6'>
				<Outlet />
			</main>
		</div>
	)
}

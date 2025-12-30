import { createFileRoute } from '@tanstack/react-router'
import { SiDiscord } from 'react-icons/si'
import { Button } from '~/components/ui/button'
import { signIn } from '~/lib/auth-client'

export const Route = createFileRoute('/auth/login')({
	component: LoginPage,
})

function LoginPage() {
	const handleDiscordLogin = () => {
		signIn.social({
			provider: 'discord',
			callbackURL: '/dashboard',
		})
	}

	return (
		<div className='flex min-h-screen items-center justify-center'>
			<div className='w-full max-w-md space-y-8 p-8'>
				<div className='text-center'>
					<h1 className='text-3xl font-bold'>Hexcuit Dashboard</h1>
					<p className='mt-2 text-muted-foreground'>ギルド設定を管理するにはログインしてください</p>
				</div>

				<Button onClick={handleDiscordLogin} className='w-full' size='lg'>
					<SiDiscord className='mr-2 size-5' />
					Discord でログイン
				</Button>
			</div>
		</div>
	)
}

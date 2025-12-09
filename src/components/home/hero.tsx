import { Button } from '~/components/ui/button'

const DISCORD_INVITE_URL = 'https://discord.com/oauth2/authorize?client_id=1413060641811337256'

export const Hero = () => {
	return (
		<section className='py-20 px-4'>
			<div className='max-w-4xl mx-auto text-center'>
				<h1 className='text-5xl font-bold mb-6'>Hexcuit</h1>
				<p className='text-xl text-muted-foreground mb-8'>
					League of Legendsのランク管理とチームバランシング機能を提供するDiscord Bot
				</p>
				<Button asChild size='lg'>
					<a href={DISCORD_INVITE_URL} target='_blank' rel='noopener noreferrer'>
						Botを招待する
					</a>
				</Button>
			</div>
		</section>
	)
}

import { Button } from '~/components/ui/button'
import { config } from '~/config'

export const Hero = () => {
	return (
		<section className="py-20 px-4">
			<div className="max-w-4xl mx-auto text-center">
				<img
					src="/hexcuit.png"
					alt="Hexcuit"
					className="w-32 h-32 mx-auto mb-6 rounded-2xl shadow-lg"
				/>
				<h1 className="text-5xl font-bold mb-6">Hexcuit</h1>
				<p className="text-xl text-muted-foreground mb-8">
					League of Legendsのランク管理とチームバランシング機能を提供するDiscord Bot
				</p>
				<Button asChild size="lg">
					<a href={config.discord.inviteUrl} target="_blank" rel="noopener noreferrer">
						Botを招待する
					</a>
				</Button>
			</div>
		</section>
	)
}

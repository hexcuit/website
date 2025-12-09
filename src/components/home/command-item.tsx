import { Card, CardContent } from '~/components/ui/card'

interface CommandItemProps {
	command: string
	description: string
}

export const CommandItem = ({ command, description }: CommandItemProps) => {
	return (
		<Card className='flex-row items-center py-4'>
			<CardContent className='flex items-center gap-4 py-0'>
				<code className='bg-muted px-3 py-1 rounded font-mono text-sm whitespace-nowrap'>{command}</code>
				<p className='text-muted-foreground'>{description}</p>
			</CardContent>
		</Card>
	)
}

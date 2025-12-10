import { Link } from '@tanstack/react-router'

export const Footer = () => {
	return (
		<footer className='py-8 px-4 border-t'>
			<div className='max-w-5xl mx-auto text-center text-muted-foreground'>
				<div className='flex justify-center gap-6 mb-4'>
					<Link to='/terms' className='hover:text-foreground transition-colors'>
						利用規約
					</Link>
					<Link to='/privacy' className='hover:text-foreground transition-colors'>
						プライバシーポリシー
					</Link>
				</div>
				<p>&copy; {new Date().getFullYear()} Hexcuit. All rights reserved.</p>
			</div>
		</footer>
	)
}

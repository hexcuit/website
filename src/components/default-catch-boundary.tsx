import type { ErrorComponentProps } from '@tanstack/react-router'
import { ErrorComponent, Link, rootRouteId, useMatch, useRouter } from '@tanstack/react-router'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
	const router = useRouter()
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	})

	console.error('DefaultCatchBoundary Error:', error)

	return (
		<div className='min-h-[50vh] flex items-center justify-center p-4'>
			<Card className='max-w-md w-full'>
				<CardHeader>
					<CardTitle className='text-destructive'>エラーが発生しました</CardTitle>
				</CardHeader>
				<CardContent>
					<ErrorComponent error={error} />
				</CardContent>
				<CardFooter className='flex gap-2'>
					<Button
						variant='outline'
						onClick={() => {
							router.invalidate()
						}}
					>
						再試行
					</Button>
					{isRoot ? (
						<Button asChild>
							<Link to='/'>ホームへ</Link>
						</Button>
					) : (
						<Button
							variant='secondary'
							onClick={() => {
								window.history.back()
							}}
						>
							戻る
						</Button>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}

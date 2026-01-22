import type { ReactNode } from 'react'

import { Link } from '@tanstack/react-router'

import { Button } from '~/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card'

interface NotFoundProps {
	children?: ReactNode
}

export const NotFound = ({ children }: NotFoundProps) => {
	return (
		<div className="flex min-h-[50vh] items-center justify-center p-4">
			<Card className="w-full max-w-md text-center">
				<CardHeader>
					<CardTitle className="text-4xl">404</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">
						{children || 'お探しのページは見つかりませんでした。'}
					</p>
				</CardContent>
				<CardFooter className="flex justify-center gap-2">
					<Button
						variant="outline"
						onClick={() => {
							window.history.back()
						}}
					>
						戻る
					</Button>
					<Button asChild>
						<Link to="/">ホームへ</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

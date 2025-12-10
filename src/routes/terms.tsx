import { createFileRoute } from '@tanstack/react-router'
import TermsContent from '~/content/terms.mdx'

export const Route = createFileRoute('/terms')({
	component: Terms,
})

function Terms() {
	return (
		<section className='py-16 px-4'>
			<div className='max-w-3xl mx-auto prose prose-neutral dark:prose-invert'>
				<TermsContent />
			</div>
		</section>
	)
}

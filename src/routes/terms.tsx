import { createFileRoute } from '@tanstack/react-router'

import TermsContent from '~/content/terms.mdx'

export const Route = createFileRoute('/terms')({
	component: Terms,
})

function Terms() {
	return (
		<section className="px-4 py-16">
			<div className="mx-auto prose max-w-3xl prose-neutral dark:prose-invert">
				<TermsContent />
			</div>
		</section>
	)
}

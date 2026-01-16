import { createFileRoute } from '@tanstack/react-router'

import PrivacyContent from '~/content/privacy.mdx'

export const Route = createFileRoute('/privacy')({
	component: Privacy,
})

function Privacy() {
	return (
		<section className="py-16 px-4">
			<div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
				<PrivacyContent />
			</div>
		</section>
	)
}

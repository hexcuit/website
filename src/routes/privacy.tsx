import { createFileRoute } from '@tanstack/react-router'

import PrivacyContent from '~/content/privacy.mdx'

export const Route = createFileRoute('/privacy')({
	component: Privacy,
})

function Privacy() {
	return (
		<section className="px-4 py-16">
			<div className="mx-auto prose max-w-3xl prose-neutral dark:prose-invert">
				<PrivacyContent />
			</div>
		</section>
	)
}

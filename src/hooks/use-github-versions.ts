import { useEffect, useState } from 'react'

import { config } from '~/config'

interface Versions {
	server: string | null
	bot: string | null
}

const fetchLatestVersion = async (repo: string): Promise<string | null> => {
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`)
		if (!res.ok) return null
		const data = await res.json()
		return data.tag_name || null
	} catch {
		return null
	}
}

export const useGithubVersions = () => {
	const [versions, setVersions] = useState<Versions>({ server: null, bot: null })
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchVersions = async () => {
			const [server, bot] = await Promise.all([
				fetchLatestVersion(config.github.repos.server),
				fetchLatestVersion(config.github.repos.bot),
			])
			setVersions({ server, bot })
			setLoading(false)
		}
		void fetchVersions()
	}, [])

	return { versions, loading }
}

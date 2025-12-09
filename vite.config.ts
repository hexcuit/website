import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig(async ({ mode }) => {
	const plugins = [
		tsConfigPaths({
			projects: ['./tsconfig.json'],
		}),
		tanstackStart({
			srcDirectory: 'src',
		}),
		viteReact(),
	]

	// Cloudflare plugin only for production build
	if (mode === 'production') {
		const { cloudflare } = await import('@cloudflare/vite-plugin')
		plugins.unshift(cloudflare({ viteEnvironment: { name: 'ssr' } }))
	}

	return {
		server: {
			port: 3000,
		},
		plugins,
	}
})

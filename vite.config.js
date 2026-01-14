import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico'],
			manifest: {
				name: 'График смен',
				short_name: 'Смены',
				description: 'Календарь скользящего графика работы',
				theme_color: '#2B3E50',
				background_color: '#1a252f',
				display: 'standalone',
				orientation: 'portrait',
				icons: [
					{
						src: '/calendar-cmen.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: '/calendar-cmen.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
})

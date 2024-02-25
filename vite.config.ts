import path from 'path'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
	plugins: [solid()],
	resolve: {
		alias: [
			{
				find: 'src',
				replacement: path.join(process.cwd(), 'src'),
			},
		],
	},
})

import react from '@vitejs/plugin-react-swc'
// import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	// server: {
	// 	https: {
	// 		key: fs.readFileSync('./.cert/key.pem'),
	// 		cert: fs.readFileSync('./.cert/cert.pem'),
	// 	},
	// },
})

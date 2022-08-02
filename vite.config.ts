import { defineConfig, Plugin } from 'vite'
import path from 'path'
import handlebars from 'vite-plugin-handlebars'
import glsl from 'vite-plugin-glsl'

export default defineConfig(({ mode }) => {
	console.log('⚓ ' + mode)
	return {
		root: './src',
		base: mode === 'development' ? '/' : '/three-parallax2/',
		publicDir: '../public',
		plugins: [
			handlebars({
				partialDirectory: path.resolve(__dirname, './src/partials/'),
				helpers: {
					concat: (...params: unknown[]) => params.filter((param) => typeof param === 'string' && !!param).join(' '),
					is: (a: unknown, b: unknown) => (a ? b : null),
					eq: (a: unknown, b: unknown) => a === b,
					fallback: (a: unknown, b: unknown) => a ?? b,
					padZero: (val: unknown, maxLength: number) =>
						String(val).padStart(typeof maxLength === 'number' ? maxLength : 2, '0'),
					times: (number: number, block: any) => [...Array(number)].reduce((acc, _, i) => `${acc}${block.fn(i)}`, ''),
					add: (a: number, b: number) => a + b
				}
			}) as Plugin,
			glsl()
		],
		build: {
			rollupOptions: {
				input: {
					home: path.resolve(__dirname, './src/index.html')
				}
			},
			outDir: '../dist'
		},
		server: {
			host: true
		}
	}
})

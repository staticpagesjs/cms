import esbuild from 'esbuild';
import { globalExternals } from '@fal-works/esbuild-plugin-global-externals';
import { sassPlugin } from 'esbuild-sass-plugin';
import path from 'path';

esbuild.build({
	entryPoints: ['src/iife-entrypoint.ts'],
	outfile: 'dist/cms.iife.js',
	format: 'iife',
	bundle: true,
	loader: {
		'.svg': 'dataurl',
	},
	plugins: [
		globalExternals({
			react: 'window.React',
			'react-dom': 'window.ReactDOM',
		}),
		sassPlugin({
			precompile(source, pathname) {
				const basedir = path.dirname(pathname).replaceAll('\\', '/');
				return source.replace(/(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g, `$1${basedir}/$2$3`);
			}
		}),
	],
	watch: process.argv.slice(2).includes('--watch') ? {
		onRebuild(error, result) {
			if (error) console.error('watch build failed:', error);
			else console.log('watch build succeeded:', result);
		},
	} : undefined,
});

import { build } from 'esbuild';
import { dependencies } from './package.json';

build({
	entryPoints: ['src/index.ts'],
	bundle: true,
	tsconfig: 'tsconfig.json',
	treeShaking: true,
	external: Object.keys(dependencies),
	platform: 'node',
  format: 'cjs',
	outfile: 'dist/index.js',
});

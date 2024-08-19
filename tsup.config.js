// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	publicDir: false,
	clean: true,
	minify: false,
	format: ['cjs'], // 👈 Node
	config: './tsconfig.json',
});

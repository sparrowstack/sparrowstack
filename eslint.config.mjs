import js from '@eslint/js';
import path from 'node:path';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

// Add this function to handle gitignore patterns
const includeIgnoreFile = (filePath) => ({
	ignores: [
		...fs
			.readFileSync(filePath, 'utf8')
			.split(/\r?\n/)
			.filter((line) => line && !line.startsWith('#')),
	],
});

export default [
	...compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
	),
	includeIgnoreFile(gitignorePath),
	{
		files: ['**/*.ts'], // Only apply TypeScript rules to .ts files
		plugins: {
			'@typescript-eslint': typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.node,
			},

			parser: tsParser,
			ecmaVersion: 2023,
			sourceType: 'module',

			parserOptions: {
				project: ['./packages/*/tsconfig.json'],
			},
		},

		rules: {
			'@typescript-eslint/explicit-function-return-type': 'off',

			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
				},
			],

			'@typescript-eslint/no-explicit-any': 'warn',
		},
	},
];

module.exports = {
	root: true,
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	extends: [
		'eslint:recommended',
	],
	plugins: ['@typescript-eslint'],
	rules: {
		'no-unused-vars': 'warn',
		'no-console': 'warn',
	},
};
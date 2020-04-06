const babel = require('rollup-plugin-babel');
const terser =require('rollup-plugin-terser').terser;


const MODULE_NAME = 'pacto';
const MODULE_ENTRY = './src/index.js';
const MODULE_ENTRY_IIFE = './src/index.iife.js';

export default [
	{
		input: MODULE_ENTRY,
		output: {
			file: './dist/pacto.model.esm.js',
			format: 'es'
		},
		external: ['pacto']
	},
	{
		input: MODULE_ENTRY,
		output: {
			file: './dist/pacto.model.cjs.js',
			name: MODULE_NAME,
			format: 'cjs'
		},
		external: ['pacto'],
		plugins: [babel()]
	},
	{
		input: MODULE_ENTRY_IIFE,
		output: {
			file: './dist/pacto.model.min.js',
			name: MODULE_NAME,
			format: 'iife'
		},
		external: ['pacto'],
		plugins: [babel(), terser()]
	}
];

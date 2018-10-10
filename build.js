const babel = require('babel-core');
const fs = require('fs');
const rollup = require('rollup');
const uglifyjs = require('uglify-js');


const MODULE_ID = 'pacto/model';
const MODULE_ENTRY = './src/index.js';


[
	{
		file: './dist/pacto.model.esm.js',
		rollup: {
			input: MODULE_ENTRY,
			output: {format: 'es'}
		},
		babel: false,
		uglify: false
	},
	{
		file: './dist/pacto.model.umd.js',
		rollup: {
			input: MODULE_ENTRY,
			output: {format: 'es'}
		},
		babel: {
			filename: MODULE_ENTRY,
			moduleId: MODULE_ID,
			plugins: [
				['transform-es2015-modules-umd', {
					globals: {
						'pacto/model': 'pacto.model'
					},
					exactGlobals: true
				}]
			],
		},
		uglify: false
	},
	{
		file: './dist/pacto.model.min.js',
		rollup: {
			input: MODULE_ENTRY,
			output: {format: 'es'}
		},
		babel: {
			filename: MODULE_ENTRY,
			moduleId: MODULE_ID,
			plugins: [
				['transform-es2015-modules-umd', {
					globals: {
						'pacto': 'pacto'
					},
					exactGlobals: true
				}]
			],
		},
		uglify: {}
	}
].forEach(async target => {
	const bundler = await rollup.rollup(target.rollup);
	let {code} = await bundler.generate(target.rollup.output);
	code = await transpile(code, target.babel);
	code = await uglify(code, target.uglify);

	fs.writeFileSync(target.file, code);
});

async function transpile(code, options) {
	if (!(typeof options === 'object')) {
		return code;
	}

	return babel.transform(code, options).code;
}

async function uglify(code, options) {
	if (!(typeof options === 'object')) {
		return code;
	}

	return uglifyjs.minify(code, options).code;
}

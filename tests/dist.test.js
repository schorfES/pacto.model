import * as cjs from '../dist/pacto.model.cjs';
import * as esm from '../dist/pacto.model.esm';


const PACTO_CLASS_NAMES = [
	'Collection',
	'Model'
];

describe('The dist builds', () => {

	test('ems build exposes all pacto classes', () => {
		expect(Object.keys(esm)).toEqual(PACTO_CLASS_NAMES);
	});

	test('cjs build exposes all pacto classes', () => {
		expect(Object.keys(cjs)).toEqual(PACTO_CLASS_NAMES);
	});

});

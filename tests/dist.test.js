import * as pactoModelESM from '../dist/pacto.model.esm';
import * as pactoModelMIN from '../dist/pacto.model.min';
import * as pactoModelUMD from '../dist/pacto.model.umd';


const PACTO_CLASS_NAMES = [
	'Collection',
	'Model'
];

describe('The dist builds', () => {

	test('ems build exposes all pacto classes', () => {
		expect(Object.keys(pactoModelESM)).toEqual(PACTO_CLASS_NAMES);
	});

	test('umd build exposes all pacto classes', () => {
		expect(Object.keys(pactoModelUMD)).toEqual(PACTO_CLASS_NAMES);
	});

	test('min build exposes all pacto classes', () => {
		expect(Object.keys(pactoModelMIN)).toEqual(PACTO_CLASS_NAMES);
	});

});

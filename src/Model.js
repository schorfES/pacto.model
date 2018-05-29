import {EventEmitter} from 'pacto';


const __refs = new WeakMap();


export class Model extends EventEmitter {

	constructor(props = {}) {
		super();
		props = {...this.defaults, ...props};

		const
			handler = {
				set: (target, prop, value) => {
					const isChanged = target[prop] !== value;
					target[prop] = value;

					if (isChanged) {
						this.trigger('change', {prop, value});
					}

					return true;
				}
			},
			proxy = new Proxy(props, handler)
		;

		__refs.set(this, proxy);
	}

	get defaults() {
		return null;
	}

	get props() {
		return __refs.get(this);
	}

}

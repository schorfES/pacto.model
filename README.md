# Pacto-Model

[![Build Status](https://travis-ci.org/schorfES/pacto-model.svg?branch=master)](https://travis-ci.org/schorfES/pacto-model)
[![Coverage Status on Coveralls](https://coveralls.io/repos/github/schorfES/pacto-model/badge.svg?branch=master)](https://coveralls.io/github/schorfES/pacto-model?branch=master)
[![Coverage Status on Codecov](https://codecov.io/gh/schorfES/pacto-model/branch/master/graph/badge.svg)](https://codecov.io/gh/schorfES/pacto-model)

A simple model/collection extension for pacto.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Requirements](#requirements)
- [Documentation](#documentation)
  - [Model](#model)
  - [Collection](#collection)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Installation

Pacto is available on [NPM](https://www.npmjs.com/package/pacto-model):

```bash
npm install pacto-model --save
```

## Requirements

Pacto and Pacto Model is _dependency free_, but it requires latest browser features.
For [Collection](#collection) or [Model](#model) you may need a polyfill for
[Proxy](https://www.npmjs.com/package/proxy-polyfill).

## Documentation

### Model

A model is an observed object. It detects changes to its properties and
dispatches a `'change'` event. All properties of a model instance are accessible
through the `.props` property.

```javascript
import {Model} from 'pacto-model';

const data = {foo: 'bar'};
const model = new Model(data);

model.on('change', () => console.log(model.props)); // logs: {foo: 'baz'}
model.props.foo = 'baz';
```

A model can be created using defaults for its properties. If one or more of
these properties are not passed into the model, the model will use the
predefined default values until the value will be set.

```javascript
import {Model} from 'pacto-model';

class MyModel extends Model {
	get defaults() {
		return {foo: 'foo', baz: 'baz'};
	}
}

const data = {foo: 'bar'};
const model = new MyModel(data);
console.log(model.props); // logs: {foo: 'bar', baz: 'baz'}
```

### Collection

A collection is an observed array of [Models](#model). These models are
accessible through the `.models` property. This property offers all
[array functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).
When one of these functions changes the array, the collection instance
dispatches a `'change'` event.

All items which are passed into the collection will be transformed into a
[Model](#model). Which type of Model should be used is defined in the `.Model`
getter of a Collection instance.

```javascript
import {Collection, Model} from 'pacto-model';

class MyModel extends Model {
	get defaults() {
		return {foo: 'foo', baz: 'baz'};
	}
}

class MyCollection extends Collection {
	get Model() {
		return MyModel;
	}
}

const collection = new MyCollection([{foo: 'bar'}]);
collection.on('change', () => console.log(collection.models)); // logs: [{foo: 'bar', baz: 'baz'}, {foo: 'foo', baz: 'bar'}]
collection.models.push({baz: 'bar'});
```

## License

[LICENSE (MIT)](./LICENSE)

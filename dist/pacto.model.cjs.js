'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pacto = require('pacto');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

const __refs$1 = new WeakMap();

class Model extends pacto.EventEmitter {
  constructor(props = {}) {
    super();
    props = _objectSpread2(_objectSpread2({}, this.defaults), props);
    const handler = {
      set: (target, prop, value) => {
        const isChanged = target[prop] !== value;
        target[prop] = value;

        if (isChanged) {
          this.trigger('change', {
            prop,
            value
          });
        }

        return true;
      }
    },
          proxy = new Proxy(props, handler);

    __refs$1.set(this, proxy);
  }

  get defaults() {
    return null;
  }

  get props() {
    return __refs$1.get(this);
  }

}

const __refs = new WeakMap();

class Collection extends pacto.EventEmitter {
  constructor(models = []) {
    super();

    const enshureIsModel = model => model instanceof Model ? model : new this.Model(model),
          handler = {
      get: (target, property) => {
        const method = target[property];

        if (typeof method === 'function') {
          return (...args) => {
            let isChanged = false,
                result;

            switch (property) {
              case 'pop':
              case 'reverse':
              case 'shift':
              case 'sort':
                isChanged = true;
                break;

              case 'fill':
                isChanged = true;
                args[0] = enshureIsModel(args[0]);
                break;

              case 'push':
              case 'unshift':
                isChanged = true;
                args = args.map(enshureIsModel);
                break;

              case 'splice':
                isChanged = true;
                args = args.map((arg, index) => index > 1 ? enshureIsModel(arg) : arg);
                break;
            }

            result = method.apply(target, args);

            if (isChanged) {
              this.trigger('change', {
                method: property
              });
            }

            return result;
          };
        }

        return method;
      }
    },
          proxy = new Proxy(models.map(enshureIsModel), handler);

    __refs.set(this, proxy);
  }

  get Model() {
    return Model;
  }

  get models() {
    return __refs.get(this);
  }

}

exports.Collection = Collection;
exports.Model = Model;

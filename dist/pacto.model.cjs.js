'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pacto = require('pacto');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (_isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

var __refs = new WeakMap();

var Model = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Model, _EventEmitter);

  var _super = _createSuper(Model);

  function Model() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Model);

    _this = _super.call(this);
    props = _objectSpread2({}, _this.defaults, {}, props);
    var handler = {
      set: function set(target, prop, value) {
        var isChanged = target[prop] !== value;
        target[prop] = value;

        if (isChanged) {
          _this.trigger('change', {
            prop: prop,
            value: value
          });
        }

        return true;
      }
    },
        proxy = new Proxy(props, handler);

    __refs.set(_assertThisInitialized(_this), proxy);

    return _this;
  }

  _createClass(Model, [{
    key: "defaults",
    get: function get() {
      return null;
    }
  }, {
    key: "props",
    get: function get() {
      return __refs.get(this);
    }
  }]);

  return Model;
}(pacto.EventEmitter);

var __refs$1 = new WeakMap();

var Collection = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Collection, _EventEmitter);

  var _super = _createSuper(Collection);

  function Collection() {
    var _this;

    var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Collection);

    _this = _super.call(this);

    var enshureIsModel = function enshureIsModel(model) {
      return model instanceof Model ? model : new _this.Model(model);
    },
        handler = {
      get: function get(target, property) {
        var method = target[property];

        if (typeof method === 'function') {
          return function () {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            var isChanged = false,
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
                args = args.map(function (arg, index) {
                  return index > 1 ? enshureIsModel(arg) : arg;
                });
                break;
            }

            result = method.apply(target, args);

            if (isChanged) {
              _this.trigger('change', {
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

    __refs$1.set(_assertThisInitialized(_this), proxy);

    return _this;
  }

  _createClass(Collection, [{
    key: "Model",
    get: function get() {
      return Model;
    }
  }, {
    key: "models",
    get: function get() {
      return __refs$1.get(this);
    }
  }]);

  return Collection;
}(pacto.EventEmitter);

exports.Collection = Collection;
exports.Model = Model;

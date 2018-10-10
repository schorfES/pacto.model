(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define('pacto/model', ['exports', 'pacto'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('pacto'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.pacto);
		global.pacto = global.pacto || {};
		global.pacto.model = mod.exports;
	}
})(this, function (exports, _pacto) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Model = exports.Collection = undefined;

	var _extends = Object.assign || function (target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];

			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}

		return target;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var __refs = new WeakMap();

	var Model = function (_EventEmitter) {
		_inherits(Model, _EventEmitter);

		function Model() {
			var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			_classCallCheck(this, Model);

			var _this = _possibleConstructorReturn(this, (Model.__proto__ || Object.getPrototypeOf(Model)).call(this));

			props = _extends({}, _this.defaults, props);

			var handler = {
				set: function set(target, prop, value) {
					var isChanged = target[prop] !== value;
					target[prop] = value;

					if (isChanged) {
						_this.trigger('change', { prop: prop, value: value });
					}

					return true;
				}
			},
			    proxy = new Proxy(props, handler);

			__refs.set(_this, proxy);
			return _this;
		}

		_createClass(Model, [{
			key: 'defaults',
			get: function get() {
				return null;
			}
		}, {
			key: 'props',
			get: function get() {
				return __refs.get(this);
			}
		}]);

		return Model;
	}(_pacto.EventEmitter);

	var __refs$1 = new WeakMap();

	var Collection = function (_EventEmitter2) {
		_inherits(Collection, _EventEmitter2);

		function Collection() {
			var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			_classCallCheck(this, Collection);

			var _this2 = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this));

			var enshureIsModel = function enshureIsModel(model) {
				return model instanceof Model ? model : new _this2.Model(model);
			},
			    handler = {
				get: function get(target, property) {
					var method = target[property];

					if (typeof method === 'function') {
						return function () {
							for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
								args[_key] = arguments[_key];
							}

							var isChanged = false,
							    result = void 0;

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
								_this2.trigger('change', { method: property });
							}

							return result;
						};
					}

					return method;
				}
			},
			    proxy = new Proxy(models.map(enshureIsModel), handler);

			__refs$1.set(_this2, proxy);
			return _this2;
		}

		_createClass(Collection, [{
			key: 'Model',
			get: function get() {
				return Model;
			}
		}, {
			key: 'models',
			get: function get() {
				return __refs$1.get(this);
			}
		}]);

		return Collection;
	}(_pacto.EventEmitter);

	exports.Collection = Collection;
	exports.Model = Model;
});
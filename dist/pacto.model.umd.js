(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("pacto/model", ["exports", "pacto"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("pacto"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.pacto);
    global.pacto = global.pacto || {};
    global.pacto.model = mod.exports;
  }
})(this, function (_exports, _pacto) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Model = _exports.Collection = void 0;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var __refs = new WeakMap();

  var Model =
  /*#__PURE__*/
  function (_EventEmitter) {
    _inherits(Model, _EventEmitter);

    function Model() {
      var _this;

      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, Model);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Model).call(this));
      props = _objectSpread({}, _this.defaults, props);
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
  }(_pacto.EventEmitter);

  _exports.Model = Model;

  var __refs$1 = new WeakMap();

  var Collection =
  /*#__PURE__*/
  function (_EventEmitter2) {
    _inherits(Collection, _EventEmitter2);

    function Collection() {
      var _this2;

      var models = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      _classCallCheck(this, Collection);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Collection).call(this));

      var enshureIsModel = function enshureIsModel(model) {
        return model instanceof Model ? model : new _this2.Model(model);
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
                _this2.trigger('change', {
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

      __refs$1.set(_assertThisInitialized(_this2), proxy);

      return _this2;
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
  }(_pacto.EventEmitter);

  _exports.Collection = Collection;
});
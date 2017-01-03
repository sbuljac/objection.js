'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _keys2 = require('babel-runtime/core-js/object/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _dec, _dec2, _dec3, _desc, _value, _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _hiddenData = require('../utils/decorators/hiddenData');

var _hiddenData2 = _interopRequireDefault(_hiddenData);

var _AjvValidator = require('./AjvValidator');

var _AjvValidator2 = _interopRequireDefault(_AjvValidator);

var _splitQueryProps = require('../utils/splitQueryProps');

var _splitQueryProps2 = _interopRequireDefault(_splitQueryProps);

var _classUtils = require('../utils/classUtils');

var _memoize = require('../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * @typedef {Object} ModelOptions
 *
 * @property {boolean} [patch]
 * @property {boolean} [skipValidation]
 * @property {Model} [old]
 */

var ModelBase = (_dec = (0, _hiddenData2.default)({ name: 'omitFromJson', append: true }), _dec2 = (0, _hiddenData2.default)({ name: 'omitFromDatabaseJson', append: true }), _dec3 = (0, _hiddenData2.default)('stashedQueryProps'), (_class = (_temp = _class2 = function () {
  function ModelBase() {
    (0, _classCallCheck3.default)(this, ModelBase);
  }

  /**
   * @param {Object} jsonSchema
   * @param {Object} json
   * @param {ModelOptions=} options
   * @return {Object}
   */


  /**
   * @type {Object}
   */
  ModelBase.prototype.$beforeValidate = function $beforeValidate(jsonSchema, json, options) {
    /* istanbul ignore next */
    return jsonSchema;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   * @throws {ValidationError}
   * @return {Object}
   */


  /**
   * @type {Array.<string>}
   */


  ModelBase.prototype.$validate = function $validate() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (options.skipValidation) {
      return json;
    }

    var validator = this.constructor.getValidator();
    var args = {
      options: options,
      model: this,
      json: json,
      ctx: (0, _create2.default)(null)
    };

    validator.beforeValidate(args);
    json = validator.validate(args);
    validator.afterValidate(args);

    return json;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   */


  ModelBase.prototype.$afterValidate = function $afterValidate(json, options) {}
  // Do nothing by default.


  /**
   * @param {Object} json
   * @return {Object}
   */
  ;

  ModelBase.prototype.$parseDatabaseJson = function $parseDatabaseJson(json) {
    return json;
  };

  /**
   * @param {Object} json
   * @return {Object}
   */


  ModelBase.prototype.$formatDatabaseJson = function $formatDatabaseJson(json) {
    return json;
  };

  /**
   * @param {Object} json
   * @param {ModelOptions=} options
   * @return {Object}
   */


  ModelBase.prototype.$parseJson = function $parseJson(json, options) {
    return json;
  };

  /**
   * @param {Object} json
   * @return {Object}
   */


  ModelBase.prototype.$formatJson = function $formatJson(json) {
    return json;
  };

  /**
   * @return {Object}
   */


  ModelBase.prototype.$toDatabaseJson = function $toDatabaseJson() {
    return this.$$toJson(true, null, null);
  };

  /**
   * @return {Object}
   */


  ModelBase.prototype.$toJson = function $toJson() {
    return this.$$toJson(false, null, null);
  };

  ModelBase.prototype.toJSON = function toJSON() {
    return this.$toJson();
  };

  /**
   * @param {Object} json
   * @param {ModelOptions=} options
   * @returns {ModelBase}
   * @throws ValidationError
   */


  ModelBase.prototype.$setJson = function $setJson(json) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    json = json || {};

    if (!_lodash2.default.isObject(json) || _lodash2.default.isString(json) || _lodash2.default.isNumber(json) || _lodash2.default.isDate(json) || _lodash2.default.isArray(json) || _lodash2.default.isFunction(json) || _lodash2.default.isTypedArray(json) || _lodash2.default.isRegExp(json)) {

      throw new Error('You should only pass objects to $setJson method. ' + '$setJson method was given an invalid value ' + json);
    }

    // If the json contains query properties like, knex Raw queries or knex/objection query
    // builders, we need to split those off into a separate object. This object will be
    // joined back in the $toDatabaseJson method.
    var split = (0, _splitQueryProps2.default)(this.constructor, json);

    if (split.query) {
      // Stash the query properties for later use in $toDatabaseJson method.
      this.$stashedQueryProps(split.query);
    }

    split.json = this.$parseJson(split.json, options);
    split.json = this.$validate(split.json, options);

    return this.$set(split.json);
  };

  /**
   * @param {Object} json
   * @returns {ModelBase}
   */


  ModelBase.prototype.$setDatabaseJson = function $setDatabaseJson(json) {
    json = this.$parseDatabaseJson(json);

    if (json) {
      var keys = (0, _keys3.default)(json);

      for (var i = 0, l = keys.length; i < l; ++i) {
        var key = keys[i];
        this[key] = json[key];
      }
    }

    return this;
  };

  /**
   * @param {Object} obj
   * @returns {ModelBase}
   */


  ModelBase.prototype.$set = function $set(obj) {
    if (obj) {
      var keys = (0, _keys3.default)(obj);

      for (var i = 0, l = keys.length; i < l; ++i) {
        var key = keys[i];
        var value = obj[key];

        if (key.charAt(0) !== '$' && typeof value !== 'function') {
          this[key] = value;
        }
      }
    }

    return this;
  };

  /**
   * @param {Array.<string>=} keys
   * @returns {Array.<string>}
   */


  ModelBase.prototype.$omitFromJson = function $omitFromJson(keys) {};

  /**
   * @param {Array.<string>=} keys
   * @returns {Array.<string>}
   */


  ModelBase.prototype.$omitFromDatabaseJson = function $omitFromDatabaseJson(keys) {};

  /**
   * @param {Object=} queryProps
   * @returns {Object}
   */


  ModelBase.prototype.$stashedQueryProps = function $stashedQueryProps(queryProps) {};

  /**
   * @param {string|Array.<string>|Object.<string, boolean>} keys
   * @returns {ModelBase}
   */


  ModelBase.prototype.$omit = function $omit() {
    if (arguments.length === 1 && _lodash2.default.isObject(arguments[0])) {
      var keys = arguments[0];

      if (Array.isArray(keys)) {
        omitArray(this, keys);
      } else {
        omitObject(this, keys);
      }
    } else {
      omitArray(this, _lodash2.default.toArray(arguments));
    }

    return this;
  };

  /**
   * @param {string|Array.<string>|Object.<string, boolean>} keys
   * @returns {ModelBase} `this` for chaining.
   */


  ModelBase.prototype.$pick = function $pick() {
    if (arguments.length === 1 && _lodash2.default.isObject(arguments[0])) {
      var keys = arguments[0];

      if (Array.isArray(keys)) {
        pickArray(this, keys);
      } else {
        pickObject(this, keys);
      }
    } else {
      pickArray(this, _lodash2.default.toArray(arguments));
    }

    return this;
  };

  /**
   * @param {Array.<string>} props
   * @return {Array.<*>}
   */


  ModelBase.prototype.$values = function $values() {
    if (arguments.length === 0) {
      return _lodash2.default.values(this);
    } else {
      var args = arguments.length === 1 && Array.isArray(arguments[0]) ? arguments[0] : arguments;

      switch (args.length) {
        case 1:
          return [this[args[0]]];
        case 2:
          return [this[args[0]], this[args[1]]];
        case 3:
          return [this[args[0]], this[args[1]], this[args[2]]];
        default:
          {
            var ret = new Array(args.length);

            for (var i = 0, l = args.length; i < l; ++i) {
              ret[i] = this[args[i]];
            }

            return ret;
          }
      }
    }
  };

  /**
   * @param {Array.<string>} props
   * @return {string}
   */


  ModelBase.prototype.$propKey = function $propKey(props) {
    switch (props.length) {
      case 1:
        return this[props[0]] + '';
      case 2:
        return this[props[0]] + ',' + this[props[1]];
      case 3:
        return this[props[0]] + ',' + this[props[1]] + ',' + this[props[2]];
      default:
        {
          var key = '';

          for (var i = 0, l = props.length; i < l; ++i) {
            key += this[props[i]] + (i < props.length - 1 ? ',' : '');
          }

          return key;
        }
    }
  };

  /**
   * @return {ModelBase}
   */


  ModelBase.prototype.$clone = function $clone() {
    var clone = new this.constructor();
    var keys = (0, _keys3.default)(this);

    for (var i = 0, l = keys.length; i < l; ++i) {
      var key = keys[i];
      var value = this[key];

      if (_lodash2.default.isObject(value)) {
        clone[key] = cloneObject(value);
      } else {
        clone[key] = value;
      }
    }

    if (this.$omitFromDatabaseJson()) {
      clone.$omitFromDatabaseJson(this.$omitFromDatabaseJson());
    }

    if (this.$omitFromJson()) {
      clone.$omitFromJson(this.$omitFromJson());
    }

    if (this.$stashedQueryProps()) {
      clone.$stashedQueryProps(this.$stashedQueryProps());
    }

    return clone;
  };

  /**
   * @protected
   */


  ModelBase.prototype.$$toJson = function $$toJson(createDbJson, omit, pick) {
    var json = toJsonImpl(this, createDbJson, omit, pick);

    if (createDbJson) {
      return this.$formatDatabaseJson(json);
    } else {
      return this.$formatJson(json);
    }
  };

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<ModelBase>}
   */


  ModelBase.extend = function extend(subclassConstructor) {
    if (_lodash2.default.isEmpty(subclassConstructor.name)) {
      throw new Error('Each ModelBase subclass constructor must have a name');
    }

    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {Object=} json
   * @param {ModelOptions=} options
   * @returns {Model}
   * @throws ValidationError
   */


  ModelBase.fromJson = function fromJson(json, options) {
    var model = new this();
    model.$setJson(json || {}, options);
    return model;
  };

  /**
   * @param {Object=} json
   * @returns {Model}
   */


  ModelBase.fromDatabaseJson = function fromDatabaseJson(json) {
    var model = new this();
    model.$setDatabaseJson(json || {});
    return model;
  };

  /**
   * @param {Object} obj
   * @param {string} prop
   */


  ModelBase.omitImpl = function omitImpl(obj, prop) {
    delete obj[prop];
  };

  /**
   * @return {Validator}
   */


  ModelBase.createValidator = function createValidator() {
    return new _AjvValidator2.default({
      onCreateAjv: function onCreateAjv(ajv) {/* Do Nothing by default */},
      options: {
        allErrors: true,
        validateSchema: false,
        ownProperties: true,
        v5: true
      }
    });
  };

  /**
   * @return {Validator}
   */


  ModelBase.getValidator = function getValidator() {
    return this.createValidator();
  };

  /**
   * @return {Object}
   */


  ModelBase.getJsonSchema = function getJsonSchema() {
    // Memoized getter in case jsonSchema is a getter property (usually is with ES6).
    return this.jsonSchema;
  };

  /**
   * @param {string} columnName
   * @returns {string}
   */


  ModelBase.columnNameToPropertyName = function columnNameToPropertyName(columnName) {
    var model = new this();
    var addedProps = _lodash2.default.keys(model.$parseDatabaseJson({}));

    var row = {};
    row[columnName] = null;

    var props = _lodash2.default.keys(model.$parseDatabaseJson(row));
    var propertyName = _lodash2.default.first(_lodash2.default.difference(props, addedProps));

    return propertyName || null;
  };

  /**
   * @param {string} propertyName
   * @returns {string}
   */


  ModelBase.propertyNameToColumnName = function propertyNameToColumnName(propertyName) {
    var model = new this();
    var addedCols = _lodash2.default.keys(model.$formatDatabaseJson({}));

    var obj = {};
    obj[propertyName] = null;

    var cols = _lodash2.default.keys(model.$formatDatabaseJson(obj));
    var columnName = _lodash2.default.first(_lodash2.default.difference(cols, addedCols));

    return columnName || null;
  };

  return ModelBase;
}(), _class2.jsonSchema = null, _class2.virtualAttributes = null, _temp), (_applyDecoratedDescriptor(_class.prototype, '$omitFromJson', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '$omitFromJson'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '$omitFromDatabaseJson', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '$omitFromDatabaseJson'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '$stashedQueryProps', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, '$stashedQueryProps'), _class.prototype), _applyDecoratedDescriptor(_class, 'getValidator', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getValidator'), _class), _applyDecoratedDescriptor(_class, 'getJsonSchema', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getJsonSchema'), _class), _applyDecoratedDescriptor(_class, 'columnNameToPropertyName', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'columnNameToPropertyName'), _class), _applyDecoratedDescriptor(_class, 'propertyNameToColumnName', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'propertyNameToColumnName'), _class)), _class));
exports.default = ModelBase;


function toJsonImpl(model, createDbJson, omit, pick) {
  if (createDbJson) {
    return toDatabaseJsonImpl(model, omit, pick);
  } else {
    return toExternalJsonImpl(model, omit, pick);
  }
}

function toDatabaseJsonImpl(model, omit, pick) {
  var json = {};
  var omitFromJson = model.$omitFromDatabaseJson();
  var stash = model.$stashedQueryProps();

  if (stash) {
    var _keys = (0, _keys3.default)(stash);

    for (var i = 0, l = _keys.length; i < l; ++i) {
      var key = _keys[i];
      json[key] = stash[key];
    }
  }

  var keys = (0, _keys3.default)(model);

  for (var _i = 0, _l = keys.length; _i < _l; ++_i) {
    var _key = keys[_i];
    assignJsonValue(json, _key, model[_key], omit, pick, omitFromJson, true);
  }

  return json;
}

function toExternalJsonImpl(model, omit, pick) {
  var json = {};
  var omitFromJson = model.$omitFromJson();
  var keys = (0, _keys3.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    assignJsonValue(json, key, model[key], omit, pick, omitFromJson, false);
  }

  if (model.constructor.virtualAttributes) {
    var vAttr = model.constructor.virtualAttributes;

    for (var _i2 = 0, _l2 = vAttr.length; _i2 < _l2; ++_i2) {
      var _key2 = vAttr[_i2];
      var value = model[_key2];

      if (_lodash2.default.isFunction(value)) {
        value = value.call(model);
      }

      assignJsonValue(json, _key2, value, omit, pick, omitFromJson, false);
    }
  }

  return json;
}

function assignJsonValue(json, key, value, omit, pick, omitFromJson, createDbJson) {
  if (key.charAt(0) !== '$' && !_lodash2.default.isFunction(value) && !_lodash2.default.isUndefined(value) && (!omit || !omit[key]) && (!pick || pick[key]) && (!omitFromJson || !contains(omitFromJson, key))) {

    if (value !== null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
      json[key] = toJsonObject(value, createDbJson);
    } else {
      json[key] = value;
    }
  }
}

function toJsonObject(value, createDbJson) {
  if (Array.isArray(value)) {
    return toJsonArray(value, createDbJson);
  } else if (value instanceof ModelBase) {
    if (createDbJson) {
      return value.$toDatabaseJson();
    } else {
      return value.$toJson();
    }
  } else if (Buffer.isBuffer(value)) {
    return value;
  } else {
    return _lodash2.default.cloneDeep(value);
  }
}

function toJsonArray(value, createDbJson) {
  var ret = new Array(value.length);

  for (var i = 0, l = ret.length; i < l; ++i) {
    ret[i] = toJsonObject(value[i], createDbJson);
  }

  return ret;
}

function cloneObject(value) {
  if (Array.isArray(value)) {
    return cloneArray(value);
  } else if (value instanceof ModelBase) {
    return value.$clone();
  } else if (Buffer.isBuffer(value)) {
    return new Buffer(value);
  } else {
    return _lodash2.default.cloneDeep(value);
  }
}

function cloneArray(value) {
  var ret = new Array(value.length);

  for (var i = 0, l = ret.length; i < l; ++i) {
    ret[i] = cloneObject(value[i]);
  }

  return ret;
}

function omitObject(model, keyObj) {
  var ModelClass = model.constructor;
  var keys = (0, _keys3.default)(keyObj);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var value = keyObj[key];

    if (value && key.charAt(0) !== '$' && _lodash2.default.has(model, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function omitArray(model, keys) {
  var ModelClass = model.constructor;

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && _lodash2.default.has(model, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function pickObject(model, keyObj) {
  var ModelClass = model.constructor;
  var keys = (0, _keys3.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && !keyObj[key]) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function pickArray(model, pick) {
  var ModelClass = model.constructor;
  var keys = (0, _keys3.default)(model);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key.charAt(0) !== '$' && !contains(pick, key)) {
      ModelClass.omitImpl(model, key);
    }
  }
}

function contains(arr, value) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] === value) {
      return true;
    }
  }
  return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVsQmFzZS5qcyJdLCJuYW1lcyI6WyJNb2RlbEJhc2UiLCJuYW1lIiwiYXBwZW5kIiwiJGJlZm9yZVZhbGlkYXRlIiwianNvblNjaGVtYSIsImpzb24iLCJvcHRpb25zIiwiJHZhbGlkYXRlIiwic2tpcFZhbGlkYXRpb24iLCJ2YWxpZGF0b3IiLCJjb25zdHJ1Y3RvciIsImdldFZhbGlkYXRvciIsImFyZ3MiLCJtb2RlbCIsImN0eCIsImJlZm9yZVZhbGlkYXRlIiwidmFsaWRhdGUiLCJhZnRlclZhbGlkYXRlIiwiJGFmdGVyVmFsaWRhdGUiLCIkcGFyc2VEYXRhYmFzZUpzb24iLCIkZm9ybWF0RGF0YWJhc2VKc29uIiwiJHBhcnNlSnNvbiIsIiRmb3JtYXRKc29uIiwiJHRvRGF0YWJhc2VKc29uIiwiJCR0b0pzb24iLCIkdG9Kc29uIiwidG9KU09OIiwiJHNldEpzb24iLCJpc09iamVjdCIsImlzU3RyaW5nIiwiaXNOdW1iZXIiLCJpc0RhdGUiLCJpc0FycmF5IiwiaXNGdW5jdGlvbiIsImlzVHlwZWRBcnJheSIsImlzUmVnRXhwIiwiRXJyb3IiLCJzcGxpdCIsInF1ZXJ5IiwiJHN0YXNoZWRRdWVyeVByb3BzIiwiJHNldCIsIiRzZXREYXRhYmFzZUpzb24iLCJrZXlzIiwiaSIsImwiLCJsZW5ndGgiLCJrZXkiLCJvYmoiLCJ2YWx1ZSIsImNoYXJBdCIsIiRvbWl0RnJvbUpzb24iLCIkb21pdEZyb21EYXRhYmFzZUpzb24iLCJxdWVyeVByb3BzIiwiJG9taXQiLCJhcmd1bWVudHMiLCJBcnJheSIsIm9taXRBcnJheSIsIm9taXRPYmplY3QiLCJ0b0FycmF5IiwiJHBpY2siLCJwaWNrQXJyYXkiLCJwaWNrT2JqZWN0IiwiJHZhbHVlcyIsInZhbHVlcyIsInJldCIsIiRwcm9wS2V5IiwicHJvcHMiLCIkY2xvbmUiLCJjbG9uZSIsImNsb25lT2JqZWN0IiwiY3JlYXRlRGJKc29uIiwib21pdCIsInBpY2siLCJ0b0pzb25JbXBsIiwiZXh0ZW5kIiwic3ViY2xhc3NDb25zdHJ1Y3RvciIsImlzRW1wdHkiLCJmcm9tSnNvbiIsImZyb21EYXRhYmFzZUpzb24iLCJvbWl0SW1wbCIsInByb3AiLCJjcmVhdGVWYWxpZGF0b3IiLCJvbkNyZWF0ZUFqdiIsImFqdiIsImFsbEVycm9ycyIsInZhbGlkYXRlU2NoZW1hIiwib3duUHJvcGVydGllcyIsInY1IiwiZ2V0SnNvblNjaGVtYSIsImNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZSIsImNvbHVtbk5hbWUiLCJhZGRlZFByb3BzIiwicm93IiwicHJvcGVydHlOYW1lIiwiZmlyc3QiLCJkaWZmZXJlbmNlIiwicHJvcGVydHlOYW1lVG9Db2x1bW5OYW1lIiwiYWRkZWRDb2xzIiwiY29scyIsInZpcnR1YWxBdHRyaWJ1dGVzIiwidG9EYXRhYmFzZUpzb25JbXBsIiwidG9FeHRlcm5hbEpzb25JbXBsIiwib21pdEZyb21Kc29uIiwic3Rhc2giLCJhc3NpZ25Kc29uVmFsdWUiLCJ2QXR0ciIsImNhbGwiLCJpc1VuZGVmaW5lZCIsImNvbnRhaW5zIiwidG9Kc29uT2JqZWN0IiwidG9Kc29uQXJyYXkiLCJCdWZmZXIiLCJpc0J1ZmZlciIsImNsb25lRGVlcCIsImNsb25lQXJyYXkiLCJrZXlPYmoiLCJNb2RlbENsYXNzIiwiaGFzIiwiYXJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7O0lBUXFCQSxTLFdBK0xsQiwwQkFBVyxFQUFDQyxNQUFNLGNBQVAsRUFBdUJDLFFBQVEsSUFBL0IsRUFBWCxDLFVBT0EsMEJBQVcsRUFBQ0QsTUFBTSxzQkFBUCxFQUErQkMsUUFBUSxJQUF2QyxFQUFYLEMsVUFPQSwwQkFBVyxtQkFBWCxDOzs7OztBQWpNRDs7Ozs7Ozs7QUFWQTs7O3NCQWdCQUMsZSw0QkFBZ0JDLFUsRUFBWUMsSSxFQUFNQyxPLEVB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QixFQUFpQ0YsSUFBSUMsQ0FBckMsRUFBd0MsRUFBRUQsQ0FBMUMsRUFBNkM7QUFDM0MsUUFBTUcsTUFBTUosS0FBS0MsQ0FBTCxDQUFaOztBQUVBLFFBQUlHLElBQUlHLE1BQUosQ0FBVyxDQUFYLE1BQWtCLEdBQWxCLElBQXlCLENBQUMyRCxTQUFTcEMsSUFBVCxFQUFlMUIsR0FBZixDQUE5QixFQUFtRDtBQUNqRHNFLGlCQUFXckMsUUFBWCxDQUFvQmxFLEtBQXBCLEVBQTJCaUMsR0FBM0I7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBUzhELFFBQVQsQ0FBa0JVLEdBQWxCLEVBQXVCdEUsS0FBdkIsRUFBOEI7QUFDNUIsT0FBSyxJQUFJTCxJQUFJLENBQVIsRUFBV0MsSUFBSTBFLElBQUl6RSxNQUF4QixFQUFnQ0YsSUFBSUMsQ0FBcEMsRUFBdUMsRUFBRUQsQ0FBekMsRUFBNEM7QUFDMUMsUUFBSTJFLElBQUkzRSxDQUFKLE1BQVdLLEtBQWYsRUFBc0I7QUFDcEIsYUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6Ik1vZGVsQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgaGlkZGVuRGF0YSBmcm9tICcuLi91dGlscy9kZWNvcmF0b3JzL2hpZGRlbkRhdGEnO1xuaW1wb3J0IEFqdlZhbGlkYXRvciBmcm9tICcuL0FqdlZhbGlkYXRvcic7XG5pbXBvcnQgc3BsaXRRdWVyeVByb3BzIGZyb20gJy4uL3V0aWxzL3NwbGl0UXVlcnlQcm9wcyc7XG5pbXBvcnQge2luaGVyaXRzfSBmcm9tICcuLi91dGlscy9jbGFzc1V0aWxzJztcbmltcG9ydCBtZW1vaXplIGZyb20gJy4uL3V0aWxzL2RlY29yYXRvcnMvbWVtb2l6ZSc7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTW9kZWxPcHRpb25zXG4gKlxuICogQHByb3BlcnR5IHtib29sZWFufSBbcGF0Y2hdXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtza2lwVmFsaWRhdGlvbl1cbiAqIEBwcm9wZXJ0eSB7TW9kZWx9IFtvbGRdXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWxCYXNlIHtcblxuICAvKipcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIHN0YXRpYyBqc29uU2NoZW1hID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgc3RhdGljIHZpcnR1YWxBdHRyaWJ1dGVzID0gbnVsbDtcblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25TY2hlbWFcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gICRiZWZvcmVWYWxpZGF0ZShqc29uU2NoZW1hLCBqc29uLCBvcHRpb25zKSB7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICByZXR1cm4ganNvblNjaGVtYTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEB0aHJvd3Mge1ZhbGlkYXRpb25FcnJvcn1cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJHZhbGlkYXRlKGpzb24gPSB0aGlzLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAob3B0aW9ucy5za2lwVmFsaWRhdGlvbikge1xuICAgICAgcmV0dXJuIGpzb247XG4gICAgfVxuXG4gICAgY29uc3QgdmFsaWRhdG9yID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRWYWxpZGF0b3IoKTtcbiAgICBjb25zdCBhcmdzID0ge1xuICAgICAgb3B0aW9uczogb3B0aW9ucyxcbiAgICAgIG1vZGVsOiB0aGlzLFxuICAgICAganNvbjoganNvbixcbiAgICAgIGN0eDogT2JqZWN0LmNyZWF0ZShudWxsKVxuICAgIH07XG5cbiAgICB2YWxpZGF0b3IuYmVmb3JlVmFsaWRhdGUoYXJncyk7XG4gICAganNvbiA9IHZhbGlkYXRvci52YWxpZGF0ZShhcmdzKTtcbiAgICB2YWxpZGF0b3IuYWZ0ZXJWYWxpZGF0ZShhcmdzKTtcblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0ganNvblxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICovXG4gICRhZnRlclZhbGlkYXRlKGpzb24sIG9wdGlvbnMpIHtcbiAgICAvLyBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJHBhcnNlRGF0YWJhc2VKc29uKGpzb24pIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvblxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICAkZm9ybWF0RGF0YWJhc2VKc29uKGpzb24pIHtcbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvblxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJHBhcnNlSnNvbihqc29uLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgJGZvcm1hdEpzb24oanNvbikge1xuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gICR0b0RhdGFiYXNlSnNvbigpIHtcbiAgICByZXR1cm4gdGhpcy4kJHRvSnNvbih0cnVlLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICAkdG9Kc29uKCkge1xuICAgIHJldHVybiB0aGlzLiQkdG9Kc29uKGZhbHNlLCBudWxsLCBudWxsKTtcbiAgfVxuXG4gIHRvSlNPTigpIHtcbiAgICByZXR1cm4gdGhpcy4kdG9Kc29uKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGpzb25cbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtNb2RlbEJhc2V9XG4gICAqIEB0aHJvd3MgVmFsaWRhdGlvbkVycm9yXG4gICAqL1xuICAkc2V0SnNvbihqc29uLCBvcHRpb25zID0ge30pIHtcbiAgICBqc29uID0ganNvbiB8fCB7fTtcblxuICAgIGlmICghXy5pc09iamVjdChqc29uKVxuICAgICAgfHwgXy5pc1N0cmluZyhqc29uKVxuICAgICAgfHwgXy5pc051bWJlcihqc29uKVxuICAgICAgfHwgXy5pc0RhdGUoanNvbilcbiAgICAgIHx8IF8uaXNBcnJheShqc29uKVxuICAgICAgfHwgXy5pc0Z1bmN0aW9uKGpzb24pXG4gICAgICB8fCBfLmlzVHlwZWRBcnJheShqc29uKVxuICAgICAgfHwgXy5pc1JlZ0V4cChqc29uKSkge1xuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBzaG91bGQgb25seSBwYXNzIG9iamVjdHMgdG8gJHNldEpzb24gbWV0aG9kLiAnXG4gICAgICAgICsgJyRzZXRKc29uIG1ldGhvZCB3YXMgZ2l2ZW4gYW4gaW52YWxpZCB2YWx1ZSAnXG4gICAgICAgICsganNvbik7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGpzb24gY29udGFpbnMgcXVlcnkgcHJvcGVydGllcyBsaWtlLCBrbmV4IFJhdyBxdWVyaWVzIG9yIGtuZXgvb2JqZWN0aW9uIHF1ZXJ5XG4gICAgLy8gYnVpbGRlcnMsIHdlIG5lZWQgdG8gc3BsaXQgdGhvc2Ugb2ZmIGludG8gYSBzZXBhcmF0ZSBvYmplY3QuIFRoaXMgb2JqZWN0IHdpbGwgYmVcbiAgICAvLyBqb2luZWQgYmFjayBpbiB0aGUgJHRvRGF0YWJhc2VKc29uIG1ldGhvZC5cbiAgICBjb25zdCBzcGxpdCA9IHNwbGl0UXVlcnlQcm9wcyh0aGlzLmNvbnN0cnVjdG9yLCBqc29uKTtcblxuICAgIGlmIChzcGxpdC5xdWVyeSkge1xuICAgICAgLy8gU3Rhc2ggdGhlIHF1ZXJ5IHByb3BlcnRpZXMgZm9yIGxhdGVyIHVzZSBpbiAkdG9EYXRhYmFzZUpzb24gbWV0aG9kLlxuICAgICAgdGhpcy4kc3Rhc2hlZFF1ZXJ5UHJvcHMoc3BsaXQucXVlcnkpO1xuICAgIH1cblxuICAgIHNwbGl0Lmpzb24gPSB0aGlzLiRwYXJzZUpzb24oc3BsaXQuanNvbiwgb3B0aW9ucyk7XG4gICAgc3BsaXQuanNvbiA9IHRoaXMuJHZhbGlkYXRlKHNwbGl0Lmpzb24sIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMuJHNldChzcGxpdC5qc29uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0ganNvblxuICAgKiBAcmV0dXJucyB7TW9kZWxCYXNlfVxuICAgKi9cbiAgJHNldERhdGFiYXNlSnNvbihqc29uKSB7XG4gICAganNvbiA9IHRoaXMuJHBhcnNlRGF0YWJhc2VKc29uKGpzb24pO1xuXG4gICAgaWYgKGpzb24pIHtcbiAgICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhqc29uKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB0aGlzW2tleV0gPSBqc29uW2tleV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcmV0dXJucyB7TW9kZWxCYXNlfVxuICAgKi9cbiAgJHNldChvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IG9ialtrZXldO1xuXG4gICAgICAgIGlmIChrZXkuY2hhckF0KDApICE9PSAnJCcgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+PX0ga2V5c1xuICAgKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBAaGlkZGVuRGF0YSh7bmFtZTogJ29taXRGcm9tSnNvbicsIGFwcGVuZDogdHJ1ZX0pXG4gICRvbWl0RnJvbUpzb24oa2V5cykge31cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPj19IGtleXNcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQGhpZGRlbkRhdGEoe25hbWU6ICdvbWl0RnJvbURhdGFiYXNlSnNvbicsIGFwcGVuZDogdHJ1ZX0pXG4gICRvbWl0RnJvbURhdGFiYXNlSnNvbihrZXlzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IHF1ZXJ5UHJvcHNcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIEBoaWRkZW5EYXRhKCdzdGFzaGVkUXVlcnlQcm9wcycpXG4gICRzdGFzaGVkUXVlcnlQcm9wcyhxdWVyeVByb3BzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj59IGtleXNcbiAgICogQHJldHVybnMge01vZGVsQmFzZX1cbiAgICovXG4gICRvbWl0KCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIF8uaXNPYmplY3QoYXJndW1lbnRzWzBdKSkge1xuICAgICAgY29uc3Qga2V5cyA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgICAgb21pdEFycmF5KHRoaXMsIGtleXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb21pdE9iamVjdCh0aGlzLCBrZXlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb21pdEFycmF5KHRoaXMsIF8udG9BcnJheShhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xBcnJheS48c3RyaW5nPnxPYmplY3QuPHN0cmluZywgYm9vbGVhbj59IGtleXNcbiAgICogQHJldHVybnMge01vZGVsQmFzZX0gYHRoaXNgIGZvciBjaGFpbmluZy5cbiAgICovXG4gICRwaWNrKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIF8uaXNPYmplY3QoYXJndW1lbnRzWzBdKSkge1xuICAgICAgY29uc3Qga2V5cyA9IGFyZ3VtZW50c1swXTtcblxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoa2V5cykpIHtcbiAgICAgICAgcGlja0FycmF5KHRoaXMsIGtleXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGlja09iamVjdCh0aGlzLCBrZXlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGlja0FycmF5KHRoaXMsIF8udG9BcnJheShhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBwcm9wc1xuICAgKiBAcmV0dXJuIHtBcnJheS48Kj59XG4gICAqL1xuICAkdmFsdWVzKCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gXy52YWx1ZXModGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGFyZ3VtZW50c1swXSkpXG4gICAgICAgID8gYXJndW1lbnRzWzBdXG4gICAgICAgIDogYXJndW1lbnRzO1xuXG4gICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTogcmV0dXJuIFt0aGlzW2FyZ3NbMF1dXTtcbiAgICAgICAgY2FzZSAyOiByZXR1cm4gW3RoaXNbYXJnc1swXV0sIHRoaXNbYXJnc1sxXV1dO1xuICAgICAgICBjYXNlIDM6IHJldHVybiBbdGhpc1thcmdzWzBdXSwgdGhpc1thcmdzWzFdXSwgdGhpc1thcmdzWzJdXV07XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb25zdCByZXQgPSBuZXcgQXJyYXkoYXJncy5sZW5ndGgpO1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcmdzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgcmV0W2ldID0gdGhpc1thcmdzW2ldXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHByb3BzXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICovXG4gICRwcm9wS2V5KHByb3BzKSB7XG4gICAgc3dpdGNoIChwcm9wcy5sZW5ndGgpIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIHRoaXNbcHJvcHNbMF1dICsgJyc7XG4gICAgICBjYXNlIDI6IHJldHVybiB0aGlzW3Byb3BzWzBdXSArICcsJyArIHRoaXNbcHJvcHNbMV1dO1xuICAgICAgY2FzZSAzOiByZXR1cm4gdGhpc1twcm9wc1swXV0gKyAnLCcgKyB0aGlzW3Byb3BzWzFdXSArICcsJyArIHRoaXNbcHJvcHNbMl1dO1xuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBsZXQga2V5ID0gJyc7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwcm9wcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBrZXkgKz0gdGhpc1twcm9wc1tpXV0gKyAoKGkgPCBwcm9wcy5sZW5ndGggLSAxKSA/ICcsJyA6ICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBrZXk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge01vZGVsQmFzZX1cbiAgICovXG4gICRjbG9uZSgpIHtcbiAgICBjb25zdCBjbG9uZSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHRoaXMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpc1trZXldO1xuXG4gICAgICBpZiAoXy5pc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgY2xvbmVba2V5XSA9IGNsb25lT2JqZWN0KHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsb25lW2tleV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy4kb21pdEZyb21EYXRhYmFzZUpzb24oKSkge1xuICAgICAgY2xvbmUuJG9taXRGcm9tRGF0YWJhc2VKc29uKHRoaXMuJG9taXRGcm9tRGF0YWJhc2VKc29uKCkpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRvbWl0RnJvbUpzb24oKSkge1xuICAgICAgY2xvbmUuJG9taXRGcm9tSnNvbih0aGlzLiRvbWl0RnJvbUpzb24oKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJHN0YXNoZWRRdWVyeVByb3BzKCkpIHtcbiAgICAgIGNsb25lLiRzdGFzaGVkUXVlcnlQcm9wcyh0aGlzLiRzdGFzaGVkUXVlcnlQcm9wcygpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgJCR0b0pzb24oY3JlYXRlRGJKc29uLCBvbWl0LCBwaWNrKSB7XG4gICAgbGV0IGpzb24gPSB0b0pzb25JbXBsKHRoaXMsIGNyZWF0ZURiSnNvbiwgb21pdCwgcGljayk7XG5cbiAgICBpZiAoY3JlYXRlRGJKc29uKSB7XG4gICAgICByZXR1cm4gdGhpcy4kZm9ybWF0RGF0YWJhc2VKc29uKGpzb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy4kZm9ybWF0SnNvbihqc29uKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IHN1YmNsYXNzQ29uc3RydWN0b3JcbiAgICogQHJldHVybiB7Q29uc3RydWN0b3IuPE1vZGVsQmFzZT59XG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKHN1YmNsYXNzQ29uc3RydWN0b3IpIHtcbiAgICBpZiAoXy5pc0VtcHR5KHN1YmNsYXNzQ29uc3RydWN0b3IubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRWFjaCBNb2RlbEJhc2Ugc3ViY2xhc3MgY29uc3RydWN0b3IgbXVzdCBoYXZlIGEgbmFtZScpO1xuICAgIH1cblxuICAgIGluaGVyaXRzKHN1YmNsYXNzQ29uc3RydWN0b3IsIHRoaXMpO1xuICAgIHJldHVybiBzdWJjbGFzc0NvbnN0cnVjdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0ganNvblxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICogQHJldHVybnMge01vZGVsfVxuICAgKiBAdGhyb3dzIFZhbGlkYXRpb25FcnJvclxuICAgKi9cbiAgc3RhdGljIGZyb21Kc29uKGpzb24sIG9wdGlvbnMpIHtcbiAgICBsZXQgbW9kZWwgPSBuZXcgdGhpcygpO1xuICAgIG1vZGVsLiRzZXRKc29uKGpzb24gfHwge30sIG9wdGlvbnMpO1xuICAgIHJldHVybiBtb2RlbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGpzb25cbiAgICogQHJldHVybnMge01vZGVsfVxuICAgKi9cbiAgc3RhdGljIGZyb21EYXRhYmFzZUpzb24oanNvbikge1xuICAgIGxldCBtb2RlbCA9IG5ldyB0aGlzKCk7XG4gICAgbW9kZWwuJHNldERhdGFiYXNlSnNvbihqc29uIHx8IHt9KTtcbiAgICByZXR1cm4gbW9kZWw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcFxuICAgKi9cbiAgc3RhdGljIG9taXRJbXBsKG9iaiwgcHJvcCkge1xuICAgIGRlbGV0ZSBvYmpbcHJvcF07XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VmFsaWRhdG9yfVxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZVZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gbmV3IEFqdlZhbGlkYXRvcih7XG4gICAgICBvbkNyZWF0ZUFqdjogKGFqdikgPT4geyAvKiBEbyBOb3RoaW5nIGJ5IGRlZmF1bHQgKi8gfSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYWxsRXJyb3JzOiB0cnVlLFxuICAgICAgICB2YWxpZGF0ZVNjaGVtYTogZmFsc2UsXG4gICAgICAgIG93blByb3BlcnRpZXM6IHRydWUsXG4gICAgICAgIHY1OiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VmFsaWRhdG9yfVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldFZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBAbWVtb2l6ZVxuICBzdGF0aWMgZ2V0SnNvblNjaGVtYSgpIHtcbiAgICAvLyBNZW1vaXplZCBnZXR0ZXIgaW4gY2FzZSBqc29uU2NoZW1hIGlzIGEgZ2V0dGVyIHByb3BlcnR5ICh1c3VhbGx5IGlzIHdpdGggRVM2KS5cbiAgICByZXR1cm4gdGhpcy5qc29uU2NoZW1hO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjb2x1bW5OYW1lXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBAbWVtb2l6ZVxuICBzdGF0aWMgY29sdW1uTmFtZVRvUHJvcGVydHlOYW1lKGNvbHVtbk5hbWUpIHtcbiAgICBsZXQgbW9kZWwgPSBuZXcgdGhpcygpO1xuICAgIGxldCBhZGRlZFByb3BzID0gXy5rZXlzKG1vZGVsLiRwYXJzZURhdGFiYXNlSnNvbih7fSkpO1xuXG4gICAgbGV0IHJvdyA9IHt9O1xuICAgIHJvd1tjb2x1bW5OYW1lXSA9IG51bGw7XG5cbiAgICBsZXQgcHJvcHMgPSBfLmtleXMobW9kZWwuJHBhcnNlRGF0YWJhc2VKc29uKHJvdykpO1xuICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBfLmZpcnN0KF8uZGlmZmVyZW5jZShwcm9wcywgYWRkZWRQcm9wcykpO1xuXG4gICAgcmV0dXJuIHByb3BlcnR5TmFtZSB8fCBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eU5hbWVcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBwcm9wZXJ0eU5hbWVUb0NvbHVtbk5hbWUocHJvcGVydHlOYW1lKSB7XG4gICAgbGV0IG1vZGVsID0gbmV3IHRoaXMoKTtcbiAgICBsZXQgYWRkZWRDb2xzID0gXy5rZXlzKG1vZGVsLiRmb3JtYXREYXRhYmFzZUpzb24oe30pKTtcblxuICAgIGxldCBvYmogPSB7fTtcbiAgICBvYmpbcHJvcGVydHlOYW1lXSA9IG51bGw7XG5cbiAgICBsZXQgY29scyA9IF8ua2V5cyhtb2RlbC4kZm9ybWF0RGF0YWJhc2VKc29uKG9iaikpO1xuICAgIGxldCBjb2x1bW5OYW1lID0gXy5maXJzdChfLmRpZmZlcmVuY2UoY29scywgYWRkZWRDb2xzKSk7XG5cbiAgICByZXR1cm4gY29sdW1uTmFtZSB8fCBudWxsO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvSnNvbkltcGwobW9kZWwsIGNyZWF0ZURiSnNvbiwgb21pdCwgcGljaykge1xuICBpZiAoY3JlYXRlRGJKc29uKSB7XG4gICAgcmV0dXJuIHRvRGF0YWJhc2VKc29uSW1wbChtb2RlbCwgb21pdCwgcGljayk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRvRXh0ZXJuYWxKc29uSW1wbChtb2RlbCwgb21pdCwgcGljayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9EYXRhYmFzZUpzb25JbXBsKG1vZGVsLCBvbWl0LCBwaWNrKSB7XG4gIGxldCBqc29uID0ge307XG4gIGNvbnN0IG9taXRGcm9tSnNvbiA9IG1vZGVsLiRvbWl0RnJvbURhdGFiYXNlSnNvbigpO1xuICBjb25zdCBzdGFzaCA9IG1vZGVsLiRzdGFzaGVkUXVlcnlQcm9wcygpO1xuXG4gIGlmIChzdGFzaCkge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhzdGFzaCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAganNvbltrZXldID0gc3Rhc2hba2V5XTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIG1vZGVsW2tleV0sIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgdHJ1ZSk7XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gdG9FeHRlcm5hbEpzb25JbXBsKG1vZGVsLCBvbWl0LCBwaWNrKSB7XG4gIGNvbnN0IGpzb24gPSB7fTtcbiAgY29uc3Qgb21pdEZyb21Kc29uID0gbW9kZWwuJG9taXRGcm9tSnNvbigpO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIG1vZGVsW2tleV0sIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgZmFsc2UpO1xuICB9XG5cbiAgaWYgKG1vZGVsLmNvbnN0cnVjdG9yLnZpcnR1YWxBdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgdkF0dHIgPSBtb2RlbC5jb25zdHJ1Y3Rvci52aXJ0dWFsQXR0cmlidXRlcztcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdkF0dHIubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBrZXkgPSB2QXR0cltpXTtcbiAgICAgIGxldCB2YWx1ZSA9IG1vZGVsW2tleV07XG5cbiAgICAgIGlmIChfLmlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuY2FsbChtb2RlbCk7XG4gICAgICB9XG5cbiAgICAgIGFzc2lnbkpzb25WYWx1ZShqc29uLCBrZXksIHZhbHVlLCBvbWl0LCBwaWNrLCBvbWl0RnJvbUpzb24sIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ganNvbjtcbn1cblxuZnVuY3Rpb24gYXNzaWduSnNvblZhbHVlKGpzb24sIGtleSwgdmFsdWUsIG9taXQsIHBpY2ssIG9taXRGcm9tSnNvbiwgY3JlYXRlRGJKc29uKSB7XG4gIGlmIChrZXkuY2hhckF0KDApICE9PSAnJCdcbiAgICAmJiAhXy5pc0Z1bmN0aW9uKHZhbHVlKVxuICAgICYmICFfLmlzVW5kZWZpbmVkKHZhbHVlKVxuICAgICYmICghb21pdCB8fCAhb21pdFtrZXldKVxuICAgICYmICghcGljayB8fCBwaWNrW2tleV0pXG4gICAgJiYgKCFvbWl0RnJvbUpzb24gfHwgIWNvbnRhaW5zKG9taXRGcm9tSnNvbiwga2V5KSkpIHtcblxuICAgIGlmICh2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBqc29uW2tleV0gPSB0b0pzb25PYmplY3QodmFsdWUsIGNyZWF0ZURiSnNvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGpzb25ba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0b0pzb25PYmplY3QodmFsdWUsIGNyZWF0ZURiSnNvbikge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdG9Kc29uQXJyYXkodmFsdWUsIGNyZWF0ZURiSnNvbik7XG4gIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBNb2RlbEJhc2UpIHtcbiAgICBpZiAoY3JlYXRlRGJKc29uKSB7XG4gICAgICByZXR1cm4gdmFsdWUuJHRvRGF0YWJhc2VKc29uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZS4kdG9Kc29uKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF8uY2xvbmVEZWVwKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0b0pzb25BcnJheSh2YWx1ZSwgY3JlYXRlRGJKc29uKSB7XG4gIGNvbnN0IHJldCA9IG5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmV0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHJldFtpXSA9IHRvSnNvbk9iamVjdCh2YWx1ZVtpXSwgY3JlYXRlRGJKc29uKVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gY2xvbmVPYmplY3QodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIGNsb25lQXJyYXkodmFsdWUpO1xuICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgTW9kZWxCYXNlKSB7XG4gICAgcmV0dXJuIHZhbHVlLiRjbG9uZSgpO1xuICB9IGVsc2UgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcih2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIF8uY2xvbmVEZWVwKHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9uZUFycmF5KHZhbHVlKSB7XG4gIGNvbnN0IHJldCA9IG5ldyBBcnJheSh2YWx1ZS5sZW5ndGgpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmV0Lmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHJldFtpXSA9IGNsb25lT2JqZWN0KHZhbHVlW2ldKVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb21pdE9iamVjdChtb2RlbCwga2V5T2JqKSB7XG4gIGNvbnN0IE1vZGVsQ2xhc3MgPSBtb2RlbC5jb25zdHJ1Y3RvcjtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGtleU9iaik7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsdWUgPSBrZXlPYmpba2V5XTtcblxuICAgIGlmICh2YWx1ZSAmJiBrZXkuY2hhckF0KDApICE9PSAnJCcgJiYgXy5oYXMobW9kZWwsIGtleSkpIHtcbiAgICAgIE1vZGVsQ2xhc3Mub21pdEltcGwobW9kZWwsIGtleSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9taXRBcnJheShtb2RlbCwga2V5cykge1xuICBjb25zdCBNb2RlbENsYXNzID0gbW9kZWwuY29uc3RydWN0b3I7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG5cbiAgICBpZiAoa2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmIF8uaGFzKG1vZGVsLCBrZXkpKSB7XG4gICAgICBNb2RlbENsYXNzLm9taXRJbXBsKG1vZGVsLCBrZXkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBwaWNrT2JqZWN0KG1vZGVsLCBrZXlPYmopIHtcbiAgY29uc3QgTW9kZWxDbGFzcyA9IG1vZGVsLmNvbnN0cnVjdG9yO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMobW9kZWwpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuXG4gICAgaWYgKGtleS5jaGFyQXQoMCkgIT09ICckJyAmJiAha2V5T2JqW2tleV0pIHtcbiAgICAgIE1vZGVsQ2xhc3Mub21pdEltcGwobW9kZWwsIGtleSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHBpY2tBcnJheShtb2RlbCwgcGljaykge1xuICBjb25zdCBNb2RlbENsYXNzID0gbW9kZWwuY29uc3RydWN0b3I7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhtb2RlbCk7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG5cbiAgICBpZiAoa2V5LmNoYXJBdCgwKSAhPT0gJyQnICYmICFjb250YWlucyhwaWNrLCBrZXkpKSB7XG4gICAgICBNb2RlbENsYXNzLm9taXRJbXBsKG1vZGVsLCBrZXkpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjb250YWlucyhhcnIsIHZhbHVlKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufSJdfQ==
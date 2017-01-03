'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ajv = require('ajv');

var _ajv2 = _interopRequireDefault(_ajv);

var _Validator2 = require('./Validator');

var _Validator3 = _interopRequireDefault(_Validator2);

var _ModelBase = require('./ModelBase');

var _ModelBase2 = _interopRequireDefault(_ModelBase);

var _ValidationError = require('./ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AjvValidator = function (_Validator) {
  (0, _inherits3.default)(AjvValidator, _Validator);

  function AjvValidator(conf) {
    (0, _classCallCheck3.default)(this, AjvValidator);

    var _this = (0, _possibleConstructorReturn3.default)(this, _Validator.call(this));

    _this.ajv = new _ajv2.default(_lodash2.default.defaults({}, conf.options, {
      useDefaults: true
    }));

    _this.ajvNoDefaults = new _ajv2.default(_lodash2.default.assign({}, conf.options, {
      useDefaults: false
    }));

    _this.cache = (0, _create2.default)(null);

    conf.onCreateAjv(_this.ajv);
    conf.onCreateAjv(_this.ajvNoDefaults);
    return _this;
  }

  AjvValidator.prototype.beforeValidate = function beforeValidate(_ref) {
    var model = _ref.model,
        json = _ref.json,
        options = _ref.options,
        ctx = _ref.ctx;

    ctx.jsonSchema = model.constructor.getJsonSchema();

    if (model.$beforeValidate !== _ModelBase2.default.prototype.$beforeValidate) {
      ctx.jsonSchema = _lodash2.default.cloneDeep(ctx.jsonSchema);
      ctx.jsonSchema = model.$beforeValidate(ctx.jsonSchema, json, options);
    }
  };

  AjvValidator.prototype.validate = function validate(_ref2) {
    var model = _ref2.model,
        json = _ref2.json,
        options = _ref2.options,
        ctx = _ref2.ctx;

    if (!ctx.jsonSchema) {
      return json;
    }

    var validator = this.getJsonSchemaValidator(model.constructor, ctx.jsonSchema, !!options.patch);

    if (!options.patch && this.setsDefaultValues(ctx.jsonSchema)) {
      json = _lodash2.default.cloneDeep(json);
    }

    validator(json);

    if (validator.errors) {
      throw parseValidationError(validator.errors);
    }

    return json;
  };

  AjvValidator.prototype.getJsonSchemaValidator = function getJsonSchemaValidator(ModelClass, jsonSchema, skipRequired) {
    var key = jsonSchema === ModelClass.getJsonSchema() ? 'default' : (0, _stringify2.default)(jsonSchema);

    var validators = this.cache[key];

    if (!validators) {
      validators = {};
      this.cache[key] = validators;
    }

    var validator = validators[skipRequired];

    if (!validator) {
      validator = this.compileJsonSchemaValidator(jsonSchema, skipRequired);
      validators[skipRequired] = validator;
    }

    return validator;
  };

  AjvValidator.prototype.compileJsonSchemaValidator = function compileJsonSchemaValidator(jsonSchema, skipRequired) {
    var origRequired = void 0;

    try {
      if (skipRequired) {
        origRequired = jsonSchema.required;
        jsonSchema.required = [];
        return this.ajvNoDefaults.compile(jsonSchema);
      } else {
        return this.ajv.compile(jsonSchema);
      }
    } finally {
      if (skipRequired) {
        jsonSchema.required = origRequired;
      }
    }
  };

  AjvValidator.prototype.setsDefaultValues = function setsDefaultValues(jsonSchema) {
    return jsonSchema && jsonSchema.properties && hasDefaults(jsonSchema.properties);
  };

  return AjvValidator;
}(_Validator3.default);

exports.default = AjvValidator;


function parseValidationError(errors) {
  var errorHash = {};
  var index = 0;

  for (var i = 0; i < errors.length; ++i) {
    var error = errors[i];
    var key = error.dataPath.substring(1);

    if (!key) {
      var match = /should have required property '(.+)'/.exec(error.message);
      if (match && match.length > 1) {
        key = match[1];
      }
    }

    if (!key && error.params && error.params.additionalProperty) {
      key = error.params.additionalProperty;
    }

    if (!key) {
      key = (index++).toString();
    }

    errorHash[key] = error.message;
  }

  return new _ValidationError2.default(errorHash);
}

function hasDefaults(obj) {
  return Array.isArray(obj) ? arrayHasDefaults(obj) : objectHasDefaults(obj);
}

function arrayHasDefaults(arr) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    var val = arr[i];

    if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && hasDefaults(val)) {
      return true;
    }
  }

  return false;
}

function objectHasDefaults(obj) {
  var keys = (0, _keys2.default)(obj);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];

    if (key === 'default') {
      return true;
    } else {
      var val = obj[key];

      if (val && (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && hasDefaults(val)) {
        return true;
      }
    }
  }

  return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFqdlZhbGlkYXRvci5qcyJdLCJuYW1lcyI6WyJBanZWYWxpZGF0b3IiLCJjb25mIiwiYWp2IiwiZGVmYXVsdHMiLCJvcHRpb25zIiwidXNlRGVmYXVsdHMiLCJhanZOb0RlZmF1bHRzIiwiYXNzaWduIiwiY2FjaGUiLCJvbkNyZWF0ZUFqdiIsImJlZm9yZVZhbGlkYXRlIiwibW9kZWwiLCJqc29uIiwiY3R4IiwianNvblNjaGVtYSIsImNvbnN0cnVjdG9yIiwiZ2V0SnNvblNjaGVtYSIsIiRiZWZvcmVWYWxpZGF0ZSIsInByb3RvdHlwZSIsImNsb25lRGVlcCIsInZhbGlkYXRlIiwidmFsaWRhdG9yIiwiZ2V0SnNvblNjaGVtYVZhbGlkYXRvciIsInBhdGNoIiwic2V0c0RlZmF1bHRWYWx1ZXMiLCJlcnJvcnMiLCJwYXJzZVZhbGlkYXRpb25FcnJvciIsIk1vZGVsQ2xhc3MiLCJza2lwUmVxdWlyZWQiLCJrZXkiLCJ2YWxpZGF0b3JzIiwiY29tcGlsZUpzb25TY2hlbWFWYWxpZGF0b3IiLCJvcmlnUmVxdWlyZWQiLCJyZXF1aXJlZCIsImNvbXBpbGUiLCJwcm9wZXJ0aWVzIiwiaGFzRGVmYXVsdHMiLCJlcnJvckhhc2giLCJpbmRleCIsImkiLCJsZW5ndGgiLCJlcnJvciIsImRhdGFQYXRoIiwic3Vic3RyaW5nIiwibWF0Y2giLCJleGVjIiwibWVzc2FnZSIsInBhcmFtcyIsImFkZGl0aW9uYWxQcm9wZXJ0eSIsInRvU3RyaW5nIiwib2JqIiwiQXJyYXkiLCJpc0FycmF5IiwiYXJyYXlIYXNEZWZhdWx0cyIsIm9iamVjdEhhc0RlZmF1bHRzIiwiYXJyIiwibCIsInZhbCIsImtleXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxZOzs7QUFFbkIsd0JBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFBQSwrREFDaEIscUJBRGdCOztB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RUEsVUFBSTRCLE9BQU8sUUFBT0EsR0FBUCx1REFBT0EsR0FBUCxPQUFlLFFBQXRCLElBQWtDckIsWUFBWXFCLEdBQVosQ0FBdEMsRUFBd0Q7QUFDdEQsZUFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6IkFqdlZhbGlkYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQWp2IGZyb20gJ2Fqdic7XG5pbXBvcnQgVmFsaWRhdG9yIGZyb20gJy4vVmFsaWRhdG9yJztcbmltcG9ydCBNb2RlbEJhc2UgZnJvbSAnLi9Nb2RlbEJhc2UnO1xuaW1wb3J0IFZhbGlkYXRpb25FcnJvciBmcm9tICcuL1ZhbGlkYXRpb25FcnJvcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqdlZhbGlkYXRvciBleHRlbmRzIFZhbGlkYXRvciB7XG5cbiAgY29uc3RydWN0b3IoY29uZikge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmFqdiA9IG5ldyBBanYoXy5kZWZhdWx0cyh7fSwgY29uZi5vcHRpb25zLCB7XG4gICAgICB1c2VEZWZhdWx0czogdHJ1ZVxuICAgIH0pKTtcblxuICAgIHRoaXMuYWp2Tm9EZWZhdWx0cyA9IG5ldyBBanYoXy5hc3NpZ24oe30sIGNvbmYub3B0aW9ucywge1xuICAgICAgdXNlRGVmYXVsdHM6IGZhbHNlXG4gICAgfSkpO1xuXG4gICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBjb25mLm9uQ3JlYXRlQWp2KHRoaXMuYWp2KTtcbiAgICBjb25mLm9uQ3JlYXRlQWp2KHRoaXMuYWp2Tm9EZWZhdWx0cyk7XG4gIH1cblxuICBiZWZvcmVWYWxpZGF0ZSh7bW9kZWwsIGpzb24sIG9wdGlvbnMsIGN0eH0pIHtcbiAgICBjdHguanNvblNjaGVtYSA9IG1vZGVsLmNvbnN0cnVjdG9yLmdldEpzb25TY2hlbWEoKTtcblxuICAgIGlmIChtb2RlbC4kYmVmb3JlVmFsaWRhdGUgIT09IE1vZGVsQmFzZS5wcm90b3R5cGUuJGJlZm9yZVZhbGlkYXRlKSB7XG4gICAgICBjdHguanNvblNjaGVtYSA9IF8uY2xvbmVEZWVwKGN0eC5qc29uU2NoZW1hKTtcbiAgICAgIGN0eC5qc29uU2NoZW1hID0gbW9kZWwuJGJlZm9yZVZhbGlkYXRlKGN0eC5qc29uU2NoZW1hLCBqc29uLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZSh7bW9kZWwsIGpzb24sIG9wdGlvbnMsIGN0eH0pIHtcbiAgICBpZiAoIWN0eC5qc29uU2NoZW1hKSB7XG4gICAgICByZXR1cm4ganNvbjtcbiAgICB9XG5cbiAgICBjb25zdCB2YWxpZGF0b3IgPSB0aGlzLmdldEpzb25TY2hlbWFWYWxpZGF0b3IobW9kZWwuY29uc3RydWN0b3IsIGN0eC5qc29uU2NoZW1hLCAhIW9wdGlvbnMucGF0Y2gpO1xuXG4gICAgaWYgKCFvcHRpb25zLnBhdGNoICYmIHRoaXMuc2V0c0RlZmF1bHRWYWx1ZXMoY3R4Lmpzb25TY2hlbWEpKSB7XG4gICAgICBqc29uID0gXy5jbG9uZURlZXAoanNvbik7XG4gICAgfVxuXG4gICAgdmFsaWRhdG9yKGpzb24pO1xuXG4gICAgaWYgKHZhbGlkYXRvci5lcnJvcnMpIHtcbiAgICAgIHRocm93IHBhcnNlVmFsaWRhdGlvbkVycm9yKHZhbGlkYXRvci5lcnJvcnMpO1xuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgZ2V0SnNvblNjaGVtYVZhbGlkYXRvcihNb2RlbENsYXNzLCBqc29uU2NoZW1hLCBza2lwUmVxdWlyZWQpIHtcbiAgICBjb25zdCBrZXkgPSBqc29uU2NoZW1hID09PSBNb2RlbENsYXNzLmdldEpzb25TY2hlbWEoKVxuICAgICAgPyAnZGVmYXVsdCdcbiAgICAgIDogSlNPTi5zdHJpbmdpZnkoanNvblNjaGVtYSk7XG5cbiAgICBsZXQgdmFsaWRhdG9ycyA9IHRoaXMuY2FjaGVba2V5XTtcblxuICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgdmFsaWRhdG9ycyA9IHt9O1xuICAgICAgdGhpcy5jYWNoZVtrZXldID0gdmFsaWRhdG9ycztcbiAgICB9XG5cbiAgICBsZXQgdmFsaWRhdG9yID0gdmFsaWRhdG9yc1tza2lwUmVxdWlyZWRdO1xuXG4gICAgaWYgKCF2YWxpZGF0b3IpIHtcbiAgICAgIHZhbGlkYXRvciA9IHRoaXMuY29tcGlsZUpzb25TY2hlbWFWYWxpZGF0b3IoanNvblNjaGVtYSwgc2tpcFJlcXVpcmVkKTtcbiAgICAgIHZhbGlkYXRvcnNbc2tpcFJlcXVpcmVkXSA9IHZhbGlkYXRvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdG9yO1xuICB9XG5cbiAgY29tcGlsZUpzb25TY2hlbWFWYWxpZGF0b3IoanNvblNjaGVtYSwgc2tpcFJlcXVpcmVkKSB7XG4gICAgbGV0IG9yaWdSZXF1aXJlZDtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoc2tpcFJlcXVpcmVkKSB7XG4gICAgICAgIG9yaWdSZXF1aXJlZCA9IGpzb25TY2hlbWEucmVxdWlyZWQ7XG4gICAgICAgIGpzb25TY2hlbWEucmVxdWlyZWQgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWp2Tm9EZWZhdWx0cy5jb21waWxlKGpzb25TY2hlbWEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWp2LmNvbXBpbGUoanNvblNjaGVtYSk7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmIChza2lwUmVxdWlyZWQpIHtcbiAgICAgICAganNvblNjaGVtYS5yZXF1aXJlZCA9IG9yaWdSZXF1aXJlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRzRGVmYXVsdFZhbHVlcyhqc29uU2NoZW1hKSB7XG4gICAgcmV0dXJuIGpzb25TY2hlbWEgJiYganNvblNjaGVtYS5wcm9wZXJ0aWVzICYmIGhhc0RlZmF1bHRzKGpzb25TY2hlbWEucHJvcGVydGllcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGFyc2VWYWxpZGF0aW9uRXJyb3IoZXJyb3JzKSB7XG4gIGNvbnN0IGVycm9ySGFzaCA9IHt9O1xuICBsZXQgaW5kZXggPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JzLmxlbmd0aDsgKytpKSB7XG4gICAgbGV0IGVycm9yID0gZXJyb3JzW2ldO1xuICAgIGxldCBrZXkgPSBlcnJvci5kYXRhUGF0aC5zdWJzdHJpbmcoMSk7XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgbGV0IG1hdGNoID0gL3Nob3VsZCBoYXZlIHJlcXVpcmVkIHByb3BlcnR5ICcoLispJy8uZXhlYyhlcnJvci5tZXNzYWdlKTtcbiAgICAgIGlmIChtYXRjaCAmJiBtYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGtleSA9IG1hdGNoWzFdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgha2V5ICYmIGVycm9yLnBhcmFtcyAmJiBlcnJvci5wYXJhbXMuYWRkaXRpb25hbFByb3BlcnR5KSB7XG4gICAgICBrZXkgPSBlcnJvci5wYXJhbXMuYWRkaXRpb25hbFByb3BlcnR5O1xuICAgIH1cblxuICAgIGlmICgha2V5KSB7XG4gICAgICBrZXkgPSAoaW5kZXgrKykudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBlcnJvckhhc2hba2V5XSA9IGVycm9yLm1lc3NhZ2U7XG4gIH1cblxuICByZXR1cm4gbmV3IFZhbGlkYXRpb25FcnJvcihlcnJvckhhc2gpO1xufVxuXG5mdW5jdGlvbiBoYXNEZWZhdWx0cyhvYmopIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkob2JqKSA/IGFycmF5SGFzRGVmYXVsdHMob2JqKSA6IG9iamVjdEhhc0RlZmF1bHRzKG9iaik7XG59XG5cbmZ1bmN0aW9uIGFycmF5SGFzRGVmYXVsdHMoYXJyKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHZhbCA9IGFycltpXTtcblxuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgaGFzRGVmYXVsdHModmFsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBvYmplY3RIYXNEZWZhdWx0cyhvYmopIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG5cbiAgICBpZiAoa2V5ID09PSAnZGVmYXVsdCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiBoYXNEZWZhdWx0cyh2YWwpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==
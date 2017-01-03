'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _dec27, _dec28, _dec29, _dec30, _dec31, _dec32, _dec33, _dec34, _dec35, _dec36, _dec37, _dec38, _dec39, _dec40, _dec41, _dec42, _dec43, _dec44, _dec45, _dec46, _dec47, _dec48, _dec49, _dec50, _dec51, _dec52, _dec53, _dec54, _dec55, _dec56, _dec57, _dec58, _dec59, _dec60, _dec61, _dec62, _dec63, _dec64, _dec65, _dec66, _dec67, _dec68, _dec69, _dec70, _dec71, _dec72, _dec73, _dec74, _dec75, _dec76, _dec77, _dec78, _dec79, _dec80, _dec81, _dec82, _dec83, _dec84, _dec85, _dec86, _dec87, _dec88, _dec89, _dec90, _dec91, _dec92, _dec93, _dec94, _dec95, _dec96, _dec97, _dec98, _dec99, _dec100, _dec101, _dec102, _dec103, _dec104, _dec105, _dec106, _desc, _value, _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _queryBuilderOperation = require('./decorators/queryBuilderOperation');

var _queryBuilderOperation2 = _interopRequireDefault(_queryBuilderOperation);

var _classUtils = require('../utils/classUtils');

var _QueryBuilderContextBase = require('./QueryBuilderContextBase');

var _QueryBuilderContextBase2 = _interopRequireDefault(_QueryBuilderContextBase);

var _KnexOperation = require('./operations/KnexOperation');

var _KnexOperation2 = _interopRequireDefault(_KnexOperation);

var _SelectOperation = require('./operations/SelectOperation');

var _SelectOperation2 = _interopRequireDefault(_SelectOperation);

var _WhereRefOperation = require('./operations/WhereRefOperation');

var _WhereRefOperation2 = _interopRequireDefault(_WhereRefOperation);

var _WhereCompositeOperation = require('./operations/WhereCompositeOperation');

var _WhereCompositeOperation2 = _interopRequireDefault(_WhereCompositeOperation);

var _WhereInCompositeOperation = require('./operations/WhereInCompositeOperation');

var _WhereInCompositeOperation2 = _interopRequireDefault(_WhereInCompositeOperation);

var _WhereInCompositeSqliteOperation = require('./operations/WhereInCompositeSqliteOperation');

var _WhereInCompositeSqliteOperation2 = _interopRequireDefault(_WhereInCompositeSqliteOperation);

var _WhereJsonPostgresOperation = require('./operations/jsonApi/WhereJsonPostgresOperation');

var _WhereJsonPostgresOperation2 = _interopRequireDefault(_WhereJsonPostgresOperation);

var _WhereJsonHasPostgresOperation = require('./operations/jsonApi/WhereJsonHasPostgresOperation');

var _WhereJsonHasPostgresOperation2 = _interopRequireDefault(_WhereJsonHasPostgresOperation);

var _WhereJsonFieldPostgresOperation = require('./operations/jsonApi/WhereJsonFieldPostgresOperation');

var _WhereJsonFieldPostgresOperation2 = _interopRequireDefault(_WhereJsonFieldPostgresOperation);

var _WhereJsonNotObjectPostgresOperation = require('./operations/jsonApi/WhereJsonNotObjectPostgresOperation');

var _WhereJsonNotObjectPostgresOperation2 = _interopRequireDefault(_WhereJsonNotObjectPostgresOperation);

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
 * This class is a thin wrapper around knex query builder. This class allows us to add our own
 * query builder methods without monkey patching knex query builder.
 */

var QueryBuilderBase = (_dec = (0, _queryBuilderOperation2.default)(_SelectOperation2.default), _dec2 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec3 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec4 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec5 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default, 'delete'), _dec6 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec7 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec8 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec9 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec10 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec11 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec12 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec13 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec14 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec15 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec16 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec17 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec18 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec19 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec20 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec21 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec22 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec23 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec24 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec25 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec26 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec27 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec28 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec29 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec30 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec31 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec32 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec33 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec34 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec35 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec36 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec37 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec38 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec39 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec40 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec41 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec42 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec43 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec44 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec45 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec46 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec47 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec48 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec49 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec50 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec51 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec52 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec53 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec54 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec55 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec56 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec57 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec58 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec59 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec60 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec61 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec62 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec63 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec64 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec65 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec66 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec67 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec68 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec69 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec70 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec71 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec72 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec73 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec74 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec75 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec76 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec77 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec78 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec79 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec80 = (0, _queryBuilderOperation2.default)(_KnexOperation2.default), _dec81 = (0, _queryBuilderOperation2.default)([_WhereRefOperation2.default, { bool: 'and' }]), _dec82 = (0, _queryBuilderOperation2.default)([_WhereRefOperation2.default, { bool: 'or' }]), _dec83 = (0, _queryBuilderOperation2.default)(_WhereCompositeOperation2.default), _dec84 = (0, _queryBuilderOperation2.default)({
  default: _WhereInCompositeOperation2.default,
  sqlite3: _WhereInCompositeSqliteOperation2.default
}), _dec85 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '=', bool: 'and' }]), _dec86 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '=', bool: 'or' }]), _dec87 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '!=', bool: 'and' }]), _dec88 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '!=', bool: 'or' }]), _dec89 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'and' }]), _dec90 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'or' }]), _dec91 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'and', prefix: 'not' }]), _dec92 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '@>', bool: 'or', prefix: 'not' }]), _dec93 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'and' }]), _dec94 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'or' }]), _dec95 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'and', prefix: 'not' }]), _dec96 = (0, _queryBuilderOperation2.default)([_WhereJsonPostgresOperation2.default, { operator: '<@', bool: 'or', prefix: 'not' }]), _dec97 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'and', compareValue: [] }]), _dec98 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'or', compareValue: [] }]), _dec99 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'and', compareValue: {} }]), _dec100 = (0, _queryBuilderOperation2.default)([_WhereJsonNotObjectPostgresOperation2.default, { bool: 'or', compareValue: {} }]), _dec101 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'and', operator: '?|' }]), _dec102 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'or', operator: '?|' }]), _dec103 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'and', operator: '?&' }]), _dec104 = (0, _queryBuilderOperation2.default)([_WhereJsonHasPostgresOperation2.default, { bool: 'or', operator: '?&' }]), _dec105 = (0, _queryBuilderOperation2.default)([_WhereJsonFieldPostgresOperation2.default, { bool: 'and' }]), _dec106 = (0, _queryBuilderOperation2.default)([_WhereJsonFieldPostgresOperation2.default, { bool: 'or' }]), (_class = (_temp = _class2 = function () {
  function QueryBuilderBase(knex, QueryBuilderContext) {
    (0, _classCallCheck3.default)(this, QueryBuilderBase);

    /**
     * @type {knex}
     * @protected
     */
    this._knex = knex;
    /**
     * @type {Array.<QueryBuilderOperation>}
     * @protected
     */
    this._operations = [];
    /**
     * @type {QueryBuilderContextBase}
     * @protected
     */
    this._context = new (QueryBuilderContext || _QueryBuilderContextBase2.default)(this._createUserContextBase());
  }

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<QueryBuilderBase>}
   */
  QueryBuilderBase.extend = function extend(subclassConstructor) {
    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {Object=} ctx
   * @returns {Object|QueryBuilderBase}
   */


  QueryBuilderBase.prototype.context = function context(ctx) {
    if (arguments.length === 0) {
      return this._context.userContext;
    } else {
      var ctxBase = this._createUserContextBase();
      this._context.userContext = (0, _assign2.default)(ctxBase, ctx);
      return this;
    }
  };

  /**
   * @param {Object=} ctx
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.mergeContext = function mergeContext(ctx) {
    var oldCtx = this._context.userContext;
    this._context.userContext = (0, _assign2.default)(oldCtx, ctx);
    return this;
  };

  /**
   * @param {QueryBuilderContextBase=} ctx
   * @returns {QueryBuilderContextBase|QueryBuilderBase}
   */


  QueryBuilderBase.prototype.internalContext = function internalContext(ctx) {
    if (arguments.length === 0) {
      return this._context;
    } else {
      this._context = ctx;
      return this;
    }
  };

  /**
   * @param {knex=} knex
   * @returns {Object|QueryBuilderBase}
   */


  QueryBuilderBase.prototype.knex = function knex(_knex) {
    if (arguments.length === 0) {
      var knex = this._context.knex || this._knex;

      if (!knex) {
        throw new Error('no database connection available for a query for table ' + this.modelClass().tableName + '. ' + 'You need to bind the model class or the query to a knex instance.');
      }

      return knex;
    } else {
      this._knex = _knex;
      return this;
    }
  };

  /**
   * @param {function} func
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.modify = function modify(func) {
    if (!func) {
      return this;
    }

    if (arguments.length === 1) {
      func.call(this, this);
    } else {
      var args = new Array(arguments.length);

      args[0] = this;
      for (var i = 1, l = args.length; i < l; ++i) {
        args[i] = arguments[i];
      }

      func.apply(this, args);
    }

    return this;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @return {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.clear = function clear(operationSelector) {
    var operations = [];

    this.forEachOperation(operationSelector, function (op) {
      operations.push(op);
    }, false);

    this._operations = operations;
    return this;
  };

  /**
   * @param {QueryBuilderBase} queryBuilder
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @return {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.copyFrom = function copyFrom(queryBuilder, operationSelector) {
    var _this = this;

    queryBuilder.forEachOperation(operationSelector, function (op) {
      _this._operations.push(op);
    });

    return this;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @returns {boolean}
   */


  QueryBuilderBase.prototype.has = function has(operationSelector) {
    var found = false;

    this.forEachOperation(operationSelector, function () {
      found = true;
      return false;
    });

    return found;
  };

  /**
   * @return {boolean}
   */


  QueryBuilderBase.prototype.isSelectAll = function isSelectAll() {
    return !this.has(QueryBuilderBase.SelectRegex) && !this.has(QueryBuilderBase.WhereRegex);
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @returns {boolean}
   */


  QueryBuilderBase.prototype.indexOfOperation = function indexOfOperation(operationSelector) {
    var idx = -1;

    this.forEachOperation(operationSelector, function (op, i) {
      idx = i;
      return false;
    });

    return idx;
  };

  /**
   * @param {RegExp|Constructor.<? extends QueryBuilderOperation>} operationSelector
   * @param {function(QueryBuilderOperation)} callback
   * @param {boolean} match
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.forEachOperation = function forEachOperation(operationSelector, callback) {
    var match = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    if (_lodash2.default.isRegExp(operationSelector)) {
      for (var i = 0, l = this._operations.length; i < l; ++i) {
        var op = this._operations[i];

        if (operationSelector.test(op.name) === match) {
          if (callback(op, i) === false) {
            break;
          }
        }
      }
    } else {
      for (var _i = 0, _l = this._operations.length; _i < _l; ++_i) {
        var _op = this._operations[_i];

        if (_op instanceof operationSelector === match) {
          if (callback(_op, _i) === false) {
            break;
          }
        }
      }
    }

    return this;
  };

  /**
   * @param {QueryBuilderOperation} operation
   * @param {Array.<*>} args
   * @param {Boolean=} pushFront
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.callQueryBuilderOperation = function callQueryBuilderOperation(operation, args, pushFront) {
    if (operation.call(this, args || [])) {
      if (pushFront) {
        this._operations.splice(0, 0, operation);
      } else {
        this._operations.push(operation);
      }
    }

    return this;
  };

  /**
   * @param {string} methodName
   * @param {Array.<*>} args
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.callKnexQueryBuilderOperation = function callKnexQueryBuilderOperation(methodName, args, pushFront) {
    return this.callQueryBuilderOperation(new _KnexOperation2.default(methodName), args, pushFront);
  };

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.clone = function clone() {
    return this.baseCloneInto(new this.constructor(this.knex()));
  };

  /**
   * @protected
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.baseCloneInto = function baseCloneInto(builder) {
    builder._knex = this._knex;
    builder._operations = this._operations.slice();
    builder._context = this._context.clone();

    return builder;
  };

  /**
   * @returns {knex.QueryBuilder}
   */


  QueryBuilderBase.prototype.build = function build() {
    return this.buildInto(this.knex().queryBuilder());
  };

  /**
   * @protected
   */


  QueryBuilderBase.prototype.buildInto = function buildInto(knexBuilder) {
    var tmp = new Array(10);

    var i = 0;
    while (i < this._operations.length) {
      var op = this._operations[i];
      var ln = this._operations.length;

      op.onBeforeBuild(this);

      var numNew = this._operations.length - ln;

      // onBeforeBuild may call methods that add more operations. If
      // this was the case, move the operations to be executed next.
      if (numNew > 0) {
        while (tmp.length < numNew) {
          tmp.push(null);
        }

        for (var j = 0; j < numNew; ++j) {
          tmp[j] = this._operations[ln + j];
        }

        for (var _j = ln + numNew - 1; _j > i + numNew; --_j) {
          this._operations[_j] = this._operations[_j - numNew];
        }

        for (var _j2 = 0; _j2 < numNew; ++_j2) {
          this._operations[i + _j2 + 1] = tmp[_j2];
        }
      }

      ++i;
    }

    // onBuild operations should never add new operations. They should only call
    // methods on the knex query builder.
    for (var _i2 = 0, l = this._operations.length; _i2 < l; ++_i2) {
      this._operations[_i2].onBuild(knexBuilder, this);
    }

    return knexBuilder;
  };

  /**
   * @returns {string}
   */


  QueryBuilderBase.prototype.toString = function toString() {
    return this.build().toString();
  };

  /**
   * @returns {string}
   */


  QueryBuilderBase.prototype.toSql = function toSql() {
    return this.toString();
  };

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.skipUndefined = function skipUndefined() {
    this._context.skipUndefined = true;
    return this;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilderBase.prototype.shouldSkipUndefined = function shouldSkipUndefined() {
    return this._context.skipUndefined;
  };

  /**
   * @param {Transaction} trx
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.transacting = function transacting(trx) {
    this._context.knex = trx || null;
    return this;
  };

  /**
   * @private
   */


  QueryBuilderBase.prototype._createUserContextBase = function _createUserContextBase() {
    var _this2 = this;

    var ctxProto = {};

    Object.defineProperty(ctxProto, 'transaction', {
      enumerable: false,
      get: function get() {
        return _this2.knex();
      }
    });

    return (0, _create2.default)(ctxProto);
  };

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.select = function select() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.insert = function insert() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.update = function update() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.delete = function _delete() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.del = function del() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.forUpdate = function forUpdate() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.forShare = function forShare() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.as = function as() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.columns = function columns() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.column = function column() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.from = function from() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.fromJS = function fromJS() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.into = function into() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.withSchema = function withSchema() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.table = function table() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.distinct = function distinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.join = function join() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.joinRaw = function joinRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.innerJoin = function innerJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.leftJoin = function leftJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.leftOuterJoin = function leftOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.rightJoin = function rightJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.rightOuterJoin = function rightOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.outerJoin = function outerJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.fullOuterJoin = function fullOuterJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.crossJoin = function crossJoin() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.where = function where() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhere = function andWhere() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhere = function orWhere() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNot = function whereNot() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNot = function orWhereNot() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereRaw = function whereRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereWrapped = function whereWrapped() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.havingWrapped = function havingWrapped() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereRaw = function orWhereRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereExists = function whereExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereExists = function orWhereExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotExists = function whereNotExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotExists = function orWhereNotExists() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereIn = function whereIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereIn = function orWhereIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotIn = function whereNotIn() {};

  /**
   */


  QueryBuilderBase.prototype.orWhereNotIn = function orWhereNotIn() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNull = function whereNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNull = function orWhereNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotNull = function whereNotNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotNull = function orWhereNotNull() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereBetween = function whereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhereBetween = function andWhereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereNotBetween = function whereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.andWhereNotBetween = function andWhereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereBetween = function orWhereBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereNotBetween = function orWhereNotBetween() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.groupBy = function groupBy() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.groupByRaw = function groupByRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orderBy = function orderBy() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orderByRaw = function orderByRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.union = function union() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.unionAll = function unionAll() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.having = function having() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.havingRaw = function havingRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orHaving = function orHaving() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orHavingRaw = function orHavingRaw() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.offset = function offset() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.limit = function limit() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.count = function count() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.countDistinct = function countDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.min = function min() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.max = function max() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.sum = function sum() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.sumDistinct = function sumDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.avg = function avg() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.avgDistinct = function avgDistinct() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.debug = function debug() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.returning = function returning() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.truncate = function truncate() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.connection = function connection() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.options = function options() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.columnInfo = function columnInfo() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.with = function _with() {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereRef = function whereRef(lhs, op, rhs) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereRef = function orWhereRef(lhs, op, rhs) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereComposite = function whereComposite(cols, op, values) {};

  /**
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereInComposite = function whereInComposite(columns, values) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonEquals = function whereJsonEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonEquals = function orWhereJsonEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotEquals = function whereJsonNotEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotEquals = function orWhereJsonNotEquals(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonSupersetOf = function whereJsonSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonSupersetOf = function orWhereJsonSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotSupersetOf = function whereJsonNotSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotSupersetOf = function orWhereJsonNotSupersetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonSubsetOf = function whereJsonSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonSubsetOf = function orWhereJsonSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotSubsetOf = function whereJsonNotSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {Object|Array|FieldExpression} jsonObjectOrFieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotSubsetOf = function orWhereJsonNotSubsetOf(fieldExpression, jsonObjectOrFieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonIsArray = function whereJsonIsArray(fieldExpression) {
    return this.whereJsonSupersetOf(fieldExpression, []);
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonIsArray = function orWhereJsonIsArray(fieldExpression) {
    return this.orWhereJsonSupersetOf(fieldExpression, []);
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonIsObject = function whereJsonIsObject(fieldExpression) {
    return this.whereJsonSupersetOf(fieldExpression, {});
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonIsObject = function orWhereJsonIsObject(fieldExpression) {
    return this.orWhereJsonSupersetOf(fieldExpression, {});
  };

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotArray = function whereJsonNotArray(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotArray = function orWhereJsonNotArray(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonNotObject = function whereJsonNotObject(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonNotObject = function orWhereJsonNotObject(fieldExpression) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonHasAny = function whereJsonHasAny(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonHasAny = function orWhereJsonHasAny(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonHasAll = function whereJsonHasAll(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string|Array.<string>} keys
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonHasAll = function orWhereJsonHasAll(fieldExpression, keys) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string} operator
   * @param {boolean|Number|string|null} value
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.whereJsonField = function whereJsonField(fieldExpression, operator, value) {};

  /**
   * @param {FieldExpression} fieldExpression
   * @param {string} operator
   * @param {boolean|Number|string|null} value
   * @returns {QueryBuilderBase}
   */


  QueryBuilderBase.prototype.orWhereJsonField = function orWhereJsonField(fieldExpression, operator, value) {};

  return QueryBuilderBase;
}(), _class2.SelectRegex = /^(select|sum|min|max|count|avg)$/, _class2.WhereRegex = /where|orWhere|andWhere/, _class2.FromRegex = /^(from|into|table)$/, _temp), (_applyDecoratedDescriptor(_class.prototype, 'select', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'select'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insert', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insert'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'update', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'update'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'del', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'del'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forUpdate', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'forUpdate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'forShare', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'forShare'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'as', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'as'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'columns', [_dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'columns'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'column', [_dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'column'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'from', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'from'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fromJS', [_dec12], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fromJS'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'into', [_dec13], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'into'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'withSchema', [_dec14], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'withSchema'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'table', [_dec15], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'table'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'distinct', [_dec16], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'distinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'join', [_dec17], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'join'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'joinRaw', [_dec18], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'joinRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'innerJoin', [_dec19], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'innerJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftJoin', [_dec20], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftOuterJoin', [_dec21], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightJoin', [_dec22], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightOuterJoin', [_dec23], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'outerJoin', [_dec24], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'outerJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullOuterJoin', [_dec25], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullOuterJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'crossJoin', [_dec26], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'crossJoin'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'where', [_dec27], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'where'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhere', [_dec28], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhere'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhere', [_dec29], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhere'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNot', [_dec30], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNot'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNot', [_dec31], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNot'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereRaw', [_dec32], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereWrapped', [_dec33], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereWrapped'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'havingWrapped', [_dec34], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'havingWrapped'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereRaw', [_dec35], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereExists', [_dec36], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereExists', [_dec37], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotExists', [_dec38], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotExists', [_dec39], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotExists'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereIn', [_dec40], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereIn', [_dec41], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotIn', [_dec42], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotIn', [_dec43], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotIn'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNull', [_dec44], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNull', [_dec45], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotNull', [_dec46], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotNull', [_dec47], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotNull'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereBetween', [_dec48], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhereBetween', [_dec49], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereNotBetween', [_dec50], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'andWhereNotBetween', [_dec51], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'andWhereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereBetween', [_dec52], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereNotBetween', [_dec53], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereNotBetween'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'groupBy', [_dec54], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'groupBy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'groupByRaw', [_dec55], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'groupByRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orderBy', [_dec56], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orderBy'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orderByRaw', [_dec57], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orderByRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'union', [_dec58], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'union'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unionAll', [_dec59], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unionAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'having', [_dec60], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'having'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'havingRaw', [_dec61], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'havingRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orHaving', [_dec62], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orHaving'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orHavingRaw', [_dec63], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orHavingRaw'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'offset', [_dec64], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'offset'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'limit', [_dec65], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'limit'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'count', [_dec66], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'count'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'countDistinct', [_dec67], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'countDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'min', [_dec68], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'min'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'max', [_dec69], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'max'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sum', [_dec70], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sum'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'sumDistinct', [_dec71], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'sumDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'avg', [_dec72], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'avg'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'avgDistinct', [_dec73], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'avgDistinct'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'debug', [_dec74], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'debug'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'returning', [_dec75], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'returning'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'truncate', [_dec76], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'truncate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'connection', [_dec77], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'connection'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'options', [_dec78], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'options'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'columnInfo', [_dec79], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'columnInfo'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'with', [_dec80], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'with'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereRef', [_dec81], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereRef'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereRef', [_dec82], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereRef'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereComposite', [_dec83], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereComposite'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereInComposite', [_dec84], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereInComposite'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonEquals', [_dec85], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonEquals', [_dec86], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotEquals', [_dec87], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotEquals', [_dec88], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotEquals'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonSupersetOf', [_dec89], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonSupersetOf', [_dec90], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotSupersetOf', [_dec91], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotSupersetOf', [_dec92], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotSupersetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonSubsetOf', [_dec93], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonSubsetOf', [_dec94], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotSubsetOf', [_dec95], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotSubsetOf', [_dec96], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotSubsetOf'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotArray', [_dec97], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotArray'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotArray', [_dec98], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotArray'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonNotObject', [_dec99], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonNotObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonNotObject', [_dec100], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonNotObject'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonHasAny', [_dec101], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonHasAny'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonHasAny', [_dec102], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonHasAny'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonHasAll', [_dec103], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonHasAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonHasAll', [_dec104], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonHasAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'whereJsonField', [_dec105], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'whereJsonField'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'orWhereJsonField', [_dec106], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'orWhereJsonField'), _class.prototype)), _class));
exports.default = QueryBuilderBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlckJhc2UuanMiXSwibmFtZXMiOlsiUXVlcnlCdWlsZGVyQmFzZSIsImJvb2wiLCJkZWZhdWx0Iiwic3FsaXRlMyIsIm9wZXJhdG9yIiwicHJlZml4IiwiY29tcGFyZVZhbHVlIiwia25leCIsIlF1ZXJ5QnVpbGRlckNvbnRleHQiLCJfa25leCIsIl9vcGVyYXRpb25zIiwiX2NvbnRleHQiLCJfY3JlYXRlVXNlckNvbnRleHRCYXNlIiwiZXh0ZW5kIiwic3ViY2xhc3NDb25zdHJ1Y3RvciIsImNvbnRleHQiLCJjdHgiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1c2VyQ29udGV4dCIsImN0eEJhc2UiLCJtZXJnZUNvbnRleHQiLCJvbGRDdHgiLCJpbnRlcm5hbENvbnRleHQiLCJFcnJvciIsIm1vZGVsQ2xhc3MiLCJ0YWJsZU5hbWUiLCJtb2RpZnkiLCJmdW5jIiwiY2FsbCIsImFyZ3MiLCJBcnJheSIsImkiLCJsIiwiYXBwbHkiLCJjbGVhciIsIm9wZXJhdGlvblNlbGVjdG9yIiwib3BlcmF0aW9ucyIsImZvckVhY2hPcGVyYXRpb24iLCJvcCIsInB1c2giLCJjb3B5RnJvbSIsInF1ZXJ5QnVpbGRlciIsImhhcyIsImZvdW5kIiwiaXNTZWxlY3RBbGwiLCJTZWxlY3RSZWdleCIsIldoZXJlUmVnZXgiLCJpbmRleE9mT3BlcmF0aW9uIiwiaWR4IiwiY2FsbGJhY2siLCJtYXRjaCIsImlzUmVnRXhwIiwidGVzdCIsIm5hbWUiLCJjYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwib3BlcmF0aW9uIiwicHVzaEZyb250Iiwic3BsaWNlIiwiY2FsbEtuZXhRdWVyeUJ1aWxkZXJPcGVyYXRpb24iLCJtZXRob2ROYW1lIiwiY2xvbmUiLCJiYXNlQ2xvbmVJbnRvIiwiY29uc3RydWN0b3IiLCJidWlsZGVyIiwic2xpY2UiLCJidWlsZCIsImJ1aWxkSW50byIsImtuZXhCdWlsZGVyIiwidG1wIiwibG4iLCJvbkJlZm9yZUJ1aWxkIiwibnVtTmV3IiwiaiIsIm9uQnVpbGQiLCJ0b1N0cmluZyIsInRvU3FsIiwic2tpcFVuZGVmaW5lZCIsInNob3VsZFNraXBVbmRlZmluZWQiLCJ0cmFuc2FjdGluZyIsInRyeCIsImN0eFByb3RvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwic2VsZWN0IiwiaW5zZXJ0IiwidXBkYXRlIiwiZGVsZXRlIiwiZGVsIiwiZm9yVXBkYXRlIiwiZm9yU2hhcmUiLCJhcyIsImNvbHVtbnMiLCJjb2x1bW4iLCJmcm9tIiwiZnJvbUpTIiwiaW50byIsIndpdGhTY2hlbWEiLCJ0YWJsZSIsImRpc3RpbmN0Iiwiam9pbiIsImpvaW5SYXciLCJpbm5lckpvaW4iLCJsZWZ0Sm9pbiIsImxlZnRPdXRlckpvaW4iLCJyaWdodEpvaW4iLCJyaWdodE91dGVySm9pbiIsIm91dGVySm9pbiIsImZ1bGxPdXRlckpvaW4iLCJjcm9zc0pvaW4iLCJ3aGVyZSIsImFuZFdoZXJlIiwib3JXaGVyZSIsIndoZXJlTm90Iiwib3JXaGVyZU5vdCIsIndoZXJlUmF3Iiwid2hlcmVXcmFwcGVkIiwiaGF2aW5nV3JhcHBlZCIsIm9yV2hlcmVSYXciLCJ3aGVyZUV4aXN0cyIsIm9yV2hlcmVFeGlzdHMiLCJ3aGVyZU5vdEV4aXN0cyIsIm9yV2hlcmVOb3RFeGlzdHMiLCJ3aGVyZUluIiwib3JXaGVyZUluIiwid2hlcmVOb3RJbiIsIm9yV2hlcmVOb3RJbiIsIndoZXJlTnVsbCIsIm9yV2hlcmVOdWxsIiwid2hlcmVOb3ROdWxsIiwib3JXaGVyZU5vdE51bGwiLCJ3aGVyZUJldHdlZW4iLCJhbmRXaGVyZUJldHdlZW4iLCJ3aGVyZU5vdEJldHdlZW4iLCJhbmRXaGVyZU5vdEJldHdlZW4iLCJvcldoZXJlQmV0d2VlbiIsIm9yV2hlcmVOb3RCZXR3ZWVuIiwiZ3JvdXBCeSIsImdyb3VwQnlSYXciLCJvcmRlckJ5Iiwib3JkZXJCeVJhdyIsInVuaW9uIiwidW5pb25BbGwiLCJoYXZpbmciLCJoYXZpbmdSYXciLCJvckhhdmluZyIsIm9ySGF2aW5nUmF3Iiwib2Zmc2V0IiwibGltaXQiLCJjb3VudCIsImNvdW50RGlzdGluY3QiLCJtaW4iLCJtYXgiLCJzdW0iLCJzdW1EaXN0aW5jdCIsImF2ZyIsImF2Z0Rpc3RpbmN0IiwiZGVidWciLCJyZXR1cm5pbmciLCJ0cnVuY2F0ZSIsImNvbm5lY3Rpb24iLCJvcHRpb25zIiwiY29sdW1uSW5mbyIsIndpdGgiLCJ3aGVyZVJlZiIsImxocyIsInJocyIsIm9yV2hlcmVSZWYiLCJ3aGVyZUNvbXBvc2l0ZSIsImNvbHMiLCJ2YWx1ZXMiLCJ3aGVyZUluQ29tcG9zaXRlIiwid2hlcmVKc29uRXF1YWxzIiwiZmllbGRFeHByZXNzaW9uIiwianNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uIiwib3JXaGVyZUpzb25FcXVhbHMiLCJ3aGVyZUpzb25Ob3RFcXVhbHMiLCJvcldoZXJlSnNvbk5vdEVxdWFscyIsIndoZXJlSnNvblN1cGVyc2V0T2YiLCJvcldoZXJlSnNvblN1cGVyc2V0T2YiLCJ3aGVyZUpzb25Ob3RTdXBlcnNldE9mIiwib3JXaGVyZUpzb25Ob3RTdXBlcnNldE9mIiwid2hlcmVKc29uU3Vic2V0T2YiLCJvcldoZXJlSnNvblN1YnNldE9mIiwid2hlcmVKc29uTm90U3Vic2V0T2YiLCJvcldoZXJlSnNvbk5vdFN1YnNldE9mIiwid2hlcmVKc29uSXNBcnJheSIsIm9yV2hlcmVKc29uSXNBcnJheSIsIndoZXJlSnNvbklzT2JqZWN0Iiwib3JXaGVyZUpzb25Jc09iamVjdCIsIndoZXJlSnNvbk5vdEFycmF5Iiwib3JXaGVyZUpzb25Ob3RBcnJheSIsIndoZXJlSnNvbk5vdE9iamVjdCIsIm9yV2hlcmVKc29uTm90T2JqZWN0Iiwid2hlcmVKc29uSGFzQW55Iiwia2V5cyIsIm9yV2hlcmVKc29uSGFzQW55Iiwid2hlcmVKc29uSGFzQWxsIiwib3JXaGVyZUpzb25IYXNBbGwiLCJ3aGVyZUpzb25GaWVsZCIsInZhbHVlIiwib3JXaGVyZUpzb25GaWVsZCIsIkZyb21SZWdleCJdLCJt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QWlCc0IsSSxFQUFNLENBQUUsQzs7QUFFekM7Ozs7Ozs7NkJBTUFDLGlCLDhCQUFrQnZCLGUsRUFBaUJzQixJLEVBQU0sQ0FBRSxDOztBQUUzQzs7Ozs7Ozs2QkFNQUUsZSw0QkFBZ0J4QixlLEVBQWlCc0IsSSxFQUFNLENBQUUsQzs7QUFFekM7Ozs7Ozs7NkJBTUFHLGlCLDhCQUFrQnpCLGUsRUFBaUJzQixJLEVBQU0sQ0FBRSxDOztBQUUzQzs7Ozs7Ozs7NkJBT0FJLGMsMkJBQWUxQixlLEVBQWlCM0ssUSxFQUFVc00sSyxFQUFPLENBQUUsQzs7QUFFbkQ7Ozs7Ozs7OzZCQU9BQyxnQiw2QkFBaUI1QixlLEVBQWlCM0ssUSxFQUFVc00sSyxFQUFPLENBQUUsQzs7O2FBL2hDOUM1SixXLEdBQWMsa0MsVUFDZEMsVSxHQUFhLHdCLFVBQ2I2SixTLEdBQVkscUI7a0JBdEJBNU0sZ0IiLCJmaWxlIjoiUXVlcnlCdWlsZGVyQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vZGVjb3JhdG9ycy9xdWVyeUJ1aWxkZXJPcGVyYXRpb24nO1xuaW1wb3J0IHtpbmhlcml0c30gZnJvbSAnLi4vdXRpbHMvY2xhc3NVdGlscyc7XG5cbmltcG9ydCBRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZSBmcm9tICcuL1F1ZXJ5QnVpbGRlckNvbnRleHRCYXNlJztcblxuaW1wb3J0IEtuZXhPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL0tuZXhPcGVyYXRpb24nO1xuaW1wb3J0IFNlbGVjdE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvU2VsZWN0T3BlcmF0aW9uJztcbmltcG9ydCBXaGVyZVJlZk9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvV2hlcmVSZWZPcGVyYXRpb24nO1xuaW1wb3J0IFdoZXJlQ29tcG9zaXRlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9XaGVyZUNvbXBvc2l0ZU9wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVJbkNvbXBvc2l0ZU9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvV2hlcmVJbkNvbXBvc2l0ZU9wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvbic7XG5cbmltcG9ydCBXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvanNvbkFwaS9XaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL2pzb25BcGkvV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24nO1xuaW1wb3J0IFdoZXJlSnNvbkZpZWxkUG9zdGdyZXNPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL2pzb25BcGkvV2hlcmVKc29uRmllbGRQb3N0Z3Jlc09wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVKc29uTm90T2JqZWN0UG9zdGdyZXNPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL2pzb25BcGkvV2hlcmVKc29uTm90T2JqZWN0UG9zdGdyZXNPcGVyYXRpb24nO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgaXMgYSB0aGluIHdyYXBwZXIgYXJvdW5kIGtuZXggcXVlcnkgYnVpbGRlci4gVGhpcyBjbGFzcyBhbGxvd3MgdXMgdG8gYWRkIG91ciBvd25cbiAqIHF1ZXJ5IGJ1aWxkZXIgbWV0aG9kcyB3aXRob3V0IG1vbmtleSBwYXRjaGluZyBrbmV4IHF1ZXJ5IGJ1aWxkZXIuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVlcnlCdWlsZGVyQmFzZSB7XG5cbiAgY29uc3RydWN0b3Ioa25leCwgUXVlcnlCdWlsZGVyQ29udGV4dCkge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtrbmV4fVxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB0aGlzLl9rbmV4ID0ga25leDtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPFF1ZXJ5QnVpbGRlck9wZXJhdGlvbj59XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX29wZXJhdGlvbnMgPSBbXTtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7UXVlcnlCdWlsZGVyQ29udGV4dEJhc2V9XG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX2NvbnRleHQgPSBuZXcgKFF1ZXJ5QnVpbGRlckNvbnRleHQgfHwgUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UpKHRoaXMuX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSgpKTtcbiAgfVxuXG4gIHN0YXRpYyBTZWxlY3RSZWdleCA9IC9eKHNlbGVjdHxzdW18bWlufG1heHxjb3VudHxhdmcpJC87XG4gIHN0YXRpYyBXaGVyZVJlZ2V4ID0gL3doZXJlfG9yV2hlcmV8YW5kV2hlcmUvO1xuICBzdGF0aWMgRnJvbVJlZ2V4ID0gL14oZnJvbXxpbnRvfHRhYmxlKSQvO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gc3ViY2xhc3NDb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHtDb25zdHJ1Y3Rvci48UXVlcnlCdWlsZGVyQmFzZT59XG4gICAqL1xuICBzdGF0aWMgZXh0ZW5kKHN1YmNsYXNzQ29uc3RydWN0b3IpIHtcbiAgICBpbmhlcml0cyhzdWJjbGFzc0NvbnN0cnVjdG9yLCB0aGlzKTtcbiAgICByZXR1cm4gc3ViY2xhc3NDb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGN0eFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fFF1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBjb250ZXh0KGN0eCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dC51c2VyQ29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY3R4QmFzZSA9IHRoaXMuX2NyZWF0ZVVzZXJDb250ZXh0QmFzZSgpO1xuICAgICAgdGhpcy5fY29udGV4dC51c2VyQ29udGV4dCA9IE9iamVjdC5hc3NpZ24oY3R4QmFzZSwgY3R4KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdD19IGN0eFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIG1lcmdlQ29udGV4dChjdHgpIHtcbiAgICBjb25zdCBvbGRDdHggPSB0aGlzLl9jb250ZXh0LnVzZXJDb250ZXh0O1xuICAgIHRoaXMuX2NvbnRleHQudXNlckNvbnRleHQgPSBPYmplY3QuYXNzaWduKG9sZEN0eCwgY3R4KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHRCYXNlPX0gY3R4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZXxRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgaW50ZXJuYWxDb250ZXh0KGN0eCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29udGV4dCA9IGN0eDtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2tuZXg9fSBrbmV4XG4gICAqIEByZXR1cm5zIHtPYmplY3R8UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIGtuZXgoa25leCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjb25zdCBrbmV4ID0gdGhpcy5fY29udGV4dC5rbmV4IHx8IHRoaXMuX2tuZXg7XG5cbiAgICAgIGlmICgha25leCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYG5vIGRhdGFiYXNlIGNvbm5lY3Rpb24gYXZhaWxhYmxlIGZvciBhIHF1ZXJ5IGZvciB0YWJsZSAke3RoaXMubW9kZWxDbGFzcygpLnRhYmxlTmFtZX0uIGAgK1xuICAgICAgICAgIGBZb3UgbmVlZCB0byBiaW5kIHRoZSBtb2RlbCBjbGFzcyBvciB0aGUgcXVlcnkgdG8gYSBrbmV4IGluc3RhbmNlLmApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ga25leDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fa25leCA9IGtuZXg7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIG1vZGlmeShmdW5jKSB7XG4gICAgaWYgKCFmdW5jKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZnVuYy5jYWxsKHRoaXMsIHRoaXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcblxuICAgICAgYXJnc1swXSA9IHRoaXM7XG4gICAgICBmb3IgKGxldCBpID0gMSwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtSZWdFeHB8Q29uc3RydWN0b3IuPD8gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24+fSBvcGVyYXRpb25TZWxlY3RvclxuICAgKiBAcmV0dXJuIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgY2xlYXIob3BlcmF0aW9uU2VsZWN0b3IpIHtcbiAgICBjb25zdCBvcGVyYXRpb25zID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hPcGVyYXRpb24ob3BlcmF0aW9uU2VsZWN0b3IsIChvcCkgPT4ge1xuICAgICAgb3BlcmF0aW9ucy5wdXNoKG9wKTtcbiAgICB9LCBmYWxzZSk7XG5cbiAgICB0aGlzLl9vcGVyYXRpb25zID0gb3BlcmF0aW9ucztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckJhc2V9IHF1ZXJ5QnVpbGRlclxuICAgKiBAcGFyYW0ge1JlZ0V4cHxDb25zdHJ1Y3Rvci48PyBleHRlbmRzIFF1ZXJ5QnVpbGRlck9wZXJhdGlvbj59IG9wZXJhdGlvblNlbGVjdG9yXG4gICAqIEByZXR1cm4ge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBjb3B5RnJvbShxdWVyeUJ1aWxkZXIsIG9wZXJhdGlvblNlbGVjdG9yKSB7XG4gICAgcXVlcnlCdWlsZGVyLmZvckVhY2hPcGVyYXRpb24ob3BlcmF0aW9uU2VsZWN0b3IsIChvcCkgPT4ge1xuICAgICAgdGhpcy5fb3BlcmF0aW9ucy5wdXNoKG9wKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UmVnRXhwfENvbnN0cnVjdG9yLjw/IGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uPn0gb3BlcmF0aW9uU2VsZWN0b3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXMob3BlcmF0aW9uU2VsZWN0b3IpIHtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcblxuICAgIHRoaXMuZm9yRWFjaE9wZXJhdGlvbihvcGVyYXRpb25TZWxlY3RvciwgKCkgPT4ge1xuICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBpc1NlbGVjdEFsbCgpIHtcbiAgICByZXR1cm4gIXRoaXMuaGFzKFF1ZXJ5QnVpbGRlckJhc2UuU2VsZWN0UmVnZXgpICYmICF0aGlzLmhhcyhRdWVyeUJ1aWxkZXJCYXNlLldoZXJlUmVnZXgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UmVnRXhwfENvbnN0cnVjdG9yLjw/IGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uPn0gb3BlcmF0aW9uU2VsZWN0b3JcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpbmRleE9mT3BlcmF0aW9uKG9wZXJhdGlvblNlbGVjdG9yKSB7XG4gICAgbGV0IGlkeCA9IC0xO1xuXG4gICAgdGhpcy5mb3JFYWNoT3BlcmF0aW9uKG9wZXJhdGlvblNlbGVjdG9yLCAob3AsIGkpID0+IHtcbiAgICAgIGlkeCA9IGk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gaWR4O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UmVnRXhwfENvbnN0cnVjdG9yLjw/IGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uPn0gb3BlcmF0aW9uU2VsZWN0b3JcbiAgICogQHBhcmFtIHtmdW5jdGlvbihRdWVyeUJ1aWxkZXJPcGVyYXRpb24pfSBjYWxsYmFja1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1hdGNoXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgZm9yRWFjaE9wZXJhdGlvbihvcGVyYXRpb25TZWxlY3RvciwgY2FsbGJhY2ssIG1hdGNoID0gdHJ1ZSkge1xuICAgIGlmIChfLmlzUmVnRXhwKG9wZXJhdGlvblNlbGVjdG9yKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLl9vcGVyYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBvcCA9IHRoaXMuX29wZXJhdGlvbnNbaV07XG5cbiAgICAgICAgaWYgKG9wZXJhdGlvblNlbGVjdG9yLnRlc3Qob3AubmFtZSkgPT09IG1hdGNoKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKG9wLCBpKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IG9wID0gdGhpcy5fb3BlcmF0aW9uc1tpXTtcblxuICAgICAgICBpZiAoKG9wIGluc3RhbmNlb2Ygb3BlcmF0aW9uU2VsZWN0b3IpID09PSBtYXRjaCkge1xuICAgICAgICAgIGlmIChjYWxsYmFjayhvcCwgaSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn0gb3BlcmF0aW9uXG4gICAqIEBwYXJhbSB7QXJyYXkuPCo+fSBhcmdzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbj19IHB1c2hGcm9udFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gICBjYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKG9wZXJhdGlvbiwgYXJncywgcHVzaEZyb250KSB7XG4gICAgaWYgKG9wZXJhdGlvbi5jYWxsKHRoaXMsIGFyZ3MgfHwgW10pKSB7XG4gICAgICBpZiAocHVzaEZyb250KSB7XG4gICAgICAgIHRoaXMuX29wZXJhdGlvbnMuc3BsaWNlKDAsIDAsIG9wZXJhdGlvbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9vcGVyYXRpb25zLnB1c2gob3BlcmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZVxuICAgKiBAcGFyYW0ge0FycmF5LjwqPn0gYXJnc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIGNhbGxLbmV4UXVlcnlCdWlsZGVyT3BlcmF0aW9uKG1ldGhvZE5hbWUsIGFyZ3MsIHB1c2hGcm9udCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24obmV3IEtuZXhPcGVyYXRpb24obWV0aG9kTmFtZSksIGFyZ3MsIHB1c2hGcm9udCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gdGhpcy5iYXNlQ2xvbmVJbnRvKG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMua25leCgpKSk7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIGJhc2VDbG9uZUludG8oYnVpbGRlcikge1xuICAgIGJ1aWxkZXIuX2tuZXggPSB0aGlzLl9rbmV4O1xuICAgIGJ1aWxkZXIuX29wZXJhdGlvbnMgPSB0aGlzLl9vcGVyYXRpb25zLnNsaWNlKCk7XG4gICAgYnVpbGRlci5fY29udGV4dCA9IHRoaXMuX2NvbnRleHQuY2xvbmUoKTtcblxuICAgIHJldHVybiBidWlsZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtrbmV4LlF1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIHJldHVybiB0aGlzLmJ1aWxkSW50byh0aGlzLmtuZXgoKS5xdWVyeUJ1aWxkZXIoKSk7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgYnVpbGRJbnRvKGtuZXhCdWlsZGVyKSB7XG4gICAgY29uc3QgdG1wID0gbmV3IEFycmF5KDEwKTtcblxuICAgIGxldCBpID0gMDtcbiAgICB3aGlsZSAoaSA8IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBvcCA9IHRoaXMuX29wZXJhdGlvbnNbaV07XG4gICAgICBjb25zdCBsbiA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoO1xuXG4gICAgICBvcC5vbkJlZm9yZUJ1aWxkKHRoaXMpO1xuXG4gICAgICBjb25zdCBudW1OZXcgPSB0aGlzLl9vcGVyYXRpb25zLmxlbmd0aCAtIGxuO1xuXG4gICAgICAvLyBvbkJlZm9yZUJ1aWxkIG1heSBjYWxsIG1ldGhvZHMgdGhhdCBhZGQgbW9yZSBvcGVyYXRpb25zLiBJZlxuICAgICAgLy8gdGhpcyB3YXMgdGhlIGNhc2UsIG1vdmUgdGhlIG9wZXJhdGlvbnMgdG8gYmUgZXhlY3V0ZWQgbmV4dC5cbiAgICAgIGlmIChudW1OZXcgPiAwKSB7XG4gICAgICAgIHdoaWxlICh0bXAubGVuZ3RoIDwgbnVtTmV3KSB7XG4gICAgICAgICAgdG1wLnB1c2gobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG51bU5ldzsgKytqKSB7XG4gICAgICAgICAgdG1wW2pdID0gdGhpcy5fb3BlcmF0aW9uc1tsbiArIGpdO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IGxuICsgbnVtTmV3IC0gMTsgaiA+IGkgKyBudW1OZXc7IC0taikge1xuICAgICAgICAgIHRoaXMuX29wZXJhdGlvbnNbal0gPSB0aGlzLl9vcGVyYXRpb25zW2ogLSBudW1OZXddO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBudW1OZXc7ICsraikge1xuICAgICAgICAgIHRoaXMuX29wZXJhdGlvbnNbaSArIGogKyAxXSA9IHRtcFtqXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICArK2k7XG4gICAgfVxuXG4gICAgLy8gb25CdWlsZCBvcGVyYXRpb25zIHNob3VsZCBuZXZlciBhZGQgbmV3IG9wZXJhdGlvbnMuIFRoZXkgc2hvdWxkIG9ubHkgY2FsbFxuICAgIC8vIG1ldGhvZHMgb24gdGhlIGtuZXggcXVlcnkgYnVpbGRlci5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICB0aGlzLl9vcGVyYXRpb25zW2ldLm9uQnVpbGQoa25leEJ1aWxkZXIsIHRoaXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIGtuZXhCdWlsZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5idWlsZCgpLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvU3FsKCkge1xuICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBza2lwVW5kZWZpbmVkKCkge1xuICAgIHRoaXMuX2NvbnRleHQuc2tpcFVuZGVmaW5lZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzaG91bGRTa2lwVW5kZWZpbmVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZXh0LnNraXBVbmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbn0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgdHJhbnNhY3RpbmcodHJ4KSB7XG4gICAgdGhpcy5fY29udGV4dC5rbmV4ID0gdHJ4IHx8IG51bGw7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jcmVhdGVVc2VyQ29udGV4dEJhc2UoKSB7XG4gICAgY29uc3QgY3R4UHJvdG8gPSB7fTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHhQcm90bywgJ3RyYW5zYWN0aW9uJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBnZXQ6ICgpID0+IHRoaXMua25leCgpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShjdHhQcm90byk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFNlbGVjdE9wZXJhdGlvbilcbiAgc2VsZWN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBpbnNlcnQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHVwZGF0ZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgZGVsZXRlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uLCAnZGVsZXRlJylcbiAgZGVsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmb3JVcGRhdGUoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGZvclNoYXJlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhcyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgY29sdW1ucyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgY29sdW1uKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmcm9tKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmcm9tSlMoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGludG8oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdpdGhTY2hlbWEoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHRhYmxlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBkaXN0aW5jdCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgam9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgam9pblJhdyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgaW5uZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBsZWZ0Sm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgbGVmdE91dGVySm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgcmlnaHRKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICByaWdodE91dGVySm9pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3V0ZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBmdWxsT3V0ZXJKb2luKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBjcm9zc0pvaW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRXaGVyZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOb3QoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVOb3QoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlUmF3KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZVdyYXBwZWQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGhhdmluZ1dyYXBwZWQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlRXhpc3RzKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZU5vdEV4aXN0cyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZU5vdEV4aXN0cyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZUluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB3aGVyZU5vdEluKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yV2hlcmVOb3RJbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlTnVsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVOb3ROdWxsKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlTm90TnVsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2hlcmVCZXR3ZWVuKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhbmRXaGVyZUJldHdlZW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHdoZXJlTm90QmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgYW5kV2hlcmVOb3RCZXR3ZWVuKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvcldoZXJlQmV0d2VlbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3JXaGVyZU5vdEJldHdlZW4oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGdyb3VwQnkoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGdyb3VwQnlSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yZGVyQnkoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9yZGVyQnlSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHVuaW9uKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB1bmlvbkFsbCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgaGF2aW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBoYXZpbmdSYXcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG9ySGF2aW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBvckhhdmluZ1JhdyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb2Zmc2V0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBsaW1pdCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgY291bnQoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGNvdW50RGlzdGluY3QoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIG1pbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgbWF4KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBzdW0oLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIHN1bURpc3RpbmN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBhdmcoLi4uYXJncykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKEtuZXhPcGVyYXRpb24pXG4gIGF2Z0Rpc3RpbmN0KC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICBkZWJ1ZyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgcmV0dXJuaW5nKC4uLmFyZ3MpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihLbmV4T3BlcmF0aW9uKVxuICB0cnVuY2F0ZSguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgY29ubmVjdGlvbiguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgb3B0aW9ucyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgY29sdW1uSW5mbyguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oS25leE9wZXJhdGlvbilcbiAgd2l0aCguLi5hcmdzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlUmVmT3BlcmF0aW9uLCB7Ym9vbDogJ2FuZCd9XSlcbiAgd2hlcmVSZWYobGhzLCBvcCwgcmhzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlUmVmT3BlcmF0aW9uLCB7Ym9vbDogJ29yJ31dKVxuICBvcldoZXJlUmVmKGxocywgb3AsIHJocykge31cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFdoZXJlQ29tcG9zaXRlT3BlcmF0aW9uKVxuICB3aGVyZUNvbXBvc2l0ZShjb2xzLCBvcCwgdmFsdWVzKSB7fVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oe1xuICAgIGRlZmF1bHQ6IFdoZXJlSW5Db21wb3NpdGVPcGVyYXRpb24sXG4gICAgc3FsaXRlMzogV2hlcmVJbkNvbXBvc2l0ZVNxbGl0ZU9wZXJhdGlvblxuICB9KVxuICB3aGVyZUluQ29tcG9zaXRlKGNvbHVtbnMsIHZhbHVlcykge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICc9JywgYm9vbDogJ2FuZCd9XSlcbiAgd2hlcmVKc29uRXF1YWxzKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJz0nLCBib29sOiAnb3InfV0pXG4gIG9yV2hlcmVKc29uRXF1YWxzKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJyE9JywgYm9vbDogJ2FuZCd9XSlcbiAgd2hlcmVKc29uTm90RXF1YWxzKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJyE9JywgYm9vbDogJ29yJ31dKVxuICBvcldoZXJlSnNvbk5vdEVxdWFscyhmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICdAPicsIGJvb2w6ICdhbmQnfV0pXG4gIHdoZXJlSnNvblN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnQD4nLCBib29sOiAnb3InfV0pXG4gIG9yV2hlcmVKc29uU3VwZXJzZXRPZihmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICdAPicsIGJvb2w6ICdhbmQnLCBwcmVmaXg6ICdub3QnfV0pXG4gIHdoZXJlSnNvbk5vdFN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnQD4nLCBib29sOiAnb3InLCBwcmVmaXg6ICdub3QnfV0pXG4gIG9yV2hlcmVKc29uTm90U3VwZXJzZXRPZihmaWVsZEV4cHJlc3Npb24sIGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheXxGaWVsZEV4cHJlc3Npb259IGpzb25PYmplY3RPckZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvblBvc3RncmVzT3BlcmF0aW9uLCB7b3BlcmF0b3I6ICc8QCcsIGJvb2w6ICdhbmQnfV0pXG4gIHdoZXJlSnNvblN1YnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJzxAJywgYm9vbDogJ29yJ31dKVxuICBvcldoZXJlSnNvblN1YnNldE9mKGZpZWxkRXhwcmVzc2lvbiwganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fEZpZWxkRXhwcmVzc2lvbn0ganNvbk9iamVjdE9yRmllbGRFeHByZXNzaW9uXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uUG9zdGdyZXNPcGVyYXRpb24sIHtvcGVyYXRvcjogJzxAJywgYm9vbDogJ2FuZCcsIHByZWZpeDogJ25vdCd9XSlcbiAgd2hlcmVKc29uTm90U3Vic2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtPYmplY3R8QXJyYXl8RmllbGRFeHByZXNzaW9ufSBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Qb3N0Z3Jlc09wZXJhdGlvbiwge29wZXJhdG9yOiAnPEAnLCBib29sOiAnb3InLCBwcmVmaXg6ICdub3QnfV0pXG4gIG9yV2hlcmVKc29uTm90U3Vic2V0T2YoZmllbGRFeHByZXNzaW9uLCBqc29uT2JqZWN0T3JGaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICB3aGVyZUpzb25Jc0FycmF5KGZpZWxkRXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLndoZXJlSnNvblN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIG9yV2hlcmVKc29uSXNBcnJheShmaWVsZEV4cHJlc3Npb24pIHtcbiAgICByZXR1cm4gdGhpcy5vcldoZXJlSnNvblN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCBbXSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIHdoZXJlSnNvbklzT2JqZWN0KGZpZWxkRXhwcmVzc2lvbikge1xuICAgIHJldHVybiB0aGlzLndoZXJlSnNvblN1cGVyc2V0T2YoZmllbGRFeHByZXNzaW9uLCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIG9yV2hlcmVKc29uSXNPYmplY3QoZmllbGRFeHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIHRoaXMub3JXaGVyZUpzb25TdXBlcnNldE9mKGZpZWxkRXhwcmVzc2lvbiwge30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25Ob3RPYmplY3RQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdhbmQnLCBjb21wYXJlVmFsdWU6IFtdfV0pXG4gIHdoZXJlSnNvbk5vdEFycmF5KGZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbk5vdE9iamVjdFBvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ29yJywgY29tcGFyZVZhbHVlOiBbXX1dKVxuICBvcldoZXJlSnNvbk5vdEFycmF5KGZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbk5vdE9iamVjdFBvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ2FuZCcsIGNvbXBhcmVWYWx1ZToge319XSlcbiAgd2hlcmVKc29uTm90T2JqZWN0KGZpZWxkRXhwcmVzc2lvbikge31cblxuICAvKipcbiAgICogQHBhcmFtIHtGaWVsZEV4cHJlc3Npb259IGZpZWxkRXhwcmVzc2lvblxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbk5vdE9iamVjdFBvc3RncmVzT3BlcmF0aW9uLCB7Ym9vbDogJ29yJywgY29tcGFyZVZhbHVlOiB7fX1dKVxuICBvcldoZXJlSnNvbk5vdE9iamVjdChmaWVsZEV4cHJlc3Npb24pIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IGtleXNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25IYXNQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdhbmQnLCBvcGVyYXRvcjogJz98J31dKVxuICB3aGVyZUpzb25IYXNBbnkoZmllbGRFeHByZXNzaW9uLCBrZXlzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnb3InLCBvcGVyYXRvcjogJz98J31dKVxuICBvcldoZXJlSnNvbkhhc0FueShmaWVsZEV4cHJlc3Npb24sIGtleXMpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IGtleXNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlckJhc2V9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtXaGVyZUpzb25IYXNQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdhbmQnLCBvcGVyYXRvcjogJz8mJ31dKVxuICB3aGVyZUpzb25IYXNBbGwoZmllbGRFeHByZXNzaW9uLCBrZXlzKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSBrZXlzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uSGFzUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnb3InLCBvcGVyYXRvcjogJz8mJ31dKVxuICBvcldoZXJlSnNvbkhhc0FsbChmaWVsZEV4cHJlc3Npb24sIGtleXMpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RmllbGRFeHByZXNzaW9ufSBmaWVsZEV4cHJlc3Npb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wZXJhdG9yXG4gICAqIEBwYXJhbSB7Ym9vbGVhbnxOdW1iZXJ8c3RyaW5nfG51bGx9IHZhbHVlXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJCYXNlfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbV2hlcmVKc29uRmllbGRQb3N0Z3Jlc09wZXJhdGlvbiwge2Jvb2w6ICdhbmQnfV0pXG4gIHdoZXJlSnNvbkZpZWxkKGZpZWxkRXhwcmVzc2lvbiwgb3BlcmF0b3IsIHZhbHVlKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0ZpZWxkRXhwcmVzc2lvbn0gZmllbGRFeHByZXNzaW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcGVyYXRvclxuICAgKiBAcGFyYW0ge2Jvb2xlYW58TnVtYmVyfHN0cmluZ3xudWxsfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyQmFzZX1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW1doZXJlSnNvbkZpZWxkUG9zdGdyZXNPcGVyYXRpb24sIHtib29sOiAnb3InfV0pXG4gIG9yV2hlcmVKc29uRmllbGQoZmllbGRFeHByZXNzaW9uLCBvcGVyYXRvciwgdmFsdWUpIHt9XG59XG4iXX0=
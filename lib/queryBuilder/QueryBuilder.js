'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _queryBuilderOperation = require('./decorators/queryBuilderOperation');

var _queryBuilderOperation2 = _interopRequireDefault(_queryBuilderOperation);

var _QueryBuilderContext = require('./QueryBuilderContext');

var _QueryBuilderContext2 = _interopRequireDefault(_QueryBuilderContext);

var _RelationExpression = require('./RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _QueryBuilderBase2 = require('./QueryBuilderBase');

var _QueryBuilderBase3 = _interopRequireDefault(_QueryBuilderBase2);

var _ValidationError = require('../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _FindOperation = require('./operations/FindOperation');

var _FindOperation2 = _interopRequireDefault(_FindOperation);

var _DeleteOperation = require('./operations/DeleteOperation');

var _DeleteOperation2 = _interopRequireDefault(_DeleteOperation);

var _UpdateOperation = require('./operations/UpdateOperation');

var _UpdateOperation2 = _interopRequireDefault(_UpdateOperation);

var _InsertOperation = require('./operations/InsertOperation');

var _InsertOperation2 = _interopRequireDefault(_InsertOperation);

var _InsertGraphAndFetchOperation = require('./operations/InsertGraphAndFetchOperation');

var _InsertGraphAndFetchOperation2 = _interopRequireDefault(_InsertGraphAndFetchOperation);

var _InsertAndFetchOperation = require('./operations/InsertAndFetchOperation');

var _InsertAndFetchOperation2 = _interopRequireDefault(_InsertAndFetchOperation);

var _UpdateAndFetchOperation = require('./operations/UpdateAndFetchOperation');

var _UpdateAndFetchOperation2 = _interopRequireDefault(_UpdateAndFetchOperation);

var _QueryBuilderOperation = require('./operations/QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _JoinRelationOperation = require('./operations/JoinRelationOperation');

var _JoinRelationOperation2 = _interopRequireDefault(_JoinRelationOperation);

var _InsertGraphOperation = require('./operations/InsertGraphOperation');

var _InsertGraphOperation2 = _interopRequireDefault(_InsertGraphOperation);

var _RunBeforeOperation = require('./operations/RunBeforeOperation');

var _RunBeforeOperation2 = _interopRequireDefault(_RunBeforeOperation);

var _RunAfterOperation = require('./operations/RunAfterOperation');

var _RunAfterOperation2 = _interopRequireDefault(_RunAfterOperation);

var _OnBuildOperation = require('./operations/OnBuildOperation');

var _OnBuildOperation2 = _interopRequireDefault(_OnBuildOperation);

var _SelectOperation = require('./operations/SelectOperation');

var _SelectOperation2 = _interopRequireDefault(_SelectOperation);

var _EagerOperation = require('./operations/EagerOperation');

var _EagerOperation2 = _interopRequireDefault(_EagerOperation);

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

var QueryBuilder = (_dec = (0, _queryBuilderOperation2.default)(_RunBeforeOperation2.default), _dec2 = (0, _queryBuilderOperation2.default)(_OnBuildOperation2.default), _dec3 = (0, _queryBuilderOperation2.default)(_RunAfterOperation2.default), _dec4 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'join' }]), _dec5 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'innerJoin' }]), _dec6 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'outerJoin' }]), _dec7 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'leftJoin' }]), _dec8 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'leftOuterJoin' }]), _dec9 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'rightJoin' }]), _dec10 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'rightOuterJoin' }]), _dec11 = (0, _queryBuilderOperation2.default)([_JoinRelationOperation2.default, { joinOperation: 'fullOuterJoin' }]), (_class = function (_QueryBuilderBase) {
  (0, _inherits3.default)(QueryBuilder, _QueryBuilderBase);

  function QueryBuilder(modelClass) {
    (0, _classCallCheck3.default)(this, QueryBuilder);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderBase.call(this, modelClass.knex(), _QueryBuilderContext2.default));

    _this._modelClass = modelClass;
    _this._explicitRejectValue = null;
    _this._explicitResolveValue = null;

    _this._eagerExpression = null;
    _this._eagerFilterExpressions = [];
    _this._allowedEagerExpression = null;
    _this._allowedInsertExpression = null;

    _this._findOperationOptions = {};
    _this._eagerOperationOptions = {};

    _this._findOperationFactory = findOperationFactory;
    _this._insertOperationFactory = insertOperationFactory;
    _this._updateOperationFactory = updateOperationFactory;
    _this._patchOperationFactory = patchOperationFactory;
    _this._relateOperationFactory = relateOperationFactory;
    _this._unrelateOperationFactory = unrelateOperationFactory;
    _this._deleteOperationFactory = deleteOperationFactory;
    _this._eagerOperationFactory = modelClass.defaultEagerAlgorithm;
    return _this;
  }

  /**
   * @param {Model} modelClass
   * @returns {QueryBuilder}
   */


  QueryBuilder.forClass = function forClass(modelClass) {
    return new this(modelClass);
  };

  /**
   * @param {QueryBuilderBase} query
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.childQueryOf = function childQueryOf(query) {
    if (query) {
      this.internalContext(query.internalContext());
    }

    return this;
  };

  /**
   * @param {Error} error
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.reject = function reject(error) {
    this._explicitRejectValue = error;
    return this;
  };

  /**
   * @param {*} value
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.resolve = function resolve(value) {
    this._explicitResolveValue = value;
    return this;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.isExecutable = function isExecutable() {
    var hasExecutor = !!this._queryExecutorOperation();
    return !this._explicitRejectValue && !this._explicitResolveValue && !hasExecutor;
  };

  /**
   * @param {function(*, QueryBuilder)} runBefore
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.runBefore = function runBefore(_runBefore) {};

  /**
   * @param {function(QueryBuilder)} onBuild
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.onBuild = function onBuild(_onBuild) {};

  /**
   * @param {function(Model|Array.<Model>, QueryBuilder)} runAfter
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.runAfter = function runAfter(_runAfter) {};

  /**
   * @param {function(QueryBuilder):EagerOperation} algorithm
   * @param {object=} eagerOptions
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eagerAlgorithm = function eagerAlgorithm(algorithm, eagerOptions) {
    this.eagerOperationFactory(algorithm);

    if (eagerOptions) {
      this.eagerOptions(eagerOptions);
    }

    return this;
  };

  /**
   * @param {function(QueryBuilder):EagerOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eagerOperationFactory = function eagerOperationFactory(factory) {
    this._eagerOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.findOperationFactory = function findOperationFactory(factory) {
    this._findOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertOperationFactory = function insertOperationFactory(factory) {
    this._insertOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateOperationFactory = function updateOperationFactory(factory) {
    this._updateOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchOperationFactory = function patchOperationFactory(factory) {
    this._patchOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.deleteOperationFactory = function deleteOperationFactory(factory) {
    this._deleteOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.relateOperationFactory = function relateOperationFactory(factory) {
    this._relateOperationFactory = factory;
    return this;
  };

  /**
   * @param {function(QueryBuilder):QueryBuilderOperation} factory
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.unrelateOperationFactory = function unrelateOperationFactory(factory) {
    this._unrelateOperationFactory = factory;
    return this;
  };

  /**
   * @param {string|RelationExpression} exp
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.eager = function eager(exp, filters) {
    this._eagerExpression = exp || null;

    if (_lodash2.default.isString(this._eagerExpression)) {
      this._eagerExpression = _RelationExpression2.default.parse(this._eagerExpression);
    }

    if (_lodash2.default.isObject(filters)) {
      this._eagerExpression.filters = filters;
    }

    checkEager(this);
    return this;
  };

  /**
   * @param {string|RelationExpression} exp
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.allowEager = function allowEager(exp) {
    this._allowedEagerExpression = exp || null;

    if (_lodash2.default.isString(this._allowedEagerExpression)) {
      this._allowedEagerExpression = _RelationExpression2.default.parse(this._allowedEagerExpression);
    }

    checkEager(this);
    return this;
  };

  /**
   * @param {string|RelationExpression} path
   * @param {function(QueryBuilder)} modifier
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.modifyEager = function modifyEager(path, modifier) {
    this._eagerFilterExpressions.push({
      path: path,
      filter: modifier
    });

    return this;
  };

  QueryBuilder.prototype.filterEager = function filterEager() {
    return this.modifyEager.apply(this, arguments);
  };

  /**
   * @param {string|RelationExpression} exp
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.allowInsert = function allowInsert(exp) {
    this._allowedInsertExpression = exp || null;

    if (_lodash2.default.isString(this._allowedInsertExpression)) {
      this._allowedInsertExpression = _RelationExpression2.default.parse(this._allowedInsertExpression);
    }

    return this;
  };

  /**
   * @param {object} opt
   * @return {QueryBuilder}
   */


  QueryBuilder.prototype.eagerOptions = function eagerOptions(opt) {
    this._eagerOperationOptions = (0, _assign2.default)({}, this._eagerOperationOptions, opt);
    var opIdx = this.indexOfOperation(_EagerOperation2.default);

    if (opIdx !== -1) {
      this._operations[opIdx] = this._operations[opIdx].clone({
        opt: this._eagerOperationOptions
      });
    }

    return this;
  };

  /**
   * @param {object} opt
   * @return {QueryBuilder}
   */


  QueryBuilder.prototype.findOptions = function findOptions(opt) {
    this._findOperationOptions = (0, _assign2.default)({}, this._findOperationOptions, opt);
    var opIdx = this.indexOfOperation(_FindOperation2.default);

    if (opIdx !== -1) {
      this._operations[opIdx] = this._operations[opIdx].clone({
        opt: this._findOperationOptions
      });
    }

    return this;
  };

  /**
   * @returns {Constructor.<Model>}
   */


  QueryBuilder.prototype.modelClass = function modelClass() {
    return this._modelClass;
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.isFindQuery = function isFindQuery() {
    return !_lodash2.default.some(this._operations, function (method) {
      return method.isWriteOperation;
    }) && !this._explicitRejectValue;
  };

  /**
   * @returns {string}
   */


  QueryBuilder.prototype.toString = function toString() {
    return this.build().toString();
  };

  /**
   * @returns {string}
   */


  QueryBuilder.prototype.toSql = function toSql() {
    return this.toString();
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clone = function clone() {
    var builder = new this.constructor(this._modelClass);
    this.baseCloneInto(builder);

    builder._explicitRejectValue = this._explicitRejectValue;
    builder._explicitResolveValue = this._explicitResolveValue;

    builder._eagerExpression = this._eagerExpression;
    builder._eagerFilterExpressions = this._eagerFilterExpressions.slice();

    builder._allowedEagerExpression = this._allowedEagerExpression;
    builder._allowedInsertExpression = this._allowedInsertExpression;

    builder._findOperationOptions = this._findOperationOptions;
    builder._eagerOperationOptions = this._eagerOperationOptions;

    builder._findOperationFactory = this._findOperationFactory;
    builder._insertOperationFactory = this._insertOperationFactory;
    builder._updateOperationFactory = this._updateOperationFactory;
    builder._patchOperationFactory = this._patchOperationFactory;
    builder._relateOperationFactory = this._relateOperationFactory;
    builder._unrelateOperationFactory = this._unrelateOperationFactory;
    builder._deleteOperationFactory = this._deleteOperationFactory;
    builder._eagerOperationFactory = this._eagerOperationFactory;

    return builder;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearEager = function clearEager() {
    this._eagerExpression = null;
    this._eagerFilterExpressions = [];
    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearReject = function clearReject() {
    this._explicitRejectValue = null;
    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.clearResolve = function clearResolve() {
    this._explicitResolveValue = null;
    return this;
  };

  /**
   * @param {function=} successHandler
   * @param {function=} errorHandler
   * @returns {Promise}
   */


  QueryBuilder.prototype.then = function then(successHandler, errorHandler) {
    var promise = this.execute();
    return promise.then.apply(promise, arguments);
  };

  /**
   * @param {function} mapper
   * @returns {Promise}
   */


  QueryBuilder.prototype.map = function map(mapper) {
    var promise = this.execute();
    return promise.map.apply(promise, arguments);
  };

  /**
   * @param {function} errorHandler
   * @returns {Promise}
   */


  QueryBuilder.prototype.catch = function _catch(errorHandler) {
    var promise = this.execute();
    return promise.catch.apply(promise, arguments);
  };

  /**
   * @param {*} returnValue
   * @returns {Promise}
   */


  QueryBuilder.prototype.return = function _return(returnValue) {
    var promise = this.execute();
    return promise.return.apply(promise, arguments);
  };

  /**
   * @param {*} context
   * @returns {Promise}
   */


  QueryBuilder.prototype.bind = function bind(context) {
    var promise = this.execute();
    return promise.bind.apply(promise, arguments);
  };

  /**
   * @param {function} callback
   * @returns {Promise}
   */


  QueryBuilder.prototype.asCallback = function asCallback(callback) {
    var promise = this.execute();
    return promise.asCallback.apply(promise, arguments);
  };

  /**
   * @param {function} callback
   * @returns {Promise}
   */


  QueryBuilder.prototype.nodeify = function nodeify(callback) {
    var promise = this.execute();
    return promise.nodeify.apply(promise, arguments);
  };

  /**
   * @returns {Promise}
   */


  QueryBuilder.prototype.resultSize = function resultSize() {
    var knex = this.knex();

    // orderBy is useless here and it can make things a lot slower (at least with postgresql 9.3).
    // Remove it from the count query. We also remove the offset and limit
    var query = this.clone().clear(/orderBy|offset|limit/).build();
    var rawQuery = knex.raw(query).wrap('(', ') as temp');
    var countQuery = knex.count('* as count').from(rawQuery);

    return countQuery.then(function (result) {
      return result[0] ? result[0].count : 0;
    });
  };

  /**
   * @param {number} page
   * @param {number} pageSize
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.page = function page(_page, pageSize) {
    return this.range(_page * pageSize, (_page + 1) * pageSize - 1);
  };

  /**
   * @param {number} start
   * @param {number} end
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.range = function range(start, end) {
    var _this2 = this;

    var resultSizePromise = void 0;

    return this.limit(end - start + 1).offset(start).runBefore(function () {
      // Don't return the promise so that it is executed
      // in parallel with the actual query.
      resultSizePromise = _this2.resultSize();
      return null;
    }).runAfter(function (results) {
      // Now that the actual query is finished, wait until the
      // result size has been calculated.
      return _bluebird2.default.all([results, resultSizePromise]);
    }).runAfter(function (arr) {
      return {
        results: arr[0],
        total: _lodash2.default.parseInt(arr[1])
      };
    });
  };

  /**
   * @returns {knex.QueryBuilder}
   */
  QueryBuilder.prototype.build = function build() {
    // Take a clone so that we don't modify this instance during build.
    var builder = this.clone();

    if (builder.isFindQuery()) {
      // If no write operations have been called at this point this query is a
      // find query and we need to call the custom find implementation.
      builder._callFindOperation();
    }

    if (builder._eagerExpression) {
      builder._callEagerFetchOperation();
    }

    // We need to build the builder even if a query executor operation
    // has been called so that the onBuild hooks get called.
    var knexBuilder = _build(builder);
    var queryExecutorOperation = builder._queryExecutorOperation();

    if (queryExecutorOperation) {
      // If the query executor is set, we build the builder that it returns.
      return queryExecutorOperation.queryExecutor(builder).build();
    } else {
      return knexBuilder;
    }
  };

  /**
   * @returns {Promise}
   */


  QueryBuilder.prototype.execute = function execute() {
    // Take a clone so that we don't modify this instance during execution.
    var builder = this.clone();
    var promiseCtx = { builder: builder };
    var promise = _bluebird2.default.bind(promiseCtx);
    var context = builder.context() || {};
    var internalContext = builder.internalContext();

    if (builder.isFindQuery()) {
      // If no write operations have been called at this point this query is a
      // find query and we need to call the custom find implementation.
      builder._callFindOperation();
    }

    if (builder._eagerExpression) {
      builder._callEagerFetchOperation();
    }

    promise = chainBeforeOperations(promise, builder._operations);
    promise = chainHooks(promise, context.runBefore);
    promise = chainHooks(promise, internalContext.runBefore);
    promise = chainBeforeInternalOperations(promise, builder._operations);

    // Resolve all before hooks before building and executing the query
    // and the rest of the hooks.
    return promise.then(function () {
      var promiseCtx = this;
      var builder = promiseCtx.builder;

      var promise = null;
      var knexBuilder = _build(builder);
      var queryExecutorOperation = builder._queryExecutorOperation();

      if (builder._explicitRejectValue) {
        promise = _bluebird2.default.reject(builder._explicitRejectValue).bind(promiseCtx);
      } else if (builder._explicitResolveValue) {
        promise = _bluebird2.default.resolve(builder._explicitResolveValue).bind(promiseCtx);
      } else if (queryExecutorOperation) {
        promise = queryExecutorOperation.queryExecutor(builder).bind(promiseCtx);
      } else {
        promise = knexBuilder.bind(promiseCtx);
        promise = chainRawResultOperations(promise, builder._operations);
        promise = promise.then(createModels);
      }

      promise = chainAfterQueryOperations(promise, builder._operations);
      promise = chainAfterInternalOperations(promise, builder._operations);
      promise = chainHooks(promise, context.runAfter);
      promise = chainHooks(promise, internalContext.runAfter);
      promise = chainAfterOperations(promise, builder._operations);

      return promise;
    });
  };

  /**
   * @private
   * @returns {QueryBuilderOperation}
   */


  QueryBuilder.prototype._queryExecutorOperation = function _queryExecutorOperation() {
    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (op.hasQueryExecutor()) {
        return op;
      }
    }

    return null;
  };

  /**
   * @private
   */


  QueryBuilder.prototype._callFindOperation = function _callFindOperation() {
    if (!this.has(_FindOperation2.default)) {
      var operation = this._findOperationFactory(this);

      operation.opt = _lodash2.default.merge(operation.opt, this._findOperationOptions);

      this.callQueryBuilderOperation(operation, [], /* pushFront = */true);
    }
  };

  /**
   * @private
   */


  QueryBuilder.prototype._callEagerFetchOperation = function _callEagerFetchOperation() {
    if (!this.has(_EagerOperation2.default) && this._eagerExpression) {
      var operation = this._eagerOperationFactory(this);

      operation.opt = _lodash2.default.merge(operation.opt, this._modelClass.defaultEagerOptions, this._eagerOperationOptions);

      this.callQueryBuilderOperation(operation, [this._eagerExpression, this._eagerFilterExpressions]);
    }
  };

  /**
   * @param {string} propertyName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.pluck = function pluck(propertyName) {
    return this.runAfter(function (result) {
      if (_lodash2.default.isArray(result)) {
        return _lodash2.default.map(result, propertyName);
      } else {
        return result;
      }
    });
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.first = function first() {
    return this.runAfter(function (result) {
      if (Array.isArray(result)) {
        return result[0];
      } else {
        return result;
      }
    });
  };

  /**
   * @returns {boolean}
   */


  QueryBuilder.prototype.hasSelection = function hasSelection(selection) {
    var table = this.modelClass().tableName;
    var noSelectStatements = true;

    for (var i = 0, l = this._operations.length; i < l; ++i) {
      var op = this._operations[i];

      if (op instanceof _SelectOperation2.default) {
        noSelectStatements = false;

        if (op.hasSelection(table, selection)) {
          return true;
        }
      }
    }

    if (noSelectStatements) {
      // Implicit `select *`.
      return true;
    } else {
      return false;
    }
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {function(Model, Model, string)} traverser
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.traverse = function traverse(modelClass, traverser) {
    var _this3 = this;

    if (_lodash2.default.isUndefined(traverser)) {
      traverser = modelClass;
      modelClass = null;
    }

    return this.runAfter(function (result) {
      _this3._modelClass.traverse(modelClass, result, traverser);
      return result;
    });
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {Array.<string>} properties
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.pick = function pick(modelClass, properties) {
    if (_lodash2.default.isUndefined(properties)) {
      properties = modelClass;
      modelClass = null;
    }

    properties = _lodash2.default.reduce(properties, function (obj, prop) {
      obj[prop] = true;
      return obj;
    }, {});

    return this.traverse(modelClass, function (model) {
      model.$pick(properties);
    });
  };

  /**
   * @param {Constructor.<Model>=} modelClass
   * @param {Array.<string>} properties
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.omit = function omit(modelClass, properties) {
    if (_lodash2.default.isUndefined(properties)) {
      properties = modelClass;
      modelClass = null;
    }

    // Turn the properties into a hash for performance.
    properties = _lodash2.default.reduce(properties, function (obj, prop) {
      obj[prop] = true;
      return obj;
    }, {});

    return this.traverse(modelClass, function (model) {
      model.$omit(properties);
    });
  };

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.joinRelation = function joinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.innerJoinRelation = function innerJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.outerJoinRelation = function outerJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.leftJoinRelation = function leftJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.leftOuterJoinRelation = function leftOuterJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.rightJoinRelation = function rightJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.rightOuterJoinRelation = function rightOuterJoinRelation(relationName) {};

  /**
   * @param {string} relationName
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.fullOuterJoinRelation = function fullOuterJoinRelation(relationName) {};

  /**
   * @param {string|number|Array.<string|number>} id
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.findById = function findById(id) {
    return this.whereComposite(this._modelClass.getFullIdColumn(), id).first();
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.withSchema = function withSchema(schema) {
    this.internalContext().onBuild.push(function (builder) {
      if (!builder.has(/withSchema/)) {
        // Need to push this operation to the front because knex doesn't use the
        // schema for operations called before `withSchema`.
        builder.callKnexQueryBuilderOperation('withSchema', [schema], true);
      }
    });

    return this;
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.debug = function debug() {
    this.internalContext().onBuild.push(function (builder) {
      builder.callKnexQueryBuilderOperation('debug', []);
    });

    return this;
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insert = function insert(modelsOrObjects) {
    var insertOperation = this._insertOperationFactory(this);
    return this.callQueryBuilderOperation(insertOperation, [modelsOrObjects]);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertAndFetch = function insertAndFetch(modelsOrObjects) {
    var insertAndFetchOperation = new _InsertAndFetchOperation2.default('insertAndFetch', {
      delegate: this._insertOperationFactory(this)
    });

    return this.callQueryBuilderOperation(insertAndFetchOperation, [modelsOrObjects]);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertGraph = function insertGraph(modelsOrObjects) {
    var insertGraphOperation = new _InsertGraphOperation2.default('insertGraph', {
      delegate: this._insertOperationFactory(this)
    });

    return this.callQueryBuilderOperation(insertGraphOperation, [modelsOrObjects]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertWithRelated = function insertWithRelated() {
    return this.insertGraph.apply(this, arguments);
  };

  /**
   * @param {Object|Model|Array.<Object>|Array.<Model>} modelsOrObjects
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertGraphAndFetch = function insertGraphAndFetch(modelsOrObjects) {
    var insertGraphAndFetchOperation = new _InsertGraphAndFetchOperation2.default('insertGraphAndFetch', {
      delegate: new _InsertGraphOperation2.default('insertGraph', {
        delegate: this._insertOperationFactory(this)
      })
    });

    return this.callQueryBuilderOperation(insertGraphAndFetchOperation, [modelsOrObjects]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.insertWithRelatedAndFetch = function insertWithRelatedAndFetch() {
    return this.insertGraphAndFetch.apply(this, arguments);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.update = function update(modelOrObject) {
    var updateOperation = this._updateOperationFactory(this);
    return this.callQueryBuilderOperation(updateOperation, [modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateAndFetch = function updateAndFetch(modelOrObject) {
    var delegateOperation = this._updateOperationFactory(this);

    if (!(delegateOperation.instance instanceof this._modelClass)) {
      throw new Error('updateAndFetch can only be called for instance operations');
    }

    var updateAndFetch = new _UpdateAndFetchOperation2.default('updateAndFetch', {
      delegate: delegateOperation
    });

    return this.callQueryBuilderOperation(updateAndFetch, [delegateOperation.instance.$id(), modelOrObject]);
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.updateAndFetchById = function updateAndFetchById(id, modelOrObject) {
    var updateAndFetch = new _UpdateAndFetchOperation2.default('updateAndFetch', {
      delegate: this._updateOperationFactory(this)
    });

    return this.callQueryBuilderOperation(updateAndFetch, [id, modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patch = function patch(modelOrObject) {
    var patchOperation = this._patchOperationFactory(this);
    return this.callQueryBuilderOperation(patchOperation, [modelOrObject]);
  };

  /**
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchAndFetch = function patchAndFetch(modelOrObject) {
    var delegateOperation = this._patchOperationFactory(this);

    if (!(delegateOperation.instance instanceof this._modelClass)) {
      throw new Error('patchAndFetch can only be called for instance operations');
    }

    var patchAndFetch = new _UpdateAndFetchOperation2.default('patchAndFetch', {
      delegate: delegateOperation
    });

    return this.callQueryBuilderOperation(patchAndFetch, [delegateOperation.instance.$id(), modelOrObject]);
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @param {Model|Object=} modelOrObject
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.patchAndFetchById = function patchAndFetchById(id, modelOrObject) {
    var patchAndFetch = new _UpdateAndFetchOperation2.default('patchAndFetch', {
      delegate: this._patchOperationFactory(this)
    });

    return this.callQueryBuilderOperation(patchAndFetch, [id, modelOrObject]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.delete = function _delete() {
    var deleteOperation = this._deleteOperationFactory(this);
    return this.callQueryBuilderOperation(deleteOperation, []);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.del = function del() {
    return this.delete();
  };

  /**
   * @param {number|string|Array.<number|string>} id
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.deleteById = function deleteById(id) {
    return this.delete().whereComposite(this._modelClass.getFullIdColumn(), id);
  };

  /**
   * @param {number|string|object|Array.<number|string>|Array.<Array.<number|string>>|Array.<object>} ids
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.relate = function relate(ids) {
    var relateOperation = this._relateOperationFactory(this);
    return this.callQueryBuilderOperation(relateOperation, [ids]);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.unrelate = function unrelate() {
    var unrelateOperation = this._unrelateOperationFactory(this);
    return this.callQueryBuilderOperation(unrelateOperation, []);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.increment = function increment(propertyName, howMuch) {
    var patch = {};
    var columnName = this._modelClass.propertyNameToColumnName(propertyName);
    patch[propertyName] = this.knex().raw('?? + ?', [columnName, howMuch]);
    return this.patch(patch);
  };

  /**
   * @returns {QueryBuilder}
   */


  QueryBuilder.prototype.decrement = function decrement(propertyName, howMuch) {
    var patch = {};
    var columnName = this._modelClass.propertyNameToColumnName(propertyName);
    patch[propertyName] = this.knex().raw('?? - ?', [columnName, howMuch]);
    return this.patch(patch);
  };

  return QueryBuilder;
}(_QueryBuilderBase3.default), (_applyDecoratedDescriptor(_class.prototype, 'runBefore', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'runBefore'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onBuild', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'onBuild'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'runAfter', [_dec3], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'runAfter'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'joinRelation', [_dec4], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'joinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'innerJoinRelation', [_dec5], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'innerJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'outerJoinRelation', [_dec6], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'outerJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftJoinRelation', [_dec7], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'leftOuterJoinRelation', [_dec8], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'leftOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightJoinRelation', [_dec9], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'rightOuterJoinRelation', [_dec10], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'rightOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'fullOuterJoinRelation', [_dec11], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullOuterJoinRelation'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insert', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insert'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertGraph', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertGraph'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'insertGraphAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'insertGraphAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'update', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'update'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateAndFetchById', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'updateAndFetchById'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patchAndFetch', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patchAndFetch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'patchAndFetchById', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'patchAndFetchById'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'delete', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'delete'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'relate', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'relate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'unrelate', [writeQueryOperation], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'unrelate'), _class.prototype)), _class));
exports.default = QueryBuilder;


function writeQueryOperation(target, property, descriptor) {
  var func = descriptor.value;

  descriptor.value = function decorator$writeQueryOperation() {
    if (!this.isFindQuery()) {
      return this.reject(new Error('Double call to a write method. ' + 'You can only call one of the write methods ' + '(insert, update, patch, delete, relate, unrelate, increment, decrement) ' + 'and only once per query builder.'));
    }

    try {
      func.apply(this, arguments);
    } catch (err) {
      this.reject(err);
    }

    return this;
  };
}

function checkEager(builder) {
  if (builder._eagerExpression && builder._allowedEagerExpression) {
    if (!builder._allowedEagerExpression.isSubExpression(builder._eagerExpression)) {
      builder.reject(new _ValidationError2.default({ eager: 'eager expression not allowed' }));
    }
  }
}

function createModels(result) {
  var builder = this.builder;

  if (result === null || result === undefined) {
    return null;
  }

  if (Array.isArray(result)) {
    if (result.length && (0, _typeof3.default)(result[0]) === 'object' && !(result[0] instanceof builder._modelClass)) {
      for (var i = 0, l = result.length; i < l; ++i) {
        result[i] = builder._modelClass.fromDatabaseJson(result[i]);
      }
    }
  } else if ((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) === 'object' && !(result instanceof builder._modelClass)) {
    result = builder._modelClass.fromDatabaseJson(result);
  }

  return result;
}

function _build(builder) {
  var context = builder.context() || {};
  var internalContext = builder.internalContext();
  var knexBuilder = builder.knex().queryBuilder();

  callOnBuildHooks(builder, context.onBuild);
  callOnBuildHooks(builder, internalContext.onBuild);

  knexBuilder = builder.buildInto(knexBuilder);

  if (!builder.has(_QueryBuilderBase3.default.FromRegex)) {
    var table = builder.modelClass().tableName;

    // Set the table only if it hasn't been explicitly set yet.
    knexBuilder.table(table);

    if (!builder.has(_QueryBuilderBase3.default.SelectRegex)) {
      knexBuilder.select(table + '.*');
    }
  }

  return knexBuilder;
}

function chainHooks(promise, func) {
  if (_lodash2.default.isFunction(func)) {
    promise = promise.then(function (result) {
      return func.call(this.builder, result, this.builder);
    });
  } else if (Array.isArray(func)) {
    func.forEach(function (func) {
      promise = promise.then(function (result) {
        return func.call(this.builder, result, this.builder);
      });
    });
  }

  return promise;
}

function callOnBuildHooks(builder, func) {
  if (_lodash2.default.isFunction(func)) {
    func.call(builder, builder);
  } else if (_lodash2.default.isArray(func)) {
    for (var i = 0, l = func.length; i < l; ++i) {
      func[i].call(builder, builder);
    }
  }
}

function createHookCaller(hook) {
  var hasMethod = 'has' + _lodash2.default.upperFirst(hook);

  // Compile the caller function for (measured) performance boost.
  var caller = new Function('promise', 'op', '\n    if (op.' + hasMethod + '()) {\n      return promise.then(function (result) {\n        return op.' + hook + '(this.builder, result);\n      });\n    } else {\n      return promise;\n    }\n  ');

  return function (promise, operations) {
    for (var i = 0, l = operations.length; i < l; ++i) {
      promise = caller(promise, operations[i]);
    }

    return promise;
  };
}

function createOperationFactory(OperationClass, name, options) {
  return function () {
    return new OperationClass(name, options);
  };
}

var chainBeforeOperations = createHookCaller('onBefore');
var chainBeforeInternalOperations = createHookCaller('onBeforeInternal');
var chainRawResultOperations = createHookCaller('onRawResult');
var chainAfterQueryOperations = createHookCaller('onAfterQuery');
var chainAfterInternalOperations = createHookCaller('onAfterInternal');
var chainAfterOperations = createHookCaller('onAfter');

var findOperationFactory = createOperationFactory(_FindOperation2.default, 'find');
var insertOperationFactory = createOperationFactory(_InsertOperation2.default, 'insert');
var updateOperationFactory = createOperationFactory(_UpdateOperation2.default, 'update');
var patchOperationFactory = createOperationFactory(_UpdateOperation2.default, 'patch', { modelOptions: { patch: true } });
var relateOperationFactory = createOperationFactory(_QueryBuilderOperation2.default, 'relate');
var unrelateOperationFactory = createOperationFactory(_QueryBuilderOperation2.default, 'unrelate');
var deleteOperationFactory = createOperationFactory(_DeleteOperation2.default, 'delete');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlci5qcyJdLCJuYW1lcyI6WyJRdWVyeUJ1aWxkZXIiLCJqb2luT3BlcmF0aW9uIiwibW9kZWxDbGFzcyIsImtuZXgiLCJfbW9kZWxDbGFzcyIsIl9leHBsaWNpdFJlamVjdFZhbHVlIiwiX2V4cGxpY2l0UmVzb2x2ZVZhbHVlIiwiX2VhZ2VyRXhwcmVzc2lvbiIsIl9lYWdlckZpbHRlckV4cHJlc3Npb25zIiwiX2FsbG93ZWRFYWdlckV4cHJlc3Npb24iLCJfYWxsb3dlZEluc2VydEV4cHJlc3Npb24iLCJfZmluZE9wZXJhdGlvbk9wdGlvbnMiLCJfZWFnZXJPcGVyYXRpb25PcHRpb25zIiwiX2ZpbmRPcGVyYXRpb25GYWN0b3J5IiwiZmluZE9wZXJhdGlvbkZhY3RvcnkiLCJfaW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSIsImluc2VydE9wZXJhdGlvbkZhY3RvcnkiLCJfdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSIsInVwZGF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJfcGF0Y2hPcGVyYXRpb25GYWN0b3J5IiwicGF0Y2hPcGVyYXRpb25GYWN0b3J5IiwiX3JlbGF0ZU9wZXJhdGlvbkZhY3RvcnkiLCJyZWxhdGVPcGVyYXRpb25GYWN0b3J5IiwiX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsInVucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsIl9kZWxldGVPcGVyYXRpb25GYWN0b3J5IiwiZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSIsIl9lYWdlck9wZXJhdGlvbkZhY3RvcnkiLCJkZWZhdWx0RWFnZXJBbGdvcml0aG0iLCJmb3JDbGFzcyIsImNoaWxkUXVlcnlPZiIsInF1ZXJ5IiwiaW50ZXJuYWxDb250ZXh0IiwicmVqZWN0IiwiZXJyb3IiLCJyZXNvbHZlIiwidmFsdWUiLCJpc0V4ZWN1dGFibGUiLCJoYXNFeGVjdXRvciIsIl9xdWVyeUV4ZWN1dG9yT3BlcmF0aW9uIiwicnVuQmVmb3JlIiwib25CdWlsZCIsInJ1bkFmdGVyIiwiZWFnZXJBbGdvcml0aG0iLCJhbGdvcml0aG0iLCJlYWdlck9wdGlvbnMiLCJlYWdlck9wZXJhdGlvbkZhY3RvcnkiLCJmYWN0b3J5IiwiZWFnZXIiLCJleHAiLCJmaWx0ZXJzIiwiaXNTdHJpbmciLCJwYXJzZSIsImlzT2JqZWN0IiwiY2hlY2tFYWdlciIsImFsbG93RWFnZXIiLCJtb2RpZnlFYWdlciIsInBhdGgiLCJtb2RpZmllciIsInB1c2giLCJmaWx0ZXIiLCJmaWx0ZXJFYWdlciIsImFsbG93SW5zZXJ0Iiwib3B0Iiwib3BJZHgiLCJpbmRleE9mT3BlcmF0aW9uIiwiX29wZXJhdGlvbnMiLCJjbG9uZSIsImZpbmRPcHRpb25zIiwiaXNGaW5kUXVlcnkiLCJzb21lIiwibWV0aG9kIiwiaXNXcml0ZU9wZXJhdGlvbiIsInRvU3RyaW5nIiwiYnVpbGQiLCJ0b1NxbCIsImJ1aWxkZXIiLCJjb25zdHJ1Y3RvciIsImJhc2VDbG9uZUludG8iLCJzbGljZSIsImNsZWFyRWFnZXIiLCJjbGVhclJlamVjdCIsImNsZWFyUmVzb2x2ZSIsInRoZW4iLCJzdWNjZXNzSGFuZGxlciIsImVycm9ySGFuZGxlciIsInByb21pc2UiLCJleGVjdXRlIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJtYXAiLCJtYXBwZXIiLCJjYXRjaCIsInJldHVybiIsInJldHVyblZhbHVlIiwiYmluZCIsImNvbnRleHQiLCJhc0NhbGxiYWNrIiwiY2FsbGJhY2siLCJub2RlaWZ5IiwicmVzdWx0U2l6ZSIsImNsZWFyIiwicmF3UXVlcnkiLCJyYXciLCJ3cmFwIiwiY291bnRRdWVyeSIsImNvdW50IiwiZnJvbSIsInJlc3VsdCIsInBhZ2UiLCJwYWdlU2l6ZSIsInJhbmdlIiwic3RhcnQiLCJlbmQiLCJyZXN1bHRTaXplUHJvbWlzZSIsImxpbWl0Iiwib2Zmc2V0IiwiYWxsIiwicmVzdWx0cyIsImFyciIsInRvdGFsIiwicGFyc2VJbnQiLCJfY2FsbEZpbmRPcGVyYXRpb24iLCJfY2FsbEVhZ2VyRmV0Y2hPcGVyYXRpb24iLCJrbmV4QnVpbGRlciIsInF1ZXJ5RXhlY3V0b3JPcGVyYXRpb24iLCJxdWVyeUV4ZWN1dG9yIiwicHJvbWlzZUN0eCIsImNoYWluQmVmb3JlT3BlcmF0aW9ucyIsImNoYWluSG9va3MiLCJjaGFpbkJlZm9yZUludGVybmFsT3BlcmF0aW9ucyIsImNoYWluUmF3UmVzdWx0T3BlcmF0aW9ucyIsImNyZWF0ZU1vZGVscyIsImNoYWluQWZ0ZXJRdWVyeU9wZXJhdGlvbnMiLCJjaGFpbkFmdGVySW50ZXJuYWxPcGVyYXRpb25zIiwiY2hhaW5BZnRlck9wZXJhdGlvbnMiLCJpIiwibCIsImxlbmd0aCIsIm9wIiwiaGFzUXVlcnlFeGVjdXRvciIsImhhcyIsIm9wZXJhdGlvbiIsIm1lcmdlIiwiY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiIsImRlZmF1bHRFYWdlck9wdGlvbnMiLCJwbHVjayIsInByb3BlcnR5TmFtZSIsImlzQXJyYXkiLCJmaXJzdCIsIkFycmF5IiwiaGFzU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwidGFibGUiLCJ0YWJsZU5hbWUiLCJub1NlbGVjdFN0YXRlbWVudHMiLCJ0cmF2ZXJzZSIsInRyYXZlcnNlciIsImlzVW5kZWZpbmVkIiwicGljayIsInByb3BlcnRpZXMiLCJyZWR1Y2UiLCJvYmoiLCJwcm9wIiwibW9kZWwiLCIkcGljayIsIm9taXQiLCIkb21pdCIsImpvaW5SZWxhdGlvbiIsInJlbGF0aW9uTmFtZSIsImlubmVySm9pblJlbGF0aW9uIiwib3V0ZXJKb2luUmVsYXRpb24iLCJsZWZ0Sm9pblJlbGF0aW9uIiwibGVmdE91dGVySm9pblJlbGF0aW9uIiwicmlnaHRKb2luUmVsYXRpb24iLCJyaWdodE91dGVySm9pblJlbGF0aW9uIiwiZnVsbE91dGVySm9pblJlbGF0aW9uIiwiZmluZEJ5SWQiLCJpZCIsIndoZXJlQ29tcG9zaXRlIiwiZ2V0RnVsbElkQ29sdW1uIiwid2l0aFNjaGVtYSIsInNjaGVtYSIsImNhbGxLbmV4UXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwiZGVidWciLCJpbnNlcnQiLCJtb2RlbHNPck9iamVjdHMiLCJpbnNlcnRPcGVyYXRpb24iLCJpbnNlcnRBbmRGZXRjaCIsImluc2VydEFuZEZldGNoT3BlcmF0aW9uIiwiZGVsZWdhdGUiLCJpbnNlcnRHcmFwaCIsImluc2VydEdyYXBoT3BlcmF0aW9uIiwiaW5zZXJ0V2l0aFJlbGF0ZWQiLCJpbnNlcnRHcmFwaEFuZEZldGNoIiwiaW5zZXJ0R3JhcGhBbmRGZXRjaE9wZXJhdGlvbiIsImluc2VydFdpdGhSZWxhdGVkQW5kRmV0Y2giLCJ1cGRhdGUiLCJtb2RlbE9yT2JqZWN0IiwidXBkYXRlT3BlcmF0aW9uIiwidXBkYXRlQW5kRmV0Y2giLCJkZWxlZ2F0ZU9wZXJhdGlvbiIsImluc3RhbmNlIiwiRXJyb3IiLCIkaWQiLCJ1cGRhdGVBbmRGZXRjaEJ5SWQiLCJwYXRjaCIsInBhdGNoT3BlcmF0aW9uIiwicGF0Y2hBbmRGZXRjaCIsInBhdGNoQW5kRmV0Y2hCeUlkIiwiZGVsZXRlIiwiZGVsZXRlT3BlcmF0aW9uIiwiZGVsIiwiZGVsZXRlQnlJZCIsInJlbGF0ZSIsImlkcyIsInJlbGF0ZU9wZXJhdGlvbiIsInVucmVsYXRlIiwidW5yZWxhdGVPcGVyYXRpb24iLCJpbmNyZW1lbnQiLCJob3dNdWNoIiwiY29sdW1uTmFtZSIsInByb3BlcnR5TmFtZVRvQ29sdW1uTmFtZSIsImRlY3JlbWVudCIsIndyaXRlUXVlcnlPcGVyYXRpb24iLCJ0YXJnZXQiLCJwcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJmdW5jIiwiZGVjb3JhdG9yJHdyaXRlUXVlcnlPcGVyYXRpb24iLCJlcnIiLCJpc1N1YkV4cHJlc3Npb24iLCJ1bmRlZmluZWQiLCJmcm9tRGF0YWJhc2VKc29uIiwicXVlcnlCdWlsZGVyIiwiY2FsbE9uQnVpbGRIb29rcyIsImJ1aWxkSW50byIsIkZyb21SZWdleCIsIlNlbGVjdFJlZ2V4Iiwic2VsZWN0IiwiaXNGdW5jdGlvbiIsImNhbGwiLCJmb3JFYWNoIiwiY3JlYXRlSG9va0NhbGxlciIsImhvb2siLCJoYXNNZXRob2QiLCJ1cHBlckZpcnN0IiwiY2FsbGVyIiwiRnVuY3Rpb24iLCJvcGVyYXRpb25zIiwiY3JlYXRlT3BlcmF0aW9uRmFjdG9yeSIsIk9wZXJhdGlvbkNsYXNzIiwibmFtZSIsIm9wdGlvbnMiLCJtb2RlbE9wdGlvbnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsWSxXQTZFbEIsa0UsVUFPQSxnRSxVQU9BLGlFLFVBeW9CQSxxQ0FBc0Isa0NBQXdCLEVBQUNDLGVBQWUsTUFBaEIsRUFBeEIsQ0FBdEIsQyxVQU9BLHFDQUFzQixrQ0FBd0IsRUFBQ0EsZUFBZSxXQUFoQixFQUF4QixDQUF0QixDLFVBT0EscUNBQXNCLGtDQUF3QixFQUFDQSxlQUFlLFdBQWhCLEVBQXhCLENBQXRCLEMsVUFPQSxxQ0FBc0Isa0NBQXdCLEVBQUNBLGVBQWUsVUFBaEIsRUFBeEIsQ0FBdEIsQyxVQU9BLHFDQUFzQixrQ0FBd0IsRUFBQ0EsZUFBZSxlQUFoQixFQUF4QixDQUF0QixDLFVBT0EscUNBQXNCLGtDQUF3QixFQUFDQSxlQUFlLFdBQWhCLEVBQXhCLENBQXRCLEMsV0FPQSxxQ0FBc0Isa0NBQXdCLEVBQUNBLGVBQWUsZ0JBQWhCLEVBQXhCLENBQXRCLEMsV0FPQSxxQ0FBc0Isa0NBQXdCLEVBQUNBLGVBQWUsZUFBaEIsRUFBeEIsQ0FBdEIsQzs7O0FBbnhCRCx3QkFBWUMsVUFBWixFQUF3QjtBQUFBOztBQUFBLCtEQUN0Qiw2QkFBTUEsV0FBV0MsSUFBWCxFQUFOLGdDQURzQjs7QUFHdEIsVUFBS0MsV0FBTCxHQUFtQkYs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QWdDQyxjQUFoQyxFQUFnREMsSUFBaEQsRUFBc0RDLE9BQXRELEVBQStEO0FBQzdELFNBQU8sWUFBTTtBQUNYLFdBQU8sSUFBSUYsY0FBSixDQUFtQkMsSUFBbkIsRUFBeUJDLE9BQXpCLENBQVA7QUFDRCxHQUZEO0FBR0Q7O0FBRUQsSUFBTTdILHdCQUF3Qm1ILGlCQUFpQixVQUFqQixDQUE5QjtBQUNBLElBQU1qSCxnQ0FBZ0NpSCxpQkFBaUIsa0JBQWpCLENBQXRDO0FBQ0EsSUFBTWhILDJCQUEyQmdILGlCQUFpQixhQUFqQixDQUFqQztBQUNBLElBQU05Ryw0QkFBNEI4RyxpQkFBaUIsY0FBakIsQ0FBbEM7QUFDQSxJQUFNN0csK0JBQStCNkcsaUJBQWlCLGlCQUFqQixDQUFyQztBQUNBLElBQU01Ryx1QkFBdUI0RyxpQkFBaUIsU0FBakIsQ0FBN0I7O0FBRUEsSUFBTXJPLHVCQUF1QjRPLGdEQUFzQyxNQUF0QyxDQUE3QjtBQUNBLElBQU0xTyx5QkFBeUIwTyxrREFBd0MsUUFBeEMsQ0FBL0I7QUFDQSxJQUFNeE8seUJBQXlCd08sa0RBQXdDLFFBQXhDLENBQS9CO0FBQ0EsSUFBTXRPLHdCQUF3QnNPLGtEQUF3QyxPQUF4QyxFQUFpRCxFQUFDSSxjQUFjLEVBQUNoRCxPQUFPLElBQVIsRUFBZixFQUFqRCxDQUE5QjtBQUNBLElBQU14TCx5QkFBeUJvTyx3REFBOEMsUUFBOUMsQ0FBL0I7QUFDQSxJQUFNbE8sMkJBQTJCa08sd0RBQThDLFVBQTlDLENBQWpDO0FBQ0EsSUFBTWhPLHlCQUF5QmdPLGtEQUF3QyxRQUF4QyxDQUEvQiIsImZpbGUiOiJRdWVyeUJ1aWxkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHF1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL2RlY29yYXRvcnMvcXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJDb250ZXh0IGZyb20gJy4vUXVlcnlCdWlsZGVyQ29udGV4dCc7XG5pbXBvcnQgUmVsYXRpb25FeHByZXNzaW9uIGZyb20gJy4vUmVsYXRpb25FeHByZXNzaW9uJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJCYXNlIGZyb20gJy4vUXVlcnlCdWlsZGVyQmFzZSc7XG5pbXBvcnQgVmFsaWRhdGlvbkVycm9yIGZyb20gJy4uL21vZGVsL1ZhbGlkYXRpb25FcnJvcic7XG5cbmltcG9ydCBGaW5kT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9GaW5kT3BlcmF0aW9uJztcbmltcG9ydCBEZWxldGVPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL0RlbGV0ZU9wZXJhdGlvbic7XG5pbXBvcnQgVXBkYXRlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9VcGRhdGVPcGVyYXRpb24nO1xuaW1wb3J0IEluc2VydE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvSW5zZXJ0T3BlcmF0aW9uJztcblxuaW1wb3J0IEluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL0luc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24nO1xuaW1wb3J0IEluc2VydEFuZEZldGNoT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9JbnNlcnRBbmRGZXRjaE9wZXJhdGlvbic7XG5pbXBvcnQgVXBkYXRlQW5kRmV0Y2hPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL1VwZGF0ZUFuZEZldGNoT3BlcmF0aW9uJztcbmltcG9ydCBRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZnJvbSAnLi9vcGVyYXRpb25zL1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5pbXBvcnQgSm9pblJlbGF0aW9uT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9Kb2luUmVsYXRpb25PcGVyYXRpb24nO1xuaW1wb3J0IEluc2VydEdyYXBoT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9JbnNlcnRHcmFwaE9wZXJhdGlvbic7XG5pbXBvcnQgUnVuQmVmb3JlT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9SdW5CZWZvcmVPcGVyYXRpb24nO1xuaW1wb3J0IFJ1bkFmdGVyT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9SdW5BZnRlck9wZXJhdGlvbic7XG5pbXBvcnQgT25CdWlsZE9wZXJhdGlvbiBmcm9tICcuL29wZXJhdGlvbnMvT25CdWlsZE9wZXJhdGlvbic7XG5pbXBvcnQgU2VsZWN0T3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9TZWxlY3RPcGVyYXRpb24nO1xuaW1wb3J0IEVhZ2VyT3BlcmF0aW9uIGZyb20gJy4vb3BlcmF0aW9ucy9FYWdlck9wZXJhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1ZXJ5QnVpbGRlciBleHRlbmRzIFF1ZXJ5QnVpbGRlckJhc2Uge1xuXG4gIGNvbnN0cnVjdG9yKG1vZGVsQ2xhc3MpIHtcbiAgICBzdXBlcihtb2RlbENsYXNzLmtuZXgoKSwgUXVlcnlCdWlsZGVyQ29udGV4dCk7XG5cbiAgICB0aGlzLl9tb2RlbENsYXNzID0gbW9kZWxDbGFzcztcbiAgICB0aGlzLl9leHBsaWNpdFJlamVjdFZhbHVlID0gbnVsbDtcbiAgICB0aGlzLl9leHBsaWNpdFJlc29sdmVWYWx1ZSA9IG51bGw7XG5cbiAgICB0aGlzLl9lYWdlckV4cHJlc3Npb24gPSBudWxsO1xuICAgIHRoaXMuX2VhZ2VyRmlsdGVyRXhwcmVzc2lvbnMgPSBbXTtcbiAgICB0aGlzLl9hbGxvd2VkRWFnZXJFeHByZXNzaW9uID0gbnVsbDtcbiAgICB0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbiA9IG51bGw7XG5cbiAgICB0aGlzLl9maW5kT3BlcmF0aW9uT3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuX2VhZ2VyT3BlcmF0aW9uT3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5fZmluZE9wZXJhdGlvbkZhY3RvcnkgPSBmaW5kT3BlcmF0aW9uRmFjdG9yeTtcbiAgICB0aGlzLl9pbnNlcnRPcGVyYXRpb25GYWN0b3J5ID0gaW5zZXJ0T3BlcmF0aW9uRmFjdG9yeTtcbiAgICB0aGlzLl91cGRhdGVPcGVyYXRpb25GYWN0b3J5ID0gdXBkYXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICB0aGlzLl9wYXRjaE9wZXJhdGlvbkZhY3RvcnkgPSBwYXRjaE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5fcmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHJlbGF0ZU9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5fdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5ID0gdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIHRoaXMuX2RlbGV0ZU9wZXJhdGlvbkZhY3RvcnkgPSBkZWxldGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIHRoaXMuX2VhZ2VyT3BlcmF0aW9uRmFjdG9yeSA9IG1vZGVsQ2xhc3MuZGVmYXVsdEVhZ2VyQWxnb3JpdGhtO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsQ2xhc3NcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHN0YXRpYyBmb3JDbGFzcyhtb2RlbENsYXNzKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzKG1vZGVsQ2xhc3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQmFzZX0gcXVlcnlcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGNoaWxkUXVlcnlPZihxdWVyeSkge1xuICAgIGlmIChxdWVyeSkge1xuICAgICAgdGhpcy5pbnRlcm5hbENvbnRleHQocXVlcnkuaW50ZXJuYWxDb250ZXh0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICByZWplY3QoZXJyb3IpIHtcbiAgICB0aGlzLl9leHBsaWNpdFJlamVjdFZhbHVlID0gZXJyb3I7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSB2YWx1ZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcmVzb2x2ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0V4ZWN1dGFibGUoKSB7XG4gICAgY29uc3QgaGFzRXhlY3V0b3IgPSAhIXRoaXMuX3F1ZXJ5RXhlY3V0b3JPcGVyYXRpb24oKTtcbiAgICByZXR1cm4gIXRoaXMuX2V4cGxpY2l0UmVqZWN0VmFsdWUgJiYgIXRoaXMuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlICYmICFoYXNFeGVjdXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCosIFF1ZXJ5QnVpbGRlcil9IHJ1bkJlZm9yZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihSdW5CZWZvcmVPcGVyYXRpb24pXG4gIHJ1bkJlZm9yZShydW5CZWZvcmUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKX0gb25CdWlsZFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihPbkJ1aWxkT3BlcmF0aW9uKVxuICBvbkJ1aWxkKG9uQnVpbGQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTW9kZWx8QXJyYXkuPE1vZGVsPiwgUXVlcnlCdWlsZGVyKX0gcnVuQWZ0ZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oUnVuQWZ0ZXJPcGVyYXRpb24pXG4gIHJ1bkFmdGVyKHJ1bkFmdGVyKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6RWFnZXJPcGVyYXRpb259IGFsZ29yaXRobVxuICAgKiBAcGFyYW0ge29iamVjdD19IGVhZ2VyT3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZWFnZXJBbGdvcml0aG0oYWxnb3JpdGhtLCBlYWdlck9wdGlvbnMpIHtcbiAgICB0aGlzLmVhZ2VyT3BlcmF0aW9uRmFjdG9yeShhbGdvcml0aG0pO1xuXG4gICAgaWYgKGVhZ2VyT3B0aW9ucykge1xuICAgICAgdGhpcy5lYWdlck9wdGlvbnMoZWFnZXJPcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6RWFnZXJPcGVyYXRpb259IGZhY3RvcnlcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGVhZ2VyT3BlcmF0aW9uRmFjdG9yeShmYWN0b3J5KSB7XG4gICAgdGhpcy5fZWFnZXJPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBmaW5kT3BlcmF0aW9uRmFjdG9yeShmYWN0b3J5KSB7XG4gICAgdGhpcy5fZmluZE9wZXJhdGlvbkZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKTpRdWVyeUJ1aWxkZXJPcGVyYXRpb259IGZhY3RvcnlcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGluc2VydE9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX2luc2VydE9wZXJhdGlvbkZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKTpRdWVyeUJ1aWxkZXJPcGVyYXRpb259IGZhY3RvcnlcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHVwZGF0ZU9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX3VwZGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSBmYWN0b3J5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKTpRdWVyeUJ1aWxkZXJPcGVyYXRpb259IGZhY3RvcnlcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHBhdGNoT3BlcmF0aW9uRmFjdG9yeShmYWN0b3J5KSB7XG4gICAgdGhpcy5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBkZWxldGVPcGVyYXRpb25GYWN0b3J5KGZhY3RvcnkpIHtcbiAgICB0aGlzLl9kZWxldGVPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICByZWxhdGVPcGVyYXRpb25GYWN0b3J5KGZhY3RvcnkpIHtcbiAgICB0aGlzLl9yZWxhdGVPcGVyYXRpb25GYWN0b3J5ID0gZmFjdG9yeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcik6UXVlcnlCdWlsZGVyT3BlcmF0aW9ufSBmYWN0b3J5XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICB1bnJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkoZmFjdG9yeSkge1xuICAgIHRoaXMuX3VucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IGZhY3Rvcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHBcbiAgICogQHBhcmFtIHtPYmplY3QuPHN0cmluZywgZnVuY3Rpb24oUXVlcnlCdWlsZGVyKT49fSBmaWx0ZXJzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBlYWdlcihleHAsIGZpbHRlcnMpIHtcbiAgICB0aGlzLl9lYWdlckV4cHJlc3Npb24gPSBleHAgfHwgbnVsbDtcblxuICAgIGlmIChfLmlzU3RyaW5nKHRoaXMuX2VhZ2VyRXhwcmVzc2lvbikpIHtcbiAgICAgIHRoaXMuX2VhZ2VyRXhwcmVzc2lvbiA9IFJlbGF0aW9uRXhwcmVzc2lvbi5wYXJzZSh0aGlzLl9lYWdlckV4cHJlc3Npb24pO1xuICAgIH1cblxuICAgIGlmIChfLmlzT2JqZWN0KGZpbHRlcnMpKSB7XG4gICAgICB0aGlzLl9lYWdlckV4cHJlc3Npb24uZmlsdGVycyA9IGZpbHRlcnM7XG4gICAgfVxuXG4gICAgY2hlY2tFYWdlcih0aGlzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWxhdGlvbkV4cHJlc3Npb259IGV4cFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgYWxsb3dFYWdlcihleHApIHtcbiAgICB0aGlzLl9hbGxvd2VkRWFnZXJFeHByZXNzaW9uID0gZXhwIHx8IG51bGw7XG5cbiAgICBpZiAoXy5pc1N0cmluZyh0aGlzLl9hbGxvd2VkRWFnZXJFeHByZXNzaW9uKSkge1xuICAgICAgdGhpcy5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbiA9IFJlbGF0aW9uRXhwcmVzc2lvbi5wYXJzZSh0aGlzLl9hbGxvd2VkRWFnZXJFeHByZXNzaW9uKTtcbiAgICB9XG5cbiAgICBjaGVja0VhZ2VyKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gcGF0aFxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFF1ZXJ5QnVpbGRlcil9IG1vZGlmaWVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBtb2RpZnlFYWdlcihwYXRoLCBtb2RpZmllcikge1xuICAgIHRoaXMuX2VhZ2VyRmlsdGVyRXhwcmVzc2lvbnMucHVzaCh7XG4gICAgICBwYXRoOiBwYXRoLFxuICAgICAgZmlsdGVyOiBtb2RpZmllclxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmaWx0ZXJFYWdlciguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZ5RWFnZXIoLi4uYXJncyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHBcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGFsbG93SW5zZXJ0KGV4cCkge1xuICAgIHRoaXMuX2FsbG93ZWRJbnNlcnRFeHByZXNzaW9uID0gZXhwIHx8IG51bGw7XG5cbiAgICBpZiAoXy5pc1N0cmluZyh0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbikpIHtcbiAgICAgIHRoaXMuX2FsbG93ZWRJbnNlcnRFeHByZXNzaW9uID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKHRoaXMuX2FsbG93ZWRJbnNlcnRFeHByZXNzaW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0XG4gICAqIEByZXR1cm4ge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGVhZ2VyT3B0aW9ucyhvcHQpIHtcbiAgICB0aGlzLl9lYWdlck9wZXJhdGlvbk9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9lYWdlck9wZXJhdGlvbk9wdGlvbnMsIG9wdCk7XG4gICAgY29uc3Qgb3BJZHggPSB0aGlzLmluZGV4T2ZPcGVyYXRpb24oRWFnZXJPcGVyYXRpb24pO1xuXG4gICAgaWYgKG9wSWR4ICE9PSAtMSkge1xuICAgICAgdGhpcy5fb3BlcmF0aW9uc1tvcElkeF0gPSB0aGlzLl9vcGVyYXRpb25zW29wSWR4XS5jbG9uZSh7XG4gICAgICAgIG9wdDogdGhpcy5fZWFnZXJPcGVyYXRpb25PcHRpb25zXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0XG4gICAqIEByZXR1cm4ge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGZpbmRPcHRpb25zKG9wdCkge1xuICAgIHRoaXMuX2ZpbmRPcGVyYXRpb25PcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZmluZE9wZXJhdGlvbk9wdGlvbnMsIG9wdCk7XG4gICAgY29uc3Qgb3BJZHggPSB0aGlzLmluZGV4T2ZPcGVyYXRpb24oRmluZE9wZXJhdGlvbik7XG5cbiAgICBpZiAob3BJZHggIT09IC0xKSB7XG4gICAgICB0aGlzLl9vcGVyYXRpb25zW29wSWR4XSA9IHRoaXMuX29wZXJhdGlvbnNbb3BJZHhdLmNsb25lKHtcbiAgICAgICAgb3B0OiB0aGlzLl9maW5kT3BlcmF0aW9uT3B0aW9uc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge0NvbnN0cnVjdG9yLjxNb2RlbD59XG4gICAqL1xuICBtb2RlbENsYXNzKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbENsYXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNGaW5kUXVlcnkoKSB7XG4gICAgcmV0dXJuICFfLnNvbWUodGhpcy5fb3BlcmF0aW9ucywgbWV0aG9kID0+IG1ldGhvZC5pc1dyaXRlT3BlcmF0aW9uKSAmJiAhdGhpcy5fZXhwbGljaXRSZWplY3RWYWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuYnVpbGQoKS50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0b1NxbCgpIHtcbiAgICByZXR1cm4gdGhpcy50b1N0cmluZygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICBjb25zdCBidWlsZGVyID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5fbW9kZWxDbGFzcyk7XG4gICAgdGhpcy5iYXNlQ2xvbmVJbnRvKGJ1aWxkZXIpO1xuXG4gICAgYnVpbGRlci5fZXhwbGljaXRSZWplY3RWYWx1ZSA9IHRoaXMuX2V4cGxpY2l0UmVqZWN0VmFsdWU7XG4gICAgYnVpbGRlci5fZXhwbGljaXRSZXNvbHZlVmFsdWUgPSB0aGlzLl9leHBsaWNpdFJlc29sdmVWYWx1ZTtcblxuICAgIGJ1aWxkZXIuX2VhZ2VyRXhwcmVzc2lvbiA9IHRoaXMuX2VhZ2VyRXhwcmVzc2lvbjtcbiAgICBidWlsZGVyLl9lYWdlckZpbHRlckV4cHJlc3Npb25zID0gdGhpcy5fZWFnZXJGaWx0ZXJFeHByZXNzaW9ucy5zbGljZSgpO1xuXG4gICAgYnVpbGRlci5fYWxsb3dlZEVhZ2VyRXhwcmVzc2lvbiA9IHRoaXMuX2FsbG93ZWRFYWdlckV4cHJlc3Npb247XG4gICAgYnVpbGRlci5fYWxsb3dlZEluc2VydEV4cHJlc3Npb24gPSB0aGlzLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbjtcblxuICAgIGJ1aWxkZXIuX2ZpbmRPcGVyYXRpb25PcHRpb25zID0gdGhpcy5fZmluZE9wZXJhdGlvbk9wdGlvbnM7XG4gICAgYnVpbGRlci5fZWFnZXJPcGVyYXRpb25PcHRpb25zID0gdGhpcy5fZWFnZXJPcGVyYXRpb25PcHRpb25zO1xuXG4gICAgYnVpbGRlci5fZmluZE9wZXJhdGlvbkZhY3RvcnkgPSB0aGlzLl9maW5kT3BlcmF0aW9uRmFjdG9yeTtcbiAgICBidWlsZGVyLl9pbnNlcnRPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeTtcbiAgICBidWlsZGVyLl91cGRhdGVPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeTtcbiAgICBidWlsZGVyLl9wYXRjaE9wZXJhdGlvbkZhY3RvcnkgPSB0aGlzLl9wYXRjaE9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgYnVpbGRlci5fcmVsYXRlT3BlcmF0aW9uRmFjdG9yeSA9IHRoaXMuX3JlbGF0ZU9wZXJhdGlvbkZhY3Rvcnk7XG4gICAgYnVpbGRlci5fdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5ID0gdGhpcy5fdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIGJ1aWxkZXIuX2RlbGV0ZU9wZXJhdGlvbkZhY3RvcnkgPSB0aGlzLl9kZWxldGVPcGVyYXRpb25GYWN0b3J5O1xuICAgIGJ1aWxkZXIuX2VhZ2VyT3BlcmF0aW9uRmFjdG9yeSA9IHRoaXMuX2VhZ2VyT3BlcmF0aW9uRmFjdG9yeTtcblxuICAgIHJldHVybiBidWlsZGVyO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBjbGVhckVhZ2VyKCkge1xuICAgIHRoaXMuX2VhZ2VyRXhwcmVzc2lvbiA9IG51bGw7XG4gICAgdGhpcy5fZWFnZXJGaWx0ZXJFeHByZXNzaW9ucyA9IFtdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBjbGVhclJlamVjdCgpIHtcbiAgICB0aGlzLl9leHBsaWNpdFJlamVjdFZhbHVlID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgY2xlYXJSZXNvbHZlKCkge1xuICAgIHRoaXMuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlID0gbnVsbDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gc3VjY2Vzc0hhbmRsZXJcbiAgICogQHBhcmFtIHtmdW5jdGlvbj19IGVycm9ySGFuZGxlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIHRoZW4oc3VjY2Vzc0hhbmRsZXIsIGVycm9ySGFuZGxlcikge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5leGVjdXRlKCk7XG4gICAgcmV0dXJuIHByb21pc2UudGhlbi5hcHBseShwcm9taXNlLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG1hcHBlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIG1hcChtYXBwZXIpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLm1hcC5hcHBseShwcm9taXNlLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGVycm9ySGFuZGxlclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGNhdGNoKGVycm9ySGFuZGxlcikge1xuICAgIHZhciBwcm9taXNlID0gdGhpcy5leGVjdXRlKCk7XG4gICAgcmV0dXJuIHByb21pc2UuY2F0Y2guYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IHJldHVyblZhbHVlXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgcmV0dXJuKHJldHVyblZhbHVlKSB7XG4gICAgdmFyIHByb21pc2UgPSB0aGlzLmV4ZWN1dGUoKTtcbiAgICByZXR1cm4gcHJvbWlzZS5yZXR1cm4uYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBiaW5kKGNvbnRleHQpIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLmJpbmQuYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGFzQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLmFzQ2FsbGJhY2suYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIG5vZGVpZnkoY2FsbGJhY2spIHtcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuZXhlY3V0ZSgpO1xuICAgIHJldHVybiBwcm9taXNlLm5vZGVpZnkuYXBwbHkocHJvbWlzZSwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIHJlc3VsdFNpemUoKSB7XG4gICAgY29uc3Qga25leCA9IHRoaXMua25leCgpO1xuXG4gICAgLy8gb3JkZXJCeSBpcyB1c2VsZXNzIGhlcmUgYW5kIGl0IGNhbiBtYWtlIHRoaW5ncyBhIGxvdCBzbG93ZXIgKGF0IGxlYXN0IHdpdGggcG9zdGdyZXNxbCA5LjMpLlxuICAgIC8vIFJlbW92ZSBpdCBmcm9tIHRoZSBjb3VudCBxdWVyeS4gV2UgYWxzbyByZW1vdmUgdGhlIG9mZnNldCBhbmQgbGltaXRcbiAgICBsZXQgcXVlcnkgPSB0aGlzLmNsb25lKCkuY2xlYXIoL29yZGVyQnl8b2Zmc2V0fGxpbWl0LykuYnVpbGQoKTtcbiAgICBsZXQgcmF3UXVlcnkgPSBrbmV4LnJhdyhxdWVyeSkud3JhcCgnKCcsICcpIGFzIHRlbXAnKTtcbiAgICBsZXQgY291bnRRdWVyeSA9IGtuZXguY291bnQoJyogYXMgY291bnQnKS5mcm9tKHJhd1F1ZXJ5KTtcblxuICAgIHJldHVybiBjb3VudFF1ZXJ5LnRoZW4ocmVzdWx0ID0+IHJlc3VsdFswXSA/IHJlc3VsdFswXS5jb3VudCA6IDApO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwYWdlU2l6ZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcGFnZShwYWdlLCBwYWdlU2l6ZSkge1xuICAgIHJldHVybiB0aGlzLnJhbmdlKHBhZ2UgKiBwYWdlU2l6ZSwgKHBhZ2UgKyAxKSAqIHBhZ2VTaXplIC0gMSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbmRcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHJhbmdlKHN0YXJ0LCBlbmQpIHtcbiAgICBsZXQgcmVzdWx0U2l6ZVByb21pc2U7XG5cbiAgICByZXR1cm4gdGhpc1xuICAgICAgLmxpbWl0KGVuZCAtIHN0YXJ0ICsgMSlcbiAgICAgIC5vZmZzZXQoc3RhcnQpXG4gICAgICAucnVuQmVmb3JlKCgpID0+IHtcbiAgICAgICAgLy8gRG9uJ3QgcmV0dXJuIHRoZSBwcm9taXNlIHNvIHRoYXQgaXQgaXMgZXhlY3V0ZWRcbiAgICAgICAgLy8gaW4gcGFyYWxsZWwgd2l0aCB0aGUgYWN0dWFsIHF1ZXJ5LlxuICAgICAgICByZXN1bHRTaXplUHJvbWlzZSA9IHRoaXMucmVzdWx0U2l6ZSgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0pXG4gICAgICAucnVuQWZ0ZXIocmVzdWx0cyA9PiB7XG4gICAgICAgIC8vIE5vdyB0aGF0IHRoZSBhY3R1YWwgcXVlcnkgaXMgZmluaXNoZWQsIHdhaXQgdW50aWwgdGhlXG4gICAgICAgIC8vIHJlc3VsdCBzaXplIGhhcyBiZWVuIGNhbGN1bGF0ZWQuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbcmVzdWx0cywgcmVzdWx0U2l6ZVByb21pc2VdKTtcbiAgICAgIH0pXG4gICAgICAucnVuQWZ0ZXIoYXJyID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByZXN1bHRzOiBhcnJbMF0sXG4gICAgICAgICAgdG90YWw6IF8ucGFyc2VJbnQoYXJyWzFdKVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtrbmV4LlF1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGJ1aWxkKCkge1xuICAgIC8vIFRha2UgYSBjbG9uZSBzbyB0aGF0IHdlIGRvbid0IG1vZGlmeSB0aGlzIGluc3RhbmNlIGR1cmluZyBidWlsZC5cbiAgICBjb25zdCBidWlsZGVyID0gdGhpcy5jbG9uZSgpO1xuXG4gICAgaWYgKGJ1aWxkZXIuaXNGaW5kUXVlcnkoKSkge1xuICAgICAgLy8gSWYgbm8gd3JpdGUgb3BlcmF0aW9ucyBoYXZlIGJlZW4gY2FsbGVkIGF0IHRoaXMgcG9pbnQgdGhpcyBxdWVyeSBpcyBhXG4gICAgICAvLyBmaW5kIHF1ZXJ5IGFuZCB3ZSBuZWVkIHRvIGNhbGwgdGhlIGN1c3RvbSBmaW5kIGltcGxlbWVudGF0aW9uLlxuICAgICAgYnVpbGRlci5fY2FsbEZpbmRPcGVyYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAoYnVpbGRlci5fZWFnZXJFeHByZXNzaW9uKSB7XG4gICAgICBidWlsZGVyLl9jYWxsRWFnZXJGZXRjaE9wZXJhdGlvbigpO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdG8gYnVpbGQgdGhlIGJ1aWxkZXIgZXZlbiBpZiBhIHF1ZXJ5IGV4ZWN1dG9yIG9wZXJhdGlvblxuICAgIC8vIGhhcyBiZWVuIGNhbGxlZCBzbyB0aGF0IHRoZSBvbkJ1aWxkIGhvb2tzIGdldCBjYWxsZWQuXG4gICAgY29uc3Qga25leEJ1aWxkZXIgPSBidWlsZChidWlsZGVyKTtcbiAgICBjb25zdCBxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uID0gYnVpbGRlci5fcXVlcnlFeGVjdXRvck9wZXJhdGlvbigpO1xuXG4gICAgaWYgKHF1ZXJ5RXhlY3V0b3JPcGVyYXRpb24pIHtcbiAgICAgIC8vIElmIHRoZSBxdWVyeSBleGVjdXRvciBpcyBzZXQsIHdlIGJ1aWxkIHRoZSBidWlsZGVyIHRoYXQgaXQgcmV0dXJucy5cbiAgICAgIHJldHVybiBxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uLnF1ZXJ5RXhlY3V0b3IoYnVpbGRlcikuYnVpbGQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGtuZXhCdWlsZGVyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIGV4ZWN1dGUoKSB7XG4gICAgLy8gVGFrZSBhIGNsb25lIHNvIHRoYXQgd2UgZG9uJ3QgbW9kaWZ5IHRoaXMgaW5zdGFuY2UgZHVyaW5nIGV4ZWN1dGlvbi5cbiAgICBsZXQgYnVpbGRlciA9IHRoaXMuY2xvbmUoKTtcbiAgICBsZXQgcHJvbWlzZUN0eCA9IHtidWlsZGVyOiBidWlsZGVyfTtcbiAgICBsZXQgcHJvbWlzZSA9IFByb21pc2UuYmluZChwcm9taXNlQ3R4KTtcbiAgICBsZXQgY29udGV4dCA9IGJ1aWxkZXIuY29udGV4dCgpIHx8IHt9O1xuICAgIGxldCBpbnRlcm5hbENvbnRleHQgPSBidWlsZGVyLmludGVybmFsQ29udGV4dCgpO1xuXG4gICAgaWYgKGJ1aWxkZXIuaXNGaW5kUXVlcnkoKSkge1xuICAgICAgLy8gSWYgbm8gd3JpdGUgb3BlcmF0aW9ucyBoYXZlIGJlZW4gY2FsbGVkIGF0IHRoaXMgcG9pbnQgdGhpcyBxdWVyeSBpcyBhXG4gICAgICAvLyBmaW5kIHF1ZXJ5IGFuZCB3ZSBuZWVkIHRvIGNhbGwgdGhlIGN1c3RvbSBmaW5kIGltcGxlbWVudGF0aW9uLlxuICAgICAgYnVpbGRlci5fY2FsbEZpbmRPcGVyYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAoYnVpbGRlci5fZWFnZXJFeHByZXNzaW9uKSB7XG4gICAgICBidWlsZGVyLl9jYWxsRWFnZXJGZXRjaE9wZXJhdGlvbigpO1xuICAgIH1cblxuICAgIHByb21pc2UgPSBjaGFpbkJlZm9yZU9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG4gICAgcHJvbWlzZSA9IGNoYWluSG9va3MocHJvbWlzZSwgY29udGV4dC5ydW5CZWZvcmUpO1xuICAgIHByb21pc2UgPSBjaGFpbkhvb2tzKHByb21pc2UsIGludGVybmFsQ29udGV4dC5ydW5CZWZvcmUpO1xuICAgIHByb21pc2UgPSBjaGFpbkJlZm9yZUludGVybmFsT3BlcmF0aW9ucyhwcm9taXNlLCBidWlsZGVyLl9vcGVyYXRpb25zKTtcblxuICAgIC8vIFJlc29sdmUgYWxsIGJlZm9yZSBob29rcyBiZWZvcmUgYnVpbGRpbmcgYW5kIGV4ZWN1dGluZyB0aGUgcXVlcnlcbiAgICAvLyBhbmQgdGhlIHJlc3Qgb2YgdGhlIGhvb2tzLlxuICAgIHJldHVybiBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcHJvbWlzZUN0eCA9IHRoaXM7XG4gICAgICBjb25zdCBidWlsZGVyID0gcHJvbWlzZUN0eC5idWlsZGVyO1xuXG4gICAgICBsZXQgcHJvbWlzZSA9IG51bGw7XG4gICAgICBsZXQga25leEJ1aWxkZXIgPSBidWlsZChidWlsZGVyKTtcbiAgICAgIGxldCBxdWVyeUV4ZWN1dG9yT3BlcmF0aW9uID0gYnVpbGRlci5fcXVlcnlFeGVjdXRvck9wZXJhdGlvbigpO1xuXG4gICAgICBpZiAoYnVpbGRlci5fZXhwbGljaXRSZWplY3RWYWx1ZSkge1xuICAgICAgICBwcm9taXNlICA9IFByb21pc2UucmVqZWN0KGJ1aWxkZXIuX2V4cGxpY2l0UmVqZWN0VmFsdWUpLmJpbmQocHJvbWlzZUN0eCk7XG4gICAgICB9IGVsc2UgaWYgKGJ1aWxkZXIuX2V4cGxpY2l0UmVzb2x2ZVZhbHVlKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoYnVpbGRlci5fZXhwbGljaXRSZXNvbHZlVmFsdWUpLmJpbmQocHJvbWlzZUN0eCk7XG4gICAgICB9IGVsc2UgaWYgKHF1ZXJ5RXhlY3V0b3JPcGVyYXRpb24pIHtcbiAgICAgICAgcHJvbWlzZSA9IHF1ZXJ5RXhlY3V0b3JPcGVyYXRpb24ucXVlcnlFeGVjdXRvcihidWlsZGVyKS5iaW5kKHByb21pc2VDdHgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvbWlzZSA9IGtuZXhCdWlsZGVyLmJpbmQocHJvbWlzZUN0eCk7XG4gICAgICAgIHByb21pc2UgPSBjaGFpblJhd1Jlc3VsdE9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG4gICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY3JlYXRlTW9kZWxzKTtcbiAgICAgIH1cblxuICAgICAgcHJvbWlzZSA9IGNoYWluQWZ0ZXJRdWVyeU9wZXJhdGlvbnMocHJvbWlzZSwgYnVpbGRlci5fb3BlcmF0aW9ucyk7XG4gICAgICBwcm9taXNlID0gY2hhaW5BZnRlckludGVybmFsT3BlcmF0aW9ucyhwcm9taXNlLCBidWlsZGVyLl9vcGVyYXRpb25zKTtcbiAgICAgIHByb21pc2UgPSBjaGFpbkhvb2tzKHByb21pc2UsIGNvbnRleHQucnVuQWZ0ZXIpO1xuICAgICAgcHJvbWlzZSA9IGNoYWluSG9va3MocHJvbWlzZSwgaW50ZXJuYWxDb250ZXh0LnJ1bkFmdGVyKTtcbiAgICAgIHByb21pc2UgPSBjaGFpbkFmdGVyT3BlcmF0aW9ucyhwcm9taXNlLCBidWlsZGVyLl9vcGVyYXRpb25zKTtcblxuICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIF9xdWVyeUV4ZWN1dG9yT3BlcmF0aW9uKCkge1xuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5fb3BlcmF0aW9ucy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG9wID0gdGhpcy5fb3BlcmF0aW9uc1tpXTtcblxuICAgICAgaWYgKG9wLmhhc1F1ZXJ5RXhlY3V0b3IoKSkge1xuICAgICAgICByZXR1cm4gb3A7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jYWxsRmluZE9wZXJhdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaGFzKEZpbmRPcGVyYXRpb24pKSB7XG4gICAgICBjb25zdCBvcGVyYXRpb24gPSB0aGlzLl9maW5kT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcblxuICAgICAgb3BlcmF0aW9uLm9wdCA9IF8ubWVyZ2Uob3BlcmF0aW9uLm9wdCxcbiAgICAgICAgdGhpcy5fZmluZE9wZXJhdGlvbk9wdGlvbnNcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihvcGVyYXRpb24sIFtdLCAvKiBwdXNoRnJvbnQgPSAqLyB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jYWxsRWFnZXJGZXRjaE9wZXJhdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuaGFzKEVhZ2VyT3BlcmF0aW9uKSAmJiB0aGlzLl9lYWdlckV4cHJlc3Npb24pIHtcbiAgICAgIGNvbnN0IG9wZXJhdGlvbiA9IHRoaXMuX2VhZ2VyT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcblxuICAgICAgb3BlcmF0aW9uLm9wdCA9IF8ubWVyZ2Uob3BlcmF0aW9uLm9wdCxcbiAgICAgICAgdGhpcy5fbW9kZWxDbGFzcy5kZWZhdWx0RWFnZXJPcHRpb25zLFxuICAgICAgICB0aGlzLl9lYWdlck9wZXJhdGlvbk9wdGlvbnNcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihvcGVyYXRpb24sIFtcbiAgICAgICAgdGhpcy5fZWFnZXJFeHByZXNzaW9uLFxuICAgICAgICB0aGlzLl9lYWdlckZpbHRlckV4cHJlc3Npb25zXG4gICAgICBdKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgcGx1Y2socHJvcGVydHlOYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucnVuQWZ0ZXIocmVzdWx0ID0+IHtcbiAgICAgIGlmIChfLmlzQXJyYXkocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gXy5tYXAocmVzdWx0LCBwcm9wZXJ0eU5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZmlyc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMucnVuQWZ0ZXIocmVzdWx0ID0+IHtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdCkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdFswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBoYXNTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgY29uc3QgdGFibGUgPSB0aGlzLm1vZGVsQ2xhc3MoKS50YWJsZU5hbWU7XG4gICAgbGV0IG5vU2VsZWN0U3RhdGVtZW50cyA9IHRydWU7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX29wZXJhdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBvcCA9IHRoaXMuX29wZXJhdGlvbnNbaV07XG5cbiAgICAgIGlmIChvcCBpbnN0YW5jZW9mIFNlbGVjdE9wZXJhdGlvbikge1xuICAgICAgICBub1NlbGVjdFN0YXRlbWVudHMgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3AuaGFzU2VsZWN0aW9uKHRhYmxlLCBzZWxlY3Rpb24pKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobm9TZWxlY3RTdGF0ZW1lbnRzKSB7XG4gICAgICAvLyBJbXBsaWNpdCBgc2VsZWN0ICpgLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvci48TW9kZWw+PX0gbW9kZWxDbGFzc1xuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKE1vZGVsLCBNb2RlbCwgc3RyaW5nKX0gdHJhdmVyc2VyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICB0cmF2ZXJzZShtb2RlbENsYXNzLCB0cmF2ZXJzZXIpIHtcbiAgICBpZiAoXy5pc1VuZGVmaW5lZCh0cmF2ZXJzZXIpKSB7XG4gICAgICB0cmF2ZXJzZXIgPSBtb2RlbENsYXNzO1xuICAgICAgbW9kZWxDbGFzcyA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucnVuQWZ0ZXIocmVzdWx0ID0+IHtcbiAgICAgIHRoaXMuX21vZGVsQ2xhc3MudHJhdmVyc2UobW9kZWxDbGFzcywgcmVzdWx0LCB0cmF2ZXJzZXIpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yLjxNb2RlbD49fSBtb2RlbENsYXNzXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIHBpY2sobW9kZWxDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChfLmlzVW5kZWZpbmVkKHByb3BlcnRpZXMpKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gbW9kZWxDbGFzcztcbiAgICAgIG1vZGVsQ2xhc3MgPSBudWxsO1xuICAgIH1cblxuICAgIHByb3BlcnRpZXMgPSBfLnJlZHVjZShwcm9wZXJ0aWVzLCAob2JqLCBwcm9wKSA9PiB7XG4gICAgICBvYmpbcHJvcF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZShtb2RlbENsYXNzLCBtb2RlbCA9PiB7XG4gICAgICBtb2RlbC4kcGljayhwcm9wZXJ0aWVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbnN0cnVjdG9yLjxNb2RlbD49fSBtb2RlbENsYXNzXG4gICAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHByb3BlcnRpZXNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIG9taXQobW9kZWxDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChfLmlzVW5kZWZpbmVkKHByb3BlcnRpZXMpKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gbW9kZWxDbGFzcztcbiAgICAgIG1vZGVsQ2xhc3MgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFR1cm4gdGhlIHByb3BlcnRpZXMgaW50byBhIGhhc2ggZm9yIHBlcmZvcm1hbmNlLlxuICAgIHByb3BlcnRpZXMgPSBfLnJlZHVjZShwcm9wZXJ0aWVzLCAob2JqLCBwcm9wKSA9PiB7XG4gICAgICBvYmpbcHJvcF0gPSB0cnVlO1xuICAgICAgcmV0dXJuIG9iajtcbiAgICB9LCB7fSk7XG5cbiAgICByZXR1cm4gdGhpcy50cmF2ZXJzZShtb2RlbENsYXNzLCBtb2RlbCA9PiB7XG4gICAgICBtb2RlbC4kb21pdChwcm9wZXJ0aWVzKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtKb2luUmVsYXRpb25PcGVyYXRpb24sIHtqb2luT3BlcmF0aW9uOiAnam9pbid9XSlcbiAgam9pblJlbGF0aW9uKHJlbGF0aW9uTmFtZSkge31cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aW9uTmFtZVxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHF1ZXJ5QnVpbGRlck9wZXJhdGlvbihbSm9pblJlbGF0aW9uT3BlcmF0aW9uLCB7am9pbk9wZXJhdGlvbjogJ2lubmVySm9pbid9XSlcbiAgaW5uZXJKb2luUmVsYXRpb24ocmVsYXRpb25OYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtKb2luUmVsYXRpb25PcGVyYXRpb24sIHtqb2luT3BlcmF0aW9uOiAnb3V0ZXJKb2luJ31dKVxuICBvdXRlckpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdsZWZ0Sm9pbid9XSlcbiAgbGVmdEpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdsZWZ0T3V0ZXJKb2luJ31dKVxuICBsZWZ0T3V0ZXJKb2luUmVsYXRpb24ocmVsYXRpb25OYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpb25OYW1lXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAcXVlcnlCdWlsZGVyT3BlcmF0aW9uKFtKb2luUmVsYXRpb25PcGVyYXRpb24sIHtqb2luT3BlcmF0aW9uOiAncmlnaHRKb2luJ31dKVxuICByaWdodEpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdyaWdodE91dGVySm9pbid9XSlcbiAgcmlnaHRPdXRlckpvaW5SZWxhdGlvbihyZWxhdGlvbk5hbWUpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEBxdWVyeUJ1aWxkZXJPcGVyYXRpb24oW0pvaW5SZWxhdGlvbk9wZXJhdGlvbiwge2pvaW5PcGVyYXRpb246ICdmdWxsT3V0ZXJKb2luJ31dKVxuICBmdWxsT3V0ZXJKb2luUmVsYXRpb24ocmVsYXRpb25OYW1lKSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ8QXJyYXkuPHN0cmluZ3xudW1iZXI+fSBpZFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgZmluZEJ5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy53aGVyZUNvbXBvc2l0ZSh0aGlzLl9tb2RlbENsYXNzLmdldEZ1bGxJZENvbHVtbigpLCBpZCkuZmlyc3QoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgd2l0aFNjaGVtYShzY2hlbWEpIHtcbiAgICB0aGlzLmludGVybmFsQ29udGV4dCgpLm9uQnVpbGQucHVzaChidWlsZGVyID0+IHtcbiAgICAgIGlmICghYnVpbGRlci5oYXMoL3dpdGhTY2hlbWEvKSkge1xuICAgICAgICAvLyBOZWVkIHRvIHB1c2ggdGhpcyBvcGVyYXRpb24gdG8gdGhlIGZyb250IGJlY2F1c2Uga25leCBkb2Vzbid0IHVzZSB0aGVcbiAgICAgICAgLy8gc2NoZW1hIGZvciBvcGVyYXRpb25zIGNhbGxlZCBiZWZvcmUgYHdpdGhTY2hlbWFgLlxuICAgICAgICBidWlsZGVyLmNhbGxLbmV4UXVlcnlCdWlsZGVyT3BlcmF0aW9uKCd3aXRoU2NoZW1hJywgW3NjaGVtYV0sIHRydWUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGRlYnVnKCkge1xuICAgIHRoaXMuaW50ZXJuYWxDb250ZXh0KCkub25CdWlsZC5wdXNoKGJ1aWxkZXIgPT4ge1xuICAgICAgYnVpbGRlci5jYWxsS25leFF1ZXJ5QnVpbGRlck9wZXJhdGlvbignZGVidWcnLCBbXSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdHxNb2RlbHxBcnJheS48T2JqZWN0PnxBcnJheS48TW9kZWw+fSBtb2RlbHNPck9iamVjdHNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIGluc2VydChtb2RlbHNPck9iamVjdHMpIHtcbiAgICBjb25zdCBpbnNlcnRPcGVyYXRpb24gPSB0aGlzLl9pbnNlcnRPcGVyYXRpb25GYWN0b3J5KHRoaXMpO1xuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24oaW5zZXJ0T3BlcmF0aW9uLCBbbW9kZWxzT3JPYmplY3RzXSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R8TW9kZWx8QXJyYXkuPE9iamVjdD58QXJyYXkuPE1vZGVsPn0gbW9kZWxzT3JPYmplY3RzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBpbnNlcnRBbmRGZXRjaChtb2RlbHNPck9iamVjdHMpIHtcbiAgICBjb25zdCBpbnNlcnRBbmRGZXRjaE9wZXJhdGlvbiA9IG5ldyBJbnNlcnRBbmRGZXRjaE9wZXJhdGlvbignaW5zZXJ0QW5kRmV0Y2gnLCB7XG4gICAgICBkZWxlZ2F0ZTogdGhpcy5faW5zZXJ0T3BlcmF0aW9uRmFjdG9yeSh0aGlzKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihpbnNlcnRBbmRGZXRjaE9wZXJhdGlvbiwgW21vZGVsc09yT2JqZWN0c10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fE1vZGVsfEFycmF5LjxPYmplY3Q+fEFycmF5LjxNb2RlbD59IG1vZGVsc09yT2JqZWN0c1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgaW5zZXJ0R3JhcGgobW9kZWxzT3JPYmplY3RzKSB7XG4gICAgY29uc3QgaW5zZXJ0R3JhcGhPcGVyYXRpb24gPSBuZXcgSW5zZXJ0R3JhcGhPcGVyYXRpb24oJ2luc2VydEdyYXBoJywge1xuICAgICAgZGVsZWdhdGU6IHRoaXMuX2luc2VydE9wZXJhdGlvbkZhY3RvcnkodGhpcylcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24oaW5zZXJ0R3JhcGhPcGVyYXRpb24sIFttb2RlbHNPck9iamVjdHNdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgaW5zZXJ0V2l0aFJlbGF0ZWQoLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLmluc2VydEdyYXBoKC4uLmFyZ3MpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fE1vZGVsfEFycmF5LjxPYmplY3Q+fEFycmF5LjxNb2RlbD59IG1vZGVsc09yT2JqZWN0c1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgaW5zZXJ0R3JhcGhBbmRGZXRjaChtb2RlbHNPck9iamVjdHMpIHtcbiAgICBjb25zdCBpbnNlcnRHcmFwaEFuZEZldGNoT3BlcmF0aW9uID0gbmV3IEluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24oJ2luc2VydEdyYXBoQW5kRmV0Y2gnLCB7XG4gICAgICBkZWxlZ2F0ZTogbmV3IEluc2VydEdyYXBoT3BlcmF0aW9uKCdpbnNlcnRHcmFwaCcsIHtcbiAgICAgICAgZGVsZWdhdGU6IHRoaXMuX2luc2VydE9wZXJhdGlvbkZhY3RvcnkodGhpcylcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKGluc2VydEdyYXBoQW5kRmV0Y2hPcGVyYXRpb24sIFttb2RlbHNPck9iamVjdHNdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgaW5zZXJ0V2l0aFJlbGF0ZWRBbmRGZXRjaCguLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5zZXJ0R3JhcGhBbmRGZXRjaCguLi5hcmdzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHVwZGF0ZShtb2RlbE9yT2JqZWN0KSB7XG4gICAgY29uc3QgdXBkYXRlT3BlcmF0aW9uID0gdGhpcy5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHVwZGF0ZU9wZXJhdGlvbiwgW21vZGVsT3JPYmplY3RdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHVwZGF0ZUFuZEZldGNoKG1vZGVsT3JPYmplY3QpIHtcbiAgICBjb25zdCBkZWxlZ2F0ZU9wZXJhdGlvbiA9IHRoaXMuX3VwZGF0ZU9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG5cbiAgICBpZiAoIShkZWxlZ2F0ZU9wZXJhdGlvbi5pbnN0YW5jZSBpbnN0YW5jZW9mIHRoaXMuX21vZGVsQ2xhc3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZUFuZEZldGNoIGNhbiBvbmx5IGJlIGNhbGxlZCBmb3IgaW5zdGFuY2Ugb3BlcmF0aW9ucycpO1xuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZUFuZEZldGNoID0gbmV3IFVwZGF0ZUFuZEZldGNoT3BlcmF0aW9uKCd1cGRhdGVBbmRGZXRjaCcsIHtcbiAgICAgIGRlbGVnYXRlOiBkZWxlZ2F0ZU9wZXJhdGlvblxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbih1cGRhdGVBbmRGZXRjaCwgW2RlbGVnYXRlT3BlcmF0aW9uLmluc3RhbmNlLiRpZCgpLCBtb2RlbE9yT2JqZWN0XSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfEFycmF5LjxudW1iZXJ8c3RyaW5nPn0gaWRcbiAgICogQHBhcmFtIHtNb2RlbHxPYmplY3Q9fSBtb2RlbE9yT2JqZWN0XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICB1cGRhdGVBbmRGZXRjaEJ5SWQoaWQsIG1vZGVsT3JPYmplY3QpIHtcbiAgICBjb25zdCB1cGRhdGVBbmRGZXRjaCA9IG5ldyBVcGRhdGVBbmRGZXRjaE9wZXJhdGlvbigndXBkYXRlQW5kRmV0Y2gnLCB7XG4gICAgICBkZWxlZ2F0ZTogdGhpcy5fdXBkYXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbih1cGRhdGVBbmRGZXRjaCwgW2lkLCBtb2RlbE9yT2JqZWN0XSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtNb2RlbHxPYmplY3Q9fSBtb2RlbE9yT2JqZWN0XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBwYXRjaChtb2RlbE9yT2JqZWN0KSB7XG4gICAgY29uc3QgcGF0Y2hPcGVyYXRpb24gPSB0aGlzLl9wYXRjaE9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihwYXRjaE9wZXJhdGlvbiwgW21vZGVsT3JPYmplY3RdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsfE9iamVjdD19IG1vZGVsT3JPYmplY3RcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIEB3cml0ZVF1ZXJ5T3BlcmF0aW9uXG4gIHBhdGNoQW5kRmV0Y2gobW9kZWxPck9iamVjdCkge1xuICAgIGNvbnN0IGRlbGVnYXRlT3BlcmF0aW9uID0gdGhpcy5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5KHRoaXMpO1xuXG4gICAgaWYgKCEoZGVsZWdhdGVPcGVyYXRpb24uaW5zdGFuY2UgaW5zdGFuY2VvZiB0aGlzLl9tb2RlbENsYXNzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwYXRjaEFuZEZldGNoIGNhbiBvbmx5IGJlIGNhbGxlZCBmb3IgaW5zdGFuY2Ugb3BlcmF0aW9ucycpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhdGNoQW5kRmV0Y2ggPSBuZXcgVXBkYXRlQW5kRmV0Y2hPcGVyYXRpb24oJ3BhdGNoQW5kRmV0Y2gnLCB7XG4gICAgICBkZWxlZ2F0ZTogZGVsZWdhdGVPcGVyYXRpb25cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLmNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24ocGF0Y2hBbmRGZXRjaCwgW2RlbGVnYXRlT3BlcmF0aW9uLmluc3RhbmNlLiRpZCgpLCBtb2RlbE9yT2JqZWN0XSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfEFycmF5LjxudW1iZXJ8c3RyaW5nPn0gaWRcbiAgICogQHBhcmFtIHtNb2RlbHxPYmplY3Q9fSBtb2RlbE9yT2JqZWN0XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBwYXRjaEFuZEZldGNoQnlJZChpZCwgbW9kZWxPck9iamVjdCkge1xuICAgIGNvbnN0IHBhdGNoQW5kRmV0Y2ggPSBuZXcgVXBkYXRlQW5kRmV0Y2hPcGVyYXRpb24oJ3BhdGNoQW5kRmV0Y2gnLCB7XG4gICAgICBkZWxlZ2F0ZTogdGhpcy5fcGF0Y2hPcGVyYXRpb25GYWN0b3J5KHRoaXMpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKHBhdGNoQW5kRmV0Y2gsIFtpZCwgbW9kZWxPck9iamVjdF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBAd3JpdGVRdWVyeU9wZXJhdGlvblxuICBkZWxldGUoKSB7XG4gICAgY29uc3QgZGVsZXRlT3BlcmF0aW9uID0gdGhpcy5fZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSh0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKGRlbGV0ZU9wZXJhdGlvbiwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBkZWwoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfEFycmF5LjxudW1iZXJ8c3RyaW5nPn0gaWRcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gIGRlbGV0ZUJ5SWQoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGUoKS53aGVyZUNvbXBvc2l0ZSh0aGlzLl9tb2RlbENsYXNzLmdldEZ1bGxJZENvbHVtbigpLCBpZCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ8c3RyaW5nfG9iamVjdHxBcnJheS48bnVtYmVyfHN0cmluZz58QXJyYXkuPEFycmF5LjxudW1iZXJ8c3RyaW5nPj58QXJyYXkuPG9iamVjdD59IGlkc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgcmVsYXRlKGlkcykge1xuICAgIGNvbnN0IHJlbGF0ZU9wZXJhdGlvbiA9IHRoaXMuX3JlbGF0ZU9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbihyZWxhdGVPcGVyYXRpb24sIFtpZHNdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgQHdyaXRlUXVlcnlPcGVyYXRpb25cbiAgdW5yZWxhdGUoKSB7XG4gICAgY29uc3QgdW5yZWxhdGVPcGVyYXRpb24gPSB0aGlzLl91bnJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkodGhpcyk7XG4gICAgcmV0dXJuIHRoaXMuY2FsbFF1ZXJ5QnVpbGRlck9wZXJhdGlvbih1bnJlbGF0ZU9wZXJhdGlvbiwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBpbmNyZW1lbnQocHJvcGVydHlOYW1lLCBob3dNdWNoKSB7XG4gICAgbGV0IHBhdGNoID0ge307XG4gICAgbGV0IGNvbHVtbk5hbWUgPSB0aGlzLl9tb2RlbENsYXNzLnByb3BlcnR5TmFtZVRvQ29sdW1uTmFtZShwcm9wZXJ0eU5hbWUpO1xuICAgIHBhdGNoW3Byb3BlcnR5TmFtZV0gPSB0aGlzLmtuZXgoKS5yYXcoJz8/ICsgPycsIFtjb2x1bW5OYW1lLCBob3dNdWNoXSk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2gocGF0Y2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBkZWNyZW1lbnQocHJvcGVydHlOYW1lLCBob3dNdWNoKSB7XG4gICAgbGV0IHBhdGNoID0ge307XG4gICAgbGV0IGNvbHVtbk5hbWUgPSB0aGlzLl9tb2RlbENsYXNzLnByb3BlcnR5TmFtZVRvQ29sdW1uTmFtZShwcm9wZXJ0eU5hbWUpO1xuICAgIHBhdGNoW3Byb3BlcnR5TmFtZV0gPSB0aGlzLmtuZXgoKS5yYXcoJz8/IC0gPycsIFtjb2x1bW5OYW1lLCBob3dNdWNoXSk7XG4gICAgcmV0dXJuIHRoaXMucGF0Y2gocGF0Y2gpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlUXVlcnlPcGVyYXRpb24odGFyZ2V0LCBwcm9wZXJ0eSwgZGVzY3JpcHRvcikge1xuICBjb25zdCBmdW5jID0gZGVzY3JpcHRvci52YWx1ZTtcblxuICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gZGVjb3JhdG9yJHdyaXRlUXVlcnlPcGVyYXRpb24oKSB7XG4gICAgaWYgKCF0aGlzLmlzRmluZFF1ZXJ5KCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlamVjdChuZXcgRXJyb3IoJ0RvdWJsZSBjYWxsIHRvIGEgd3JpdGUgbWV0aG9kLiAnICtcbiAgICAgICAgJ1lvdSBjYW4gb25seSBjYWxsIG9uZSBvZiB0aGUgd3JpdGUgbWV0aG9kcyAnICtcbiAgICAgICAgJyhpbnNlcnQsIHVwZGF0ZSwgcGF0Y2gsIGRlbGV0ZSwgcmVsYXRlLCB1bnJlbGF0ZSwgaW5jcmVtZW50LCBkZWNyZW1lbnQpICcgK1xuICAgICAgICAnYW5kIG9ubHkgb25jZSBwZXIgcXVlcnkgYnVpbGRlci4nKSk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRoaXMucmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoZWNrRWFnZXIoYnVpbGRlcikge1xuICBpZiAoYnVpbGRlci5fZWFnZXJFeHByZXNzaW9uICYmIGJ1aWxkZXIuX2FsbG93ZWRFYWdlckV4cHJlc3Npb24pIHtcbiAgICBpZiAoIWJ1aWxkZXIuX2FsbG93ZWRFYWdlckV4cHJlc3Npb24uaXNTdWJFeHByZXNzaW9uKGJ1aWxkZXIuX2VhZ2VyRXhwcmVzc2lvbikpIHtcbiAgICAgIGJ1aWxkZXIucmVqZWN0KG5ldyBWYWxpZGF0aW9uRXJyb3Ioe2VhZ2VyOiAnZWFnZXIgZXhwcmVzc2lvbiBub3QgYWxsb3dlZCd9KSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZGVscyhyZXN1bHQpIHtcbiAgY29uc3QgYnVpbGRlciA9IHRoaXMuYnVpbGRlcjtcblxuICBpZiAocmVzdWx0ID09PSBudWxsIHx8IHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHQpKSB7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggJiYgdHlwZW9mIHJlc3VsdFswXSA9PT0gJ29iamVjdCcgJiYgIShyZXN1bHRbMF0gaW5zdGFuY2VvZiBidWlsZGVyLl9tb2RlbENsYXNzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZXN1bHQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IGJ1aWxkZXIuX21vZGVsQ2xhc3MuZnJvbURhdGFiYXNlSnNvbihyZXN1bHRbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyAmJiAhKHJlc3VsdCBpbnN0YW5jZW9mIGJ1aWxkZXIuX21vZGVsQ2xhc3MpKSB7XG4gICAgcmVzdWx0ID0gYnVpbGRlci5fbW9kZWxDbGFzcy5mcm9tRGF0YWJhc2VKc29uKHJlc3VsdCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBidWlsZChidWlsZGVyKSB7XG4gIGxldCBjb250ZXh0ID0gYnVpbGRlci5jb250ZXh0KCkgfHwge307XG4gIGxldCBpbnRlcm5hbENvbnRleHQgPSBidWlsZGVyLmludGVybmFsQ29udGV4dCgpO1xuICBsZXQga25leEJ1aWxkZXIgPSBidWlsZGVyLmtuZXgoKS5xdWVyeUJ1aWxkZXIoKTtcblxuICBjYWxsT25CdWlsZEhvb2tzKGJ1aWxkZXIsIGNvbnRleHQub25CdWlsZCk7XG4gIGNhbGxPbkJ1aWxkSG9va3MoYnVpbGRlciwgaW50ZXJuYWxDb250ZXh0Lm9uQnVpbGQpO1xuXG4gIGtuZXhCdWlsZGVyID0gYnVpbGRlci5idWlsZEludG8oa25leEJ1aWxkZXIpO1xuXG4gIGlmICghYnVpbGRlci5oYXMoUXVlcnlCdWlsZGVyQmFzZS5Gcm9tUmVnZXgpKSB7XG4gICAgY29uc3QgdGFibGUgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKS50YWJsZU5hbWU7XG5cbiAgICAvLyBTZXQgdGhlIHRhYmxlIG9ubHkgaWYgaXQgaGFzbid0IGJlZW4gZXhwbGljaXRseSBzZXQgeWV0LlxuICAgIGtuZXhCdWlsZGVyLnRhYmxlKHRhYmxlKTtcblxuICAgIGlmICghYnVpbGRlci5oYXMoUXVlcnlCdWlsZGVyQmFzZS5TZWxlY3RSZWdleCkpIHtcbiAgICAgIGtuZXhCdWlsZGVyLnNlbGVjdChgJHt0YWJsZX0uKmApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBrbmV4QnVpbGRlcjtcbn1cblxuZnVuY3Rpb24gY2hhaW5Ib29rcyhwcm9taXNlLCBmdW5jKSB7XG4gIGlmIChfLmlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiBmdW5jLmNhbGwodGhpcy5idWlsZGVyLCByZXN1bHQsIHRoaXMuYnVpbGRlcik7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShmdW5jKSkge1xuICAgIGZ1bmMuZm9yRWFjaChmdW5jID0+IHtcbiAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gZnVuYy5jYWxsKHRoaXMuYnVpbGRlciwgcmVzdWx0LCB0aGlzLmJ1aWxkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZnVuY3Rpb24gY2FsbE9uQnVpbGRIb29rcyhidWlsZGVyLCBmdW5jKSB7XG4gIGlmIChfLmlzRnVuY3Rpb24oZnVuYykpIHtcbiAgICBmdW5jLmNhbGwoYnVpbGRlciwgYnVpbGRlcik7XG4gIH0gZWxzZSBpZiAoXy5pc0FycmF5KGZ1bmMpKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBmdW5jLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgZnVuY1tpXS5jYWxsKGJ1aWxkZXIsIGJ1aWxkZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVIb29rQ2FsbGVyKGhvb2spIHtcbiAgY29uc3QgaGFzTWV0aG9kID0gJ2hhcycgKyBfLnVwcGVyRmlyc3QoaG9vayk7XG5cbiAgLy8gQ29tcGlsZSB0aGUgY2FsbGVyIGZ1bmN0aW9uIGZvciAobWVhc3VyZWQpIHBlcmZvcm1hbmNlIGJvb3N0LlxuICBjb25zdCBjYWxsZXIgPSBuZXcgRnVuY3Rpb24oJ3Byb21pc2UnLCAnb3AnLCBgXG4gICAgaWYgKG9wLiR7aGFzTWV0aG9kfSgpKSB7XG4gICAgICByZXR1cm4gcHJvbWlzZS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG9wLiR7aG9va30odGhpcy5idWlsZGVyLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgYCk7XG5cbiAgcmV0dXJuIChwcm9taXNlLCBvcGVyYXRpb25zKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvcGVyYXRpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgcHJvbWlzZSA9IGNhbGxlcihwcm9taXNlLCBvcGVyYXRpb25zW2ldKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT3BlcmF0aW9uRmFjdG9yeShPcGVyYXRpb25DbGFzcywgbmFtZSwgb3B0aW9ucykge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgT3BlcmF0aW9uQ2xhc3MobmFtZSwgb3B0aW9ucyk7XG4gIH07XG59XG5cbmNvbnN0IGNoYWluQmVmb3JlT3BlcmF0aW9ucyA9IGNyZWF0ZUhvb2tDYWxsZXIoJ29uQmVmb3JlJyk7XG5jb25zdCBjaGFpbkJlZm9yZUludGVybmFsT3BlcmF0aW9ucyA9IGNyZWF0ZUhvb2tDYWxsZXIoJ29uQmVmb3JlSW50ZXJuYWwnKTtcbmNvbnN0IGNoYWluUmF3UmVzdWx0T3BlcmF0aW9ucyA9IGNyZWF0ZUhvb2tDYWxsZXIoJ29uUmF3UmVzdWx0Jyk7XG5jb25zdCBjaGFpbkFmdGVyUXVlcnlPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25BZnRlclF1ZXJ5Jyk7XG5jb25zdCBjaGFpbkFmdGVySW50ZXJuYWxPcGVyYXRpb25zID0gY3JlYXRlSG9va0NhbGxlcignb25BZnRlckludGVybmFsJyk7XG5jb25zdCBjaGFpbkFmdGVyT3BlcmF0aW9ucyA9IGNyZWF0ZUhvb2tDYWxsZXIoJ29uQWZ0ZXInKTtcblxuY29uc3QgZmluZE9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KEZpbmRPcGVyYXRpb24sICdmaW5kJyk7XG5jb25zdCBpbnNlcnRPcGVyYXRpb25GYWN0b3J5ID0gY3JlYXRlT3BlcmF0aW9uRmFjdG9yeShJbnNlcnRPcGVyYXRpb24sICdpbnNlcnQnKTtcbmNvbnN0IHVwZGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KFVwZGF0ZU9wZXJhdGlvbiwgJ3VwZGF0ZScpO1xuY29uc3QgcGF0Y2hPcGVyYXRpb25GYWN0b3J5ID0gY3JlYXRlT3BlcmF0aW9uRmFjdG9yeShVcGRhdGVPcGVyYXRpb24sICdwYXRjaCcsIHttb2RlbE9wdGlvbnM6IHtwYXRjaDogdHJ1ZX19KTtcbmNvbnN0IHJlbGF0ZU9wZXJhdGlvbkZhY3RvcnkgPSBjcmVhdGVPcGVyYXRpb25GYWN0b3J5KFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiwgJ3JlbGF0ZScpO1xuY29uc3QgdW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5ID0gY3JlYXRlT3BlcmF0aW9uRmFjdG9yeShRdWVyeUJ1aWxkZXJPcGVyYXRpb24sICd1bnJlbGF0ZScpO1xuY29uc3QgZGVsZXRlT3BlcmF0aW9uRmFjdG9yeSA9IGNyZWF0ZU9wZXJhdGlvbkZhY3RvcnkoRGVsZXRlT3BlcmF0aW9uLCAnZGVsZXRlJyk7XG4iXX0=
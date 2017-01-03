'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _desc, _value, _class;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _memoize = require('../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _classUtils = require('../utils/classUtils');

var _hiddenData = require('../utils/hiddenData');

var _QueryBuilder = require('../queryBuilder/QueryBuilder');

var _QueryBuilder2 = _interopRequireDefault(_QueryBuilder);

var _RelationFindOperation = require('./RelationFindOperation');

var _RelationFindOperation2 = _interopRequireDefault(_RelationFindOperation);

var _RelationUpdateOperation = require('./RelationUpdateOperation');

var _RelationUpdateOperation2 = _interopRequireDefault(_RelationUpdateOperation);

var _RelationDeleteOperation = require('./RelationDeleteOperation');

var _RelationDeleteOperation2 = _interopRequireDefault(_RelationDeleteOperation);

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
 * @typedef {Object} RelationJoin

 * @property {string|Array.<string>} from
 * @property {string|Array.<string>} to
 * @property {Object} through
 * @property {Constructor.<Model>} through.modelClass
 * @property {string|Array.<string>} through.from
 * @property {string|Array.<string>} through.to
 * @property {Array.<string>} through.extra
 */

/**
 * @typedef {Object} RelationMapping
 *
 * @property {Constructor.<Model>|string} modelClass
 * @property {Relation} relation
 * @property {Object|function(QueryBuilder)} modify
 * @property {Object|function(QueryBuilder)} filter
 * @property {RelationJoin} [join]
 */

/**
 * @abstract
 */
var Relation = (_class = function () {
  function Relation(relationName, OwnerClass) {
    (0, _classCallCheck3.default)(this, Relation);

    /**
     * @type {string}
     */
    this.name = relationName;

    /**
     * @type {Constructor.<Model>}
     */
    this.ownerModelClass = OwnerClass;

    /**
     * @type {Constructor.<Model>}
     */
    this.relatedModelClass = null;

    /**
     * @type {Constructor.<Model>}
     */
    this._joinTableModelClass = null;

    /**
     * @type {Array.<string>}
     */
    this.ownerCol = null;

    /**
     * @type {Array.<string>}
     */
    this.ownerProp = null;

    /**
     * @type {Array.<string>}
     */
    this.relatedCol = null;

    /**
     * @type {Array.<string>}
     */
    this.relatedProp = null;

    /**
     * @type {string}
     */
    this.joinTable = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableOwnerCol = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableOwnerProp = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableRelatedCol = null;

    /**
     * @type {Array.<string>}
     */
    this.joinTableRelatedProp = null;

    /**
     * @type {Array.<{joinTableCol: string, joinTableProp: string, aliasCol: string, aliasProp: string}>}
     */
    this.joinTableExtras = [];

    /**
     * @type {function (QueryBuilder)}
     */
    this.modify = null;

    (0, _hiddenData.init)(this);
  }

  /**
   * @param {function=} subclassConstructor
   * @return {Constructor.<Model>}
   */


  Relation.extend = function extend(subclassConstructor) {
    (0, _classUtils.inherits)(subclassConstructor, this);
    return subclassConstructor;
  };

  /**
   * @param {RelationMapping} mapping
   */


  Relation.prototype.setMapping = function setMapping(mapping) {
    // Avoid require loop and import here.
    var Model = require(__dirname + '/../model/Model').default;

    if (!(0, _classUtils.isSubclassOf)(this.ownerModelClass, Model)) {
      this.throwError('Relation\'s owner is not a subclass of Model');
    }

    if (!mapping.modelClass) {
      this.throwError('modelClass is not defined');
    }

    this.relatedModelClass = this.resolveModel(Model, mapping.modelClass, 'modelClass');

    if (!mapping.relation) {
      this.throwError('relation is not defined');
    }

    if (!(0, _classUtils.isSubclassOf)(mapping.relation, Relation)) {
      this.throwError('relation is not a subclass of Relation');
    }

    if (!mapping.join || !mapping.join.from || !mapping.join.to) {
      this.throwError('join must be an object that maps the columns of the related models together. For example: {from: "SomeTable.id", to: "SomeOtherTable.someModelId"}');
    }

    var joinOwner = null;
    var joinRelated = null;

    var joinFrom = this.parseReference(mapping.join.from);
    var joinTo = this.parseReference(mapping.join.to);

    if (!joinFrom.table || _lodash2.default.isEmpty(joinFrom.columns)) {
      this.throwError('join.from must have format TableName.columnName. For example "SomeTable.id" or in case of composite key ["SomeTable.a", "SomeTable.b"].');
    }

    if (!joinTo.table || _lodash2.default.isEmpty(joinTo.columns)) {
      this.throwError('join.to must have format TableName.columnName. For example "SomeTable.id" or in case of composite key ["SomeTable.a", "SomeTable.b"].');
    }

    if (joinFrom.table === this.ownerModelClass.tableName) {
      joinOwner = joinFrom;
      joinRelated = joinTo;
    } else if (joinTo.table === this.ownerModelClass.tableName) {
      joinOwner = joinTo;
      joinRelated = joinFrom;
    } else {
      this.throwError('join: either `from` or `to` must point to the owner model table.');
    }

    if (joinRelated.table !== this.relatedModelClass.tableName) {
      this.throwError('join: either `from` or `to` must point to the related model table.');
    }

    this.ownerCol = joinOwner.columns;
    this.ownerProp = this.propertyName(this.ownerCol, this.ownerModelClass);
    this.relatedCol = joinRelated.columns;
    this.relatedProp = this.propertyName(this.relatedCol, this.relatedModelClass);
    this.modify = this.parseModify(mapping);
  };

  /**
   * @return {boolean}
   */


  Relation.prototype.isOneToOne = function isOneToOne() {
    return false;
  };

  /**
   * @type {Constructor.<Model>}
   */


  Relation.prototype.joinTableModelClass = function joinTableModelClass(knex) {
    if (knex && knex !== this._joinTableModelClass.knex()) {
      return this._joinTableModelClass.bindKnex(knex);
    } else {
      return this._joinTableModelClass;
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Relation.prototype.fullRelatedCol = function fullRelatedCol() {
    var _this = this;

    return this.relatedCol.map(function (col) {
      return _this.relatedModelClass.tableName + '.' + col;
    });
  };

  /**
   * @returns {string}
   */


  Relation.prototype.relatedTableAlias = function relatedTableAlias() {
    return this.relatedModelClass.tableName + '_rel_' + this.name;
  };

  /**
   * @returns {Relation}
   */


  Relation.prototype.clone = function clone() {
    var relation = new this.constructor(this.name, this.ownerModelClass);

    relation.relatedModelClass = this.relatedModelClass;
    relation.ownerCol = this.ownerCol;
    relation.ownerProp = this.ownerProp;
    relation.relatedCol = this.relatedCol;
    relation.relatedProp = this.relatedProp;
    relation.modify = this.modify;

    relation._joinTableModelClass = this._joinTableModelClass;
    relation.joinTable = this.joinTable;
    relation.joinTableOwnerCol = this.joinTableOwnerCol;
    relation.joinTableOwnerProp = this.joinTableOwnerProp;
    relation.joinTableRelatedCol = this.joinTableRelatedCol;
    relation.joinTableRelatedProp = this.joinTableRelatedProp;
    relation.joinTableExtras = this.joinTableExtras;

    (0, _hiddenData.copyHiddenData)(this, relation);

    return relation;
  };

  /**
   * @param {knex} knex
   * @returns {Relation}
   */


  Relation.prototype.bindKnex = function bindKnex(knex) {
    var bound = this.clone();

    bound.relatedModelClass = this.relatedModelClass.bindKnex(knex);
    bound.ownerModelClass = this.ownerModelClass.bindKnex(knex);

    return bound;
  };

  /**
   * @param {QueryBuilder} builder
   * @param {object} opt
   * @param {Array.<string>|Array.<Array.<(string|number)>>} opt.ownerIds
   * @param {boolean=} opt.isColumnRef
   * @returns {QueryBuilder}
   */


  Relation.prototype.findQuery = function findQuery(builder, opt) {
    var fullRelatedCol = this.fullRelatedCol();

    if (opt.isColumnRef) {
      for (var i = 0, l = fullRelatedCol.length; i < l; ++i) {
        builder.whereRef(fullRelatedCol[i], opt.ownerIds[i]);
      }
    } else {
      if (containsNonNull(opt.ownerIds)) {
        builder.whereInComposite(fullRelatedCol, opt.ownerIds);
      } else {
        builder.resolve([]);
      }
    }

    return builder.modify(this.modify);
  };

  /**
   * @param {QueryBuilder} builder
   * @param {object=} opt
   * @returns {QueryBuilder}
   */


  Relation.prototype.join = function join(builder, opt) {
    opt = opt || {};

    opt.joinOperation = opt.joinOperation || 'join';
    opt.relatedTableAlias = opt.relatedTableAlias || this.relatedTableAlias();
    opt.relatedJoinSelectQuery = opt.relatedJoinSelectQuery || this.relatedModelClass.query().childQueryOf(builder);
    opt.relatedTable = opt.relatedTable || this.relatedModelClass.tableName;
    opt.ownerTable = opt.ownerTable || this.ownerModelClass.tableName;

    var relatedCol = this.relatedCol.map(function (col) {
      return opt.relatedTableAlias + '.' + col;
    });
    var ownerCol = this.ownerCol.map(function (col) {
      return opt.ownerTable + '.' + col;
    });

    var relatedSelect = opt.relatedJoinSelectQuery.modify(this.modify).as(opt.relatedTableAlias);

    if (relatedSelect.isSelectAll()) {
      // No need to join a subquery if the query is `select * from "RelatedTable"`.
      relatedSelect = this.relatedModelClass.tableName + ' as ' + opt.relatedTableAlias;
    }

    return builder[opt.joinOperation](relatedSelect, function (join) {
      for (var i = 0, l = relatedCol.length; i < l; ++i) {
        join.on(relatedCol[i], '=', ownerCol[i]);
      }
    });
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.insert = function insert(builder, owner) {
    this.throwError('not implemented');
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.update = function update(builder, owner) {
    return new _RelationUpdateOperation2.default('update', {
      relation: this,
      owner: owner
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.patch = function patch(builder, owner) {
    return new _RelationUpdateOperation2.default('patch', {
      relation: this,
      owner: owner,
      modelOptions: { patch: true }
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Array.<Model>} owners
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.find = function find(builder, owners) {
    return new _RelationFindOperation2.default('find', {
      relation: this,
      owners: owners
    });
  };

  /**
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.delete = function _delete(builder, owner) {
    return new _RelationDeleteOperation2.default('delete', {
      relation: this,
      owner: owner
    });
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.relate = function relate(builder, owner) {
    this.throwError('not implemented');
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @param {QueryBuilder} builder
   * @param {Model} owner
   * @returns {QueryBuilderOperation}
   */


  Relation.prototype.unrelate = function unrelate(builder, owner) {
    this.throwError('not implemented');
  };

  /* istanbul ignore next */
  /**
   * @abstract
   * @protected
   */


  Relation.prototype.createRelationProp = function createRelationProp(owners, related) {
    this.throwError('not implemented');
  };

  /**
   * @protected
   */


  Relation.prototype.propertyName = function propertyName(columns, modelClass) {
    var _this2 = this;

    return columns.map(function (column) {
      var propertyName = modelClass.columnNameToPropertyName(column);

      if (!propertyName) {
        throw new Error(modelClass.name + '.$parseDatabaseJson probably transforms the value of the column ' + column + '.' + ' This is a no-no because ' + column + ' is needed in the relation ' + _this2.ownerModelClass.tableName + '.' + _this2.name);
      }

      return propertyName;
    });
  };

  /**
   * @protected
   */


  Relation.prototype.parseModify = function parseModify(mapping) {
    var modify = mapping.modify || mapping.filter;

    if (_lodash2.default.isFunction(modify)) {
      return modify;
    } else if (_lodash2.default.isObject(modify)) {
      return function (queryBuilder) {
        queryBuilder.where(modify);
      };
    } else {
      return _lodash2.default.noop;
    }
  };

  /**
   * @protected
   */


  Relation.prototype.parseReference = function parseReference(ref) {
    if (!_lodash2.default.isArray(ref)) {
      ref = [ref];
    }

    var table = null;
    var columns = [];

    for (var i = 0; i < ref.length; ++i) {
      var refItem = ref[i];
      var ndx = refItem.lastIndexOf('.');

      var tableName = refItem.substr(0, ndx).trim();
      var columnName = refItem.substr(ndx + 1, refItem.length).trim();

      if (!tableName || table && table !== tableName || !columnName) {
        return {
          table: null,
          columns: []
        };
      } else {
        table = tableName;
      }

      columns.push(columnName);
    }

    return {
      table: table,
      columns: columns
    };
  };

  /**
   * @protected
   */


  Relation.prototype.mergeModels = function mergeModels(models1, models2) {
    var modelClass = void 0;

    models1 = _lodash2.default.compact(models1);
    models2 = _lodash2.default.compact(models2);

    if (_lodash2.default.isEmpty(models1) && _lodash2.default.isEmpty(models2)) {
      return [];
    }

    if (!_lodash2.default.isEmpty(models1)) {
      modelClass = models1[0].constructor;
    } else {
      modelClass = models2[0].constructor;
    }

    var idProperty = modelClass.getIdPropertyArray();
    var modelsById = (0, _create2.default)(null);

    for (var i = 0, l = models1.length; i < l; ++i) {
      var model = models1[i];
      var key = model.$propKey(idProperty);

      modelsById[key] = model;
    }

    for (var _i = 0, _l = models2.length; _i < _l; ++_i) {
      var _model = models2[_i];
      var _key = _model.$propKey(idProperty);

      modelsById[_key] = _model;
    }

    return _lodash2.default.sortBy(_lodash2.default.values(modelsById), idProperty);
  };

  /**
   * @protected
   */


  Relation.prototype.resolveModel = function resolveModel(Model, modelClass, logPrefix) {
    var _this3 = this;

    var requireModel = function requireModel(path) {
      var ModelClass = void 0;

      try {
        // babel 6 style of exposing es6 exports to commonjs https://github.com/babel/babel/issues/2683
        var module = require(path);

        ModelClass = (0, _classUtils.isSubclassOf)(module.default, Model) ? module.default : module;
      } catch (err) {
        return null;
      }

      if (!(0, _classUtils.isSubclassOf)(ModelClass, Model)) {
        return null;
      }

      return ModelClass;
    };

    if (_lodash2.default.isString(modelClass)) {
      var _ret = function () {
        var ModelClass = null;

        if (isAbsolutePath(modelClass)) {
          ModelClass = requireModel(modelClass);
        } else {
          // If the path is not a absolute, try the modelPaths of the owner model class.
          _lodash2.default.each(_this3.ownerModelClass.modelPaths, function (modelPath) {
            ModelClass = requireModel(_path2.default.join(modelPath, modelClass));

            if ((0, _classUtils.isSubclassOf)(ModelClass, Model)) {
              // Break the loop.
              return false;
            }
          });
        }

        if (!(0, _classUtils.isSubclassOf)(ModelClass, Model)) {
          _this3.throwError(logPrefix + ': ' + modelClass + ' is an invalid file path to a model class');
        }

        return {
          v: ModelClass
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    } else {
      if (!(0, _classUtils.isSubclassOf)(modelClass, Model)) {
        this.throwError(logPrefix + ' is not a subclass of Model or a file path to a module that exports one.');
      }

      return modelClass;
    }
  };

  /**
   * @protected
   */


  Relation.prototype.throwError = function throwError(message) {
    if (this.ownerModelClass && this.ownerModelClass.name && this.name) {
      throw new Error(this.ownerModelClass.name + '.relationMappings.' + this.name + ': ' + message);
    } else {
      throw new Error(this.constructor.name + ': ' + message);
    }
  };

  return Relation;
}(), (_applyDecoratedDescriptor(_class.prototype, 'fullRelatedCol', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'fullRelatedCol'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'relatedTableAlias', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class.prototype, 'relatedTableAlias'), _class.prototype)), _class);
exports.default = Relation;


function isAbsolutePath(pth) {
  return _path2.default.normalize(pth + '/') === _path2.default.normalize(_path2.default.resolve(pth) + '/');
}

function containsNonNull(arr) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    var val = arr[i];

    if (Array.isArray(val) && containsNonNull(val)) {
      return true;
    } else if (val !== null && val !== undefined) {
      return true;
    }
  }

  return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIlJlbGF0aW9uIiwicmVsYXRpb25OYW1lIiwiT3duZXJDbGFzcyIsIm5hbWUiLCJvd25lck1vZGVsQ2xhc3MiLCJyZWxhdGVkTW9kZWxDbGFzcyIsIl9qb2luVGFibGVNb2RlbENsYXNzIiwib3duZXJDb2wiLCJvd25lclByb3AiLCJyZWxhdGVkQ29sIiwicmVsYXRlZFByb3AiLCJqb2luVGFibGUiLCJqb2luVGFibGVPd25lckNvbCIsImpvaW5UYWJsZU93bmVyUHJvcCIsImpvaW5UYWJsZVJlbGF0ZWRDb2wiLCJqb2luVGFibGVSZWxhdGVkUHJvcCIsImpvaW5UYWJsZUV4dHJhcyIsIm1vZGlmeSIsImV4dGVuZCIsInN1YmNsYXNzQ29uc3RydWN0b3IiLCJzZXRNYXBwaW5nIiwibWFwcGluZyIsIk1vZGVsIiwicmVxdWlyZSIsIl9fZGlybmFtZSIsImRlZmF1bHQiLCJ0aHJvd0Vycm9yIiwibW9kZWxDbGFzcyIsInJlc29sdmVNb2RlbCIsInJlbGF0aW9uIiwiam9pbiIsImZyb20iLCJ0byIsImpvaW5Pd25lciIsImpvaW5SZWxhdGVkIiwiam9pbkZyb20iLCJwYXJzZVJlZmVyZW5jZSIsImpvaW5UbyIsInRhYmxlIiwiaXNFbXB0eSIsImNvbHVtbnMiLCJ0YWJsZU5hbWUiLCJwcm9wZXJ0eU5hbWUiLCJwYXJzZU1vZGlmeSIsImlzT25lVG9PbmUiLCJqb2luVGFibGVNb2RlbENsYXNzIiwia25leCIsImJpbmRLbmV4IiwiZnVsbFJlbGF0ZWRDb2wiLCJtYXAiLCJjb2wiLCJyZWxhdGVkVGFibGVBbGlhcyIsImNsb25lIiwiY29uc3RydWN0b3IiLCJib3VuZCIsImZpbmRRdWVyeSIsImJ1aWxkZXIiLCJvcHQiLCJpc0NvbHVtblJlZiIsImkiLCJsIiwibGVuZ3RoIiwid2hlcmVSZWYiLCJvd25lcklkcyIsImNvbnRhaW5zTm9uTnVsbCIsIndoZXJlSW5Db21wb3NpdGUiLCJyZXNvbHZlIiwiam9pbk9wZXJhdGlvbiIsInJlbGF0ZWRKb2luU2VsZWN0UXVlcnkiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsInJlbGF0ZWRUYWJsZSIsIm93bmVyVGFibGUiLCJyZWxhdGVkU2VsZWN0IiwiYXMiLCJpc1NlbGVjdEFsbCIsIm9uIiwiaW5zZXJ0Iiwib3duZXIiLCJ1cGRhdGUiLCJwYXRjaCIsIm1vZGVsT3B0aW9ucyIsImZpbmQiLCJvd25lcnMiLCJkZWxldGUiLCJyZWxhdGUiLCJ1bnJlbGF0ZSIsImNyZWF0ZVJlbGF0aW9uUHJvcCIsInJlbGF0ZWQiLCJjb2x1bW5OYW1lVG9Qcm9wZXJ0eU5hbWUiLCJjb2x1bW4iLCJFcnJvciIsImZpbHRlciIsImlzRnVuY3Rpb24iLCJpc09iamVjdCIsInF1ZXJ5QnVpbGRlciIsIndoZXJlIiwibm9vcCIsInJlZiIsImlzQXJyYXkiLCJyZWZJdGVtIiwibmR4IiwibGFzdEluZGV4T2YiLCJzdWJzdHIiLCJ0cmltIiwiY29sdW1uTmFtZSIsInB1c2giLCJtZXJnZU1vZGVscyIsIm1vZGVsczEiLCJtb2RlbHMyIiwiY29tcGFjdCIsImlkUHJvcGVydHkiLCJnZXRJZFByb3BlcnR5QXJyYXkiLCJtb2RlbHNCeUlkIiwibW9kZWwiLCJrZXkiLCIkcHJvcEtleSIsInNvcnRCeSIsInZhbHVlcyIsImxvZ1ByZWZpeCIsInJlcXVpcmVNb2RlbCIsInBhdGgiLCJNb2RlbENsYXNzIiwibW9kdWxlIiwiZXJyIiwiaXNTdHJpbmciLCJpc0Fic29sdXRlUGF0aCIsImVhY2giLCJtb2RlbFBhdGhzIiwibW9kZWxQYXRoIiwibWVzc2FnZSIsInB0aCIsIm5vcm1hbGl6ZSIsImFyciIsInZhbCIsIkFycmF5IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7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O0FBQ2xFLFlBQU0sSUFBSXdGLEtBQUosQ0FBYSxLQUFLdkYsZUFBTCxDQUFxQkQsSUFBbEMsMEJBQTJELEtBQUtBLElBQWhFLFVBQXlFK0gsT0FBekUsQ0FBTjtBQUNELEtBRkQsTUFFTztBQUNMLFlBQU0sSUFBSXZDLEtBQUosQ0FBYSxLQUFLdEMsV0FBTCxDQUFpQmxELElBQTlCLFVBQXVDK0gsT0FBdkMsQ0FBTjtBQUNEO0FBQ0YsRzs7OztrQkF4aUJrQmxJLFE7OztBQTJpQnJCLFNBQVM4SCxjQUFULENBQXdCSyxHQUF4QixFQUE2QjtBQUMzQixTQUFPLGVBQUtDLFNBQUwsQ0FBZUQsTUFBTSxHQUFyQixNQUE4QixlQUFLQyxTQUFMLENBQWUsZUFBS2xFLE9BQUwsQ0FBYWlFLEdBQWIsSUFBb0IsR0FBbkMsQ0FBckM7QUFDRDs7QUFFRCxTQUFTbkUsZUFBVCxDQUF5QnFFLEdBQXpCLEVBQThCO0FBQzVCLE9BQUssSUFBSTFFLElBQUksQ0FBUixFQUFXQyxJQUFJeUUsSUFBSXhFLE1BQXhCLEVBQWdDRixJQUFJQyxDQUFwQyxFQUF1QyxFQUFFRCxDQUF6QyxFQUE0QztBQUMxQyxRQUFNMkUsTUFBTUQsSUFBSTFFLENBQUosQ0FBWjs7QUFFQSxRQUFJNEUsTUFBTXBDLE9BQU4sQ0FBY21DLEdBQWQsS0FBc0J0RSxnQkFBZ0JzRSxHQUFoQixDQUExQixFQUFnRDtBQUM5QyxhQUFPLElBQVA7QUFDRCxLQUZELE1BRU8sSUFBSUEsUUFBUSxJQUFSLElBQWdCQSxRQUFRRSxTQUE1QixFQUF1QztBQUM1QyxhQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6IlJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1lbW9pemUgZnJvbSAnLi4vdXRpbHMvZGVjb3JhdG9ycy9tZW1vaXplJztcbmltcG9ydCB7aW5oZXJpdHMsIGlzU3ViY2xhc3NPZn0gZnJvbSAnLi4vdXRpbHMvY2xhc3NVdGlscyc7XG5pbXBvcnQge2luaXQsIGNvcHlIaWRkZW5EYXRhfSBmcm9tICcuLi91dGlscy9oaWRkZW5EYXRhJztcbmltcG9ydCBRdWVyeUJ1aWxkZXIgZnJvbSAnLi4vcXVlcnlCdWlsZGVyL1F1ZXJ5QnVpbGRlcic7XG5cbmltcG9ydCBSZWxhdGlvbkZpbmRPcGVyYXRpb24gZnJvbSAnLi9SZWxhdGlvbkZpbmRPcGVyYXRpb24nO1xuaW1wb3J0IFJlbGF0aW9uVXBkYXRlT3BlcmF0aW9uIGZyb20gJy4vUmVsYXRpb25VcGRhdGVPcGVyYXRpb24nO1xuaW1wb3J0IFJlbGF0aW9uRGVsZXRlT3BlcmF0aW9uIGZyb20gJy4vUmVsYXRpb25EZWxldGVPcGVyYXRpb24nO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFJlbGF0aW9uSm9pblxuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xBcnJheS48c3RyaW5nPn0gZnJvbVxuICogQHByb3BlcnR5IHtzdHJpbmd8QXJyYXkuPHN0cmluZz59IHRvXG4gKiBAcHJvcGVydHkge09iamVjdH0gdGhyb3VnaFxuICogQHByb3BlcnR5IHtDb25zdHJ1Y3Rvci48TW9kZWw+fSB0aHJvdWdoLm1vZGVsQ2xhc3NcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSB0aHJvdWdoLmZyb21cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fSB0aHJvdWdoLnRvXG4gKiBAcHJvcGVydHkge0FycmF5LjxzdHJpbmc+fSB0aHJvdWdoLmV4dHJhXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBSZWxhdGlvbk1hcHBpbmdcbiAqXG4gKiBAcHJvcGVydHkge0NvbnN0cnVjdG9yLjxNb2RlbD58c3RyaW5nfSBtb2RlbENsYXNzXG4gKiBAcHJvcGVydHkge1JlbGF0aW9ufSByZWxhdGlvblxuICogQHByb3BlcnR5IHtPYmplY3R8ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKX0gbW9kaWZ5XG4gKiBAcHJvcGVydHkge09iamVjdHxmdW5jdGlvbihRdWVyeUJ1aWxkZXIpfSBmaWx0ZXJcbiAqIEBwcm9wZXJ0eSB7UmVsYXRpb25Kb2lufSBbam9pbl1cbiAqL1xuXG4vKipcbiAqIEBhYnN0cmFjdFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IocmVsYXRpb25OYW1lLCBPd25lckNsYXNzKSB7XG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLm5hbWUgPSByZWxhdGlvbk5hbWU7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLm93bmVyTW9kZWxDbGFzcyA9IE93bmVyQ2xhc3M7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgICAqL1xuICAgIHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3MgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMub3duZXJDb2wgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMub3duZXJQcm9wID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn1cbiAgICAgKi9cbiAgICB0aGlzLnJlbGF0ZWRDb2wgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMucmVsYXRlZFByb3AgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICB0aGlzLmpvaW5UYWJsZSA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5qb2luVGFibGVPd25lckNvbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5qb2luVGFibGVPd25lclByb3AgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgICAqL1xuICAgIHRoaXMuam9pblRhYmxlUmVsYXRlZENvbCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHN0cmluZz59XG4gICAgICovXG4gICAgdGhpcy5qb2luVGFibGVSZWxhdGVkUHJvcCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPHtqb2luVGFibGVDb2w6IHN0cmluZywgam9pblRhYmxlUHJvcDogc3RyaW5nLCBhbGlhc0NvbDogc3RyaW5nLCBhbGlhc1Byb3A6IHN0cmluZ30+fVxuICAgICAqL1xuICAgIHRoaXMuam9pblRhYmxlRXh0cmFzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb24gKFF1ZXJ5QnVpbGRlcil9XG4gICAgICovXG4gICAgdGhpcy5tb2RpZnkgPSBudWxsO1xuXG4gICAgaW5pdCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uPX0gc3ViY2xhc3NDb25zdHJ1Y3RvclxuICAgKiBAcmV0dXJuIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgKi9cbiAgc3RhdGljIGV4dGVuZChzdWJjbGFzc0NvbnN0cnVjdG9yKSB7XG4gICAgaW5oZXJpdHMoc3ViY2xhc3NDb25zdHJ1Y3RvciwgdGhpcyk7XG4gICAgcmV0dXJuIHN1YmNsYXNzQ29uc3RydWN0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtSZWxhdGlvbk1hcHBpbmd9IG1hcHBpbmdcbiAgICovXG4gIHNldE1hcHBpbmcobWFwcGluZykge1xuICAgIC8vIEF2b2lkIHJlcXVpcmUgbG9vcCBhbmQgaW1wb3J0IGhlcmUuXG4gICAgbGV0IE1vZGVsID0gcmVxdWlyZShfX2Rpcm5hbWUgKyAnLy4uL21vZGVsL01vZGVsJykuZGVmYXVsdDtcblxuICAgIGlmICghaXNTdWJjbGFzc09mKHRoaXMub3duZXJNb2RlbENsYXNzLCBNb2RlbCkpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignUmVsYXRpb25cXCdzIG93bmVyIGlzIG5vdCBhIHN1YmNsYXNzIG9mIE1vZGVsJyk7XG4gICAgfVxuXG4gICAgaWYgKCFtYXBwaW5nLm1vZGVsQ2xhc3MpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignbW9kZWxDbGFzcyBpcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MgPSB0aGlzLnJlc29sdmVNb2RlbChNb2RlbCwgbWFwcGluZy5tb2RlbENsYXNzLCAnbW9kZWxDbGFzcycpO1xuXG4gICAgaWYgKCFtYXBwaW5nLnJlbGF0aW9uKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ3JlbGF0aW9uIGlzIG5vdCBkZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1N1YmNsYXNzT2YobWFwcGluZy5yZWxhdGlvbiwgUmVsYXRpb24pKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ3JlbGF0aW9uIGlzIG5vdCBhIHN1YmNsYXNzIG9mIFJlbGF0aW9uJyk7XG4gICAgfVxuXG4gICAgaWYgKCFtYXBwaW5nLmpvaW4gfHwgIW1hcHBpbmcuam9pbi5mcm9tIHx8ICFtYXBwaW5nLmpvaW4udG8pIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcignam9pbiBtdXN0IGJlIGFuIG9iamVjdCB0aGF0IG1hcHMgdGhlIGNvbHVtbnMgb2YgdGhlIHJlbGF0ZWQgbW9kZWxzIHRvZ2V0aGVyLiBGb3IgZXhhbXBsZToge2Zyb206IFwiU29tZVRhYmxlLmlkXCIsIHRvOiBcIlNvbWVPdGhlclRhYmxlLnNvbWVNb2RlbElkXCJ9Jyk7XG4gICAgfVxuXG4gICAgbGV0IGpvaW5Pd25lciA9IG51bGw7XG4gICAgbGV0IGpvaW5SZWxhdGVkID0gbnVsbDtcblxuICAgIGxldCBqb2luRnJvbSA9IHRoaXMucGFyc2VSZWZlcmVuY2UobWFwcGluZy5qb2luLmZyb20pO1xuICAgIGxldCBqb2luVG8gPSB0aGlzLnBhcnNlUmVmZXJlbmNlKG1hcHBpbmcuam9pbi50byk7XG5cbiAgICBpZiAoIWpvaW5Gcm9tLnRhYmxlIHx8IF8uaXNFbXB0eShqb2luRnJvbS5jb2x1bW5zKSkge1xuICAgICAgdGhpcy50aHJvd0Vycm9yKCdqb2luLmZyb20gbXVzdCBoYXZlIGZvcm1hdCBUYWJsZU5hbWUuY29sdW1uTmFtZS4gRm9yIGV4YW1wbGUgXCJTb21lVGFibGUuaWRcIiBvciBpbiBjYXNlIG9mIGNvbXBvc2l0ZSBrZXkgW1wiU29tZVRhYmxlLmFcIiwgXCJTb21lVGFibGUuYlwiXS4nKTtcbiAgICB9XG5cbiAgICBpZiAoIWpvaW5Uby50YWJsZSB8fCBfLmlzRW1wdHkoam9pblRvLmNvbHVtbnMpKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW4udG8gbXVzdCBoYXZlIGZvcm1hdCBUYWJsZU5hbWUuY29sdW1uTmFtZS4gRm9yIGV4YW1wbGUgXCJTb21lVGFibGUuaWRcIiBvciBpbiBjYXNlIG9mIGNvbXBvc2l0ZSBrZXkgW1wiU29tZVRhYmxlLmFcIiwgXCJTb21lVGFibGUuYlwiXS4nKTtcbiAgICB9XG5cbiAgICBpZiAoam9pbkZyb20udGFibGUgPT09IHRoaXMub3duZXJNb2RlbENsYXNzLnRhYmxlTmFtZSkge1xuICAgICAgam9pbk93bmVyID0gam9pbkZyb207XG4gICAgICBqb2luUmVsYXRlZCA9IGpvaW5UbztcbiAgICB9IGVsc2UgaWYgKGpvaW5Uby50YWJsZSA9PT0gdGhpcy5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lKSB7XG4gICAgICBqb2luT3duZXIgPSBqb2luVG87XG4gICAgICBqb2luUmVsYXRlZCA9IGpvaW5Gcm9tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW46IGVpdGhlciBgZnJvbWAgb3IgYHRvYCBtdXN0IHBvaW50IHRvIHRoZSBvd25lciBtb2RlbCB0YWJsZS4nKTtcbiAgICB9XG5cbiAgICBpZiAoam9pblJlbGF0ZWQudGFibGUgIT09IHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3IoJ2pvaW46IGVpdGhlciBgZnJvbWAgb3IgYHRvYCBtdXN0IHBvaW50IHRvIHRoZSByZWxhdGVkIG1vZGVsIHRhYmxlLicpO1xuICAgIH1cblxuICAgIHRoaXMub3duZXJDb2wgPSBqb2luT3duZXIuY29sdW1ucztcbiAgICB0aGlzLm93bmVyUHJvcCA9IHRoaXMucHJvcGVydHlOYW1lKHRoaXMub3duZXJDb2wsIHRoaXMub3duZXJNb2RlbENsYXNzKTtcbiAgICB0aGlzLnJlbGF0ZWRDb2wgPSBqb2luUmVsYXRlZC5jb2x1bW5zO1xuICAgIHRoaXMucmVsYXRlZFByb3AgPSB0aGlzLnByb3BlcnR5TmFtZSh0aGlzLnJlbGF0ZWRDb2wsIHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MpO1xuICAgIHRoaXMubW9kaWZ5ID0gdGhpcy5wYXJzZU1vZGlmeShtYXBwaW5nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cbiAgaXNPbmVUb09uZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0NvbnN0cnVjdG9yLjxNb2RlbD59XG4gICAqL1xuICBqb2luVGFibGVNb2RlbENsYXNzKGtuZXgpIHtcbiAgICBpZiAoa25leCAmJiBrbmV4ICE9PSB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzLmtuZXgoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2pvaW5UYWJsZU1vZGVsQ2xhc3MuYmluZEtuZXgoa25leCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBAbWVtb2l6ZVxuICBmdWxsUmVsYXRlZENvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5yZWxhdGVkQ29sLm1hcChjb2wgPT4gdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnLicgKyBjb2wpO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBAbWVtb2l6ZVxuICByZWxhdGVkVGFibGVBbGlhcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnX3JlbF8nICsgdGhpcy5uYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtSZWxhdGlvbn1cbiAgICovXG4gIGNsb25lKCkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy5uYW1lLCB0aGlzLm93bmVyTW9kZWxDbGFzcyk7XG5cbiAgICByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcyA9IHRoaXMucmVsYXRlZE1vZGVsQ2xhc3M7XG4gICAgcmVsYXRpb24ub3duZXJDb2wgPSB0aGlzLm93bmVyQ29sO1xuICAgIHJlbGF0aW9uLm93bmVyUHJvcCA9IHRoaXMub3duZXJQcm9wO1xuICAgIHJlbGF0aW9uLnJlbGF0ZWRDb2wgPSB0aGlzLnJlbGF0ZWRDb2w7XG4gICAgcmVsYXRpb24ucmVsYXRlZFByb3AgPSB0aGlzLnJlbGF0ZWRQcm9wO1xuICAgIHJlbGF0aW9uLm1vZGlmeSA9IHRoaXMubW9kaWZ5O1xuXG4gICAgcmVsYXRpb24uX2pvaW5UYWJsZU1vZGVsQ2xhc3MgPSB0aGlzLl9qb2luVGFibGVNb2RlbENsYXNzO1xuICAgIHJlbGF0aW9uLmpvaW5UYWJsZSA9IHRoaXMuam9pblRhYmxlO1xuICAgIHJlbGF0aW9uLmpvaW5UYWJsZU93bmVyQ29sID0gdGhpcy5qb2luVGFibGVPd25lckNvbDtcbiAgICByZWxhdGlvbi5qb2luVGFibGVPd25lclByb3AgPSB0aGlzLmpvaW5UYWJsZU93bmVyUHJvcDtcbiAgICByZWxhdGlvbi5qb2luVGFibGVSZWxhdGVkQ29sID0gdGhpcy5qb2luVGFibGVSZWxhdGVkQ29sO1xuICAgIHJlbGF0aW9uLmpvaW5UYWJsZVJlbGF0ZWRQcm9wID0gdGhpcy5qb2luVGFibGVSZWxhdGVkUHJvcDtcbiAgICByZWxhdGlvbi5qb2luVGFibGVFeHRyYXMgPSB0aGlzLmpvaW5UYWJsZUV4dHJhcztcblxuICAgIGNvcHlIaWRkZW5EYXRhKHRoaXMsIHJlbGF0aW9uKTtcblxuICAgIHJldHVybiByZWxhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2tuZXh9IGtuZXhcbiAgICogQHJldHVybnMge1JlbGF0aW9ufVxuICAgKi9cbiAgYmluZEtuZXgoa25leCkge1xuICAgIGNvbnN0IGJvdW5kID0gdGhpcy5jbG9uZSgpO1xuXG4gICAgYm91bmQucmVsYXRlZE1vZGVsQ2xhc3MgPSB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLmJpbmRLbmV4KGtuZXgpO1xuICAgIGJvdW5kLm93bmVyTW9kZWxDbGFzcyA9IHRoaXMub3duZXJNb2RlbENsYXNzLmJpbmRLbmV4KGtuZXgpO1xuXG4gICAgcmV0dXJuIGJvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRcbiAgICogQHBhcmFtIHtBcnJheS48c3RyaW5nPnxBcnJheS48QXJyYXkuPChzdHJpbmd8bnVtYmVyKT4+fSBvcHQub3duZXJJZHNcbiAgICogQHBhcmFtIHtib29sZWFuPX0gb3B0LmlzQ29sdW1uUmVmXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBmaW5kUXVlcnkoYnVpbGRlciwgb3B0KSB7XG4gICAgY29uc3QgZnVsbFJlbGF0ZWRDb2wgPSB0aGlzLmZ1bGxSZWxhdGVkQ29sKCk7XG5cbiAgICBpZiAob3B0LmlzQ29sdW1uUmVmKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGZ1bGxSZWxhdGVkQ29sLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBidWlsZGVyLndoZXJlUmVmKGZ1bGxSZWxhdGVkQ29sW2ldLCBvcHQub3duZXJJZHNbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY29udGFpbnNOb25OdWxsKG9wdC5vd25lcklkcykpIHtcbiAgICAgICAgYnVpbGRlci53aGVyZUluQ29tcG9zaXRlKGZ1bGxSZWxhdGVkQ29sLCBvcHQub3duZXJJZHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVpbGRlci5yZXNvbHZlKFtdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRlci5tb2RpZnkodGhpcy5tb2RpZnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7b2JqZWN0PX0gb3B0XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBqb2luKGJ1aWxkZXIsIG9wdCkge1xuICAgIG9wdCA9IG9wdCB8fCB7fTtcblxuICAgIG9wdC5qb2luT3BlcmF0aW9uID0gb3B0LmpvaW5PcGVyYXRpb24gfHwgJ2pvaW4nO1xuICAgIG9wdC5yZWxhdGVkVGFibGVBbGlhcyA9IG9wdC5yZWxhdGVkVGFibGVBbGlhcyB8fCB0aGlzLnJlbGF0ZWRUYWJsZUFsaWFzKCk7XG4gICAgb3B0LnJlbGF0ZWRKb2luU2VsZWN0UXVlcnkgPSBvcHQucmVsYXRlZEpvaW5TZWxlY3RRdWVyeSB8fCB0aGlzLnJlbGF0ZWRNb2RlbENsYXNzLnF1ZXJ5KCkuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpO1xuICAgIG9wdC5yZWxhdGVkVGFibGUgPSBvcHQucmVsYXRlZFRhYmxlIHx8IHRoaXMucmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lO1xuICAgIG9wdC5vd25lclRhYmxlID0gb3B0Lm93bmVyVGFibGUgfHwgdGhpcy5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lO1xuXG4gICAgY29uc3QgcmVsYXRlZENvbCA9IHRoaXMucmVsYXRlZENvbC5tYXAoY29sID0+IGAke29wdC5yZWxhdGVkVGFibGVBbGlhc30uJHtjb2x9YCk7XG4gICAgY29uc3Qgb3duZXJDb2wgPSB0aGlzLm93bmVyQ29sLm1hcChjb2wgPT4gYCR7b3B0Lm93bmVyVGFibGV9LiR7Y29sfWApO1xuXG4gICAgbGV0IHJlbGF0ZWRTZWxlY3QgPSBvcHQucmVsYXRlZEpvaW5TZWxlY3RRdWVyeVxuICAgICAgLm1vZGlmeSh0aGlzLm1vZGlmeSlcbiAgICAgIC5hcyhvcHQucmVsYXRlZFRhYmxlQWxpYXMpO1xuXG4gICAgaWYgKHJlbGF0ZWRTZWxlY3QuaXNTZWxlY3RBbGwoKSkge1xuICAgICAgLy8gTm8gbmVlZCB0byBqb2luIGEgc3VicXVlcnkgaWYgdGhlIHF1ZXJ5IGlzIGBzZWxlY3QgKiBmcm9tIFwiUmVsYXRlZFRhYmxlXCJgLlxuICAgICAgcmVsYXRlZFNlbGVjdCA9IGAke3RoaXMucmVsYXRlZE1vZGVsQ2xhc3MudGFibGVOYW1lfSBhcyAke29wdC5yZWxhdGVkVGFibGVBbGlhc31gXG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkZXJcbiAgICAgIFtvcHQuam9pbk9wZXJhdGlvbl0ocmVsYXRlZFNlbGVjdCwgam9pbiA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVsYXRlZENvbC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgICBqb2luLm9uKHJlbGF0ZWRDb2xbaV0sICc9Jywgb3duZXJDb2xbaV0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtNb2RlbH0gb3duZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIGluc2VydChidWlsZGVyLCBvd25lcikge1xuICAgIHRoaXMudGhyb3dFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtNb2RlbH0gb3duZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIHVwZGF0ZShidWlsZGVyLCBvd25lcikge1xuICAgIHJldHVybiBuZXcgUmVsYXRpb25VcGRhdGVPcGVyYXRpb24oJ3VwZGF0ZScsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXI6IG93bmVyXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtNb2RlbH0gb3duZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIHBhdGNoKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBSZWxhdGlvblVwZGF0ZU9wZXJhdGlvbigncGF0Y2gnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lcixcbiAgICAgIG1vZGVsT3B0aW9uczoge3BhdGNoOiB0cnVlfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7QXJyYXkuPE1vZGVsPn0gb3duZXJzXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICBmaW5kKGJ1aWxkZXIsIG93bmVycykge1xuICAgIHJldHVybiBuZXcgUmVsYXRpb25GaW5kT3BlcmF0aW9uKCdmaW5kJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcnM6IG93bmVyc1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyfSBidWlsZGVyXG4gICAqIEBwYXJhbSB7TW9kZWx9IG93bmVyXG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJPcGVyYXRpb259XG4gICAqL1xuICBkZWxldGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICByZXR1cm4gbmV3IFJlbGF0aW9uRGVsZXRlT3BlcmF0aW9uKCdkZWxldGUnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLyoqXG4gICAqIEBhYnN0cmFjdFxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICAgKiBAcGFyYW0ge01vZGVsfSBvd25lclxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyT3BlcmF0aW9ufVxuICAgKi9cbiAgcmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgdGhpcy50aHJvd0Vycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHBhcmFtIHtRdWVyeUJ1aWxkZXJ9IGJ1aWxkZXJcbiAgICogQHBhcmFtIHtNb2RlbH0gb3duZXJcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlck9wZXJhdGlvbn1cbiAgICovXG4gIHVucmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgdGhpcy50aHJvd0Vycm9yKCdub3QgaW1wbGVtZW50ZWQnKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8qKlxuICAgKiBAYWJzdHJhY3RcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgY3JlYXRlUmVsYXRpb25Qcm9wKG93bmVycywgcmVsYXRlZCkge1xuICAgIHRoaXMudGhyb3dFcnJvcignbm90IGltcGxlbWVudGVkJyk7XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcHJvcGVydHlOYW1lKGNvbHVtbnMsIG1vZGVsQ2xhc3MpIHtcbiAgICByZXR1cm4gY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgIGxldCBwcm9wZXJ0eU5hbWUgPSBtb2RlbENsYXNzLmNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZShjb2x1bW4pO1xuXG4gICAgICBpZiAoIXByb3BlcnR5TmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobW9kZWxDbGFzcy5uYW1lICtcbiAgICAgICAgICAnLiRwYXJzZURhdGFiYXNlSnNvbiBwcm9iYWJseSB0cmFuc2Zvcm1zIHRoZSB2YWx1ZSBvZiB0aGUgY29sdW1uICcgKyBjb2x1bW4gKyAnLicgK1xuICAgICAgICAgICcgVGhpcyBpcyBhIG5vLW5vIGJlY2F1c2UgJyArIGNvbHVtbiArXG4gICAgICAgICAgJyBpcyBuZWVkZWQgaW4gdGhlIHJlbGF0aW9uICcgKyB0aGlzLm93bmVyTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnLicgKyB0aGlzLm5hbWUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvcGVydHlOYW1lO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHBhcnNlTW9kaWZ5KG1hcHBpbmcpIHtcbiAgICBsZXQgbW9kaWZ5ID0gbWFwcGluZy5tb2RpZnkgfHwgbWFwcGluZy5maWx0ZXI7XG5cbiAgICBpZiAoXy5pc0Z1bmN0aW9uKG1vZGlmeSkpIHtcbiAgICAgIHJldHVybiBtb2RpZnk7XG4gICAgfSBlbHNlIGlmIChfLmlzT2JqZWN0KG1vZGlmeSkpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocXVlcnlCdWlsZGVyKSB7XG4gICAgICAgIHF1ZXJ5QnVpbGRlci53aGVyZShtb2RpZnkpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF8ubm9vcDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByb3RlY3RlZFxuICAgKi9cbiAgcGFyc2VSZWZlcmVuY2UocmVmKSB7XG4gICAgaWYgKCFfLmlzQXJyYXkocmVmKSkge1xuICAgICAgcmVmID0gW3JlZl07XG4gICAgfVxuXG4gICAgbGV0IHRhYmxlID0gbnVsbDtcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWYubGVuZ3RoOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlZkl0ZW0gPSByZWZbaV07XG4gICAgICBjb25zdCBuZHggPSByZWZJdGVtLmxhc3RJbmRleE9mKCcuJyk7XG5cbiAgICAgIGxldCB0YWJsZU5hbWUgPSByZWZJdGVtLnN1YnN0cigwLCBuZHgpLnRyaW0oKTtcbiAgICAgIGxldCBjb2x1bW5OYW1lID0gcmVmSXRlbS5zdWJzdHIobmR4ICsgMSwgcmVmSXRlbS5sZW5ndGgpLnRyaW0oKTtcblxuICAgICAgaWYgKCF0YWJsZU5hbWUgfHwgKHRhYmxlICYmIHRhYmxlICE9PSB0YWJsZU5hbWUpIHx8ICFjb2x1bW5OYW1lKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGFibGU6IG51bGwsXG4gICAgICAgICAgY29sdW1uczogW11cbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhYmxlID0gdGFibGVOYW1lO1xuICAgICAgfVxuXG4gICAgICBjb2x1bW5zLnB1c2goY29sdW1uTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRhYmxlOiB0YWJsZSxcbiAgICAgIGNvbHVtbnM6IGNvbHVtbnNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIG1lcmdlTW9kZWxzKG1vZGVsczEsIG1vZGVsczIpIHtcbiAgICBsZXQgbW9kZWxDbGFzcztcblxuICAgIG1vZGVsczEgPSBfLmNvbXBhY3QobW9kZWxzMSk7XG4gICAgbW9kZWxzMiA9IF8uY29tcGFjdChtb2RlbHMyKTtcblxuICAgIGlmIChfLmlzRW1wdHkobW9kZWxzMSkgJiYgXy5pc0VtcHR5KG1vZGVsczIpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkobW9kZWxzMSkpIHtcbiAgICAgIG1vZGVsQ2xhc3MgPSBtb2RlbHMxWzBdLmNvbnN0cnVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbENsYXNzID0gbW9kZWxzMlswXS5jb25zdHJ1Y3RvcjtcbiAgICB9XG5cbiAgICBsZXQgaWRQcm9wZXJ0eSA9IG1vZGVsQ2xhc3MuZ2V0SWRQcm9wZXJ0eUFycmF5KCk7XG4gICAgbGV0IG1vZGVsc0J5SWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBtb2RlbHMxLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgbW9kZWwgPSBtb2RlbHMxW2ldO1xuICAgICAgY29uc3Qga2V5ID0gbW9kZWwuJHByb3BLZXkoaWRQcm9wZXJ0eSk7XG5cbiAgICAgIG1vZGVsc0J5SWRba2V5XSA9IG1vZGVsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gbW9kZWxzMi5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gbW9kZWxzMltpXTtcbiAgICAgIGNvbnN0IGtleSA9IG1vZGVsLiRwcm9wS2V5KGlkUHJvcGVydHkpO1xuXG4gICAgICBtb2RlbHNCeUlkW2tleV0gPSBtb2RlbDtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5zb3J0QnkoXy52YWx1ZXMobW9kZWxzQnlJZCksIGlkUHJvcGVydHkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHJlc29sdmVNb2RlbChNb2RlbCwgbW9kZWxDbGFzcywgbG9nUHJlZml4KSB7XG4gICAgY29uc3QgcmVxdWlyZU1vZGVsID0gKHBhdGgpID0+IHtcbiAgICAgIGxldCBNb2RlbENsYXNzO1xuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBiYWJlbCA2IHN0eWxlIG9mIGV4cG9zaW5nIGVzNiBleHBvcnRzIHRvIGNvbW1vbmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9pc3N1ZXMvMjY4M1xuICAgICAgICBsZXQgbW9kdWxlID0gcmVxdWlyZShwYXRoKTtcblxuICAgICAgICBNb2RlbENsYXNzID0gaXNTdWJjbGFzc09mKG1vZHVsZS5kZWZhdWx0LCBNb2RlbClcbiAgICAgICAgICA/IG1vZHVsZS5kZWZhdWx0XG4gICAgICAgICAgOiBtb2R1bGU7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdWJjbGFzc09mKE1vZGVsQ2xhc3MsIE1vZGVsKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE1vZGVsQ2xhc3M7XG4gICAgfTtcblxuICAgIGlmIChfLmlzU3RyaW5nKG1vZGVsQ2xhc3MpKSB7XG4gICAgICBsZXQgTW9kZWxDbGFzcyA9IG51bGw7XG5cbiAgICAgIGlmIChpc0Fic29sdXRlUGF0aChtb2RlbENsYXNzKSkge1xuICAgICAgICBNb2RlbENsYXNzID0gcmVxdWlyZU1vZGVsKG1vZGVsQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIHBhdGggaXMgbm90IGEgYWJzb2x1dGUsIHRyeSB0aGUgbW9kZWxQYXRocyBvZiB0aGUgb3duZXIgbW9kZWwgY2xhc3MuXG4gICAgICAgIF8uZWFjaCh0aGlzLm93bmVyTW9kZWxDbGFzcy5tb2RlbFBhdGhzLCBtb2RlbFBhdGggPT4ge1xuICAgICAgICAgIE1vZGVsQ2xhc3MgPSByZXF1aXJlTW9kZWwocGF0aC5qb2luKG1vZGVsUGF0aCwgbW9kZWxDbGFzcykpO1xuXG4gICAgICAgICAgaWYgKGlzU3ViY2xhc3NPZihNb2RlbENsYXNzLCBNb2RlbCkpIHtcbiAgICAgICAgICAgIC8vIEJyZWFrIHRoZSBsb29wLlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNTdWJjbGFzc09mKE1vZGVsQ2xhc3MsIE1vZGVsKSkge1xuICAgICAgICB0aGlzLnRocm93RXJyb3IoYCR7bG9nUHJlZml4fTogJHttb2RlbENsYXNzfSBpcyBhbiBpbnZhbGlkIGZpbGUgcGF0aCB0byBhIG1vZGVsIGNsYXNzYCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBNb2RlbENsYXNzO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWlzU3ViY2xhc3NPZihtb2RlbENsYXNzLCBNb2RlbCkpIHtcbiAgICAgICAgdGhpcy50aHJvd0Vycm9yKGAke2xvZ1ByZWZpeH0gaXMgbm90IGEgc3ViY2xhc3Mgb2YgTW9kZWwgb3IgYSBmaWxlIHBhdGggdG8gYSBtb2R1bGUgdGhhdCBleHBvcnRzIG9uZS5gKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1vZGVsQ2xhc3M7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICovXG4gIHRocm93RXJyb3IobWVzc2FnZSkge1xuICAgIGlmICh0aGlzLm93bmVyTW9kZWxDbGFzcyAmJiB0aGlzLm93bmVyTW9kZWxDbGFzcy5uYW1lICYmIHRoaXMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RoaXMub3duZXJNb2RlbENsYXNzLm5hbWV9LnJlbGF0aW9uTWFwcGluZ3MuJHt0aGlzLm5hbWV9OiAke21lc3NhZ2V9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9OiAke21lc3NhZ2V9YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlzQWJzb2x1dGVQYXRoKHB0aCkge1xuICByZXR1cm4gcGF0aC5ub3JtYWxpemUocHRoICsgJy8nKSA9PT0gcGF0aC5ub3JtYWxpemUocGF0aC5yZXNvbHZlKHB0aCkgKyAnLycpO1xufVxuXG5mdW5jdGlvbiBjb250YWluc05vbk51bGwoYXJyKSB7XG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHZhbCA9IGFycltpXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgY29udGFpbnNOb25OdWxsKHZhbCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodmFsICE9PSBudWxsICYmIHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59Il19
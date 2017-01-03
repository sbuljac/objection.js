'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _dec2, _desc, _value, _class, _class2, _temp;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ModelBase2 = require('./ModelBase');

var _ModelBase3 = _interopRequireDefault(_ModelBase2);

var _QueryBuilder = require('../queryBuilder/QueryBuilder');

var _QueryBuilder2 = _interopRequireDefault(_QueryBuilder);

var _inheritModel = require('./inheritModel');

var _inheritModel2 = _interopRequireDefault(_inheritModel);

var _RelationExpression = require('../queryBuilder/RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _hiddenData = require('../utils/hiddenData');

var _hiddenData2 = require('../utils/decorators/hiddenData');

var _hiddenData3 = _interopRequireDefault(_hiddenData2);

var _memoize = require('../utils/decorators/memoize');

var _memoize2 = _interopRequireDefault(_memoize);

var _Relation = require('../relations/Relation');

var _Relation2 = _interopRequireDefault(_Relation);

var _HasOneRelation = require('../relations/hasOne/HasOneRelation');

var _HasOneRelation2 = _interopRequireDefault(_HasOneRelation);

var _HasManyRelation = require('../relations/hasMany/HasManyRelation');

var _HasManyRelation2 = _interopRequireDefault(_HasManyRelation);

var _ManyToManyRelation = require('../relations/manyToMany/ManyToManyRelation');

var _ManyToManyRelation2 = _interopRequireDefault(_ManyToManyRelation);

var _BelongsToOneRelation = require('../relations/belongsToOne/BelongsToOneRelation');

var _BelongsToOneRelation2 = _interopRequireDefault(_BelongsToOneRelation);

var _InstanceFindOperation = require('../queryBuilder/operations/InstanceFindOperation');

var _InstanceFindOperation2 = _interopRequireDefault(_InstanceFindOperation);

var _InstanceInsertOperation = require('../queryBuilder/operations/InstanceInsertOperation');

var _InstanceInsertOperation2 = _interopRequireDefault(_InstanceInsertOperation);

var _InstanceUpdateOperation = require('../queryBuilder/operations/InstanceUpdateOperation');

var _InstanceUpdateOperation2 = _interopRequireDefault(_InstanceUpdateOperation);

var _InstanceDeleteOperation = require('../queryBuilder/operations/InstanceDeleteOperation');

var _InstanceDeleteOperation2 = _interopRequireDefault(_InstanceDeleteOperation);

var _JoinEagerOperation = require('../queryBuilder/operations/JoinEagerOperation');

var _JoinEagerOperation2 = _interopRequireDefault(_JoinEagerOperation);

var _WhereInEagerOperation = require('../queryBuilder/operations/WhereInEagerOperation');

var _WhereInEagerOperation2 = _interopRequireDefault(_WhereInEagerOperation);

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

var JoinEagerAlgorithm = function JoinEagerAlgorithm() {
  return new _JoinEagerOperation2.default('eager');
};

var WhereInEagerAlgorithm = function WhereInEagerAlgorithm() {
  return new _WhereInEagerOperation2.default('eager');
};

var Model = (_dec = (0, _hiddenData3.default)(), _dec2 = (0, _hiddenData3.default)(), (_class = (_temp = _class2 = function (_ModelBase) {
  (0, _inherits3.default)(Model, _ModelBase);

  function Model() {
    (0, _classCallCheck3.default)(this, Model);
    return (0, _possibleConstructorReturn3.default)(this, _ModelBase.apply(this, arguments));
  }

  /**
   * @param {*=} id
   * @returns {*}
   */


  /**
   * @type {object}
   */


  /**
   * @type {boolean}
   */


  /**
   * @type {Object.<string, RelationMapping>}
   */


  /**
   * @type {RegExp}
   */


  /**
   * @type {string}
   */


  /**
   * @type {string|Array.<string>}
   */
  Model.prototype.$id = function $id(id) {
    if (arguments.length > 0) {
      return setId(this, arguments[0]);
    } else {
      return getId(this);
    }
  };

  /**
   * @returns {knex}
   */


  /**
   * @private
   */


  /**
   * @type {Constructor.<? extends EagerOperation>}
   */


  /**
   * @type {Array.<string>}
   */


  /**
   * @type {Array.<string>}
   */


  /**
   * @type {string}
   */


  /**
   * @type {string}
   */


  /**
   * @type {string}
   */


  Model.prototype.$knex = function $knex() {
    return this.constructor.knex();
  };

  /**
   * @returns {knex}
   */


  Model.prototype.$transaction = function $transaction() {
    return this.constructor.transaction();
  };

  /**
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.prototype.$query = function $query(trx) {
    var _this2 = this;

    var ModelClass = this.constructor;

    return ModelClass.QueryBuilder.forClass(ModelClass).transacting(trx).findOperationFactory(function () {
      return new _InstanceFindOperation2.default('find', { instance: _this2 });
    }).insertOperationFactory(function () {
      return new _InstanceInsertOperation2.default('insert', { instance: _this2 });
    }).updateOperationFactory(function () {
      return new _InstanceUpdateOperation2.default('update', { instance: _this2 });
    }).patchOperationFactory(function () {
      return new _InstanceUpdateOperation2.default('patch', { instance: _this2, modelOptions: { patch: true } });
    }).deleteOperationFactory(function () {
      return new _InstanceDeleteOperation2.default('delete', { instance: _this2 });
    }).relateOperationFactory(function () {
      throw new Error('`relate` makes no sense in this context');
    }).unrelateOperationFactory(function () {
      throw new Error('`unrelate` makes no sense in this context');
    });
  };

  /**
   * @param {string} relationName
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.prototype.$relatedQuery = function $relatedQuery(relationName, trx) {
    var _this3 = this;

    var ModelClass = this.constructor;
    var relation = ModelClass.getRelation(relationName);
    var RelatedModelClass = relation.relatedModelClass;

    return ModelClass.RelatedQueryBuilder.forClass(RelatedModelClass).transacting(trx).findOperationFactory(function (builder) {
      return relation.find(builder, [_this3]);
    }).insertOperationFactory(function (builder) {
      return relation.insert(builder, _this3);
    }).updateOperationFactory(function (builder) {
      return relation.update(builder, _this3);
    }).patchOperationFactory(function (builder) {
      return relation.patch(builder, _this3);
    }).deleteOperationFactory(function (builder) {
      return relation.delete(builder, _this3);
    }).relateOperationFactory(function (builder) {
      return relation.relate(builder, _this3);
    }).unrelateOperationFactory(function (builder) {
      return relation.unrelate(builder, _this3);
    });
  };

  /**
   * @param {string|RelationExpression} relationExpression
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  Model.prototype.$loadRelated = function $loadRelated(relationExpression, filters) {
    return this.constructor.loadRelated(this, relationExpression, filters);
  };

  /**
   * @param {Constructor.<Model>=} filterConstructor
   * @param {function(Model)} callback
   * @return {Model}
   */


  Model.prototype.$traverse = function $traverse(filterConstructor, callback) {
    if (_lodash2.default.isUndefined(callback)) {
      callback = filterConstructor;
      filterConstructor = null;
    }

    this.constructor.traverse(filterConstructor, this, callback);
    return this;
  };

  Model.prototype.$validate = function $validate() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (json instanceof Model) {
      // Strip away relations and other internal stuff.
      json = json.$parseJson(json.$toJson(true));
    }

    return _ModelBase.prototype.$validate.call(this, json, options);
  };

  Model.prototype.$parseDatabaseJson = function $parseDatabaseJson(json) {
    var jsonAttr = this.constructor.getJsonAttributes();

    if (jsonAttr.length) {
      for (var i = 0, l = jsonAttr.length; i < l; ++i) {
        var attr = jsonAttr[i];
        var value = json[attr];

        if (_lodash2.default.isString(value)) {
          json[attr] = JSON.parse(value);
        }
      }
    }

    return json;
  };

  Model.prototype.$formatDatabaseJson = function $formatDatabaseJson(json) {
    var jsonAttr = this.constructor.getJsonAttributes();

    if (jsonAttr.length) {
      for (var i = 0, l = jsonAttr.length; i < l; ++i) {
        var attr = jsonAttr[i];
        var value = json[attr];

        if (_lodash2.default.isObject(value)) {
          json[attr] = (0, _stringify2.default)(value);
        }
      }
    }

    return json;
  };

  Model.prototype.$setJson = function $setJson(json, options) {
    _ModelBase.prototype.$setJson.call(this, json, options);

    if (!_lodash2.default.isObject(json)) {
      return;
    }

    var relations = this.constructor.getRelations();
    var relNames = (0, _keys2.default)(relations);

    // Parse relations into Model instances.
    for (var i = 0, l = relNames.length; i < l; ++i) {
      var relationName = relNames[i];

      if (_lodash2.default.has(json, relationName)) {
        var relationJson = json[relationName];
        var relation = relations[relationName];

        if (Array.isArray(relationJson)) {
          this[relationName] = relation.relatedModelClass.ensureModelArray(relationJson, options);
        } else if (relationJson) {
          this[relationName] = relation.relatedModelClass.ensureModel(relationJson, options);
        } else {
          this[relationName] = null;
        }
      }
    }
  };

  /**
   * @param {boolean=} shallow
   */


  Model.prototype.$toJson = function $toJson(shallow) {
    if (shallow) {
      return this.$$toJson(false, this.constructor.getRelations(), null);
    } else {
      return this.$$toJson(false, null, null);
    }
  };

  /**
   * @override
   */


  Model.prototype.$toDatabaseJson = function $toDatabaseJson() {
    var jsonSchema = this.constructor.getJsonSchema();

    if (jsonSchema && this.constructor.pickJsonSchemaProperties) {
      return this.$$toJson(true, null, jsonSchema.properties);
    } else {
      return this.$$toJson(true, this.constructor.getRelations(), null);
    }
  };

  /**
   * @param {Object} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeInsert = function $beforeInsert(queryContext) {};

  /**
   * @param {Object} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterInsert = function $afterInsert(queryContext) {};

  /**
   * @param {ModelOptions} opt
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeUpdate = function $beforeUpdate(opt, queryContext) {};

  /**
   * @param {ModelOptions} opt
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterUpdate = function $afterUpdate(opt, queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterGet = function $afterGet(queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$beforeDelete = function $beforeDelete(queryContext) {};

  /**
   * @param {QueryBuilderContext} queryContext
   * @returns {Promise|*}
   */


  Model.prototype.$afterDelete = function $afterDelete(queryContext) {};

  /**
   * @param {Transaction=} trx
   * @returns {QueryBuilder}
   */


  Model.query = function query(trx) {
    var ModelClass = this;

    return ModelClass.QueryBuilder.forClass(ModelClass).transacting(trx).relateOperationFactory(function () {
      throw new Error('`relate` makes no sense in this context');
    }).unrelateOperationFactory(function () {
      throw new Error('`unrelate` makes no sense in this context');
    });
  };

  /**
   * @param {knex=} knex
   * @returns {knex}
   */


  Model.knex = function knex(_knex) {
    if (arguments.length) {
      this.$$knex = _knex;
    } else {
      return this.$$knex;
    }
  };

  /**
   * @returns {knex}
   */


  Model.transaction = function transaction() {
    return this.knex();
  };

  /**
   * @return {Raw}
   */


  Model.raw = function raw() {
    var knex = this.knex();
    return knex.raw.apply(knex, arguments);
  };

  /**
   * @return {Object}
   */


  Model.fn = function fn() {
    var knex = this.knex();
    return knex.fn;
  };

  /**
   * @return {Formatter}
   */


  Model.formatter = function formatter() {
    return this.knex().client.formatter();
  };

  /**
   * @returns {knex.QueryBuilder}
   */


  Model.knexQuery = function knexQuery() {
    return this.knex().table(this.tableName);
  };

  /**
   * @returns {string}
   */


  Model.uniqueTag = function uniqueTag() {
    return this.tableName;
  };

  /**
   * @param {knex} knex
   * @returns {Constructor.<Model>}
   */


  Model.bindKnex = function bindKnex(knex) {
    var ModelClass = this;

    if (!knex.$$objection) {
      Object.defineProperty(knex, '$$objection', {
        enumerable: false,
        writable: false,
        value: {
          boundModels: (0, _create2.default)(null)
        }
      });
    }

    // Check if this model class has already been bound to the given knex.
    if (knex.$$objection.boundModels[ModelClass.uniqueTag()]) {
      return knex.$$objection.boundModels[ModelClass.uniqueTag()];
    }

    // Create a new subclass of this class.
    var BoundModelClass = (0, _inheritModel2.default)(ModelClass);

    // The bound model is equal to the source model in every way. We want to copy
    // the hidden data as-is from the source so that we don't get the performance
    // penalty of calculating all memoized etc. values again.
    (0, _hiddenData.inheritHiddenData)(ModelClass, BoundModelClass);

    BoundModelClass.knex(knex);
    knex.$$objection.boundModels[ModelClass.uniqueTag()] = BoundModelClass;

    var boundRelations = (0, _create2.default)(null);
    var relations = ModelClass.getRelations();
    var relNames = (0, _keys2.default)(relations);

    for (var i = 0, l = relNames.length; i < l; ++i) {
      var relName = relNames[i];
      var relation = relations[relName];
      boundRelations[relName] = relation.bindKnex(knex);
    }

    BoundModelClass.relations = boundRelations;
    return BoundModelClass;
  };

  /**
   * @param {knex} trx
   * @returns {Constructor.<Model>}
   */


  Model.bindTransaction = function bindTransaction(trx) {
    return this.bindKnex(trx);
  };

  /**
   * @param {Model|Object} model
   * @param {ModelOptions=} options
   * @returns {Model}
   */


  Model.ensureModel = function ensureModel(model, options) {
    var ModelClass = this;

    if (!model) {
      return null;
    }

    if (model instanceof ModelClass) {
      return model;
    } else {
      return ModelClass.fromJson(model, options);
    }
  };

  /**
   * @param {Array.<Model|Object>} input
   * @param {ModelOptions=} options
   * @returns {Array.<Model>}
   */


  Model.ensureModelArray = function ensureModelArray(input, options) {
    if (!input) {
      return [];
    }

    if (Array.isArray(input)) {
      var models = new Array(input.length);

      for (var i = 0, l = input.length; i < l; ++i) {
        models[i] = this.ensureModel(input[i], options);
      }

      return models;
    } else {
      return [this.ensureModel(input, options)];
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Model.getIdColumnArray = function getIdColumnArray() {
    if (Array.isArray(this.idColumn)) {
      return this.idColumn;
    } else {
      return [this.idColumn];
    }
  };

  /**
   * @returns {string|Array.<string>}
   */


  Model.getFullIdColumn = function getFullIdColumn() {
    var _this4 = this;

    if (Array.isArray(this.idColumn)) {
      return this.idColumn.map(function (col) {
        return _this4.tableName + '.' + col;
      });
    } else {
      return this.tableName + '.' + this.idColumn;
    }
  };

  /**
   * @returns {Array.<string>}
   */


  Model.getIdPropertyArray = function getIdPropertyArray() {
    var _this5 = this;

    return this.getIdColumnArray().map(function (col) {
      return idColumnToIdProperty(_this5, col);
    });
  };

  /**
   * @returns {string|Array.<string>}
   */


  Model.getIdProperty = function getIdProperty() {
    var _this6 = this;

    if (Array.isArray(this.idColumn)) {
      return this.idColumn.map(function (col) {
        return idColumnToIdProperty(_this6, col);
      });
    } else {
      return idColumnToIdProperty(this, this.idColumn);
    }
  };

  /**
   * @private
   */


  /**
   * @return {Object.<string, Relation>}
   */
  Model.getRelations = function getRelations() {
    var _this7 = this;

    var relations = this.relations;

    if (!relations) {
      relations = _lodash2.default.reduce(_lodash2.default.result(this, 'relationMappings'), function (relations, mapping, relationName) {
        relations[relationName] = new mapping.relation(relationName, _this7);
        relations[relationName].setMapping(mapping);
        return relations;
      }, (0, _create2.default)(null));

      this.relations = relations;
    }

    return relations;
  };

  /**
   * @return {Relation}
   */


  Model.getRelation = function getRelation(name) {
    var relation = this.getRelations()[name];

    if (!relation) {
      throw new Error('A model class (tableName = ' + this.tableName + ') doesn\'t have relation ' + name);
    }

    return relation;
  };

  /**
   * @param {Array.<Model|Object>} $models
   * @param {string|RelationExpression} expression
   * @param {Object.<string, function(QueryBuilder)>=} filters
   * @returns {QueryBuilder}
   */


  Model.loadRelated = function loadRelated($models, expression, filters) {
    return this.query().resolve(this.ensureModelArray($models)).findOptions({ dontCallAfterGet: true }).eager(expression, filters).runAfter(function (models) {
      return Array.isArray($models) ? models : models[0];
    });
  };

  /**
   * @param {Constructor.<Model>=} filterConstructor
   * @param {Model|Array.<Model>} models
   * @param {function(Model, Model, string)} traverser
   * @return {Model}
   */


  Model.traverse = function traverse(filterConstructor, models, traverser) {
    filterConstructor = filterConstructor || null;

    if (_lodash2.default.isUndefined(traverser)) {
      traverser = models;
      models = filterConstructor;
      filterConstructor = null;
    }

    if (!_lodash2.default.isFunction(traverser)) {
      throw new Error('traverser must be a function');
    }

    _traverse(models, null, null, filterConstructor, traverser);
    return this;
  };

  /**
   * @protected
   * @returns {Array.<string>}
   */


  Model.getJsonAttributes = function getJsonAttributes() {
    var _this8 = this;

    // If the jsonAttributes property is not set, try to create it based
    // on the jsonSchema. All properties that are objects or arrays must
    // be converted to JSON.
    if (!this.jsonAttributes && this.getJsonSchema()) {
      this.jsonAttributes = [];

      _lodash2.default.forOwn(this.getJsonSchema().properties, function (prop, propName) {
        var types = _lodash2.default.compact(ensureArray(prop.type));

        if (types.length === 0 && Array.isArray(prop.anyOf)) {
          types = _lodash2.default.flattenDeep(_lodash2.default.map(prop.anyOf, 'type'));
        }

        if (types.length === 0 && Array.isArray(prop.oneOf)) {
          types = _lodash2.default.flattenDeep(_lodash2.default.map(prop.oneOf, 'type'));
        }

        if (_lodash2.default.includes(types, 'object') || _lodash2.default.includes(types, 'array')) {
          _this8.jsonAttributes.push(propName);
        }
      });
    }

    if (!Array.isArray(this.jsonAttributes)) {
      this.jsonAttributes = [];
    }

    return this.jsonAttributes;
  };

  (0, _createClass3.default)(Model, null, [{
    key: 'relations',
    get: function get() {}

    /**
     * @private
     */
    ,
    set: function set(value) {}
  }]);
  return Model;
}(_ModelBase3.default), _class2.QueryBuilder = _QueryBuilder2.default, _class2.RelatedQueryBuilder = _QueryBuilder2.default, _class2.HasOneRelation = _HasOneRelation2.default, _class2.HasManyRelation = _HasManyRelation2.default, _class2.ManyToManyRelation = _ManyToManyRelation2.default, _class2.BelongsToOneRelation = _BelongsToOneRelation2.default, _class2.JoinEagerAlgorithm = JoinEagerAlgorithm, _class2.WhereInEagerAlgorithm = WhereInEagerAlgorithm, _class2.tableName = null, _class2.idColumn = 'id', _class2.uidProp = '#id', _class2.uidRefProp = '#ref', _class2.dbRefProp = '#dbRef', _class2.propRefRegex = /#ref{([^\.]+)\.([^}]+)}/g, _class2.jsonAttributes = null, _class2.relationMappings = null, _class2.modelPaths = [], _class2.pickJsonSchemaProperties = true, _class2.defaultEagerAlgorithm = WhereInEagerAlgorithm, _class2.defaultEagerOptions = null, _class2.$$knex = null, _temp), (_applyDecoratedDescriptor(_class, 'getIdColumnArray', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdColumnArray'), _class), _applyDecoratedDescriptor(_class, 'getFullIdColumn', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getFullIdColumn'), _class), _applyDecoratedDescriptor(_class, 'getIdPropertyArray', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdPropertyArray'), _class), _applyDecoratedDescriptor(_class, 'getIdProperty', [_memoize2.default], (0, _getOwnPropertyDescriptor2.default)(_class, 'getIdProperty'), _class), _applyDecoratedDescriptor(_class, 'relations', [_dec], (0, _getOwnPropertyDescriptor2.default)(_class, 'relations'), _class), _applyDecoratedDescriptor(_class, 'relations', [_dec2], (0, _getOwnPropertyDescriptor2.default)(_class, 'relations'), _class)), _class));
exports.default = Model;


function ensureArray(obj) {
  if (Array.isArray(obj)) {
    return obj;
  } else {
    return [obj];
  }
}

function _traverse(models, parent, relationName, modelClass, callback) {
  if (!_lodash2.default.isObject(models)) {
    return;
  }

  if (Array.isArray(models)) {
    for (var i = 0, l = models.length; i < l; ++i) {
      traverseOne(models[i], parent, relationName, modelClass, callback);
    }
  } else {
    traverseOne(models, parent, relationName, modelClass, callback);
  }
}

function traverseOne(model, parent, relationName, modelClass, callback) {
  if (!(model instanceof Model)) {
    return;
  }

  if (!modelClass || model instanceof modelClass) {
    callback(model, parent, relationName);
  }

  var relations = model.constructor.getRelations();
  var relNames = (0, _keys2.default)(relations);

  for (var i = 0, l = relNames.length; i < l; ++i) {
    var relName = relNames[i];

    if (model.hasOwnProperty(relName)) {
      _traverse(model[relName], model, relName, modelClass, callback);
    }
  }
}

function idColumnToIdProperty(ModelClass, idColumn) {
  var idProperty = ModelClass.columnNameToPropertyName(idColumn);

  if (!idProperty) {
    throw new Error(ModelClass.tableName + '.$parseDatabaseJson probably changes the value of the id column `' + idColumn + '` which is a no-no.');
  }

  return idProperty;
}

function setId(model, id) {
  var idProp = model.constructor.getIdProperty();
  var isArray = Array.isArray(idProp);

  if (Array.isArray(id)) {
    if (isArray) {
      if (id.length !== idProp.length) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      for (var i = 0; i < id.length; ++i) {
        model[idProp[i]] = id[i];
      }
    } else {
      if (id.length !== 1) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      model[idProp] = id[0];
    }
  } else {
    if (isArray) {
      if (idProp.length > 1) {
        throw new Error('trying to set an invalid identifier for a model');
      }

      model[idProp[0]] = id;
    } else {
      model[idProp] = id;
    }
  }
}

function getId(model) {
  var idProp = model.constructor.getIdProperty();

  if (Array.isArray(idProp)) {
    return model.$values(idProp);
  } else {
    return model[idProp];
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vZGVsLmpzIl0sIm5hbWVzIjpbIkpvaW5FYWdlckFsZ29yaXRobSIsIldoZXJlSW5FYWdlckFsZ29yaXRobSIsIk1vZGVsIiwiJGlkIiwiaWQiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzZXRJZCIsImdldElkIiwiJGtuZXgiLCJjb25zdHJ1Y3RvciIsImtuZXgiLCIkdHJhbnNhY3Rpb24iLCJ0cmFuc2FjdGlvbiIsIiRxdWVyeSIsInRyeCIsIk1vZGVsQ2xhc3MiLCJRdWVyeUJ1aWxkZXIiLCJmb3JDbGFzcyIsInRyYW5zYWN0aW5nIiwiZmluZE9wZXJhdGlvbkZhY3RvcnkiLCJpbnN0YW5jZSIsImluc2VydE9wZXJhdGlvbkZhY3RvcnkiLCJ1cGRhdGVPcGVyYXRpb25GYWN0b3J5IiwicGF0Y2hPcGVyYXRpb25GYWN0b3J5IiwibW9kZWxPcHRpb25zIiwicGF0Y2giLCJkZWxldGVPcGVyYXRpb25GYWN0b3J5IiwicmVsYXRlT3BlcmF0aW9uRmFjdG9yeSIsIkVycm9yIiwidW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5IiwiJHJlbGF0ZWRRdWVyeSIsInJlbGF0aW9uTmFtZSIsInJlbGF0aW9uIiwiZ2V0UmVsYXRpb24iLCJSZWxhdGVkTW9kZWxDbGFzcyIsInJlbGF0ZWRNb2RlbENsYXNzIiwiUmVsYXRlZFF1ZXJ5QnVpbGRlciIsImZpbmQiLCJidWlsZGVyIiwiaW5zZXJ0IiwidXBkYXRlIiwiZGVsZXRlIiwicmVsYXRlIiwidW5yZWxhdGUiLCIkbG9hZFJlbGF0ZWQiLCJyZWxhdGlvbkV4cHJlc3Npb24iLCJmaWx0ZXJzIiwibG9hZFJlbGF0ZWQiLCIkdHJhdmVyc2UiLCJmaWx0ZXJDb25zdHJ1Y3RvciIsImNhbGxiYWNrIiwiaXNVbmRlZmluZWQiLCJ0cmF2ZXJzZSIsIiR2YWxpZGF0ZSIsImpzb24iLCJvcHRpb25zIiwiJHBhcnNlSnNvbiIsIiR0b0pzb24iLCIkcGFyc2VEYXRhYmFzZUpzb24iLCJqc29uQXR0ciIsImdldEpzb25BdHRyaWJ1dGVzIiwiaSIsImwiLCJhdHRyIiwidmFsdWUiLCJpc1N0cmluZyIsIkpTT04iLCJwYXJzZSIsIiRmb3JtYXREYXRhYmFzZUpzb24iLCJpc09iamVjdCIsIiRzZXRKc29uIiwicmVsYXRpb25zIiwiZ2V0UmVsYXRpb25zIiwicmVsTmFtZXMiLCJoYXMiLCJyZWxhdGlvbkpzb24iLCJBcnJheSIsImlzQXJyYXkiLCJlbnN1cmVNb2RlbEFycmF5IiwiZW5zdXJlTW9kZWwiLCJzaGFsbG93IiwiJCR0b0pzb24iLCIkdG9EYXRhYmFzZUpzb24iLCJqc29uU2NoZW1hIiwiZ2V0SnNvblNjaGVtYSIsInBpY2tKc29uU2NoZW1hUHJvcGVydGllcyIsInByb3BlcnRpZXMiLCIkYmVmb3JlSW5zZXJ0IiwicXVlcnlDb250ZXh0IiwiJGFmdGVySW5zZXJ0IiwiJGJlZm9yZVVwZGF0ZSIsIm9wdCIsIiRhZnRlclVwZGF0ZSIsIiRhZnRlckdldCIsIiRiZWZvcmVEZWxldGUiLCIkYWZ0ZXJEZWxldGUiLCJxdWVyeSIsIiQka25leCIsInJhdyIsImFwcGx5IiwiZm4iLCJmb3JtYXR0ZXIiLCJjbGllbnQiLCJrbmV4UXVlcnkiLCJ0YWJsZSIsInRhYmxlTmFtZSIsInVuaXF1ZVRhZyIsImJpbmRLbmV4IiwiJCRvYmplY3Rpb24iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJ3cml0YWJsZSIsImJvdW5kTW9kZWxzIiwiQm91bmRNb2RlbENsYXNzIiwiYm91bmRSZWxhdGlvbnMiLCJyZWxOYW1lIiwiYmluZFRyYW5zYWN0aW9uIiwibW9kZWwiLCJmcm9tSnNvbiIsImlucHV0IiwibW9kZWxzIiwiZ2V0SWRDb2x1bW5BcnJheSIsImlkQ29sdW1uIiwiZ2V0RnVsbElkQ29sdW1uIiwibWFwIiwiY29sIiwiZ2V0SWRQcm9wZXJ0eUFycmF5IiwiaWRDb2x1bW5Ub0lkUHJvcGVydHkiLCJnZXRJZFByb3BlcnR5IiwicmVkdWNlIiwicmVzdWx0IiwibWFwcGluZyIsInNldE1hcHBpbmciLCJuYW1lIiwiJG1vZGVscyIsImV4cHJlc3Npb24iLCJyZXNvbHZlIiwiZmluZE9wdGlvbnMiLCJkb250Q2FsbEFmdGVyR2V0IiwiZWFnZXIiLCJydW5BZnRlciIsInRyYXZlcnNlciIsImlzRnVuY3Rpb24iLCJqc29uQXR0cmlidXRlcyIsImZvck93biIsInByb3AiLCJwcm9wTmFtZSIsInR5cGVzIiwiY29tcGFjdCIsImVuc3VyZUFycmF5IiwidHlwZSIsImFueU9mIiwiZmxhdHRlbkRlZXAiLCJvbmVPZiIsImluY2x1ZGVzIiwicHVzaCIsIkhhc09uZVJlbGF0aW9uIiwiSGFzTWFueVJlbGF0aW9uIiwiTWFueVRvTWFueVJlbGF0aW9uIiwiQmVsb25nc1RvT25lUmVsYXRpb24iLCJ1aWRQcm9wIiwidWlkUmVmUHJvcCIsImRiUmVmUHJvcCIsInByb3BSZWZSZWdleCIsInJlbGF0aW9uTWFwcGluZ3MiLCJtb2RlbFBhdGhzIiwiZGVmYXVsdEVhZ2VyQWxnb3JpdGhtIiwiZGVmYXVsdEVhZ2VyT3B0aW9ucyIsIm9iaiIsInBhcmVudCIsIm1vZGVsQ2xhc3MiLCJ0cmF2ZXJzZU9uZSIsImhhc093blByb3BlcnR5IiwiaWRQcm9wZXJ0eSIsImNvbHVtbk5hbWVUb1Byb3BlcnR5TmFtZSIsImlkUHJvcCIsIiR2YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU1BLHFCQUFxQixTQUFyQkEsa0JBQXFCLEdBQU07QUFDL0IsU0FBTyxpQ0FBdUIsT0FBdkIsQ0FBUDtBQUNELENBRkQ7O0FBSUEsSUFBTUMsd0JBQXdCLFNBQXhCQSxx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M0ssTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNyQixjQUFNLElBQUl1QixLQUFKLENBQVUsaURBQVYsQ0FBTjtBQUNEOztBQUVEMEYsWUFBTTBELE9BQU8sQ0FBUCxDQUFOLElBQW1CN0ssRUFBbkI7QUFDRCxLQU5ELE1BTU87QUFDTG1ILFlBQU0wRCxNQUFOLElBQWdCN0ssRUFBaEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsU0FBU0ksS0FBVCxDQUFlK0csS0FBZixFQUFzQjtBQUNwQixNQUFNMEQsU0FBUzFELE1BQU03RyxXQUFOLENBQWtCd0gsYUFBbEIsRUFBZjs7QUFFQSxNQUFJckQsTUFBTUMsT0FBTixDQUFjbUcsTUFBZCxDQUFKLEVBQTJCO0FBQ3pCLFdBQU8xRCxNQUFNMkQsT0FBTixDQUFjRCxNQUFkLENBQVA7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPMUQsTUFBTTBELE1BQU4sQ0FBUDtBQUNEO0FBQ0YiLCJmaWxlIjoiTW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IE1vZGVsQmFzZSBmcm9tICcuL01vZGVsQmFzZSc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9RdWVyeUJ1aWxkZXInO1xuaW1wb3J0IGluaGVyaXRNb2RlbCBmcm9tICcuL2luaGVyaXRNb2RlbCc7XG5pbXBvcnQgUmVsYXRpb25FeHByZXNzaW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9SZWxhdGlvbkV4cHJlc3Npb24nO1xuaW1wb3J0IHtpbmhlcml0SGlkZGVuRGF0YX0gZnJvbSAnLi4vdXRpbHMvaGlkZGVuRGF0YSc7XG5cbmltcG9ydCBoaWRkZW5EYXRhIGZyb20gJy4uL3V0aWxzL2RlY29yYXRvcnMvaGlkZGVuRGF0YSc7XG5pbXBvcnQgbWVtb2l6ZSBmcm9tICcuLi91dGlscy9kZWNvcmF0b3JzL21lbW9pemUnO1xuXG5pbXBvcnQgUmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL1JlbGF0aW9uJztcbmltcG9ydCBIYXNPbmVSZWxhdGlvbiBmcm9tICcuLi9yZWxhdGlvbnMvaGFzT25lL0hhc09uZVJlbGF0aW9uJztcbmltcG9ydCBIYXNNYW55UmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL2hhc01hbnkvSGFzTWFueVJlbGF0aW9uJztcbmltcG9ydCBNYW55VG9NYW55UmVsYXRpb24gZnJvbSAnLi4vcmVsYXRpb25zL21hbnlUb01hbnkvTWFueVRvTWFueVJlbGF0aW9uJztcbmltcG9ydCBCZWxvbmdzVG9PbmVSZWxhdGlvbiBmcm9tICcuLi9yZWxhdGlvbnMvYmVsb25nc1RvT25lL0JlbG9uZ3NUb09uZVJlbGF0aW9uJztcblxuaW1wb3J0IEluc3RhbmNlRmluZE9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnN0YW5jZUZpbmRPcGVyYXRpb24nO1xuaW1wb3J0IEluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0luc3RhbmNlSW5zZXJ0T3BlcmF0aW9uJztcbmltcG9ydCBJbnN0YW5jZVVwZGF0ZU9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9JbnN0YW5jZVVwZGF0ZU9wZXJhdGlvbic7XG5pbXBvcnQgSW5zdGFuY2VEZWxldGVPcGVyYXRpb24gZnJvbSAnLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvSW5zdGFuY2VEZWxldGVPcGVyYXRpb24nO1xuXG5pbXBvcnQgSm9pbkVhZ2VyT3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0pvaW5FYWdlck9wZXJhdGlvbic7XG5pbXBvcnQgV2hlcmVJbkVhZ2VyT3BlcmF0aW9uIGZyb20gJy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL1doZXJlSW5FYWdlck9wZXJhdGlvbic7XG5cbmNvbnN0IEpvaW5FYWdlckFsZ29yaXRobSA9ICgpID0+IHtcbiAgcmV0dXJuIG5ldyBKb2luRWFnZXJPcGVyYXRpb24oJ2VhZ2VyJyk7XG59O1xuXG5jb25zdCBXaGVyZUluRWFnZXJBbGdvcml0aG0gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgV2hlcmVJbkVhZ2VyT3BlcmF0aW9uKCdlYWdlcicpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWwgZXh0ZW5kcyBNb2RlbEJhc2Uge1xuXG4gIHN0YXRpYyBRdWVyeUJ1aWxkZXIgPSBRdWVyeUJ1aWxkZXI7XG4gIHN0YXRpYyBSZWxhdGVkUXVlcnlCdWlsZGVyID0gUXVlcnlCdWlsZGVyO1xuXG4gIHN0YXRpYyBIYXNPbmVSZWxhdGlvbiA9IEhhc09uZVJlbGF0aW9uO1xuICBzdGF0aWMgSGFzTWFueVJlbGF0aW9uID0gSGFzTWFueVJlbGF0aW9uO1xuICBzdGF0aWMgTWFueVRvTWFueVJlbGF0aW9uID0gTWFueVRvTWFueVJlbGF0aW9uO1xuICBzdGF0aWMgQmVsb25nc1RvT25lUmVsYXRpb24gPSBCZWxvbmdzVG9PbmVSZWxhdGlvbjtcblxuICBzdGF0aWMgSm9pbkVhZ2VyQWxnb3JpdGhtID0gSm9pbkVhZ2VyQWxnb3JpdGhtO1xuICBzdGF0aWMgV2hlcmVJbkVhZ2VyQWxnb3JpdGhtID0gV2hlcmVJbkVhZ2VyQWxnb3JpdGhtO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIHRhYmxlTmFtZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtzdHJpbmd8QXJyYXkuPHN0cmluZz59XG4gICAqL1xuICBzdGF0aWMgaWRDb2x1bW4gPSAnaWQnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIHVpZFByb3AgPSAnI2lkJztcblxuICAvKipcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyB1aWRSZWZQcm9wID0gJyNyZWYnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGRiUmVmUHJvcCA9ICcjZGJSZWYnO1xuXG4gIC8qKlxuICAgKiBAdHlwZSB7UmVnRXhwfVxuICAgKi9cbiAgc3RhdGljIHByb3BSZWZSZWdleCA9IC8jcmVmeyhbXlxcLl0rKVxcLihbXn1dKyl9L2c7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIHN0YXRpYyBqc29uQXR0cmlidXRlcyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgUmVsYXRpb25NYXBwaW5nPn1cbiAgICovXG4gIHN0YXRpYyByZWxhdGlvbk1hcHBpbmdzID0gbnVsbDtcblxuICAvKipcbiAgICogQHR5cGUge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgc3RhdGljIG1vZGVsUGF0aHMgPSBbXTtcblxuICAvKipcbiAgICogQHR5cGUge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgcGlja0pzb25TY2hlbWFQcm9wZXJ0aWVzID0gdHJ1ZTtcblxuICAvKipcbiAgICogQHR5cGUge0NvbnN0cnVjdG9yLjw/IGV4dGVuZHMgRWFnZXJPcGVyYXRpb24+fVxuICAgKi9cbiAgc3RhdGljIGRlZmF1bHRFYWdlckFsZ29yaXRobSA9IFdoZXJlSW5FYWdlckFsZ29yaXRobTtcblxuICAvKipcbiAgICogQHR5cGUge29iamVjdH1cbiAgICovXG4gIHN0YXRpYyBkZWZhdWx0RWFnZXJPcHRpb25zID0gbnVsbDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXRpYyAkJGtuZXggPSBudWxsO1xuXG4gIC8qKlxuICAgKiBAcGFyYW0geyo9fSBpZFxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gICRpZChpZCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHNldElkKHRoaXMsIGFyZ3VtZW50c1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBnZXRJZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2tuZXh9XG4gICAqL1xuICAka25leCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5rbmV4KCk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2tuZXh9XG4gICAqL1xuICAkdHJhbnNhY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IudHJhbnNhY3Rpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9uPX0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICAkcXVlcnkodHJ4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gTW9kZWxDbGFzcy5RdWVyeUJ1aWxkZXJcbiAgICAgIC5mb3JDbGFzcyhNb2RlbENsYXNzKVxuICAgICAgLnRyYW5zYWN0aW5nKHRyeClcbiAgICAgIC5maW5kT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW5zdGFuY2VGaW5kT3BlcmF0aW9uKCdmaW5kJywge2luc3RhbmNlOiB0aGlzfSk7XG4gICAgICB9KVxuICAgICAgLmluc2VydE9wZXJhdGlvbkZhY3RvcnkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEluc3RhbmNlSW5zZXJ0T3BlcmF0aW9uKCdpbnNlcnQnLCB7aW5zdGFuY2U6IHRoaXN9KTtcbiAgICAgIH0pXG4gICAgICAudXBkYXRlT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgSW5zdGFuY2VVcGRhdGVPcGVyYXRpb24oJ3VwZGF0ZScsIHtpbnN0YW5jZTogdGhpc30pO1xuICAgICAgfSlcbiAgICAgIC5wYXRjaE9wZXJhdGlvbkZhY3RvcnkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEluc3RhbmNlVXBkYXRlT3BlcmF0aW9uKCdwYXRjaCcsIHtpbnN0YW5jZTogdGhpcywgbW9kZWxPcHRpb25zOiB7cGF0Y2g6IHRydWV9fSk7XG4gICAgICB9KVxuICAgICAgLmRlbGV0ZU9wZXJhdGlvbkZhY3RvcnkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IEluc3RhbmNlRGVsZXRlT3BlcmF0aW9uKCdkZWxldGUnLCB7aW5zdGFuY2U6IHRoaXN9KTtcbiAgICAgIH0pXG4gICAgICAucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYHJlbGF0ZWAgbWFrZXMgbm8gc2Vuc2UgaW4gdGhpcyBjb250ZXh0Jyk7XG4gICAgICB9KVxuICAgICAgLnVucmVsYXRlT3BlcmF0aW9uRmFjdG9yeSgoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYHVucmVsYXRlYCBtYWtlcyBubyBzZW5zZSBpbiB0aGlzIGNvbnRleHQnKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGlvbk5hbWVcbiAgICogQHBhcmFtIHtUcmFuc2FjdGlvbj19IHRyeFxuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgJHJlbGF0ZWRRdWVyeShyZWxhdGlvbk5hbWUsIHRyeCkge1xuICAgIGNvbnN0IE1vZGVsQ2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICAgIGNvbnN0IHJlbGF0aW9uID0gTW9kZWxDbGFzcy5nZXRSZWxhdGlvbihyZWxhdGlvbk5hbWUpO1xuICAgIGNvbnN0IFJlbGF0ZWRNb2RlbENsYXNzID0gcmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3M7XG5cbiAgICByZXR1cm4gTW9kZWxDbGFzcy5SZWxhdGVkUXVlcnlCdWlsZGVyXG4gICAgICAuZm9yQ2xhc3MoUmVsYXRlZE1vZGVsQ2xhc3MpXG4gICAgICAudHJhbnNhY3RpbmcodHJ4KVxuICAgICAgLmZpbmRPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24uZmluZChidWlsZGVyLCBbdGhpc10pO1xuICAgICAgfSlcbiAgICAgIC5pbnNlcnRPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24uaW5zZXJ0KGJ1aWxkZXIsIHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC51cGRhdGVPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24udXBkYXRlKGJ1aWxkZXIsIHRoaXMpO1xuICAgICAgfSlcbiAgICAgIC5wYXRjaE9wZXJhdGlvbkZhY3RvcnkoYnVpbGRlciA9PiB7XG4gICAgICAgIHJldHVybiByZWxhdGlvbi5wYXRjaChidWlsZGVyLCB0aGlzKTtcbiAgICAgIH0pXG4gICAgICAuZGVsZXRlT3BlcmF0aW9uRmFjdG9yeShidWlsZGVyID0+IHtcbiAgICAgICAgcmV0dXJuIHJlbGF0aW9uLmRlbGV0ZShidWlsZGVyLCB0aGlzKTtcbiAgICAgIH0pXG4gICAgICAucmVsYXRlT3BlcmF0aW9uRmFjdG9yeShidWlsZGVyID0+IHtcbiAgICAgICAgcmV0dXJuIHJlbGF0aW9uLnJlbGF0ZShidWlsZGVyLCB0aGlzKTtcbiAgICAgIH0pXG4gICAgICAudW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KGJ1aWxkZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVsYXRpb24udW5yZWxhdGUoYnVpbGRlciwgdGhpcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWxhdGlvbkV4cHJlc3Npb259IHJlbGF0aW9uRXhwcmVzc2lvblxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nLCBmdW5jdGlvbihRdWVyeUJ1aWxkZXIpPj19IGZpbHRlcnNcbiAgICogQHJldHVybnMge1F1ZXJ5QnVpbGRlcn1cbiAgICovXG4gICRsb2FkUmVsYXRlZChyZWxhdGlvbkV4cHJlc3Npb24sIGZpbHRlcnMpIHtcbiAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5sb2FkUmVsYXRlZCh0aGlzLCByZWxhdGlvbkV4cHJlc3Npb24sIGZpbHRlcnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29uc3RydWN0b3IuPE1vZGVsPj19IGZpbHRlckNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oTW9kZWwpfSBjYWxsYmFja1xuICAgKiBAcmV0dXJuIHtNb2RlbH1cbiAgICovXG4gICR0cmF2ZXJzZShmaWx0ZXJDb25zdHJ1Y3RvciwgY2FsbGJhY2spIHtcbiAgICBpZiAoXy5pc1VuZGVmaW5lZChjYWxsYmFjaykpIHtcbiAgICAgIGNhbGxiYWNrID0gZmlsdGVyQ29uc3RydWN0b3I7XG4gICAgICBmaWx0ZXJDb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5jb25zdHJ1Y3Rvci50cmF2ZXJzZShmaWx0ZXJDb25zdHJ1Y3RvciwgdGhpcywgY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgJHZhbGlkYXRlKGpzb24gPSB0aGlzLCBvcHRpb25zID0ge30pIHtcbiAgICBpZiAoanNvbiBpbnN0YW5jZW9mIE1vZGVsKSB7XG4gICAgICAvLyBTdHJpcCBhd2F5IHJlbGF0aW9ucyBhbmQgb3RoZXIgaW50ZXJuYWwgc3R1ZmYuXG4gICAgICBqc29uID0ganNvbi4kcGFyc2VKc29uKGpzb24uJHRvSnNvbih0cnVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLiR2YWxpZGF0ZShqc29uLCBvcHRpb25zKTtcbiAgfVxuXG4gICRwYXJzZURhdGFiYXNlSnNvbihqc29uKSB7XG4gICAgY29uc3QganNvbkF0dHIgPSB0aGlzLmNvbnN0cnVjdG9yLmdldEpzb25BdHRyaWJ1dGVzKCk7XG5cbiAgICBpZiAoanNvbkF0dHIubGVuZ3RoKSB7XG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IGpzb25BdHRyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBhdHRyID0ganNvbkF0dHJbaV07XG4gICAgICAgIGNvbnN0IHZhbHVlID0ganNvblthdHRyXTtcblxuICAgICAgICBpZiAoXy5pc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgICAgICBqc29uW2F0dHJdID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gICRmb3JtYXREYXRhYmFzZUpzb24oanNvbikge1xuICAgIGNvbnN0IGpzb25BdHRyID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRKc29uQXR0cmlidXRlcygpO1xuXG4gICAgaWYgKGpzb25BdHRyLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBqc29uQXR0ci5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3QgYXR0ciA9IGpzb25BdHRyW2ldO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGpzb25bYXR0cl07XG5cbiAgICAgICAgaWYgKF8uaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAganNvblthdHRyXSA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgJHNldEpzb24oanNvbiwgb3B0aW9ucykge1xuICAgIHN1cGVyLiRzZXRKc29uKGpzb24sIG9wdGlvbnMpO1xuXG4gICAgaWYgKCFfLmlzT2JqZWN0KGpzb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRpb25zID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRSZWxhdGlvbnMoKTtcbiAgICBjb25zdCByZWxOYW1lcyA9IE9iamVjdC5rZXlzKHJlbGF0aW9ucyk7XG5cbiAgICAvLyBQYXJzZSByZWxhdGlvbnMgaW50byBNb2RlbCBpbnN0YW5jZXMuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxOYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbGF0aW9uTmFtZSA9IHJlbE5hbWVzW2ldO1xuXG4gICAgICBpZiAoXy5oYXMoanNvbiwgcmVsYXRpb25OYW1lKSkge1xuICAgICAgICBjb25zdCByZWxhdGlvbkpzb24gPSBqc29uW3JlbGF0aW9uTmFtZV07XG4gICAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zW3JlbGF0aW9uTmFtZV07XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVsYXRpb25Kc29uKSkge1xuICAgICAgICAgIHRoaXNbcmVsYXRpb25OYW1lXSA9IHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLmVuc3VyZU1vZGVsQXJyYXkocmVsYXRpb25Kc29uLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIGlmIChyZWxhdGlvbkpzb24pIHtcbiAgICAgICAgICB0aGlzW3JlbGF0aW9uTmFtZV0gPSByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcy5lbnN1cmVNb2RlbChyZWxhdGlvbkpzb24sIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNbcmVsYXRpb25OYW1lXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtib29sZWFuPX0gc2hhbGxvd1xuICAgKi9cbiAgJHRvSnNvbihzaGFsbG93KSB7XG4gICAgaWYgKHNoYWxsb3cpIHtcbiAgICAgIHJldHVybiB0aGlzLiQkdG9Kc29uKGZhbHNlLCB0aGlzLmNvbnN0cnVjdG9yLmdldFJlbGF0aW9ucygpLCBudWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuJCR0b0pzb24oZmFsc2UsIG51bGwsIG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICovXG4gICR0b0RhdGFiYXNlSnNvbigpIHtcbiAgICBjb25zdCBqc29uU2NoZW1hID0gdGhpcy5jb25zdHJ1Y3Rvci5nZXRKc29uU2NoZW1hKCk7XG5cbiAgICBpZiAoanNvblNjaGVtYSAmJiB0aGlzLmNvbnN0cnVjdG9yLnBpY2tKc29uU2NoZW1hUHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIHRoaXMuJCR0b0pzb24odHJ1ZSwgbnVsbCwganNvblNjaGVtYS5wcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuJCR0b0pzb24odHJ1ZSwgdGhpcy5jb25zdHJ1Y3Rvci5nZXRSZWxhdGlvbnMoKSwgbnVsbCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBxdWVyeUNvbnRleHRcbiAgICogQHJldHVybnMge1Byb21pc2V8Kn1cbiAgICovXG4gICRiZWZvcmVJbnNlcnQocXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYWZ0ZXJJbnNlcnQocXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9uc30gb3B0XG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQ29udGV4dH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYmVmb3JlVXBkYXRlKG9wdCwgcXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9uc30gb3B0XG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQ29udGV4dH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYWZ0ZXJVcGRhdGUob3B0LCBxdWVyeUNvbnRleHQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQ29udGV4dH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYWZ0ZXJHZXQocXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlckNvbnRleHR9IHF1ZXJ5Q29udGV4dFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZXwqfVxuICAgKi9cbiAgJGJlZm9yZURlbGV0ZShxdWVyeUNvbnRleHQpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UXVlcnlCdWlsZGVyQ29udGV4dH0gcXVlcnlDb250ZXh0XG4gICAqIEByZXR1cm5zIHtQcm9taXNlfCp9XG4gICAqL1xuICAkYWZ0ZXJEZWxldGUocXVlcnlDb250ZXh0KSB7fVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1RyYW5zYWN0aW9uPX0gdHJ4XG4gICAqIEByZXR1cm5zIHtRdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBzdGF0aWMgcXVlcnkodHJ4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICByZXR1cm4gTW9kZWxDbGFzcy5RdWVyeUJ1aWxkZXJcbiAgICAgIC5mb3JDbGFzcyhNb2RlbENsYXNzKVxuICAgICAgLnRyYW5zYWN0aW5nKHRyeClcbiAgICAgIC5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgcmVsYXRlYCBtYWtlcyBubyBzZW5zZSBpbiB0aGlzIGNvbnRleHQnKTtcbiAgICAgIH0pXG4gICAgICAudW5yZWxhdGVPcGVyYXRpb25GYWN0b3J5KCgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgdW5yZWxhdGVgIG1ha2VzIG5vIHNlbnNlIGluIHRoaXMgY29udGV4dCcpO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtrbmV4PX0ga25leFxuICAgKiBAcmV0dXJucyB7a25leH1cbiAgICovXG4gIHN0YXRpYyBrbmV4KGtuZXgpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgdGhpcy4kJGtuZXggPSBrbmV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy4kJGtuZXg7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtrbmV4fVxuICAgKi9cbiAgc3RhdGljIHRyYW5zYWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmtuZXgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtSYXd9XG4gICAqL1xuICBzdGF0aWMgcmF3KCkge1xuICAgIGNvbnN0IGtuZXggPSB0aGlzLmtuZXgoKTtcbiAgICByZXR1cm4ga25leC5yYXcuYXBwbHkoa25leCwgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBzdGF0aWMgZm4oKSB7XG4gICAgY29uc3Qga25leCA9IHRoaXMua25leCgpO1xuICAgIHJldHVybiBrbmV4LmZuO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Zvcm1hdHRlcn1cbiAgICovXG4gIHN0YXRpYyBmb3JtYXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMua25leCgpLmNsaWVudC5mb3JtYXR0ZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7a25leC5RdWVyeUJ1aWxkZXJ9XG4gICAqL1xuICBzdGF0aWMga25leFF1ZXJ5KCkge1xuICAgIHJldHVybiB0aGlzLmtuZXgoKS50YWJsZSh0aGlzLnRhYmxlTmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyB1bmlxdWVUYWcoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFibGVOYW1lO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leH0ga25leFxuICAgKiBAcmV0dXJucyB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICovXG4gIHN0YXRpYyBiaW5kS25leChrbmV4KSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICBpZiAoIWtuZXguJCRvYmplY3Rpb24pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrbmV4LCAnJCRvYmplY3Rpb24nLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgYm91bmRNb2RlbHM6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhpcyBtb2RlbCBjbGFzcyBoYXMgYWxyZWFkeSBiZWVuIGJvdW5kIHRvIHRoZSBnaXZlbiBrbmV4LlxuICAgIGlmIChrbmV4LiQkb2JqZWN0aW9uLmJvdW5kTW9kZWxzW01vZGVsQ2xhc3MudW5pcXVlVGFnKCldKSB7XG4gICAgICByZXR1cm4ga25leC4kJG9iamVjdGlvbi5ib3VuZE1vZGVsc1tNb2RlbENsYXNzLnVuaXF1ZVRhZygpXTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgYSBuZXcgc3ViY2xhc3Mgb2YgdGhpcyBjbGFzcy5cbiAgICBjb25zdCBCb3VuZE1vZGVsQ2xhc3MgPSBpbmhlcml0TW9kZWwoTW9kZWxDbGFzcyk7XG5cbiAgICAvLyBUaGUgYm91bmQgbW9kZWwgaXMgZXF1YWwgdG8gdGhlIHNvdXJjZSBtb2RlbCBpbiBldmVyeSB3YXkuIFdlIHdhbnQgdG8gY29weVxuICAgIC8vIHRoZSBoaWRkZW4gZGF0YSBhcy1pcyBmcm9tIHRoZSBzb3VyY2Ugc28gdGhhdCB3ZSBkb24ndCBnZXQgdGhlIHBlcmZvcm1hbmNlXG4gICAgLy8gcGVuYWx0eSBvZiBjYWxjdWxhdGluZyBhbGwgbWVtb2l6ZWQgZXRjLiB2YWx1ZXMgYWdhaW4uXG4gICAgaW5oZXJpdEhpZGRlbkRhdGEoTW9kZWxDbGFzcywgQm91bmRNb2RlbENsYXNzKTtcblxuICAgIEJvdW5kTW9kZWxDbGFzcy5rbmV4KGtuZXgpO1xuICAgIGtuZXguJCRvYmplY3Rpb24uYm91bmRNb2RlbHNbTW9kZWxDbGFzcy51bmlxdWVUYWcoKV0gPSBCb3VuZE1vZGVsQ2xhc3M7XG5cbiAgICBjb25zdCBib3VuZFJlbGF0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgY29uc3QgcmVsYXRpb25zID0gTW9kZWxDbGFzcy5nZXRSZWxhdGlvbnMoKTtcbiAgICBjb25zdCByZWxOYW1lcyA9IE9iamVjdC5rZXlzKHJlbGF0aW9ucyk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbE5hbWVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgcmVsTmFtZSA9IHJlbE5hbWVzW2ldO1xuICAgICAgY29uc3QgcmVsYXRpb24gPSByZWxhdGlvbnNbcmVsTmFtZV07XG4gICAgICBib3VuZFJlbGF0aW9uc1tyZWxOYW1lXSA9IHJlbGF0aW9uLmJpbmRLbmV4KGtuZXgpO1xuICAgIH1cblxuICAgIEJvdW5kTW9kZWxDbGFzcy5yZWxhdGlvbnMgPSBib3VuZFJlbGF0aW9ucztcbiAgICByZXR1cm4gQm91bmRNb2RlbENsYXNzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7a25leH0gdHJ4XG4gICAqIEByZXR1cm5zIHtDb25zdHJ1Y3Rvci48TW9kZWw+fVxuICAgKi9cbiAgc3RhdGljIGJpbmRUcmFuc2FjdGlvbih0cngpIHtcbiAgICByZXR1cm4gdGhpcy5iaW5kS25leCh0cngpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7TW9kZWx8T2JqZWN0fSBtb2RlbFxuICAgKiBAcGFyYW0ge01vZGVsT3B0aW9ucz19IG9wdGlvbnNcbiAgICogQHJldHVybnMge01vZGVsfVxuICAgKi9cbiAgc3RhdGljIGVuc3VyZU1vZGVsKG1vZGVsLCBvcHRpb25zKSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IHRoaXM7XG5cbiAgICBpZiAoIW1vZGVsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAobW9kZWwgaW5zdGFuY2VvZiBNb2RlbENsYXNzKSB7XG4gICAgICByZXR1cm4gbW9kZWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNb2RlbENsYXNzLmZyb21Kc29uKG1vZGVsLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48TW9kZWx8T2JqZWN0Pn0gaW5wdXRcbiAgICogQHBhcmFtIHtNb2RlbE9wdGlvbnM9fSBvcHRpb25zXG4gICAqIEByZXR1cm5zIHtBcnJheS48TW9kZWw+fVxuICAgKi9cbiAgc3RhdGljIGVuc3VyZU1vZGVsQXJyYXkoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWlucHV0KSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICBsZXQgbW9kZWxzID0gbmV3IEFycmF5KGlucHV0Lmxlbmd0aCk7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW5wdXQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIG1vZGVsc1tpXSA9IHRoaXMuZW5zdXJlTW9kZWwoaW5wdXRbaV0sIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbW9kZWxzO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RoaXMuZW5zdXJlTW9kZWwoaW5wdXQsIG9wdGlvbnMpXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldElkQ29sdW1uQXJyYXkoKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5pZENvbHVtbikpIHtcbiAgICAgIHJldHVybiB0aGlzLmlkQ29sdW1uO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3RoaXMuaWRDb2x1bW5dO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfEFycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgQG1lbW9pemVcbiAgc3RhdGljIGdldEZ1bGxJZENvbHVtbigpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmlkQ29sdW1uKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaWRDb2x1bW4ubWFwKGNvbCA9PiB0aGlzLnRhYmxlTmFtZSArICcuJyArIGNvbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnRhYmxlTmFtZSArICcuJyArIHRoaXMuaWRDb2x1bW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBnZXRJZFByb3BlcnR5QXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SWRDb2x1bW5BcnJheSgpLm1hcChjb2wgPT4gaWRDb2x1bW5Ub0lkUHJvcGVydHkodGhpcywgY29sKSk7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ3xBcnJheS48c3RyaW5nPn1cbiAgICovXG4gIEBtZW1vaXplXG4gIHN0YXRpYyBnZXRJZFByb3BlcnR5KCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuaWRDb2x1bW4pKSB7XG4gICAgICByZXR1cm4gdGhpcy5pZENvbHVtbi5tYXAoY29sID0+IGlkQ29sdW1uVG9JZFByb3BlcnR5KHRoaXMsIGNvbCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaWRDb2x1bW5Ub0lkUHJvcGVydHkodGhpcywgdGhpcy5pZENvbHVtbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBAaGlkZGVuRGF0YSgpXG4gIHN0YXRpYyBnZXQgcmVsYXRpb25zKCkge31cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIEBoaWRkZW5EYXRhKClcbiAgc3RhdGljIHNldCByZWxhdGlvbnModmFsdWUpIHt9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge09iamVjdC48c3RyaW5nLCBSZWxhdGlvbj59XG4gICAqL1xuICBzdGF0aWMgZ2V0UmVsYXRpb25zKCkge1xuICAgIGxldCByZWxhdGlvbnMgPSB0aGlzLnJlbGF0aW9ucztcblxuICAgIGlmICghcmVsYXRpb25zKSB7XG4gICAgICByZWxhdGlvbnMgPSBfLnJlZHVjZShfLnJlc3VsdCh0aGlzLCAncmVsYXRpb25NYXBwaW5ncycpLCAocmVsYXRpb25zLCBtYXBwaW5nLCByZWxhdGlvbk5hbWUpID0+IHtcbiAgICAgICAgcmVsYXRpb25zW3JlbGF0aW9uTmFtZV0gPSBuZXcgbWFwcGluZy5yZWxhdGlvbihyZWxhdGlvbk5hbWUsIHRoaXMpO1xuICAgICAgICByZWxhdGlvbnNbcmVsYXRpb25OYW1lXS5zZXRNYXBwaW5nKG1hcHBpbmcpO1xuICAgICAgICByZXR1cm4gcmVsYXRpb25zO1xuICAgICAgfSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbiAgICAgIHRoaXMucmVsYXRpb25zID0gcmVsYXRpb25zO1xuICAgIH1cblxuICAgIHJldHVybiByZWxhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7UmVsYXRpb259XG4gICAqL1xuICBzdGF0aWMgZ2V0UmVsYXRpb24obmFtZSkge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gdGhpcy5nZXRSZWxhdGlvbnMoKVtuYW1lXTtcblxuICAgIGlmICghcmVsYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQSBtb2RlbCBjbGFzcyAodGFibGVOYW1lID0gJHt0aGlzLnRhYmxlTmFtZX0pIGRvZXNuJ3QgaGF2ZSByZWxhdGlvbiAke25hbWV9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbGF0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkuPE1vZGVsfE9iamVjdD59ICRtb2RlbHNcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHByZXNzaW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0LjxzdHJpbmcsIGZ1bmN0aW9uKFF1ZXJ5QnVpbGRlcik+PX0gZmlsdGVyc1xuICAgKiBAcmV0dXJucyB7UXVlcnlCdWlsZGVyfVxuICAgKi9cbiAgc3RhdGljIGxvYWRSZWxhdGVkKCRtb2RlbHMsIGV4cHJlc3Npb24sIGZpbHRlcnMpIHtcbiAgICByZXR1cm4gdGhpc1xuICAgICAgLnF1ZXJ5KClcbiAgICAgIC5yZXNvbHZlKHRoaXMuZW5zdXJlTW9kZWxBcnJheSgkbW9kZWxzKSlcbiAgICAgIC5maW5kT3B0aW9ucyh7ZG9udENhbGxBZnRlckdldDogdHJ1ZX0pXG4gICAgICAuZWFnZXIoZXhwcmVzc2lvbiwgZmlsdGVycylcbiAgICAgIC5ydW5BZnRlcihmdW5jdGlvbiAobW9kZWxzKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KCRtb2RlbHMpID8gbW9kZWxzIDogbW9kZWxzWzBdO1xuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb25zdHJ1Y3Rvci48TW9kZWw+PX0gZmlsdGVyQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtNb2RlbHxBcnJheS48TW9kZWw+fSBtb2RlbHNcbiAgICogQHBhcmFtIHtmdW5jdGlvbihNb2RlbCwgTW9kZWwsIHN0cmluZyl9IHRyYXZlcnNlclxuICAgKiBAcmV0dXJuIHtNb2RlbH1cbiAgICovXG4gIHN0YXRpYyB0cmF2ZXJzZShmaWx0ZXJDb25zdHJ1Y3RvciwgbW9kZWxzLCB0cmF2ZXJzZXIpIHtcbiAgICBmaWx0ZXJDb25zdHJ1Y3RvciA9IGZpbHRlckNvbnN0cnVjdG9yIHx8IG51bGw7XG5cbiAgICBpZiAoXy5pc1VuZGVmaW5lZCh0cmF2ZXJzZXIpKSB7XG4gICAgICB0cmF2ZXJzZXIgPSBtb2RlbHM7XG4gICAgICBtb2RlbHMgPSBmaWx0ZXJDb25zdHJ1Y3RvcjtcbiAgICAgIGZpbHRlckNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoIV8uaXNGdW5jdGlvbih0cmF2ZXJzZXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyYXZlcnNlciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICB0cmF2ZXJzZShtb2RlbHMsIG51bGwsIG51bGwsIGZpbHRlckNvbnN0cnVjdG9yLCB0cmF2ZXJzZXIpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQHJldHVybnMge0FycmF5LjxzdHJpbmc+fVxuICAgKi9cbiAgc3RhdGljIGdldEpzb25BdHRyaWJ1dGVzKCkge1xuICAgIC8vIElmIHRoZSBqc29uQXR0cmlidXRlcyBwcm9wZXJ0eSBpcyBub3Qgc2V0LCB0cnkgdG8gY3JlYXRlIGl0IGJhc2VkXG4gICAgLy8gb24gdGhlIGpzb25TY2hlbWEuIEFsbCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG9iamVjdHMgb3IgYXJyYXlzIG11c3RcbiAgICAvLyBiZSBjb252ZXJ0ZWQgdG8gSlNPTi5cbiAgICBpZiAoIXRoaXMuanNvbkF0dHJpYnV0ZXMgJiYgdGhpcy5nZXRKc29uU2NoZW1hKCkpIHtcbiAgICAgIHRoaXMuanNvbkF0dHJpYnV0ZXMgPSBbXTtcblxuICAgICAgXy5mb3JPd24odGhpcy5nZXRKc29uU2NoZW1hKCkucHJvcGVydGllcywgKHByb3AsIHByb3BOYW1lKSA9PiB7XG4gICAgICAgIHZhciB0eXBlcyA9IF8uY29tcGFjdChlbnN1cmVBcnJheShwcm9wLnR5cGUpKTtcblxuICAgICAgICBpZiAodHlwZXMubGVuZ3RoID09PSAwICYmIEFycmF5LmlzQXJyYXkocHJvcC5hbnlPZikpIHtcbiAgICAgICAgICB0eXBlcyA9IF8uZmxhdHRlbkRlZXAoXy5tYXAocHJvcC5hbnlPZiwgJ3R5cGUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZXMubGVuZ3RoID09PSAwICYmIEFycmF5LmlzQXJyYXkocHJvcC5vbmVPZikpIHtcbiAgICAgICAgICB0eXBlcyA9IF8uZmxhdHRlbkRlZXAoXy5tYXAocHJvcC5vbmVPZiwgJ3R5cGUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5pbmNsdWRlcyh0eXBlcywgJ29iamVjdCcpIHx8IF8uaW5jbHVkZXModHlwZXMsICdhcnJheScpKSB7XG4gICAgICAgICAgdGhpcy5qc29uQXR0cmlidXRlcy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuanNvbkF0dHJpYnV0ZXMpKSB7XG4gICAgICB0aGlzLmpzb25BdHRyaWJ1dGVzID0gW107XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuanNvbkF0dHJpYnV0ZXM7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5zdXJlQXJyYXkob2JqKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBbb2JqXTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0cmF2ZXJzZShtb2RlbHMsIHBhcmVudCwgcmVsYXRpb25OYW1lLCBtb2RlbENsYXNzLCBjYWxsYmFjaykge1xuICBpZiAoIV8uaXNPYmplY3QobW9kZWxzKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KG1vZGVscykpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG1vZGVscy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIHRyYXZlcnNlT25lKG1vZGVsc1tpXSwgcGFyZW50LCByZWxhdGlvbk5hbWUsIG1vZGVsQ2xhc3MsIGNhbGxiYWNrKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdHJhdmVyc2VPbmUobW9kZWxzLCBwYXJlbnQsIHJlbGF0aW9uTmFtZSwgbW9kZWxDbGFzcywgY2FsbGJhY2spXG4gIH1cbn1cblxuZnVuY3Rpb24gdHJhdmVyc2VPbmUobW9kZWwsIHBhcmVudCwgcmVsYXRpb25OYW1lLCBtb2RlbENsYXNzLCBjYWxsYmFjaykge1xuICBpZiAoIShtb2RlbCBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghbW9kZWxDbGFzcyB8fCBtb2RlbCBpbnN0YW5jZW9mIG1vZGVsQ2xhc3MpIHtcbiAgICBjYWxsYmFjayhtb2RlbCwgcGFyZW50LCByZWxhdGlvbk5hbWUpO1xuICB9XG5cbiAgY29uc3QgcmVsYXRpb25zID0gbW9kZWwuY29uc3RydWN0b3IuZ2V0UmVsYXRpb25zKCk7XG4gIGNvbnN0IHJlbE5hbWVzID0gT2JqZWN0LmtleXMocmVsYXRpb25zKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbE5hbWVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IHJlbE5hbWUgPSByZWxOYW1lc1tpXTtcblxuICAgIGlmIChtb2RlbC5oYXNPd25Qcm9wZXJ0eShyZWxOYW1lKSkge1xuICAgICAgdHJhdmVyc2UobW9kZWxbcmVsTmFtZV0sIG1vZGVsLCByZWxOYW1lLCBtb2RlbENsYXNzLCBjYWxsYmFjayk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlkQ29sdW1uVG9JZFByb3BlcnR5KE1vZGVsQ2xhc3MsIGlkQ29sdW1uKSB7XG4gIGxldCBpZFByb3BlcnR5ID0gTW9kZWxDbGFzcy5jb2x1bW5OYW1lVG9Qcm9wZXJ0eU5hbWUoaWRDb2x1bW4pO1xuXG4gIGlmICghaWRQcm9wZXJ0eSkge1xuICAgIHRocm93IG5ldyBFcnJvcihNb2RlbENsYXNzLnRhYmxlTmFtZSArICcuJHBhcnNlRGF0YWJhc2VKc29uIHByb2JhYmx5IGNoYW5nZXMgdGhlIHZhbHVlIG9mIHRoZSBpZCBjb2x1bW4gYCcgKyBpZENvbHVtbiArICdgIHdoaWNoIGlzIGEgbm8tbm8uJyk7XG4gIH1cblxuICByZXR1cm4gaWRQcm9wZXJ0eTtcbn1cblxuZnVuY3Rpb24gc2V0SWQobW9kZWwsIGlkKSB7XG4gIGNvbnN0IGlkUHJvcCA9IG1vZGVsLmNvbnN0cnVjdG9yLmdldElkUHJvcGVydHkoKTtcbiAgY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkoaWRQcm9wKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShpZCkpIHtcbiAgICBpZiAoaXNBcnJheSkge1xuICAgICAgaWYgKGlkLmxlbmd0aCAhPT0gaWRQcm9wLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3RyeWluZyB0byBzZXQgYW4gaW52YWxpZCBpZGVudGlmaWVyIGZvciBhIG1vZGVsJyk7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaWQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbW9kZWxbaWRQcm9wW2ldXSA9IGlkW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaWQubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJ5aW5nIHRvIHNldCBhbiBpbnZhbGlkIGlkZW50aWZpZXIgZm9yIGEgbW9kZWwnKTtcbiAgICAgIH1cblxuICAgICAgbW9kZWxbaWRQcm9wXSA9IGlkWzBdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNBcnJheSkge1xuICAgICAgaWYgKGlkUHJvcC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJ5aW5nIHRvIHNldCBhbiBpbnZhbGlkIGlkZW50aWZpZXIgZm9yIGEgbW9kZWwnKTtcbiAgICAgIH1cblxuICAgICAgbW9kZWxbaWRQcm9wWzBdXSA9IGlkO1xuICAgIH0gZWxzZSB7XG4gICAgICBtb2RlbFtpZFByb3BdID0gaWQ7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGdldElkKG1vZGVsKSB7XG4gIGNvbnN0IGlkUHJvcCA9IG1vZGVsLmNvbnN0cnVjdG9yLmdldElkUHJvcGVydHkoKTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShpZFByb3ApKSB7XG4gICAgcmV0dXJuIG1vZGVsLiR2YWx1ZXMoaWRQcm9wKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbW9kZWxbaWRQcm9wXTtcbiAgfVxufVxuIl19
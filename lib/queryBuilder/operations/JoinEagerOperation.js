'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _EagerOperation2 = require('./EagerOperation');

var _EagerOperation3 = _interopRequireDefault(_EagerOperation2);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnInfo = (0, _create2.default)(null);
var idLengthLimit = 63;
var relationRecursionLimit = 64;

var JoinEagerOperation = function (_EagerOperation) {
  (0, _inherits3.default)(JoinEagerOperation, _EagerOperation);

  function JoinEagerOperation(name, opt) {
    (0, _classCallCheck3.default)(this, JoinEagerOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _EagerOperation.call(this, name, opt));

    _this.allRelations = null;
    _this.rootModelClass = null;
    _this.pathInfo = (0, _create2.default)(null);
    _this.encodings = (0, _create2.default)(null);
    _this.decodings = (0, _create2.default)(null);
    _this.encIdx = 0;
    _this.opt = _lodash2.default.defaults(opt, {
      minimize: false,
      separator: ':',
      aliases: {}
    });
    return _this;
  }

  JoinEagerOperation.prototype.clone = function clone() {
    var copy = _EagerOperation.prototype.clone.call(this);

    copy.allRelations = this.allRelations;
    copy.allModelClasses = this.allModelClasses;
    copy.rootModelClass = this.rootModelClass;
    copy.pathInfo = this.pathInfo;
    copy.encodings = this.encodings;
    copy.decodings = this.decodings;
    copy.encIdx = this.encIdx;

    return this;
  };

  JoinEagerOperation.prototype.call = function call(builder, args) {
    var ret = _EagerOperation.prototype.call.call(this, builder, args);
    var ModelClass = builder.modelClass();

    if (ret) {
      this.rootModelClass = ModelClass;
      this.allModelClasses = findAllModels(this.expression, ModelClass);
      this.allRelations = findAllRelations(this.expression, ModelClass);
    }

    return ret;
  };

  JoinEagerOperation.prototype.onBeforeInternal = function onBeforeInternal(builder) {
    return fetchColumnInfo(builder, this.allModelClasses);
  };

  JoinEagerOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var builderClone = builder.clone();

    builder.table(this.rootModelClass.tableName + ' as ' + this.rootModelClass.tableName);
    builder.findOptions({ callAfterGetDeeply: true });

    this.build({
      expr: this.expression,
      builder: builder,
      modelClass: builder.modelClass(),
      parentInfo: null,
      relation: null,
      path: '',
      selectFilter: function selectFilter(col) {
        return builderClone.hasSelection(col);
      }
    });
  };

  JoinEagerOperation.prototype.onRawResult = function onRawResult(builder, rows) {
    if (_lodash2.default.isEmpty(rows)) {
      return rows;
    }

    var keyInfoByPath = this.createKeyInfo(rows);
    var pathInfo = _lodash2.default.values(this.pathInfo);

    var tree = (0, _create2.default)(null);
    var stack = (0, _create2.default)(null);

    for (var i = 0, lr = rows.length; i < lr; ++i) {
      var row = rows[i];
      var curBranch = tree;

      for (var j = 0, lp = pathInfo.length; j < lp; ++j) {
        var pInfo = pathInfo[j];
        var id = pInfo.idGetter(row);

        if (!id) {
          break;
        }

        if (pInfo.relation) {
          var parentModel = stack[pInfo.encParentPath];

          curBranch = pInfo.getBranch(parentModel);

          if (!curBranch) {
            curBranch = pInfo.createBranch(parentModel);
          }
        }

        var model = pInfo.getModelFromBranch(curBranch, id);

        if (!model) {
          model = createModel(row, pInfo, keyInfoByPath);
          pInfo.setModelToBranch(curBranch, id, model);
        }

        stack[pInfo.encPath] = model;
      }
    }

    return this.finalize(pathInfo[0], _lodash2.default.values(tree));
  };

  JoinEagerOperation.prototype.createKeyInfo = function createKeyInfo(rows) {
    var keys = (0, _keys2.default)(rows[0]);
    var keyInfo = [];

    for (var i = 0, l = keys.length; i < l; ++i) {
      var key = keys[i];
      var sepIdx = key.lastIndexOf(this.sep);

      if (sepIdx === -1) {
        var pInfo = this.pathInfo[''];
        var col = key;

        if (!pInfo.omitCols[col]) {
          keyInfo.push({
            pInfo: pInfo,
            key: key,
            col: col
          });
        }
      } else {
        var encPath = key.substr(0, sepIdx);
        var path = this.decode(encPath);
        var _col = key.substr(sepIdx + 1);
        var _pInfo = this.pathInfo[path];

        if (!_pInfo.omitCols[_col]) {
          keyInfo.push({
            pInfo: _pInfo,
            key: key,
            col: _col
          });
        }
      }
    }

    return _lodash2.default.groupBy(keyInfo, function (kInfo) {
      return kInfo.pInfo.encPath;
    });
  };

  JoinEagerOperation.prototype.finalize = function finalize(pInfo, models) {
    var relNames = (0, _keys2.default)(pInfo.children);

    if (Array.isArray(models)) {
      for (var m = 0, lm = models.length; m < lm; ++m) {
        this.finalizeOne(pInfo, relNames, models[m]);
      }
    } else {
      this.finalizeOne(pInfo, relNames, models);
    }

    return models;
  };

  JoinEagerOperation.prototype.finalizeOne = function finalizeOne(pInfo, relNames, model) {
    for (var r = 0, lr = relNames.length; r < lr; ++r) {
      var relName = relNames[r];
      var branch = model[relName];
      var childPathInfo = pInfo.children[relName];

      var finalized = childPathInfo.finalizeBranch(branch, model);
      this.finalize(childPathInfo, finalized);
    }
  };

  JoinEagerOperation.prototype.build = function build(_ref) {
    var _this2 = this;

    var expr = _ref.expr,
        builder = _ref.builder,
        selectFilter = _ref.selectFilter,
        modelClass = _ref.modelClass,
        relation = _ref.relation,
        path = _ref.path,
        parentInfo = _ref.parentInfo;

    var info = this.createPathInfo({
      modelClass: modelClass,
      path: path,
      relation: relation,
      parentInfo: parentInfo
    });

    this.pathInfo[path] = info;

    this.buildSelects({
      builder: builder,
      selectFilter: selectFilter,
      modelClass: modelClass,
      relation: relation,
      info: info
    });

    forEachExpr(expr, modelClass, function (childExpr, relation) {
      var nextPath = _this2.joinPath(path, relation.name);
      var encNextPath = _this2.encode(nextPath);
      var encJoinTablePath = relation.joinTable ? _this2.encode(joinTableForPath(nextPath)) : null;

      var filterQuery = createFilterQuery({
        builder: builder,
        relation: relation,
        expr: childExpr
      });

      var relatedJoinSelectQuery = createRelatedJoinFromQuery({
        filterQuery: filterQuery,
        relation: relation,
        allRelations: _this2.allRelations
      });

      relation.join(builder, {
        joinOperation: 'leftJoin',
        ownerTable: info.encPath,
        relatedTableAlias: encNextPath,
        joinTableAlias: encJoinTablePath,
        relatedJoinSelectQuery: relatedJoinSelectQuery
      });

      // Apply relation.modify since it may also contains selections. Don't move this
      // to the createFilterQuery function because relatedJoinSelectQuery is cloned
      // From the return value of that function and we don't want relation.modify
      // to be called twice for it.
      filterQuery.modify(relation.modify);

      _this2.build({
        expr: childExpr,
        builder: builder,
        modelClass: relation.relatedModelClass,
        relation: relation,
        parentInfo: info,
        path: nextPath,
        selectFilter: function selectFilter(col) {
          return filterQuery.hasSelection(col);
        }
      });
    });
  };

  JoinEagerOperation.prototype.createPathInfo = function createPathInfo(_ref2) {
    var modelClass = _ref2.modelClass,
        path = _ref2.path,
        relation = _ref2.relation,
        parentInfo = _ref2.parentInfo;

    var encPath = this.encode(path);
    var info = void 0;

    if (relation && relation.isOneToOne()) {
      info = new OneToOnePathInfo();
    } else {
      info = new PathInfo();
    }

    info.path = path;
    info.encPath = encPath;
    info.parentPath = parentInfo && parentInfo.path;
    info.encParentPath = parentInfo && parentInfo.encPath;
    info.modelClass = modelClass;
    info.relation = relation;
    info.idGetter = this.createIdGetter(modelClass, encPath);

    if (parentInfo) {
      parentInfo.children[relation.name] = info;
    }

    return info;
  };

  JoinEagerOperation.prototype.buildSelects = function buildSelects(_ref3) {
    var _this3 = this;

    var builder = _ref3.builder,
        selectFilter = _ref3.selectFilter,
        modelClass = _ref3.modelClass,
        relation = _ref3.relation,
        info = _ref3.info;

    var selects = [];
    var idCols = modelClass.getIdColumnArray();
    var rootTable = this.rootModelClass.tableName;

    columnInfo[modelClass.tableName].columns.forEach(function (col) {
      var filterPassed = selectFilter(col);
      var isIdColumn = idCols.indexOf(col) !== -1;

      if (filterPassed || isIdColumn) {
        selects.push({
          col: (info.encPath || rootTable) + '.' + col,
          alias: _this3.joinPath(info.encPath, col)
        });

        if (!filterPassed) {
          info.omitCols[col] = true;
        }
      }
    });

    if (relation && relation.joinTableExtras) {
      (function () {
        var joinTable = _this3.encode(joinTableForPath(info.path));

        relation.joinTableExtras.forEach(function (extra) {
          if (selectFilter(extra.joinTableCol)) {
            selects.push({
              col: joinTable + '.' + extra.joinTableCol,
              alias: _this3.joinPath(info.encPath, extra.aliasCol)
            });
          }
        });
      })();
    }

    var tooLongAliases = selects.filter(function (select) {
      return select.alias.length > idLengthLimit;
    });

    if (tooLongAliases.length) {
      throw new _ValidationError2.default({
        eager: 'identifier ' + tooLongAliases[0].alias + ' is over ' + idLengthLimit + ' characters long ' + 'and would be truncated by the database engine.'
      });
    }

    builder.select(selects.map(function (select) {
      return select.col + ' as ' + select.alias;
    }));
  };

  JoinEagerOperation.prototype.encode = function encode(path) {
    var _this4 = this;

    if (!this.opt.minimize) {
      var encPath = this.encodings[path];

      if (!encPath) {
        var parts = path.split(this.sep);

        // Don't encode the root.
        if (!path) {
          encPath = path;
        } else {
          encPath = parts.map(function (part) {
            return _this4.opt.aliases[part] || part;
          }).join(this.sep);
        }

        this.encodings[path] = encPath;
        this.decodings[encPath] = path;
      }

      return encPath;
    } else {
      var _encPath = this.encodings[path];

      if (!_encPath) {
        // Don't encode the root.
        if (!path) {
          _encPath = path;
        } else {
          _encPath = this.nextEncodedPath();
        }

        this.encodings[path] = _encPath;
        this.decodings[_encPath] = path;
      }

      return _encPath;
    }
  };

  JoinEagerOperation.prototype.decode = function decode(path) {
    return this.decodings[path];
  };

  JoinEagerOperation.prototype.nextEncodedPath = function nextEncodedPath() {
    return '_t' + ++this.encIdx;
  };

  JoinEagerOperation.prototype.createIdGetter = function createIdGetter(modelClass, path) {
    var _this5 = this;

    var idCols = modelClass.getIdColumnArray().map(function (col) {
      return _this5.joinPath(path, col);
    });

    if (idCols.length === 1) {
      return createSingleIdGetter(idCols);
    } else if (idCols.length === 2) {
      return createTwoIdGetter(idCols);
    } else if (idCols.length === 3) {
      return createThreeIdGetter(idCols);
    } else {
      return createNIdGetter(idCols);
    }
  };

  JoinEagerOperation.prototype.joinPath = function joinPath(path, nextPart) {
    if (path) {
      return '' + path + this.sep + nextPart;
    } else {
      return nextPart;
    }
  };

  (0, _createClass3.default)(JoinEagerOperation, [{
    key: 'sep',
    get: function get() {
      return this.opt.separator;
    }
  }]);
  return JoinEagerOperation;
}(_EagerOperation3.default);

exports.default = JoinEagerOperation;


function findAllModels(expr, modelClass) {
  var models = [];

  findAllModelsImpl(expr, modelClass, models);

  return _lodash2.default.uniqBy(models, 'tableName');
}

function findAllModelsImpl(expr, modelClass, models) {
  models.push(modelClass);

  forEachExpr(expr, modelClass, function (childExpr, relation) {
    findAllModelsImpl(childExpr, relation.relatedModelClass, models);
  });
}

function findAllRelations(expr, modelClass) {
  var relations = [];

  findAllRelationsImpl(expr, modelClass, relations);

  return _lodash2.default.uniqWith(relations, function (lhs, rhs) {
    return lhs === rhs;
  });
}

function findAllRelationsImpl(expr, modelClass, relations) {
  forEachExpr(expr, modelClass, function (childExpr, relation) {
    relations.push(relation);

    findAllRelationsImpl(childExpr, relation.relatedModelClass, relations);
  });
}

function fetchColumnInfo(builder, models) {
  var knex = builder.knex();

  return _bluebird2.default.all(models.map(function (ModelClass) {
    var table = ModelClass.tableName;

    if (columnInfo[table]) {
      return columnInfo[table];
    } else {
      columnInfo[table] = knex(table).columnInfo().then(function (info) {
        var result = {
          columns: (0, _keys2.default)(info)
        };

        columnInfo[table] = result;
        return result;
      });

      return columnInfo[table];
    }
  }));
}

function forEachExpr(expr, modelClass, callback) {
  var relations = modelClass.getRelations();
  var relNames = (0, _keys2.default)(relations);

  if (expr.isAllRecursive() || expr.maxRecursionDepth() > relationRecursionLimit) {
    throw new _ValidationError2.default({
      eager: 'recursion depth of eager expression ' + expr.toString() + ' too big for JoinEagerAlgorithm'
    });
  }

  for (var i = 0, l = relNames.length; i < l; ++i) {
    var relName = relNames[i];
    var relation = relations[relName];
    var childExpr = expr.childExpression(relation.name);

    if (childExpr) {
      callback(childExpr, relation, relName);
    }
  }
}

function createSingleIdGetter(idCols) {
  var idCol = idCols[0];

  return function (row) {
    var val = row[idCol];

    if (!val) {
      return null;
    } else {
      return val;
    }
  };
}

function createTwoIdGetter(idCols) {
  var idCol1 = idCols[0];
  var idCol2 = idCols[1];

  return function (row) {
    var val1 = row[idCol1];
    var val2 = row[idCol2];

    if (!val1 || !val2) {
      return null;
    } else {
      return val1 + ',' + val2;
    }
  };
}

function createThreeIdGetter(idCols) {
  var idCol1 = idCols[0];
  var idCol2 = idCols[1];
  var idCol3 = idCols[2];

  return function (row) {
    var val1 = row[idCol1];
    var val2 = row[idCol2];
    var val3 = row[idCol3];

    if (!val1 || !val2 || !val3) {
      return null;
    } else {
      return val1 + ',' + val2 + ',' + val3;
    }
  };
}

function createNIdGetter(idCols) {
  return function (row) {
    var id = '';

    for (var i = 0, l = idCols.length; i < l; ++i) {
      var val = row[idCols[i]];

      if (!val) {
        return null;
      }

      id += (i > 0 ? ',' : '') + val;
    }

    return id;
  };
}

function createFilterQuery(_ref4) {
  var builder = _ref4.builder,
      expr = _ref4.expr,
      relation = _ref4.relation;

  var filterQuery = relation.relatedModelClass.query().childQueryOf(builder);

  for (var i = 0, l = expr.args.length; i < l; ++i) {
    var filterName = expr.args[i];
    var filter = expr.filters[filterName];

    if (typeof filter !== 'function') {
      throw new _ValidationError2.default({ eager: 'could not find filter "' + filterName + '" for relation "' + relation.name + '"' });
    }

    filter(filterQuery);
  }

  return filterQuery;
}

function createRelatedJoinFromQuery(_ref5) {
  var filterQuery = _ref5.filterQuery,
      relation = _ref5.relation,
      allRelations = _ref5.allRelations;

  var relatedJoinFromQuery = filterQuery.clone();

  var allForeignKeys = findAllForeignKeysForModel({
    modelClass: relation.relatedModelClass,
    allRelations: allRelations
  });

  return relatedJoinFromQuery.select(allForeignKeys.filter(function (col) {
    return !relatedJoinFromQuery.hasSelection(col);
  }));
}

function findAllForeignKeysForModel(_ref6) {
  var modelClass = _ref6.modelClass,
      allRelations = _ref6.allRelations;

  var foreignKeys = modelClass.getIdColumnArray().slice();

  allRelations.forEach(function (rel) {
    if (rel.relatedModelClass.tableName === modelClass.tableName) {
      rel.relatedCol.forEach(function (col) {
        return foreignKeys.push(col);
      });
    }

    if (rel.ownerModelClass.tableName === modelClass.tableName) {
      rel.ownerCol.forEach(function (col) {
        return foreignKeys.push(col);
      });
    }
  });

  return _lodash2.default.uniq(foreignKeys);
}

function createModel(row, pInfo, keyInfoByPath) {
  var keyInfo = keyInfoByPath[pInfo.encPath];
  var json = {};

  for (var k = 0, lk = keyInfo.length; k < lk; ++k) {
    var kInfo = keyInfo[k];
    json[kInfo.col] = row[kInfo.key];
  }

  return pInfo.modelClass.fromDatabaseJson(json);
}

function joinTableForPath(path) {
  return path + '_join';
}

var PathInfo = function () {
  function PathInfo() {
    (0, _classCallCheck3.default)(this, PathInfo);

    this.path = null;
    this.encPath = null;
    this.encParentPath = null;
    this.modelClass = null;
    this.relation = null;
    this.omitCols = (0, _create2.default)(null);
    this.children = (0, _create2.default)(null);
    this.idGetter = null;
  }

  PathInfo.prototype.createBranch = function createBranch(parentModel) {
    var branch = (0, _create2.default)(null);
    parentModel[this.relation.name] = branch;
    return branch;
  };

  PathInfo.prototype.getBranch = function getBranch(parentModel) {
    return parentModel[this.relation.name];
  };

  PathInfo.prototype.getModelFromBranch = function getModelFromBranch(branch, id) {
    return branch[id];
  };

  PathInfo.prototype.setModelToBranch = function setModelToBranch(branch, id, model) {
    branch[id] = model;
  };

  PathInfo.prototype.finalizeBranch = function finalizeBranch(branch, parentModel) {
    var relModels = _lodash2.default.values(branch);
    parentModel[this.relation.name] = relModels;
    return relModels;
  };

  return PathInfo;
}();

var OneToOnePathInfo = function (_PathInfo) {
  (0, _inherits3.default)(OneToOnePathInfo, _PathInfo);

  function OneToOnePathInfo() {
    (0, _classCallCheck3.default)(this, OneToOnePathInfo);
    return (0, _possibleConstructorReturn3.default)(this, _PathInfo.apply(this, arguments));
  }

  OneToOnePathInfo.prototype.createBranch = function createBranch(parentModel) {
    return parentModel;
  };

  OneToOnePathInfo.prototype.getBranch = function getBranch(parentModel) {
    return parentModel;
  };

  OneToOnePathInfo.prototype.getModelFromBranch = function getModelFromBranch(branch, id) {
    return branch[this.relation.name];
  };

  OneToOnePathInfo.prototype.setModelToBranch = function setModelToBranch(branch, id, model) {
    branch[this.relation.name] = model;
  };

  OneToOnePathInfo.prototype.finalizeBranch = function finalizeBranch(branch, parentModel) {
    parentModel[this.relation.name] = branch || null;
    return branch || null;
  };

  return OneToOnePathInfo;
}(PathInfo);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkpvaW5FYWdlck9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJjb2x1bW5JbmZvIiwiaWRMZW5ndGhMaW1pdCIsInJlbGF0aW9uUmVjdXJzaW9uTGltaXQiLCJKb2luRWFnZXJPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwiYWxsUmVsYXRpb25zIiwicm9vdE1vZGVsQ2xhc3MiLCJwYXRoSW5mbyIsImVuY29kaW5ncyIsImRlY29kaW5ncyIsImVuY0lkeCIsImRlZmF1bHRzIiwibWluaW1pemUiLCJzZXBhcmF0b3IiLCJhbGlhc2VzIiwiY2xvbmUiLCJjb3B5IiwiYWxsTW9kZWxDbGFzc2VzIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0IiwiTW9kZWxDbGFzcyIsIm1vZGVsQ2xhc3MiLCJmaW5kQWxsTW9kZWxzIiwiZXhwcmVzc2lvbiIsImZpbmRBbGxSZWxhdGlvbnMiLCJvbkJlZm9yZUludGVybmFsIiwiZmV0Y2hDb2x1bW5JbmZvIiwib25CZWZvcmVCdWlsZCIsImJ1aWxkZXJDbG9uZSIsInRhYmxlIiwidGFibGVOYW1lIiwiZmluZE9wdGlvbnMiLCJjYWxsQWZ0ZXJHZXREZWVwbHkiLCJidWlsZCIsImV4cHIiLCJwYXJlbnRJbmZvIiwicmVsYXRpb24iLCJwYXRoIiwic2VsZWN0RmlsdGVyIiwiY29sIiwiaGFzU2VsZWN0aW9uIiwib25SYXdSZXN1bHQiLCJyb3dzIiwiaXNFbXB0eSIsImtleUluZm9CeVBhdGgiLCJjcmVhdGVLZXlJbmZvIiwidmFsdWVzIiwidHJlZSIsInN0YWNrIiwiaSIsImxyIiwibGVuZ3RoIiwicm93IiwiY3VyQnJhbmNoIiwiaiIsImxwIiwicEluZm8iLCJpZCIsImlkR2V0dGVyIiwicGFyZW50TW9kZWwiLCJlbmNQYXJlbnRQYXRoIiwiZ2V0QnJhbmNoIiwiY3JlYXRlQnJhbmNoIiwibW9kZWwiLCJnZXRNb2RlbEZyb21CcmFuY2giLCJjcmVhdGVNb2RlbCIsInNldE1vZGVsVG9CcmFuY2giLCJlbmNQYXRoIiwiZmluYWxpemUiLCJrZXlzIiwia2V5SW5mbyIsImwiLCJrZXkiLCJzZXBJZHgiLCJsYXN0SW5kZXhPZiIsInNlcCIsIm9taXRDb2xzIiwicHVzaCIsInN1YnN0ciIsImRlY29kZSIsImdyb3VwQnkiLCJrSW5mbyIsIm1vZGVscyIsInJlbE5hbWVzIiwiY2hpbGRyZW4iLCJBcnJheSIsImlzQXJyYXkiLCJtIiwibG0iLCJmaW5hbGl6ZU9uZSIsInIiLCJyZWxOYW1lIiwiYnJhbmNoIiwiY2hpbGRQYXRoSW5mbyIsImZpbmFsaXplZCIsImZpbmFsaXplQnJhbmNoIiwiaW5mbyIsImNyZWF0ZVBhdGhJbmZvIiwiYnVpbGRTZWxlY3RzIiwiZm9yRWFjaEV4cHIiLCJjaGlsZEV4cHIiLCJuZXh0UGF0aCIsImpvaW5QYXRoIiwiZW5jTmV4dFBhdGgiLCJlbmNvZGUiLCJlbmNKb2luVGFibGVQYXRoIiwiam9pblRhYmxlIiwiam9pblRhYmxlRm9yUGF0aCIsImZpbHRlclF1ZXJ5IiwiY3JlYXRlRmlsdGVyUXVlcnkiLCJyZWxhdGVkSm9pblNlbGVjdFF1ZXJ5IiwiY3JlYXRlUmVsYXRlZEpvaW5Gcm9tUXVlcnkiLCJqb2luIiwiam9pbk9wZXJhdGlvbiIsIm93bmVyVGFibGUiLCJyZWxhdGVkVGFibGVBbGlhcyIsImpvaW5UYWJsZUFsaWFzIiwibW9kaWZ5IiwicmVsYXRlZE1vZGVsQ2xhc3MiLCJpc09uZVRvT25lIiwiT25lVG9PbmVQYXRoSW5mbyIsIlBhdGhJbmZvIiwicGFyZW50UGF0aCIsImNyZWF0ZUlkR2V0dGVyIiwic2VsZWN0cyIsImlkQ29scyIsImdldElkQ29sdW1uQXJyYXkiLCJyb290VGFibGUiLCJjb2x1bW5zIiwiZm9yRWFjaCIsImZpbHRlclBhc3NlZCIsImlzSWRDb2x1bW4iLCJpbmRleE9mIiwiYWxpYXMiLCJqb2luVGFibGVFeHRyYXMiLCJleHRyYSIsImpvaW5UYWJsZUNvbCIsImFsaWFzQ29sIiwidG9vTG9uZ0FsaWFzZXMiLCJmaWx0ZXIiLCJzZWxlY3QiLCJlYWdlciIsIm1hcCIsInBhcnRzIiwic3BsaXQiLCJwYXJ0IiwibmV4dEVuY29kZWRQYXRoIiwiY3JlYXRlU2luZ2xlSWRHZXR0ZXIiLCJjcmVhdGVUd29JZEdldHRlciIsImNyZWF0ZVRocmVlSWRHZXR0ZXIiLCJjcmVhdGVOSWRHZXR0ZXIiLCJuZXh0UGFydCIsImZpbmRBbGxNb2RlbHNJbXBsIiwidW5pcUJ5IiwicmVsYXRpb25zIiwiZmluZEFsbFJlbGF0aW9uc0ltcGwiLCJ1bmlxV2l0aCIsImxocyIsInJocyIsImtuZXgiLCJhbGwiLCJ0aGVuIiwicmVzdWx0IiwiY2FsbGJhY2siLCJnZXRSZWxhdGlvbnMiLCJpc0FsbFJlY3Vyc2l2ZSIsIm1heFJlY3Vyc2lvbkRlcHRoIiwidG9TdHJpbmciLCJjaGlsZEV4cHJlc3Npb24iLCJpZENvbCIsInZhbCIsImlkQ29sMSIsImlkQ29sMiIsInZhbDEiLCJ2YWwyIiwiaWRDb2wzIiwidmFsMyIsInF1ZXJ5IiwiY2hpbGRRdWVyeU9mIiwiZmlsdGVyTmFtZSIsImZpbHRlcnMiLCJyZWxhdGVkSm9pbkZyb21RdWVyeSIsImFsbEZvcmVpZ25LZXlzIiwiZmluZEFsbEZvcmVpZ25LZXlzRm9yTW9kZWwiLCJmb3JlaWduS2V5cyIsInNsaWNlIiwicmVsIiwicmVsYXRlZENvbCIsIm93bmVyTW9kZWxDbGFzcyIsIm93bmVyQ29sIiwidW5pcSIsImpzb24iLCJrIiwibGsiLCJmcm9tRGF0YWJhc2VKc29uIiwicmVsTW9kZWxzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGFBQWEsc0JBQWMsSUFBZCxDQUFuQjtBQUNBLElBQU1DLGdCQUFnQixFQUF0QjtBQUNBLElBQU1DLHlCQUF5QixFQUEvQjs7SUFFcUJDLGtCOzs7QUFFbkIsOEJBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDJCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JC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cmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBFYWdlck9wZXJhdGlvbiBmcm9tICcuL0VhZ2VyT3BlcmF0aW9uJztcbmltcG9ydCBWYWxpZGF0aW9uRXJyb3IgZnJvbSAnLi4vLi4vbW9kZWwvVmFsaWRhdGlvbkVycm9yJztcblxuY29uc3QgY29sdW1uSW5mbyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5jb25zdCBpZExlbmd0aExpbWl0ID0gNjM7XG5jb25zdCByZWxhdGlvblJlY3Vyc2lvbkxpbWl0ID0gNjQ7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEpvaW5FYWdlck9wZXJhdGlvbiBleHRlbmRzIEVhZ2VyT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5hbGxSZWxhdGlvbnMgPSBudWxsO1xuICAgIHRoaXMucm9vdE1vZGVsQ2xhc3MgPSBudWxsO1xuICAgIHRoaXMucGF0aEluZm8gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuZW5jb2RpbmdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLmRlY29kaW5ncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5lbmNJZHggPSAwO1xuICAgIHRoaXMub3B0ID0gXy5kZWZhdWx0cyhvcHQsIHtcbiAgICAgIG1pbmltaXplOiBmYWxzZSxcbiAgICAgIHNlcGFyYXRvcjogJzonLFxuICAgICAgYWxpYXNlczoge31cbiAgICB9KTtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIGNvbnN0IGNvcHkgPSBzdXBlci5jbG9uZSgpO1xuXG4gICAgY29weS5hbGxSZWxhdGlvbnMgPSB0aGlzLmFsbFJlbGF0aW9ucztcbiAgICBjb3B5LmFsbE1vZGVsQ2xhc3NlcyA9IHRoaXMuYWxsTW9kZWxDbGFzc2VzO1xuICAgIGNvcHkucm9vdE1vZGVsQ2xhc3MgPSB0aGlzLnJvb3RNb2RlbENsYXNzO1xuICAgIGNvcHkucGF0aEluZm8gPSB0aGlzLnBhdGhJbmZvO1xuICAgIGNvcHkuZW5jb2RpbmdzID0gdGhpcy5lbmNvZGluZ3M7XG4gICAgY29weS5kZWNvZGluZ3MgPSB0aGlzLmRlY29kaW5ncztcbiAgICBjb3B5LmVuY0lkeCA9IHRoaXMuZW5jSWR4O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICBjb25zdCByZXQgPSBzdXBlci5jYWxsKGJ1aWxkZXIsIGFyZ3MpO1xuICAgIGNvbnN0IE1vZGVsQ2xhc3MgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKTtcblxuICAgIGlmIChyZXQpIHtcbiAgICAgIHRoaXMucm9vdE1vZGVsQ2xhc3MgPSBNb2RlbENsYXNzO1xuICAgICAgdGhpcy5hbGxNb2RlbENsYXNzZXMgPSBmaW5kQWxsTW9kZWxzKHRoaXMuZXhwcmVzc2lvbiwgTW9kZWxDbGFzcyk7XG4gICAgICB0aGlzLmFsbFJlbGF0aW9ucyA9IGZpbmRBbGxSZWxhdGlvbnModGhpcy5leHByZXNzaW9uLCBNb2RlbENsYXNzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgb25CZWZvcmVJbnRlcm5hbChidWlsZGVyKSB7XG4gICAgcmV0dXJuIGZldGNoQ29sdW1uSW5mbyhidWlsZGVyLCB0aGlzLmFsbE1vZGVsQ2xhc3Nlcyk7XG4gIH1cblxuICBvbkJlZm9yZUJ1aWxkKGJ1aWxkZXIpIHtcbiAgICBjb25zdCBidWlsZGVyQ2xvbmUgPSBidWlsZGVyLmNsb25lKCk7XG5cbiAgICBidWlsZGVyLnRhYmxlKGAke3RoaXMucm9vdE1vZGVsQ2xhc3MudGFibGVOYW1lfSBhcyAke3RoaXMucm9vdE1vZGVsQ2xhc3MudGFibGVOYW1lfWApO1xuICAgIGJ1aWxkZXIuZmluZE9wdGlvbnMoe2NhbGxBZnRlckdldERlZXBseTogdHJ1ZX0pO1xuXG4gICAgdGhpcy5idWlsZCh7XG4gICAgICBleHByOiB0aGlzLmV4cHJlc3Npb24sXG4gICAgICBidWlsZGVyOiBidWlsZGVyLFxuICAgICAgbW9kZWxDbGFzczogYnVpbGRlci5tb2RlbENsYXNzKCksXG4gICAgICBwYXJlbnRJbmZvOiBudWxsLFxuICAgICAgcmVsYXRpb246IG51bGwsXG4gICAgICBwYXRoOiAnJyxcbiAgICAgIHNlbGVjdEZpbHRlcjogKGNvbCkgPT4ge1xuICAgICAgICByZXR1cm4gYnVpbGRlckNsb25lLmhhc1NlbGVjdGlvbihjb2wpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25SYXdSZXN1bHQoYnVpbGRlciwgcm93cykge1xuICAgIGlmIChfLmlzRW1wdHkocm93cykpIHtcbiAgICAgIHJldHVybiByb3dzO1xuICAgIH1cblxuICAgIGNvbnN0IGtleUluZm9CeVBhdGggPSB0aGlzLmNyZWF0ZUtleUluZm8ocm93cyk7XG4gICAgY29uc3QgcGF0aEluZm8gPSBfLnZhbHVlcyh0aGlzLnBhdGhJbmZvKTtcblxuICAgIGNvbnN0IHRyZWUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGNvbnN0IHN0YWNrID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsciA9IHJvd3MubGVuZ3RoOyBpIDwgbHI7ICsraSkge1xuICAgICAgY29uc3Qgcm93ID0gcm93c1tpXTtcbiAgICAgIGxldCBjdXJCcmFuY2ggPSB0cmVlO1xuXG4gICAgICBmb3IgKGxldCBqID0gMCwgbHAgPSBwYXRoSW5mby5sZW5ndGg7IGogPCBscDsgKytqKSB7XG4gICAgICAgIGNvbnN0IHBJbmZvID0gcGF0aEluZm9bal07XG4gICAgICAgIGNvbnN0IGlkID0gcEluZm8uaWRHZXR0ZXIocm93KTtcblxuICAgICAgICBpZiAoIWlkKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocEluZm8ucmVsYXRpb24pIHtcbiAgICAgICAgICBjb25zdCBwYXJlbnRNb2RlbCA9IHN0YWNrW3BJbmZvLmVuY1BhcmVudFBhdGhdO1xuXG4gICAgICAgICAgY3VyQnJhbmNoID0gcEluZm8uZ2V0QnJhbmNoKHBhcmVudE1vZGVsKTtcblxuICAgICAgICAgIGlmICghY3VyQnJhbmNoKSB7XG4gICAgICAgICAgICBjdXJCcmFuY2ggPSBwSW5mby5jcmVhdGVCcmFuY2gocGFyZW50TW9kZWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtb2RlbCA9IHBJbmZvLmdldE1vZGVsRnJvbUJyYW5jaChjdXJCcmFuY2gsIGlkKTtcblxuICAgICAgICBpZiAoIW1vZGVsKSB7XG4gICAgICAgICAgbW9kZWwgPSBjcmVhdGVNb2RlbChyb3csIHBJbmZvLCBrZXlJbmZvQnlQYXRoKTtcbiAgICAgICAgICBwSW5mby5zZXRNb2RlbFRvQnJhbmNoKGN1ckJyYW5jaCwgaWQsIG1vZGVsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YWNrW3BJbmZvLmVuY1BhdGhdID0gbW9kZWw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZmluYWxpemUocGF0aEluZm9bMF0sIF8udmFsdWVzKHRyZWUpKTtcbiAgfVxuXG4gIGNyZWF0ZUtleUluZm8ocm93cykge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhyb3dzWzBdKTtcbiAgICBjb25zdCBrZXlJbmZvID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgICAgY29uc3Qgc2VwSWR4ID0ga2V5Lmxhc3RJbmRleE9mKHRoaXMuc2VwKTtcblxuICAgICAgaWYgKHNlcElkeCA9PT0gLTEpIHtcbiAgICAgICAgY29uc3QgcEluZm8gPSB0aGlzLnBhdGhJbmZvWycnXTtcbiAgICAgICAgY29uc3QgY29sID0ga2V5O1xuXG4gICAgICAgIGlmICghcEluZm8ub21pdENvbHNbY29sXSkge1xuICAgICAgICAgIGtleUluZm8ucHVzaCh7XG4gICAgICAgICAgICBwSW5mbzogcEluZm8sXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGNvbDogY29sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVuY1BhdGggPSBrZXkuc3Vic3RyKDAsIHNlcElkeCk7XG4gICAgICAgIGNvbnN0IHBhdGggPSB0aGlzLmRlY29kZShlbmNQYXRoKTtcbiAgICAgICAgY29uc3QgY29sID0ga2V5LnN1YnN0cihzZXBJZHggKyAxKTtcbiAgICAgICAgY29uc3QgcEluZm8gPSB0aGlzLnBhdGhJbmZvW3BhdGhdO1xuXG4gICAgICAgIGlmICghcEluZm8ub21pdENvbHNbY29sXSkge1xuICAgICAgICAgIGtleUluZm8ucHVzaCh7XG4gICAgICAgICAgICBwSW5mbzogcEluZm8sXG4gICAgICAgICAgICBrZXk6IGtleSxcbiAgICAgICAgICAgIGNvbDogY29sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gXy5ncm91cEJ5KGtleUluZm8sIGtJbmZvID0+IGtJbmZvLnBJbmZvLmVuY1BhdGgpO1xuICB9XG5cbiAgZmluYWxpemUocEluZm8sIG1vZGVscykge1xuICAgIGNvbnN0IHJlbE5hbWVzID0gT2JqZWN0LmtleXMocEluZm8uY2hpbGRyZW4pO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxzKSkge1xuICAgICAgZm9yIChsZXQgbSA9IDAsIGxtID0gbW9kZWxzLmxlbmd0aDsgbSA8IGxtOyArK20pIHtcbiAgICAgICAgdGhpcy5maW5hbGl6ZU9uZShwSW5mbywgcmVsTmFtZXMsIG1vZGVsc1ttXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZmluYWxpemVPbmUocEluZm8sIHJlbE5hbWVzLCBtb2RlbHMpO1xuICAgIH1cblxuICAgIHJldHVybiBtb2RlbHM7XG4gIH1cblxuICBmaW5hbGl6ZU9uZShwSW5mbywgcmVsTmFtZXMsIG1vZGVsKSB7XG4gICAgZm9yIChsZXQgciA9IDAsIGxyID0gcmVsTmFtZXMubGVuZ3RoOyByIDwgbHI7ICsrcikge1xuICAgICAgY29uc3QgcmVsTmFtZSA9IHJlbE5hbWVzW3JdO1xuICAgICAgY29uc3QgYnJhbmNoID0gbW9kZWxbcmVsTmFtZV07XG4gICAgICBjb25zdCBjaGlsZFBhdGhJbmZvID0gcEluZm8uY2hpbGRyZW5bcmVsTmFtZV07XG5cbiAgICAgIGNvbnN0IGZpbmFsaXplZCA9IGNoaWxkUGF0aEluZm8uZmluYWxpemVCcmFuY2goYnJhbmNoLCBtb2RlbCk7XG4gICAgICB0aGlzLmZpbmFsaXplKGNoaWxkUGF0aEluZm8sIGZpbmFsaXplZCk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQoe2V4cHIsIGJ1aWxkZXIsIHNlbGVjdEZpbHRlciwgbW9kZWxDbGFzcywgcmVsYXRpb24sIHBhdGgsIHBhcmVudEluZm99KSB7XG4gICAgY29uc3QgaW5mbyA9IHRoaXMuY3JlYXRlUGF0aEluZm8oe1xuICAgICAgbW9kZWxDbGFzcyxcbiAgICAgIHBhdGgsXG4gICAgICByZWxhdGlvbixcbiAgICAgIHBhcmVudEluZm9cbiAgICB9KTtcblxuICAgIHRoaXMucGF0aEluZm9bcGF0aF0gPSBpbmZvO1xuXG4gICAgdGhpcy5idWlsZFNlbGVjdHMoe1xuICAgICAgYnVpbGRlcixcbiAgICAgIHNlbGVjdEZpbHRlcixcbiAgICAgIG1vZGVsQ2xhc3MsXG4gICAgICByZWxhdGlvbixcbiAgICAgIGluZm9cbiAgICB9KTtcblxuICAgIGZvckVhY2hFeHByKGV4cHIsIG1vZGVsQ2xhc3MsIChjaGlsZEV4cHIsIHJlbGF0aW9uKSA9PiB7XG4gICAgICBjb25zdCBuZXh0UGF0aCA9IHRoaXMuam9pblBhdGgocGF0aCwgcmVsYXRpb24ubmFtZSk7XG4gICAgICBjb25zdCBlbmNOZXh0UGF0aCA9IHRoaXMuZW5jb2RlKG5leHRQYXRoKTtcbiAgICAgIGNvbnN0IGVuY0pvaW5UYWJsZVBhdGggPSByZWxhdGlvbi5qb2luVGFibGVcbiAgICAgICAgPyB0aGlzLmVuY29kZShqb2luVGFibGVGb3JQYXRoKG5leHRQYXRoKSlcbiAgICAgICAgOiBudWxsO1xuXG4gICAgICBjb25zdCBmaWx0ZXJRdWVyeSA9IGNyZWF0ZUZpbHRlclF1ZXJ5KHtcbiAgICAgICAgYnVpbGRlcixcbiAgICAgICAgcmVsYXRpb24sXG4gICAgICAgIGV4cHI6IGNoaWxkRXhwclxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHJlbGF0ZWRKb2luU2VsZWN0UXVlcnkgPSBjcmVhdGVSZWxhdGVkSm9pbkZyb21RdWVyeSh7XG4gICAgICAgIGZpbHRlclF1ZXJ5LFxuICAgICAgICByZWxhdGlvbixcbiAgICAgICAgYWxsUmVsYXRpb25zOiB0aGlzLmFsbFJlbGF0aW9uc1xuICAgICAgfSk7XG5cbiAgICAgIHJlbGF0aW9uLmpvaW4oYnVpbGRlciwge1xuICAgICAgICBqb2luT3BlcmF0aW9uOiAnbGVmdEpvaW4nLFxuICAgICAgICBvd25lclRhYmxlOiBpbmZvLmVuY1BhdGgsXG4gICAgICAgIHJlbGF0ZWRUYWJsZUFsaWFzOiBlbmNOZXh0UGF0aCxcbiAgICAgICAgam9pblRhYmxlQWxpYXM6IGVuY0pvaW5UYWJsZVBhdGgsXG4gICAgICAgIHJlbGF0ZWRKb2luU2VsZWN0UXVlcnk6IHJlbGF0ZWRKb2luU2VsZWN0UXVlcnlcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBcHBseSByZWxhdGlvbi5tb2RpZnkgc2luY2UgaXQgbWF5IGFsc28gY29udGFpbnMgc2VsZWN0aW9ucy4gRG9uJ3QgbW92ZSB0aGlzXG4gICAgICAvLyB0byB0aGUgY3JlYXRlRmlsdGVyUXVlcnkgZnVuY3Rpb24gYmVjYXVzZSByZWxhdGVkSm9pblNlbGVjdFF1ZXJ5IGlzIGNsb25lZFxuICAgICAgLy8gRnJvbSB0aGUgcmV0dXJuIHZhbHVlIG9mIHRoYXQgZnVuY3Rpb24gYW5kIHdlIGRvbid0IHdhbnQgcmVsYXRpb24ubW9kaWZ5XG4gICAgICAvLyB0byBiZSBjYWxsZWQgdHdpY2UgZm9yIGl0LlxuICAgICAgZmlsdGVyUXVlcnkubW9kaWZ5KHJlbGF0aW9uLm1vZGlmeSk7XG5cbiAgICAgIHRoaXMuYnVpbGQoe1xuICAgICAgICBleHByOiBjaGlsZEV4cHIsXG4gICAgICAgIGJ1aWxkZXI6IGJ1aWxkZXIsXG4gICAgICAgIG1vZGVsQ2xhc3M6IHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLFxuICAgICAgICByZWxhdGlvbjogcmVsYXRpb24sXG4gICAgICAgIHBhcmVudEluZm86IGluZm8sXG4gICAgICAgIHBhdGg6IG5leHRQYXRoLFxuICAgICAgICBzZWxlY3RGaWx0ZXI6IChjb2wpID0+IHtcbiAgICAgICAgICByZXR1cm4gZmlsdGVyUXVlcnkuaGFzU2VsZWN0aW9uKGNvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlUGF0aEluZm8oe21vZGVsQ2xhc3MsIHBhdGgsIHJlbGF0aW9uLCBwYXJlbnRJbmZvfSkge1xuICAgIGNvbnN0IGVuY1BhdGggPSB0aGlzLmVuY29kZShwYXRoKTtcbiAgICBsZXQgaW5mbztcblxuICAgIGlmIChyZWxhdGlvbiAmJiByZWxhdGlvbi5pc09uZVRvT25lKCkpIHtcbiAgICAgIGluZm8gPSBuZXcgT25lVG9PbmVQYXRoSW5mbygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmZvID0gbmV3IFBhdGhJbmZvKCk7XG4gICAgfVxuXG4gICAgaW5mby5wYXRoID0gcGF0aDtcbiAgICBpbmZvLmVuY1BhdGggPSBlbmNQYXRoO1xuICAgIGluZm8ucGFyZW50UGF0aCA9IHBhcmVudEluZm8gJiYgcGFyZW50SW5mby5wYXRoO1xuICAgIGluZm8uZW5jUGFyZW50UGF0aCA9IHBhcmVudEluZm8gJiYgcGFyZW50SW5mby5lbmNQYXRoO1xuICAgIGluZm8ubW9kZWxDbGFzcyA9IG1vZGVsQ2xhc3M7XG4gICAgaW5mby5yZWxhdGlvbiA9IHJlbGF0aW9uO1xuICAgIGluZm8uaWRHZXR0ZXIgPSB0aGlzLmNyZWF0ZUlkR2V0dGVyKG1vZGVsQ2xhc3MsIGVuY1BhdGgpO1xuXG4gICAgaWYgKHBhcmVudEluZm8pIHtcbiAgICAgIHBhcmVudEluZm8uY2hpbGRyZW5bcmVsYXRpb24ubmFtZV0gPSBpbmZvO1xuICAgIH1cblxuICAgIHJldHVybiBpbmZvO1xuICB9XG5cbiAgYnVpbGRTZWxlY3RzKHtidWlsZGVyLCBzZWxlY3RGaWx0ZXIsIG1vZGVsQ2xhc3MsIHJlbGF0aW9uLCBpbmZvfSkge1xuICAgIGNvbnN0IHNlbGVjdHMgPSBbXTtcbiAgICBjb25zdCBpZENvbHMgPSBtb2RlbENsYXNzLmdldElkQ29sdW1uQXJyYXkoKTtcbiAgICBjb25zdCByb290VGFibGUgPSB0aGlzLnJvb3RNb2RlbENsYXNzLnRhYmxlTmFtZTtcblxuICAgIGNvbHVtbkluZm9bbW9kZWxDbGFzcy50YWJsZU5hbWVdLmNvbHVtbnMuZm9yRWFjaChjb2wgPT4ge1xuICAgICAgY29uc3QgZmlsdGVyUGFzc2VkID0gc2VsZWN0RmlsdGVyKGNvbCk7XG4gICAgICBjb25zdCBpc0lkQ29sdW1uID0gaWRDb2xzLmluZGV4T2YoY29sKSAhPT0gLTE7XG5cbiAgICAgIGlmIChmaWx0ZXJQYXNzZWQgfHwgaXNJZENvbHVtbikge1xuICAgICAgICBzZWxlY3RzLnB1c2goe1xuICAgICAgICAgIGNvbDogYCR7aW5mby5lbmNQYXRoIHx8IHJvb3RUYWJsZX0uJHtjb2x9YCxcbiAgICAgICAgICBhbGlhczogdGhpcy5qb2luUGF0aChpbmZvLmVuY1BhdGgsIGNvbClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFmaWx0ZXJQYXNzZWQpIHtcbiAgICAgICAgICBpbmZvLm9taXRDb2xzW2NvbF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocmVsYXRpb24gJiYgcmVsYXRpb24uam9pblRhYmxlRXh0cmFzKSB7XG4gICAgICBjb25zdCBqb2luVGFibGUgPSB0aGlzLmVuY29kZShqb2luVGFibGVGb3JQYXRoKGluZm8ucGF0aCkpO1xuXG4gICAgICByZWxhdGlvbi5qb2luVGFibGVFeHRyYXMuZm9yRWFjaChleHRyYSA9PiB7XG4gICAgICAgIGlmIChzZWxlY3RGaWx0ZXIoZXh0cmEuam9pblRhYmxlQ29sKSkge1xuICAgICAgICAgIHNlbGVjdHMucHVzaCh7XG4gICAgICAgICAgICBjb2w6IGAke2pvaW5UYWJsZX0uJHtleHRyYS5qb2luVGFibGVDb2x9YCxcbiAgICAgICAgICAgIGFsaWFzOiB0aGlzLmpvaW5QYXRoKGluZm8uZW5jUGF0aCwgZXh0cmEuYWxpYXNDb2wpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHRvb0xvbmdBbGlhc2VzID0gc2VsZWN0cy5maWx0ZXIoc2VsZWN0ID0+IHNlbGVjdC5hbGlhcy5sZW5ndGggPiBpZExlbmd0aExpbWl0KTtcblxuICAgIGlmICh0b29Mb25nQWxpYXNlcy5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe1xuICAgICAgICBlYWdlcjogYGlkZW50aWZpZXIgJHt0b29Mb25nQWxpYXNlc1swXS5hbGlhc30gaXMgb3ZlciAke2lkTGVuZ3RoTGltaXR9IGNoYXJhY3RlcnMgbG9uZyBgXG4gICAgICAgICAgICAgKyBgYW5kIHdvdWxkIGJlIHRydW5jYXRlZCBieSB0aGUgZGF0YWJhc2UgZW5naW5lLmBcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGJ1aWxkZXIuc2VsZWN0KHNlbGVjdHMubWFwKHNlbGVjdCA9PiBgJHtzZWxlY3QuY29sfSBhcyAke3NlbGVjdC5hbGlhc31gKSk7XG4gIH1cblxuICBlbmNvZGUocGF0aCkge1xuICAgIGlmICghdGhpcy5vcHQubWluaW1pemUpIHtcbiAgICAgIGxldCBlbmNQYXRoID0gdGhpcy5lbmNvZGluZ3NbcGF0aF07XG5cbiAgICAgIGlmICghZW5jUGF0aCkge1xuICAgICAgICBjb25zdCBwYXJ0cyA9IHBhdGguc3BsaXQodGhpcy5zZXApO1xuXG4gICAgICAgIC8vIERvbid0IGVuY29kZSB0aGUgcm9vdC5cbiAgICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgICAgZW5jUGF0aCA9IHBhdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5jUGF0aCA9IHBhcnRzLm1hcChwYXJ0ID0+IHRoaXMub3B0LmFsaWFzZXNbcGFydF0gfHwgcGFydCkuam9pbih0aGlzLnNlcCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuY29kaW5nc1twYXRoXSA9IGVuY1BhdGg7XG4gICAgICAgIHRoaXMuZGVjb2RpbmdzW2VuY1BhdGhdID0gcGF0aDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVuY1BhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlbmNQYXRoID0gdGhpcy5lbmNvZGluZ3NbcGF0aF07XG5cbiAgICAgIGlmICghZW5jUGF0aCkge1xuICAgICAgICAvLyBEb24ndCBlbmNvZGUgdGhlIHJvb3QuXG4gICAgICAgIGlmICghcGF0aCkge1xuICAgICAgICAgIGVuY1BhdGggPSBwYXRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVuY1BhdGggPSB0aGlzLm5leHRFbmNvZGVkUGF0aCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbmNvZGluZ3NbcGF0aF0gPSBlbmNQYXRoO1xuICAgICAgICB0aGlzLmRlY29kaW5nc1tlbmNQYXRoXSA9IHBhdGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlbmNQYXRoO1xuICAgIH1cbiAgfVxuXG4gIGRlY29kZShwYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVjb2RpbmdzW3BhdGhdO1xuICB9XG5cbiAgbmV4dEVuY29kZWRQYXRoKCkge1xuICAgIHJldHVybiBgX3QkeysrdGhpcy5lbmNJZHh9YDtcbiAgfVxuXG4gIGNyZWF0ZUlkR2V0dGVyKG1vZGVsQ2xhc3MsIHBhdGgpIHtcbiAgICBjb25zdCBpZENvbHMgPSBtb2RlbENsYXNzLmdldElkQ29sdW1uQXJyYXkoKS5tYXAoY29sID0+IHRoaXMuam9pblBhdGgocGF0aCwgY29sKSk7XG5cbiAgICBpZiAoaWRDb2xzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNyZWF0ZVNpbmdsZUlkR2V0dGVyKGlkQ29scyk7XG4gICAgfSBlbHNlIGlmIChpZENvbHMubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gY3JlYXRlVHdvSWRHZXR0ZXIoaWRDb2xzKTtcbiAgICB9IGVsc2UgaWYgKGlkQ29scy5sZW5ndGggPT09IDMpIHtcbiAgICAgIHJldHVybiBjcmVhdGVUaHJlZUlkR2V0dGVyKGlkQ29scyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjcmVhdGVOSWRHZXR0ZXIoaWRDb2xzKTtcbiAgICB9XG4gIH1cblxuICBnZXQgc2VwKCkge1xuICAgIHJldHVybiB0aGlzLm9wdC5zZXBhcmF0b3I7XG4gIH1cblxuICBqb2luUGF0aChwYXRoLCBuZXh0UGFydCkge1xuICAgIGlmIChwYXRoKSB7XG4gICAgICByZXR1cm4gYCR7cGF0aH0ke3RoaXMuc2VwfSR7bmV4dFBhcnR9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5leHRQYXJ0O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kQWxsTW9kZWxzKGV4cHIsIG1vZGVsQ2xhc3MpIHtcbiAgY29uc3QgbW9kZWxzID0gW107XG5cbiAgZmluZEFsbE1vZGVsc0ltcGwoZXhwciwgbW9kZWxDbGFzcywgbW9kZWxzKTtcblxuICByZXR1cm4gXy51bmlxQnkobW9kZWxzLCAndGFibGVOYW1lJyk7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGxNb2RlbHNJbXBsKGV4cHIsIG1vZGVsQ2xhc3MsIG1vZGVscykge1xuICBtb2RlbHMucHVzaChtb2RlbENsYXNzKTtcblxuICBmb3JFYWNoRXhwcihleHByLCBtb2RlbENsYXNzLCAoY2hpbGRFeHByLCByZWxhdGlvbikgPT4ge1xuICAgIGZpbmRBbGxNb2RlbHNJbXBsKGNoaWxkRXhwciwgcmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MsIG1vZGVscyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxsUmVsYXRpb25zKGV4cHIsIG1vZGVsQ2xhc3MpIHtcbiAgY29uc3QgcmVsYXRpb25zID0gW107XG5cbiAgZmluZEFsbFJlbGF0aW9uc0ltcGwoZXhwciwgbW9kZWxDbGFzcywgcmVsYXRpb25zKTtcblxuICByZXR1cm4gXy51bmlxV2l0aChyZWxhdGlvbnMsIChsaHMsIHJocykgPT4gbGhzID09PSByaHMpO1xufVxuXG5mdW5jdGlvbiBmaW5kQWxsUmVsYXRpb25zSW1wbChleHByLCBtb2RlbENsYXNzLCByZWxhdGlvbnMpIHtcbiAgZm9yRWFjaEV4cHIoZXhwciwgbW9kZWxDbGFzcywgKGNoaWxkRXhwciwgcmVsYXRpb24pID0+IHtcbiAgICByZWxhdGlvbnMucHVzaChyZWxhdGlvbik7XG5cbiAgICBmaW5kQWxsUmVsYXRpb25zSW1wbChjaGlsZEV4cHIsIHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLCByZWxhdGlvbnMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZmV0Y2hDb2x1bW5JbmZvKGJ1aWxkZXIsIG1vZGVscykge1xuICBjb25zdCBrbmV4ID0gYnVpbGRlci5rbmV4KCk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKG1vZGVscy5tYXAoTW9kZWxDbGFzcyA9PiB7XG4gICAgY29uc3QgdGFibGUgPSBNb2RlbENsYXNzLnRhYmxlTmFtZTtcblxuICAgIGlmIChjb2x1bW5JbmZvW3RhYmxlXSkge1xuICAgICAgcmV0dXJuIGNvbHVtbkluZm9bdGFibGVdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW5JbmZvW3RhYmxlXSA9IGtuZXgodGFibGUpLmNvbHVtbkluZm8oKS50aGVuKGluZm8gPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgY29sdW1uczogT2JqZWN0LmtleXMoaW5mbylcbiAgICAgICAgfTtcblxuICAgICAgICBjb2x1bW5JbmZvW3RhYmxlXSA9IHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gY29sdW1uSW5mb1t0YWJsZV07XG4gICAgfVxuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hFeHByKGV4cHIsIG1vZGVsQ2xhc3MsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHJlbGF0aW9ucyA9IG1vZGVsQ2xhc3MuZ2V0UmVsYXRpb25zKCk7XG4gIGNvbnN0IHJlbE5hbWVzID0gT2JqZWN0LmtleXMocmVsYXRpb25zKTtcblxuICBpZiAoZXhwci5pc0FsbFJlY3Vyc2l2ZSgpIHx8IGV4cHIubWF4UmVjdXJzaW9uRGVwdGgoKSA+IHJlbGF0aW9uUmVjdXJzaW9uTGltaXQpIHtcbiAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtcbiAgICAgIGVhZ2VyOiBgcmVjdXJzaW9uIGRlcHRoIG9mIGVhZ2VyIGV4cHJlc3Npb24gJHtleHByLnRvU3RyaW5nKCl9IHRvbyBiaWcgZm9yIEpvaW5FYWdlckFsZ29yaXRobWBcbiAgICB9KTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gcmVsTmFtZXMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgY29uc3QgcmVsTmFtZSA9IHJlbE5hbWVzW2ldO1xuICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zW3JlbE5hbWVdO1xuICAgIGNvbnN0IGNoaWxkRXhwciA9IGV4cHIuY2hpbGRFeHByZXNzaW9uKHJlbGF0aW9uLm5hbWUpO1xuXG4gICAgaWYgKGNoaWxkRXhwcikge1xuICAgICAgY2FsbGJhY2soY2hpbGRFeHByLCByZWxhdGlvbiwgcmVsTmFtZSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUlkR2V0dGVyKGlkQ29scykge1xuICBjb25zdCBpZENvbCA9IGlkQ29sc1swXTtcblxuICByZXR1cm4gKHJvdykgPT4ge1xuICAgIGNvbnN0IHZhbCA9IHJvd1tpZENvbF07XG5cbiAgICBpZiAoIXZhbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWw7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUd29JZEdldHRlcihpZENvbHMpIHtcbiAgY29uc3QgaWRDb2wxID0gaWRDb2xzWzBdO1xuICBjb25zdCBpZENvbDIgPSBpZENvbHNbMV07XG5cbiAgcmV0dXJuIChyb3cpID0+IHtcbiAgICBjb25zdCB2YWwxID0gcm93W2lkQ29sMV07XG4gICAgY29uc3QgdmFsMiA9IHJvd1tpZENvbDJdO1xuXG4gICAgaWYgKCF2YWwxIHx8ICF2YWwyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3ZhbDF9LCR7dmFsMn1gO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGhyZWVJZEdldHRlcihpZENvbHMpIHtcbiAgY29uc3QgaWRDb2wxID0gaWRDb2xzWzBdO1xuICBjb25zdCBpZENvbDIgPSBpZENvbHNbMV07XG4gIGNvbnN0IGlkQ29sMyA9IGlkQ29sc1syXTtcblxuICByZXR1cm4gKHJvdykgPT4ge1xuICAgIGNvbnN0IHZhbDEgPSByb3dbaWRDb2wxXTtcbiAgICBjb25zdCB2YWwyID0gcm93W2lkQ29sMl07XG4gICAgY29uc3QgdmFsMyA9IHJvd1tpZENvbDNdO1xuXG4gICAgaWYgKCF2YWwxIHx8ICF2YWwyIHx8ICF2YWwzKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3ZhbDF9LCR7dmFsMn0sJHt2YWwzfWA7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOSWRHZXR0ZXIoaWRDb2xzKSB7XG4gIHJldHVybiAocm93KSA9PiB7XG4gICAgbGV0IGlkID0gJyc7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGlkQ29scy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHZhbCA9IHJvd1tpZENvbHNbaV1dO1xuXG4gICAgICBpZiAoIXZhbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWQgKz0gKGkgPiAwID8gJywnIDogJycpICsgdmFsO1xuICAgIH1cblxuICAgIHJldHVybiBpZDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRmlsdGVyUXVlcnkoe2J1aWxkZXIsIGV4cHIsIHJlbGF0aW9ufSkge1xuICBjb25zdCBmaWx0ZXJRdWVyeSA9IHJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzXG4gICAgLnF1ZXJ5KClcbiAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gZXhwci5hcmdzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGNvbnN0IGZpbHRlck5hbWUgPSBleHByLmFyZ3NbaV07XG4gICAgY29uc3QgZmlsdGVyID0gZXhwci5maWx0ZXJzW2ZpbHRlck5hbWVdO1xuXG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe2VhZ2VyOiBgY291bGQgbm90IGZpbmQgZmlsdGVyIFwiJHtmaWx0ZXJOYW1lfVwiIGZvciByZWxhdGlvbiBcIiR7cmVsYXRpb24ubmFtZX1cImB9KTtcbiAgICB9XG5cbiAgICBmaWx0ZXIoZmlsdGVyUXVlcnkpO1xuICB9XG5cbiAgcmV0dXJuIGZpbHRlclF1ZXJ5O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZWxhdGVkSm9pbkZyb21RdWVyeSh7ZmlsdGVyUXVlcnksIHJlbGF0aW9uLCBhbGxSZWxhdGlvbnN9KSB7XG4gIGNvbnN0IHJlbGF0ZWRKb2luRnJvbVF1ZXJ5ID0gZmlsdGVyUXVlcnkuY2xvbmUoKTtcblxuICBjb25zdCBhbGxGb3JlaWduS2V5cyA9IGZpbmRBbGxGb3JlaWduS2V5c0Zvck1vZGVsKHtcbiAgICBtb2RlbENsYXNzOiByZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcyxcbiAgICBhbGxSZWxhdGlvbnNcbiAgfSk7XG5cbiAgcmV0dXJuIHJlbGF0ZWRKb2luRnJvbVF1ZXJ5LnNlbGVjdChhbGxGb3JlaWduS2V5cy5maWx0ZXIoY29sID0+IHtcbiAgICByZXR1cm4gIXJlbGF0ZWRKb2luRnJvbVF1ZXJ5Lmhhc1NlbGVjdGlvbihjb2wpO1xuICB9KSk7XG59XG5cbmZ1bmN0aW9uIGZpbmRBbGxGb3JlaWduS2V5c0Zvck1vZGVsKHttb2RlbENsYXNzLCBhbGxSZWxhdGlvbnN9KSB7XG4gIGxldCBmb3JlaWduS2V5cyA9IG1vZGVsQ2xhc3MuZ2V0SWRDb2x1bW5BcnJheSgpLnNsaWNlKCk7XG5cbiAgYWxsUmVsYXRpb25zLmZvckVhY2gocmVsID0+IHtcbiAgICBpZiAocmVsLnJlbGF0ZWRNb2RlbENsYXNzLnRhYmxlTmFtZSA9PT0gbW9kZWxDbGFzcy50YWJsZU5hbWUpIHtcbiAgICAgIHJlbC5yZWxhdGVkQ29sLmZvckVhY2goY29sID0+IGZvcmVpZ25LZXlzLnB1c2goY29sKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlbC5vd25lck1vZGVsQ2xhc3MudGFibGVOYW1lID09PSBtb2RlbENsYXNzLnRhYmxlTmFtZSkge1xuICAgICAgcmVsLm93bmVyQ29sLmZvckVhY2goY29sID0+IGZvcmVpZ25LZXlzLnB1c2goY29sKSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gXy51bmlxKGZvcmVpZ25LZXlzKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTW9kZWwocm93LCBwSW5mbywga2V5SW5mb0J5UGF0aCkge1xuICBjb25zdCBrZXlJbmZvID0ga2V5SW5mb0J5UGF0aFtwSW5mby5lbmNQYXRoXTtcbiAgY29uc3QganNvbiA9IHt9O1xuXG4gIGZvciAobGV0IGsgPSAwLCBsayA9IGtleUluZm8ubGVuZ3RoOyBrIDwgbGs7ICsraykge1xuICAgIGNvbnN0IGtJbmZvID0ga2V5SW5mb1trXTtcbiAgICBqc29uW2tJbmZvLmNvbF0gPSByb3dba0luZm8ua2V5XTtcbiAgfVxuXG4gIHJldHVybiBwSW5mby5tb2RlbENsYXNzLmZyb21EYXRhYmFzZUpzb24oanNvbik7XG59XG5cbmZ1bmN0aW9uIGpvaW5UYWJsZUZvclBhdGgocGF0aCkge1xuICByZXR1cm4gcGF0aCArICdfam9pbic7XG59XG5cbmNsYXNzIFBhdGhJbmZvIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhdGggPSBudWxsO1xuICAgIHRoaXMuZW5jUGF0aCA9IG51bGw7XG4gICAgdGhpcy5lbmNQYXJlbnRQYXRoID0gbnVsbDtcbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBudWxsO1xuICAgIHRoaXMucmVsYXRpb24gPSBudWxsO1xuICAgIHRoaXMub21pdENvbHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuY2hpbGRyZW4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuaWRHZXR0ZXIgPSBudWxsO1xuICB9XG5cbiAgY3JlYXRlQnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgY29uc3QgYnJhbmNoID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBwYXJlbnRNb2RlbFt0aGlzLnJlbGF0aW9uLm5hbWVdID0gYnJhbmNoO1xuICAgIHJldHVybiBicmFuY2g7XG4gIH1cblxuICBnZXRCcmFuY2gocGFyZW50TW9kZWwpIHtcbiAgICByZXR1cm4gcGFyZW50TW9kZWxbdGhpcy5yZWxhdGlvbi5uYW1lXTtcbiAgfVxuXG4gIGdldE1vZGVsRnJvbUJyYW5jaChicmFuY2gsIGlkKSB7XG4gICAgcmV0dXJuIGJyYW5jaFtpZF07XG4gIH1cblxuICBzZXRNb2RlbFRvQnJhbmNoKGJyYW5jaCwgaWQsIG1vZGVsKSB7XG4gICAgYnJhbmNoW2lkXSA9IG1vZGVsO1xuICB9XG5cbiAgZmluYWxpemVCcmFuY2goYnJhbmNoLCBwYXJlbnRNb2RlbCkge1xuICAgIGNvbnN0IHJlbE1vZGVscyA9IF8udmFsdWVzKGJyYW5jaCk7XG4gICAgcGFyZW50TW9kZWxbdGhpcy5yZWxhdGlvbi5uYW1lXSA9IHJlbE1vZGVscztcbiAgICByZXR1cm4gcmVsTW9kZWxzO1xuICB9XG59XG5cbmNsYXNzIE9uZVRvT25lUGF0aEluZm8gZXh0ZW5kcyBQYXRoSW5mbyB7XG5cbiAgY3JlYXRlQnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgcmV0dXJuIHBhcmVudE1vZGVsO1xuICB9XG5cbiAgZ2V0QnJhbmNoKHBhcmVudE1vZGVsKSB7XG4gICAgcmV0dXJuIHBhcmVudE1vZGVsO1xuICB9XG5cbiAgZ2V0TW9kZWxGcm9tQnJhbmNoKGJyYW5jaCwgaWQpIHtcbiAgICByZXR1cm4gYnJhbmNoW3RoaXMucmVsYXRpb24ubmFtZV07XG4gIH1cblxuICBzZXRNb2RlbFRvQnJhbmNoKGJyYW5jaCwgaWQsIG1vZGVsKSB7XG4gICAgYnJhbmNoW3RoaXMucmVsYXRpb24ubmFtZV0gPSBtb2RlbDtcbiAgfVxuXG5cbiAgZmluYWxpemVCcmFuY2goYnJhbmNoLCBwYXJlbnRNb2RlbCkge1xuICAgIHBhcmVudE1vZGVsW3RoaXMucmVsYXRpb24ubmFtZV0gPSBicmFuY2ggfHwgbnVsbDtcbiAgICByZXR1cm4gYnJhbmNoIHx8IG51bGw7XG4gIH1cbn1cbiJdfQ==
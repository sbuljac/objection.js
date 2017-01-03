'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _relationExpressionParser = require('./parsers/relationExpressionParser');

var _relationExpressionParser2 = _interopRequireDefault(_relationExpressionParser);

var _ValidationError = require('../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RECURSIVE_REGEX = /^\^(\d*)$/;
var ALL_RECURSIVE_REGEX = /^\*$/;

var RelationExpression = function () {
  function RelationExpression(node, recursionDepth, filters) {
    (0, _classCallCheck3.default)(this, RelationExpression);

    node = node || {};

    this.name = node.name || null;
    this.args = node.args || [];
    this.numChildren = node.numChildren || 0;
    this.children = node.children || {};

    Object.defineProperty(this, '_recursionDepth', {
      enumerable: false,
      value: recursionDepth || 0
    });

    Object.defineProperty(this, '_filters', {
      enumerable: false,
      writable: true,
      value: filters || {}
    });
  }

  /**
   * @param {string|RelationExpression} expr
   * @returns {RelationExpression}
   */


  RelationExpression.parse = function parse(expr) {
    if (expr instanceof RelationExpression) {
      return expr;
    } else if (!_lodash2.default.isString(expr) || _lodash2.default.isEmpty(expr.trim())) {
      return new RelationExpression();
    } else {
      try {
        return new RelationExpression(_relationExpressionParser2.default.parse(expr));
      } catch (err) {
        throw new _ValidationError2.default({
          message: 'Invalid relation expression "' + expr + '"',
          cause: err.message
        });
      }
    }
  };

  /**
   * @param {Object|Array} graph
   */


  RelationExpression.fromGraph = function fromGraph(graph) {
    if (!graph) {
      return new RelationExpression();
    }

    return new RelationExpression(modelGraphToNode(graph, newNode()));
  };

  /**
   * @param {string|RelationExpression} expr
   * @returns {boolean}
   */
  RelationExpression.prototype.isSubExpression = function isSubExpression(expr) {
    var _this = this;

    expr = RelationExpression.parse(expr);

    if (this.isAllRecursive()) {
      return true;
    }

    if (expr.isAllRecursive()) {
      return this.isAllRecursive();
    }

    if (this.name !== expr.name) {
      return false;
    }

    var maxRecursionDepth = expr.maxRecursionDepth();

    if (maxRecursionDepth > 0) {
      return this.isAllRecursive() || this.maxRecursionDepth() >= maxRecursionDepth;
    }

    return _lodash2.default.every(expr.children, function (child, childName) {
      var ownSubExpression = _this.childExpression(childName);
      var subExpression = expr.childExpression(childName);

      return ownSubExpression && ownSubExpression.isSubExpression(subExpression);
    });
  };

  /**
   * @returns {number}
   */


  RelationExpression.prototype.maxRecursionDepth = function maxRecursionDepth() {
    if (this.numChildren !== 1) {
      return 0;
    }

    var key = (0, _keys2.default)(this.children)[0];
    var rec = RECURSIVE_REGEX.exec(key);

    if (rec) {
      var maxDepth = rec[1];

      if (maxDepth) {
        return parseInt(maxDepth, 10);
      } else {
        return Number.POSITIVE_INFINITY;
      }
    } else {
      return 0;
    }
  };

  /**
   * @returns {boolean}
   */


  RelationExpression.prototype.isAllRecursive = function isAllRecursive() {
    if (this.numChildren !== 1) {
      return false;
    }

    var key = (0, _keys2.default)(this.children)[0];
    return ALL_RECURSIVE_REGEX.test(key);
  };

  /**
   * @returns {RelationExpression}
   */


  RelationExpression.prototype.childExpression = function childExpression(childName) {
    if (this.isAllRecursive() || childName === this.name && this._recursionDepth < this.maxRecursionDepth() - 1) {
      return new RelationExpression(this, this._recursionDepth + 1, this._filters);
    }

    if (this.children[childName]) {
      return new RelationExpression(this.children[childName], 0, this._filters);
    } else {
      return null;
    }
  };

  /**
   * @returns {RelationExpression}
   */


  RelationExpression.prototype.clone = function clone() {
    return new RelationExpression(JSON.parse((0, _stringify2.default)(this)), this._recursionDepth, _lodash2.default.clone(this._filters));
  };

  RelationExpression.prototype.forEachChild = function forEachChild(cb) {
    _lodash2.default.forOwn(this.children, function (child, childName) {
      if (!ALL_RECURSIVE_REGEX.test(childName) && !RECURSIVE_REGEX.test(childName)) {
        cb(child, childName);
      }
    });
  };

  /**
   * @param {string|RelationExpression} path
   * @param {function(QueryBuilder)} filter
   */


  RelationExpression.prototype.addAnonymousFilterAtPath = function addAnonymousFilterAtPath(path, filter) {
    var filterNodes = this._nodesAtPath(path);
    var filters = this.filters;

    var idx = 0;
    var filterName = '_efe0_';

    while (filters[filterName]) {
      filterName = '_efe' + ++idx + '_';
    }

    if (!_lodash2.default.isEmpty(filterNodes)) {
      filters[filterName] = filter;
      _lodash2.default.each(filterNodes, function (node) {
        return node.args.push(filterName);
      });
    }
  };

  /**
   * @returns {string}
   */


  RelationExpression.prototype.toString = function toString() {
    return _toString(this);
  };

  /**
   * @private
   * @return {Array.<Object>}
   */


  RelationExpression.prototype._nodesAtPath = function _nodesAtPath(pathExpression) {
    var path = RelationExpression.parse(pathExpression);
    var nodes = [];

    RelationExpression.nodesAtPath(this, path, nodes);
    return nodes;
  };

  /**
   * @private
   */


  RelationExpression.nodesAtPath = function nodesAtPath(target, path, expressions) {
    var _this2 = this;

    if (path.numChildren == 0) {
      expressions.push(target);
    } else {
      _lodash2.default.forOwn(path.children, function (child) {
        var targetChild = target.children[child.name];

        if (targetChild) {
          _this2.nodesAtPath(targetChild, child, expressions);
        }
      });
    }
  };

  (0, _createClass3.default)(RelationExpression, [{
    key: 'filters',
    get: function get() {
      return this._filters;
    },
    set: function set(filters) {
      this._filters = filters || {};
    }
  }]);
  return RelationExpression;
}();

exports.default = RelationExpression;


function _toString(node) {
  var childExpr = _lodash2.default.values(node.children).map(_toString);

  if (childExpr.length > 1) {
    childExpr = '[' + childExpr.join(', ') + ']';
  } else {
    childExpr = childExpr[0];
  }

  var str = node.name;

  if (node.args.length) {
    str += '(' + node.args.join(', ') + ')';
  }

  if (childExpr) {
    if (str) {
      return str + '.' + childExpr;
    } else {
      return childExpr;
    }
  } else {
    return str;
  }
}

function modelGraphToNode(models, node) {
  if (!models) {
    return;
  }

  if (Array.isArray(models)) {
    for (var i = 0, l = models.length; i < l; ++i) {
      modelToNode(models[i], node);
    }
  } else {
    modelToNode(models, node);
  }

  return node;
}

function modelToNode(model, node) {
  var modelClass = model.constructor;
  var relations = modelClass.getRelations();
  var relNames = (0, _keys2.default)(relations);

  for (var r = 0, lr = relNames.length; r < lr; ++r) {
    var relName = relNames[r];

    if (model.hasOwnProperty(relName)) {
      var childNode = node.children[relName];

      if (!childNode) {
        childNode = newNode(relName);

        node.children[relName] = childNode;
        node.numChildren++;
      }

      modelGraphToNode(model[relName], childNode);
    }
  }
}

function newNode(name) {
  return {
    name: name || '',
    args: [],
    children: (0, _create2.default)(null),
    numChildren: 0
  };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uRXhwcmVzc2lvbi5qcyJdLCJuYW1lcyI6WyJSRUNVUlNJVkVfUkVHRVgiLCJBTExfUkVDVVJTSVZFX1JFR0VYIiwiUmVsYXRpb25FeHByZXNzaW9uIiwibm9kZSIsInJlY3Vyc2lvbkRlcHRoIiwiZmlsdGVycyIsIm5hbWUiLCJhcmdzIiwibnVtQ2hpbGRyZW4iLCJjaGlsZHJlbiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsInZhbHVlIiwid3JpdGFibGUiLCJwYXJzZSIsImV4cHIiLCJpc1N0cmluZyIsImlzRW1wdHkiLCJ0cmltIiwiZXJyIiwibWVzc2FnZSIsImNhdXNlIiwiZnJvbUdyYXBoIiwiZ3JhcGgiLCJtb2RlbEdyYXBoVG9Ob2RlIiwibmV3Tm9kZSIsImlzU3ViRXhwcmVzc2lvbiIsImlzQWxsUmVjdXJzaXZlIiwibWF4UmVjdXJzaW9uRGVwdGgiLCJldmVyeSIsImNoaWxkIiwiY2hpbGROYW1lIiwib3duU3ViRXhwcmVzc2lvbiIsImNoaWxkRXhwcmVzc2lvbiIsInN1YkV4cHJlc3Npb24iLCJrZXkiLCJyZWMiLCJleGVjIiwibWF4RGVwdGgiLCJwYXJzZUludCIsIk51bWJlciIsIlBPU0lUSVZFX0lORklOSVRZIiwidGVzdCIsIl9yZWN1cnNpb25EZXB0aCIsIl9maWx0ZXJzIiwiY2xvbmUiLCJKU09OIiwiZm9yRWFjaENoaWxkIiwiY2IiLCJmb3JPd24iLCJhZGRBbm9ueW1vdXNGaWx0ZXJBdFBhdGgiLCJwYXRoIiwiZmlsdGVyIiwiZmlsdGVyTm9kZXMiLCJfbm9kZXNBdFBhdGgiLCJpZHgiLCJmaWx0ZXJOYW1lIiwiZWFjaCIsInB1c2giLCJ0b1N0cmluZyIsInBhdGhFeHByZXNzaW9uIiwibm9kZXMiLCJub2Rlc0F0UGF0aCIsInRhcmdldCIsImV4cHJlc3Npb25zIiwidGFyZ2V0Q2hpbGQiLCJjaGlsZEV4cHIiLCJ2YWx1ZXMiLCJtYXAiLCJsZW5ndGgiLCJqb2luIiwic3RyIiwibW9kZWxzIiwiQXJyYXkiLCJpc0FycmF5IiwiaSIsImwiLCJtb2RlbFRvTm9kZSIsIm1vZGVsIiwibW9kZWxDbGFzcyIsImNvbnN0cnVjdG9yIiwicmVsYXRpb25zIiwiZ2V0UmVsYXRpb25zIiwicmVsTmFtZXMiLCJyIiwibHIiLCJyZWxOYW1lIiwiaGFzT3duUHJvcGVydHkiLCJjaGlsZE5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsa0JBQWtCLFdBQXhCO0FBQ0EsSUFBTUMsc0JBQXNCLE1BQTVCOztJQUVxQkMsa0I7QUFFbkIsOEJBQVlDLElBQVosRUFBa0JDLGNBQWxCLEVBQWtDQyxPQUFsQyxFQUEyQztBQUFBOztBQUN6Q0YsV0FBT0EsUUFBUSxFQUFmOztBQUVBLFNBQUtHLElBQUwsR0FBWUgsS0FBS0csSUFBTCxJQUFhLElBQXpCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZSixLQUFLSSxJQUFMLElBQWEsRUFBekI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CTCxLQUFLSyxXQUFMLElBQW9CLENBQXZDO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQk4sS0FBS00sUUFBTCxJQUFpQixFQUFqQzs7QUFFQUMsV0FBT0MsY0FBUCxDQUFzQixJQUF0QixFQUE0QixpQkFBNUIsRUFBK0M7QUFDN0NDLGtCQUFZLEtBRGlDO0FBRTdDQyxhQUFPVCxrQkFBa0I7QUFGb0IsS0FBL0M7O0FBS0FNLFdBQU9DLGNBQVAsQ0FBc0IsSUFBdEIsRUFBNEIsVUFBNUIsRUFBd0M7QUFDdENDLGtCQUFZLEtBRDBCO0FBRXRDRSxnQkFBVSxJQUY0QjtBQUd0Q0QsYUFBT1IsV0FBVztBQUhvQixLQUF4QztBQUtEOztBQUVEOzs7Ozs7cUJBSU9VLEssa0JBQU1DLEksRUFBTTtBQUNqQixRQUFJQSxnQkFBZ0JkLGtCQUFwQixFQUF3QztBQUN0QyxhQUFPYyxJQUFQO0FBQ0QsS0FGRCxNQUVPLElBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXRCxJQUFY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O0FBQ0YsR0FKRCxNQUlPO0FBQ0wyRSxnQkFBWUwsTUFBWixFQUFvQnRFLElBQXBCO0FBQ0Q7O0FBRUQsU0FBT0EsSUFBUDtBQUNEOztBQUVELFNBQVMyRSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjVFLElBQTVCLEVBQWtDO0FBQ2hDLE1BQU02RSxhQUFhRCxNQUFNRSxXQUF6QjtBQUNBLE1BQU1DLFlBQVlGLFdBQVdHLFlBQVgsRUFBbEI7QUFDQSxNQUFNQyxXQUFXLG9CQUFZRixTQUFaLENBQWpCOztBQUVBLE9BQUssSUFBSUcsSUFBSSxDQUFSLEVBQVdDLEtBQUtGLFNBQVNkLE1BQTlCLEVBQXNDZSxJQUFJQyxFQUExQyxFQUE4QyxFQUFFRCxDQUFoRCxFQUFtRDtBQUNqRCxRQUFNRSxVQUFVSCxTQUFTQyxDQUFULENBQWhCOztBQUVBLFFBQUlOLE1BQU1TLGNBQU4sQ0FBcUJELE9BQXJCLENBQUosRUFBbUM7QUFDakMsVUFBSUUsWUFBWXRGLEtBQUtNLFFBQUwsQ0FBYzhFLE9BQWQsQ0FBaEI7O0FBRUEsVUFBSSxDQUFDRSxTQUFMLEVBQWdCO0FBQ2RBLG9CQUFZL0QsUUFBUTZELE9BQVIsQ0FBWjs7QUFFQXBGLGFBQUtNLFFBQUwsQ0FBYzhFLE9BQWQsSUFBeUJFLFNBQXpCO0FBQ0F0RixhQUFLSyxXQUFMO0FBQ0Q7O0FBRURpQix1QkFBaUJzRCxNQUFNUSxPQUFOLENBQWpCLEVBQWlDRSxTQUFqQztBQUNEO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTL0QsT0FBVCxDQUFpQnBCLElBQWpCLEVBQXVCO0FBQ3JCLFNBQU87QUFDTEEsVUFBTUEsUUFBUSxFQURUO0FBRUxDLFVBQU0sRUFGRDtBQUdMRSxjQUFVLHNCQUFjLElBQWQsQ0FITDtBQUlMRCxpQkFBYTtBQUpSLEdBQVA7QUFNRCIsImZpbGUiOiJSZWxhdGlvbkV4cHJlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBhcnNlciBmcm9tICcuL3BhcnNlcnMvcmVsYXRpb25FeHByZXNzaW9uUGFyc2VyJztcbmltcG9ydCBWYWxpZGF0aW9uRXJyb3IgZnJvbSAnLi4vbW9kZWwvVmFsaWRhdGlvbkVycm9yJztcblxuY29uc3QgUkVDVVJTSVZFX1JFR0VYID0gL15cXF4oXFxkKikkLztcbmNvbnN0IEFMTF9SRUNVUlNJVkVfUkVHRVggPSAvXlxcKiQvO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWxhdGlvbkV4cHJlc3Npb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5vZGUsIHJlY3Vyc2lvbkRlcHRoLCBmaWx0ZXJzKSB7XG4gICAgbm9kZSA9IG5vZGUgfHwge307XG5cbiAgICB0aGlzLm5hbWUgPSBub2RlLm5hbWUgfHwgbnVsbDtcbiAgICB0aGlzLmFyZ3MgPSBub2RlLmFyZ3MgfHwgW107XG4gICAgdGhpcy5udW1DaGlsZHJlbiA9IG5vZGUubnVtQ2hpbGRyZW4gfHwgMDtcbiAgICB0aGlzLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbiB8fCB7fTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3JlY3Vyc2lvbkRlcHRoJywge1xuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB2YWx1ZTogcmVjdXJzaW9uRGVwdGggfHwgMFxuICAgIH0pO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfZmlsdGVycycsIHtcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB2YWx1ZTogZmlsdGVycyB8fCB7fVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfFJlbGF0aW9uRXhwcmVzc2lvbn0gZXhwclxuICAgKiBAcmV0dXJucyB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgKi9cbiAgc3RhdGljIHBhcnNlKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIFJlbGF0aW9uRXhwcmVzc2lvbikge1xuICAgICAgcmV0dXJuIGV4cHI7XG4gICAgfSBlbHNlIGlmICghXy5pc1N0cmluZyhleHByKSB8fCBfLmlzRW1wdHkoZXhwci50cmltKCkpKSB7XG4gICAgICByZXR1cm4gbmV3IFJlbGF0aW9uRXhwcmVzc2lvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFJlbGF0aW9uRXhwcmVzc2lvbihwYXJzZXIucGFyc2UoZXhwcikpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe1xuICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIHJlbGF0aW9uIGV4cHJlc3Npb24gXCInICsgZXhwciArICdcIicsXG4gICAgICAgICAgY2F1c2U6IGVyci5tZXNzYWdlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdHxBcnJheX0gZ3JhcGhcbiAgICovXG4gIHN0YXRpYyBmcm9tR3JhcGgoZ3JhcGgpIHtcbiAgICBpZiAoIWdyYXBoKSB7XG4gICAgICByZXR1cm4gbmV3IFJlbGF0aW9uRXhwcmVzc2lvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVsYXRpb25FeHByZXNzaW9uKG1vZGVsR3JhcGhUb05vZGUoZ3JhcGgsIG5ld05vZGUoKSkpO1xuICB9XG5cbiAgZ2V0IGZpbHRlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbHRlcnM7XG4gIH1cblxuICBzZXQgZmlsdGVycyhmaWx0ZXJzKSB7XG4gICAgdGhpcy5fZmlsdGVycyA9IGZpbHRlcnMgfHwge307XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBleHByXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNTdWJFeHByZXNzaW9uKGV4cHIpIHtcbiAgICBleHByID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKGV4cHIpO1xuXG4gICAgaWYgKHRoaXMuaXNBbGxSZWN1cnNpdmUoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGV4cHIuaXNBbGxSZWN1cnNpdmUoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBbGxSZWN1cnNpdmUoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5uYW1lICE9PSBleHByLm5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXhSZWN1cnNpb25EZXB0aCA9IGV4cHIubWF4UmVjdXJzaW9uRGVwdGgoKTtcblxuICAgIGlmIChtYXhSZWN1cnNpb25EZXB0aCA+IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQWxsUmVjdXJzaXZlKCkgfHwgdGhpcy5tYXhSZWN1cnNpb25EZXB0aCgpID49IG1heFJlY3Vyc2lvbkRlcHRoO1xuICAgIH1cblxuICAgIHJldHVybiBfLmV2ZXJ5KGV4cHIuY2hpbGRyZW4sIChjaGlsZCwgY2hpbGROYW1lKSA9PiB7XG4gICAgICB2YXIgb3duU3ViRXhwcmVzc2lvbiA9IHRoaXMuY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSk7XG4gICAgICB2YXIgc3ViRXhwcmVzc2lvbiA9IGV4cHIuY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSk7XG5cbiAgICAgIHJldHVybiBvd25TdWJFeHByZXNzaW9uICYmIG93blN1YkV4cHJlc3Npb24uaXNTdWJFeHByZXNzaW9uKHN1YkV4cHJlc3Npb24pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBtYXhSZWN1cnNpb25EZXB0aCgpIHtcbiAgICBpZiAodGhpcy5udW1DaGlsZHJlbiAhPT0gMSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG4gICAgY29uc3Qga2V5ID0gT2JqZWN0LmtleXModGhpcy5jaGlsZHJlbilbMF07XG4gICAgY29uc3QgcmVjID0gUkVDVVJTSVZFX1JFR0VYLmV4ZWMoa2V5KTtcblxuICAgIGlmIChyZWMpIHtcbiAgICAgIGNvbnN0IG1heERlcHRoID0gcmVjWzFdO1xuXG4gICAgICBpZiAobWF4RGVwdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KG1heERlcHRoLCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBpc0FsbFJlY3Vyc2l2ZSgpIHtcbiAgICBpZiAodGhpcy5udW1DaGlsZHJlbiAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKHRoaXMuY2hpbGRyZW4pWzBdO1xuICAgIHJldHVybiBBTExfUkVDVVJTSVZFX1JFR0VYLnRlc3Qoa2V5KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7UmVsYXRpb25FeHByZXNzaW9ufVxuICAgKi9cbiAgY2hpbGRFeHByZXNzaW9uKGNoaWxkTmFtZSkge1xuICAgIGlmICh0aGlzLmlzQWxsUmVjdXJzaXZlKCkgfHwgKGNoaWxkTmFtZSA9PT0gdGhpcy5uYW1lICYmIHRoaXMuX3JlY3Vyc2lvbkRlcHRoIDwgdGhpcy5tYXhSZWN1cnNpb25EZXB0aCgpIC0gMSkpIHtcbiAgICAgIHJldHVybiBuZXcgUmVsYXRpb25FeHByZXNzaW9uKHRoaXMsIHRoaXMuX3JlY3Vyc2lvbkRlcHRoICsgMSwgdGhpcy5fZmlsdGVycyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgcmV0dXJuIG5ldyBSZWxhdGlvbkV4cHJlc3Npb24odGhpcy5jaGlsZHJlbltjaGlsZE5hbWVdLCAwLCB0aGlzLl9maWx0ZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtSZWxhdGlvbkV4cHJlc3Npb259XG4gICAqL1xuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IFJlbGF0aW9uRXhwcmVzc2lvbihKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMpKSwgdGhpcy5fcmVjdXJzaW9uRGVwdGgsIF8uY2xvbmUodGhpcy5fZmlsdGVycykpO1xuICB9XG5cbiAgZm9yRWFjaENoaWxkKGNiKSB7XG4gICAgXy5mb3JPd24odGhpcy5jaGlsZHJlbiwgKGNoaWxkLCBjaGlsZE5hbWUpID0+IHtcbiAgICAgIGlmICghQUxMX1JFQ1VSU0lWRV9SRUdFWC50ZXN0KGNoaWxkTmFtZSkgJiYgIVJFQ1VSU0lWRV9SRUdFWC50ZXN0KGNoaWxkTmFtZSkpIHtcbiAgICAgICAgY2IoY2hpbGQsIGNoaWxkTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVsYXRpb25FeHByZXNzaW9ufSBwYXRoXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oUXVlcnlCdWlsZGVyKX0gZmlsdGVyXG4gICAqL1xuICBhZGRBbm9ueW1vdXNGaWx0ZXJBdFBhdGgocGF0aCwgZmlsdGVyKSB7XG4gICAgbGV0IGZpbHRlck5vZGVzID0gdGhpcy5fbm9kZXNBdFBhdGgocGF0aCk7XG4gICAgbGV0IGZpbHRlcnMgPSB0aGlzLmZpbHRlcnM7XG5cbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgZmlsdGVyTmFtZSA9IGBfZWZlMF9gO1xuXG4gICAgd2hpbGUgKGZpbHRlcnNbZmlsdGVyTmFtZV0pIHtcbiAgICAgIGZpbHRlck5hbWUgPSBgX2VmZSR7KytpZHh9X2A7XG4gICAgfVxuXG4gICAgaWYgKCFfLmlzRW1wdHkoZmlsdGVyTm9kZXMpKSB7XG4gICAgICBmaWx0ZXJzW2ZpbHRlck5hbWVdID0gZmlsdGVyO1xuICAgICAgXy5lYWNoKGZpbHRlck5vZGVzLCBub2RlID0+IG5vZGUuYXJncy5wdXNoKGZpbHRlck5hbWUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0b1N0cmluZyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKiBAcmV0dXJuIHtBcnJheS48T2JqZWN0Pn1cbiAgICovXG4gIF9ub2Rlc0F0UGF0aChwYXRoRXhwcmVzc2lvbikge1xuICAgIGxldCBwYXRoID0gUmVsYXRpb25FeHByZXNzaW9uLnBhcnNlKHBhdGhFeHByZXNzaW9uKTtcbiAgICBsZXQgbm9kZXMgPSBbXTtcblxuICAgIFJlbGF0aW9uRXhwcmVzc2lvbi5ub2Rlc0F0UGF0aCh0aGlzLCBwYXRoLCBub2Rlcyk7XG4gICAgcmV0dXJuIG5vZGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGF0aWMgbm9kZXNBdFBhdGgodGFyZ2V0LCBwYXRoLCBleHByZXNzaW9ucykge1xuICAgIGlmIChwYXRoLm51bUNoaWxkcmVuID09IDApIHtcbiAgICAgIGV4cHJlc3Npb25zLnB1c2godGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgXy5mb3JPd24ocGF0aC5jaGlsZHJlbiwgY2hpbGQgPT4ge1xuICAgICAgICBsZXQgdGFyZ2V0Q2hpbGQgPSB0YXJnZXQuY2hpbGRyZW5bY2hpbGQubmFtZV07XG5cbiAgICAgICAgaWYgKHRhcmdldENoaWxkKSB7XG4gICAgICAgICAgdGhpcy5ub2Rlc0F0UGF0aCh0YXJnZXRDaGlsZCwgY2hpbGQsIGV4cHJlc3Npb25zKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKG5vZGUpIHtcbiAgbGV0IGNoaWxkRXhwciA9IF8udmFsdWVzKG5vZGUuY2hpbGRyZW4pLm1hcCh0b1N0cmluZyk7XG5cbiAgaWYgKGNoaWxkRXhwci5sZW5ndGggPiAxKSB7XG4gICAgY2hpbGRFeHByID0gYFske2NoaWxkRXhwci5qb2luKCcsICcpfV1gO1xuICB9IGVsc2Uge1xuICAgIGNoaWxkRXhwciA9IGNoaWxkRXhwclswXTtcbiAgfVxuXG4gIGxldCBzdHIgPSBub2RlLm5hbWU7XG5cbiAgaWYgKG5vZGUuYXJncy5sZW5ndGgpIHtcbiAgICBzdHIgKz0gYCgke25vZGUuYXJncy5qb2luKCcsICcpfSlgO1xuICB9XG5cbiAgaWYgKGNoaWxkRXhwcikge1xuICAgIGlmIChzdHIpIHtcbiAgICAgIHJldHVybiBgJHtzdHJ9LiR7Y2hpbGRFeHByfWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjaGlsZEV4cHI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9kZWxHcmFwaFRvTm9kZShtb2RlbHMsIG5vZGUpIHtcbiAgaWYgKCFtb2RlbHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShtb2RlbHMpKSB7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBtb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBtb2RlbFRvTm9kZShtb2RlbHNbaV0sIG5vZGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBtb2RlbFRvTm9kZShtb2RlbHMsIG5vZGUpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIG1vZGVsVG9Ob2RlKG1vZGVsLCBub2RlKSB7XG4gIGNvbnN0IG1vZGVsQ2xhc3MgPSBtb2RlbC5jb25zdHJ1Y3RvcjtcbiAgY29uc3QgcmVsYXRpb25zID0gbW9kZWxDbGFzcy5nZXRSZWxhdGlvbnMoKTtcbiAgY29uc3QgcmVsTmFtZXMgPSBPYmplY3Qua2V5cyhyZWxhdGlvbnMpO1xuXG4gIGZvciAobGV0IHIgPSAwLCBsciA9IHJlbE5hbWVzLmxlbmd0aDsgciA8IGxyOyArK3IpIHtcbiAgICBjb25zdCByZWxOYW1lID0gcmVsTmFtZXNbcl07XG5cbiAgICBpZiAobW9kZWwuaGFzT3duUHJvcGVydHkocmVsTmFtZSkpIHtcbiAgICAgIGxldCBjaGlsZE5vZGUgPSBub2RlLmNoaWxkcmVuW3JlbE5hbWVdO1xuXG4gICAgICBpZiAoIWNoaWxkTm9kZSkge1xuICAgICAgICBjaGlsZE5vZGUgPSBuZXdOb2RlKHJlbE5hbWUpO1xuXG4gICAgICAgIG5vZGUuY2hpbGRyZW5bcmVsTmFtZV0gPSBjaGlsZE5vZGU7XG4gICAgICAgIG5vZGUubnVtQ2hpbGRyZW4rKztcbiAgICAgIH1cblxuICAgICAgbW9kZWxHcmFwaFRvTm9kZShtb2RlbFtyZWxOYW1lXSwgY2hpbGROb2RlKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3Tm9kZShuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSB8fCAnJyxcbiAgICBhcmdzOiBbXSxcbiAgICBjaGlsZHJlbjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICBudW1DaGlsZHJlbjogMFxuICB9O1xufSJdfQ==
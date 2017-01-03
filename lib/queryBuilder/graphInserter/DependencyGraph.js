'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _Model = require('../../model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _HasManyRelation = require('../../relations/hasMany/HasManyRelation');

var _HasManyRelation2 = _interopRequireDefault(_HasManyRelation);

var _RelationExpression = require('../RelationExpression');

var _RelationExpression2 = _interopRequireDefault(_RelationExpression);

var _ManyToManyRelation = require('../../relations/manyToMany/ManyToManyRelation');

var _ManyToManyRelation2 = _interopRequireDefault(_ManyToManyRelation);

var _BelongsToOneRelation = require('../../relations/belongsToOne/BelongsToOneRelation');

var _BelongsToOneRelation2 = _interopRequireDefault(_BelongsToOneRelation);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _DependencyNode = require('./DependencyNode');

var _DependencyNode2 = _interopRequireDefault(_DependencyNode);

var _HasManyDependency = require('./HasManyDependency');

var _HasManyDependency2 = _interopRequireDefault(_HasManyDependency);

var _ManyToManyConnection = require('./ManyToManyConnection');

var _ManyToManyConnection2 = _interopRequireDefault(_ManyToManyConnection);

var _ReplaceValueDependency = require('./ReplaceValueDependency');

var _ReplaceValueDependency2 = _interopRequireDefault(_ReplaceValueDependency);

var _BelongsToOneDependency = require('./BelongsToOneDependency');

var _BelongsToOneDependency2 = _interopRequireDefault(_BelongsToOneDependency);

var _InterpolateValueDependency = require('./InterpolateValueDependency');

var _InterpolateValueDependency2 = _interopRequireDefault(_InterpolateValueDependency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DependencyGraph = function () {
  function DependencyGraph(allowedRelations) {
    (0, _classCallCheck3.default)(this, DependencyGraph);

    /**
     * @type {RelationExpression}
     */
    this.allowedRelations = allowedRelations;

    /**
     * @type {Object.<string, DependencyNode>}
     */
    this.nodesById = (0, _create2.default)(null);

    /**
     * @type {Object.<string, DependencyNode>}
     */
    this.inputNodesById = (0, _create2.default)(null);

    /**
     * @type {Array.<DependencyNode>}
     */
    this.nodes = [];

    /**
     * @type {number}
     */
    this.uid = 0;
  }

  DependencyGraph.prototype.build = function build(modelClass, models) {
    this.nodesById = (0, _create2.default)(null);
    this.nodes = [];

    if (Array.isArray(models)) {
      for (var i = 0, l = models.length; i < l; ++i) {
        this.buildForModel(modelClass, models[i], null, null, this.allowedRelations);
      }
    } else {
      this.buildForModel(modelClass, models, null, null, this.allowedRelations);
    }

    this.solveReferences();
    this.createNonRelationDeps();

    if (this.isCyclic(this.nodes)) {
      throw new _ValidationError2.default({ cyclic: 'the object graph contains cyclic references' });
    }

    return this.nodes;
  };

  DependencyGraph.prototype.buildForModel = function buildForModel(modelClass, model, parentNode, rel, allowedRelations) {
    if (!(model instanceof _Model2.default)) {
      throw new _ValidationError2.default({ notModel: 'not a model' });
    }

    if (!model[model.constructor.uidProp]) {
      model[model.constructor.uidProp] = this.createUid();
    }

    var node = new _DependencyNode2.default(model, modelClass);

    this.nodesById[node.id] = node;
    this.nodes.push(node);

    if (!parentNode) {
      this.inputNodesById[node.id] = node;
    }

    if (rel instanceof _HasManyRelation2.default) {

      node.needs.push(new _HasManyDependency2.default(parentNode, rel));
      parentNode.isNeededBy.push(new _HasManyDependency2.default(node, rel));
    } else if (rel instanceof _BelongsToOneRelation2.default) {

      node.isNeededBy.push(new _BelongsToOneDependency2.default(parentNode, rel));
      parentNode.needs.push(new _BelongsToOneDependency2.default(node, rel));
    } else if (rel instanceof _ManyToManyRelation2.default) {

      // ManyToManyRelations create no dependencies since we can create the
      // join table rows after everything else has been inserted.
      parentNode.manyToManyConnections.push(new _ManyToManyConnection2.default(node, rel));
    }

    this.buildForRelations(modelClass, model, node, allowedRelations);
  };

  DependencyGraph.prototype.buildForRelations = function buildForRelations(modelClass, model, node, allowedRelations) {
    var relations = modelClass.getRelations();
    var relNames = (0, _keys2.default)(relations);

    for (var i = 0, l = relNames.length; i < l; ++i) {
      var relName = relNames[i];
      var relModels = model[relName];
      var rel = relations[relName];

      var nextAllowed = null;

      if (relModels && allowedRelations instanceof _RelationExpression2.default) {
        nextAllowed = allowedRelations.childExpression(relName);

        if (!nextAllowed) {
          throw new _ValidationError2.default({ allowedRelations: 'trying to insert an unallowed relation' });
        }
      }

      if (Array.isArray(relModels)) {
        for (var _i = 0, _l = relModels.length; _i < _l; ++_i) {
          this.buildForItem(rel.relatedModelClass, relModels[_i], node, rel, nextAllowed);
        }
      } else if (relModels) {
        this.buildForItem(rel.relatedModelClass, relModels, node, rel, nextAllowed);
      }
    }
  };

  DependencyGraph.prototype.buildForItem = function buildForItem(modelClass, item, parentNode, rel, allowedRelations) {
    if (rel instanceof _ManyToManyRelation2.default && item[modelClass.dbRefProp]) {
      this.buildForId(modelClass, item, parentNode, rel, allowedRelations);
    } else {
      this.buildForModel(modelClass, item, parentNode, rel, allowedRelations);
    }
  };

  DependencyGraph.prototype.buildForId = function buildForId(modelClass, item, parentNode, rel) {
    var node = new _DependencyNode2.default(item, modelClass);
    node.handled = true;

    item.$id(item[modelClass.dbRefProp]);
    parentNode.manyToManyConnections.push(new _ManyToManyConnection2.default(node, rel));
  };

  DependencyGraph.prototype.solveReferences = function solveReferences() {
    var refMap = (0, _create2.default)(null);

    // First merge all reference nodes into the actual node.
    this.mergeReferences(refMap);

    // Replace all reference nodes with the actual nodes.
    this.replaceReferenceNodes(refMap);
  };

  DependencyGraph.prototype.mergeReferences = function mergeReferences(refMap) {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var refNode = this.nodes[n];

      if (refNode.handled) {
        continue;
      }

      var ref = refNode.model[refNode.modelClass.uidRefProp];

      if (ref) {
        var actualNode = this.nodesById[ref];

        if (!actualNode) {
          throw new _ValidationError2.default({ ref: 'could not resolve reference "' + ref + '"' });
        }

        var d = void 0,
            ld = void 0;

        for (d = 0, ld = refNode.needs.length; d < ld; ++d) {
          actualNode.needs.push(refNode.needs[d]);
        }

        for (d = 0, ld = refNode.isNeededBy.length; d < ld; ++d) {
          actualNode.isNeededBy.push(refNode.isNeededBy[d]);
        }

        for (var m = 0, lm = refNode.manyToManyConnections.length; m < lm; ++m) {
          actualNode.manyToManyConnections.push(refNode.manyToManyConnections[m]);
        }

        refMap[refNode.id] = actualNode;
        refNode.handled = true;
      }
    }
  };

  DependencyGraph.prototype.replaceReferenceNodes = function replaceReferenceNodes(refMap) {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var node = this.nodes[n];
      var d = void 0,
          ld = void 0,
          dep = void 0,
          actualNode = void 0;

      for (d = 0, ld = node.needs.length; d < ld; ++d) {
        dep = node.needs[d];
        actualNode = refMap[dep.node.id];

        if (actualNode) {
          dep.node = actualNode;
        }
      }

      for (d = 0, ld = node.isNeededBy.length; d < ld; ++d) {
        dep = node.isNeededBy[d];
        actualNode = refMap[dep.node.id];

        if (actualNode) {
          dep.node = actualNode;
        }
      }

      for (var m = 0, lm = node.manyToManyConnections.length; m < lm; ++m) {
        var conn = node.manyToManyConnections[m];
        actualNode = refMap[conn.node.id];

        if (actualNode) {
          conn.refNode = conn.node;
          conn.node = actualNode;
        }
      }
    }
  };

  DependencyGraph.prototype.createNonRelationDeps = function createNonRelationDeps() {
    for (var n = 0, ln = this.nodes.length; n < ln; ++n) {
      var node = this.nodes[n];

      if (!node.handled) {
        this.createNonRelationDepsForObject(node.model, node, []);
      }
    }
  };

  DependencyGraph.prototype.createNonRelationDepsForObject = function createNonRelationDepsForObject(obj, node, path) {
    var _this = this;

    var propRefRegex = node.modelClass.propRefRegex;
    var relations = node.modelClass.getRelations();
    var isModel = obj instanceof _Model2.default;
    var keys = (0, _keys2.default)(obj);

    var _loop = function _loop(i, l) {
      var key = keys[i];
      var value = obj[key];

      if (isModel && relations[key]) {
        // Don't traverse the relations of model instances.
        return {
          v: void 0
        };
      }

      path.push(key);

      if (typeof value === 'string') {
        allMatches(propRefRegex, value, function (matchResult) {
          var match = matchResult[0];
          var refId = matchResult[1];
          var refProp = matchResult[2];
          var refNode = _this.nodesById[refId];

          if (!refNode) {
            throw new _ValidationError2.default({ ref: 'could not resolve reference "' + value + '"' });
          }

          if (value === match) {
            // If the match is the whole string, replace the value with the resolved value.
            // This means that the value will have the same type as the resolved value
            // (date, number, etc).
            node.needs.push(new _ReplaceValueDependency2.default(refNode, path, refProp, false));
            refNode.isNeededBy.push(new _ReplaceValueDependency2.default(node, path, refProp, true));
          } else {
            // If the match is inside a string, replace the reference inside the string with
            // the resolved value.
            node.needs.push(new _InterpolateValueDependency2.default(refNode, path, refProp, match, false));
            refNode.isNeededBy.push(new _InterpolateValueDependency2.default(node, path, refProp, match, true));
          }
        });
      } else if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
        _this.createNonRelationDepsForObject(value, node, path);
      }

      path.pop();
    };

    for (var i = 0, l = keys.length; i < l; ++i) {
      var _ret = _loop(i, l);

      if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
    }
  };

  DependencyGraph.prototype.isCyclic = function isCyclic(nodes) {
    var isCyclic = false;

    for (var n = 0, ln = nodes.length; n < ln; ++n) {
      var node = nodes[n];

      if (node.handled) {
        return;
      }

      if (this.isCyclicNode(node)) {
        isCyclic = true;
        break;
      }
    }

    this.clearFlags(this.nodes);
    return isCyclic;
  };

  DependencyGraph.prototype.isCyclicNode = function isCyclicNode(node) {
    if (!node.visited) {
      node.visited = true;
      node.recursion = true;

      for (var d = 0, ld = node.needs.length; d < ld; ++d) {
        var dep = node.needs[d];

        if (!dep.node.visited && this.isCyclicNode(dep.node)) {
          return true;
        } else if (dep.node.recursion) {
          return true;
        }
      }
    }

    node.recursion = false;
    return false;
  };

  DependencyGraph.prototype.clearFlags = function clearFlags(nodes) {
    for (var n = 0, ln = nodes.length; n < ln; ++n) {
      var node = nodes[n];

      node.visited = false;
      node.recursion = false;
    }
  };

  DependencyGraph.prototype.createUid = function createUid() {
    return '__objection_uid(' + ++this.uid + ')__';
  };

  return DependencyGraph;
}();

exports.default = DependencyGraph;


function allMatches(regex, str, cb) {
  var matchResult = regex.exec(str);

  while (matchResult) {
    cb(matchResult);
    matchResult = regex.exec(str);
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlcGVuZGVuY3lHcmFwaC5qcyJdLCJuYW1lcyI6WyJEZXBlbmRlbmN5R3JhcGgiLCJhbGxvd2VkUmVsYXRpb25zIiwibm9kZXNCeUlkIiwiaW5wdXROb2Rlc0J5SWQiLCJub2RlcyIsInVpZCIsImJ1aWxkIiwibW9kZWxDbGFzcyIsIm1vZGVscyIsIkFycmF5IiwiaXNBcnJheSIsImkiLCJsIiwibGVuZ3RoIiwiYnVpbGRGb3JNb2RlbCIsInNvbHZlUmVmZXJlbmNlcyIsImNyZWF0ZU5vblJlbGF0aW9uRGVwcyIsImlzQ3ljbGljIiwiY3ljbGljIiwibW9kZWwiLCJwYXJlbnROb2RlIiwicmVsIiwibm90TW9kZWwiLCJjb25zdHJ1Y3RvciIsInVpZFByb3AiLCJjcmVhdGVVaWQiLCJub2RlIiwiaWQiLCJwdXNoIiwibmVlZHMiLCJpc05lZWRlZEJ5IiwibWFueVRvTWFueUNvbm5lY3Rpb25zIiwiYnVpbGRGb3JSZWxhdGlvbnMiLCJyZWxhdGlvbnMiLCJnZXRSZWxhdGlvbnMiLCJyZWxOYW1lcyIsInJlbE5hbWUiLCJyZWxNb2RlbHMiLCJuZXh0QWxsb3dlZCIsImNoaWxkRXhwcmVzc2lvbiIsImJ1aWxkRm9ySXRlbSIsInJlbGF0ZWRNb2RlbENsYXNzIiwiaXRlbSIsImRiUmVmUHJvcCIsImJ1aWxkRm9ySWQiLCJoYW5kbGVkIiwiJGlkIiwicmVmTWFwIiwibWVyZ2VSZWZlcmVuY2VzIiwicmVwbGFjZVJlZmVyZW5jZU5vZGVzIiwibiIsImxuIiwicmVmTm9kZSIsInJlZiIsInVpZFJlZlByb3AiLCJhY3R1YWxOb2RlIiwiZCIsImxkIiwibSIsImxtIiwiZGVwIiwiY29ubiIsImNyZWF0ZU5vblJlbGF0aW9uRGVwc0Zvck9iamVjdCIsIm9iaiIsInBhdGgiLCJwcm9wUmVmUmVnZXgiLCJpc01vZGVsIiwia2V5cyIsImtleSIsInZhbHVlIiwiYWxsTWF0Y2hlcyIsIm1hdGNoIiwibWF0Y2hSZXN1bHQiLCJyZWZJZCIsInJlZlByb3AiLCJwb3AiLCJpc0N5Y2xpY05vZGUiLCJjbGVhckZsYWdzIiwidmlzaXRlZCIsInJlY3Vyc2lvbiIsInJlZ2V4Iiwic3RyIiwiY2IiLCJleGVjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxlO0FBRW5CLDJCQUFZQyxnQkFBWixFQUE4QjtBQUFBOztBQUM1Qjs7O0FBR0EsU0FBS0EsZ0JBQUwsR0FBd0JBLGdCQUF4Qjs7QUFFQTs7O0FBR0EsU0FBS0MsU0FBTCxHQUFpQixzQkFBYyxJQUFkLENBQWpCOztBQUVBOzs7QUFHQSxTQUFLQyxjQUFMLEdBQXNCLHNCQUFjLElBQWQsQ0FBdEI7O0FBRUE7OztBQUdBLFNBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBOzs7QUFHQSxTQUFLQyxHQUFMLEdBQVcsQ0FBWDtBQUNEOzs0QkFFREMsSyxrQkFBTUMsVSxFQUFZQyxNLEVBQVE7QUFDeEIsU0FBS04sU0FBTCxHQUFpQixzQkFBYyxJQUFkLENBQWpCO0FBQ0EsU0FBS0UsS0FBTCxHQUFhLEVBQWI7O0FBRUEsUUFBSUssTUFBTUMsT0FBTixDQUFjRixNQUFkLENBQUosRUFBMkI7QUFDekIsV0FBSyxJQUFJRyxJQUFJLENBQVIsRUFBV0MsSUFBSUosT0FBT0ssTUFBM0IsRUFBbUNGLElBQUlDLENBQXZDLEVBQTBDLEVBQUVELENBQTVDLEVBQStDO0FBQzdDLGFBQUtHLGFBQUwsQ0FBbUJQLFVBQW5CLEVBQStCQyxPQUFPRyxDQUFQLENBQS9CLEVBQTBDLElBQTFDLEVBQWdELElBQWhELEVBQXNELEtBQUtWLGdCQUEzRDtBQUNEO0FBQ0YsS0FKRCxNQUlPO0FBQ0wsV0FBS2EsYUFBTCxDQUFtQlAsVUFBbkIsRUFBK0JDLE1BQS9CLEVBQXVDLElBQXZDLEVBQTZDLElBQTdDLEVBQW1ELEtBQUtQLGdCQUF4RDtBQUNEOztBQUVE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QU4sQ0FBV0YsR0FBWCxDQUFsQjs7QUFFQSxTQUFPVCxXQUFQLEVBQW9CO0FBQ2xCVSxPQUFHVixXQUFIO0FBQ0FBLGtCQUFjUSxNQUFNRyxJQUFOLENBQVdGLEdBQVgsQ0FBZDtBQUNEO0FBQ0YiLCJmaWxlIjoiRGVwZW5kZW5jeUdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1vZGVsIGZyb20gJy4uLy4uL21vZGVsL01vZGVsJztcbmltcG9ydCBIYXNNYW55UmVsYXRpb24gZnJvbSAnLi4vLi4vcmVsYXRpb25zL2hhc01hbnkvSGFzTWFueVJlbGF0aW9uJztcbmltcG9ydCBSZWxhdGlvbkV4cHJlc3Npb24gZnJvbSAnLi4vUmVsYXRpb25FeHByZXNzaW9uJztcbmltcG9ydCBNYW55VG9NYW55UmVsYXRpb24gZnJvbSAnLi4vLi4vcmVsYXRpb25zL21hbnlUb01hbnkvTWFueVRvTWFueVJlbGF0aW9uJztcbmltcG9ydCBCZWxvbmdzVG9PbmVSZWxhdGlvbiBmcm9tICcuLi8uLi9yZWxhdGlvbnMvYmVsb25nc1RvT25lL0JlbG9uZ3NUb09uZVJlbGF0aW9uJztcbmltcG9ydCBWYWxpZGF0aW9uRXJyb3IgZnJvbSAnLi4vLi4vbW9kZWwvVmFsaWRhdGlvbkVycm9yJztcblxuaW1wb3J0IERlcGVuZGVuY3lOb2RlIGZyb20gJy4vRGVwZW5kZW5jeU5vZGUnO1xuaW1wb3J0IEhhc01hbnlEZXBlbmRlbmN5IGZyb20gJy4vSGFzTWFueURlcGVuZGVuY3knO1xuaW1wb3J0IE1hbnlUb01hbnlDb25uZWN0aW9uIGZyb20gJy4vTWFueVRvTWFueUNvbm5lY3Rpb24nO1xuaW1wb3J0IFJlcGxhY2VWYWx1ZURlcGVuZGVuY3kgZnJvbSAnLi9SZXBsYWNlVmFsdWVEZXBlbmRlbmN5JztcbmltcG9ydCBCZWxvbmdzVG9PbmVEZXBlbmRlbmN5IGZyb20gJy4vQmVsb25nc1RvT25lRGVwZW5kZW5jeSc7XG5pbXBvcnQgSW50ZXJwb2xhdGVWYWx1ZURlcGVuZGVuY3kgZnJvbSAnLi9JbnRlcnBvbGF0ZVZhbHVlRGVwZW5kZW5jeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGVuZGVuY3lHcmFwaCB7XG5cbiAgY29uc3RydWN0b3IoYWxsb3dlZFJlbGF0aW9ucykge1xuICAgIC8qKlxuICAgICAqIEB0eXBlIHtSZWxhdGlvbkV4cHJlc3Npb259XG4gICAgICovXG4gICAgdGhpcy5hbGxvd2VkUmVsYXRpb25zID0gYWxsb3dlZFJlbGF0aW9ucztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgRGVwZW5kZW5jeU5vZGU+fVxuICAgICAqL1xuICAgIHRoaXMubm9kZXNCeUlkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgRGVwZW5kZW5jeU5vZGU+fVxuICAgICAqL1xuICAgIHRoaXMuaW5wdXROb2Rlc0J5SWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxEZXBlbmRlbmN5Tm9kZT59XG4gICAgICovXG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKi9cbiAgICB0aGlzLnVpZCA9IDA7XG4gIH1cblxuICBidWlsZChtb2RlbENsYXNzLCBtb2RlbHMpIHtcbiAgICB0aGlzLm5vZGVzQnlJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5ub2RlcyA9IFtdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkobW9kZWxzKSkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBtb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHRoaXMuYnVpbGRGb3JNb2RlbChtb2RlbENsYXNzLCBtb2RlbHNbaV0sIG51bGwsIG51bGwsIHRoaXMuYWxsb3dlZFJlbGF0aW9ucyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVpbGRGb3JNb2RlbChtb2RlbENsYXNzLCBtb2RlbHMsIG51bGwsIG51bGwsIHRoaXMuYWxsb3dlZFJlbGF0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhpcy5zb2x2ZVJlZmVyZW5jZXMoKTtcbiAgICB0aGlzLmNyZWF0ZU5vblJlbGF0aW9uRGVwcygpO1xuXG4gICAgaWYgKHRoaXMuaXNDeWNsaWModGhpcy5ub2RlcykpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe2N5Y2xpYzogJ3RoZSBvYmplY3QgZ3JhcGggY29udGFpbnMgY3ljbGljIHJlZmVyZW5jZXMnfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubm9kZXM7XG4gIH07XG5cbiAgYnVpbGRGb3JNb2RlbChtb2RlbENsYXNzLCBtb2RlbCwgcGFyZW50Tm9kZSwgcmVsLCBhbGxvd2VkUmVsYXRpb25zKSB7XG4gICAgaWYgKCEobW9kZWwgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe25vdE1vZGVsOiAnbm90IGEgbW9kZWwnfSk7XG4gICAgfVxuXG4gICAgaWYgKCFtb2RlbFttb2RlbC5jb25zdHJ1Y3Rvci51aWRQcm9wXSkge1xuICAgICAgbW9kZWxbbW9kZWwuY29uc3RydWN0b3IudWlkUHJvcF0gPSB0aGlzLmNyZWF0ZVVpZCgpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSBuZXcgRGVwZW5kZW5jeU5vZGUobW9kZWwsIG1vZGVsQ2xhc3MpO1xuXG4gICAgdGhpcy5ub2Rlc0J5SWRbbm9kZS5pZF0gPSBub2RlO1xuICAgIHRoaXMubm9kZXMucHVzaChub2RlKTtcblxuICAgIGlmICghcGFyZW50Tm9kZSkge1xuICAgICAgdGhpcy5pbnB1dE5vZGVzQnlJZFtub2RlLmlkXSA9IG5vZGU7XG4gICAgfVxuXG4gICAgaWYgKHJlbCBpbnN0YW5jZW9mIEhhc01hbnlSZWxhdGlvbikge1xuXG4gICAgICBub2RlLm5lZWRzLnB1c2gobmV3IEhhc01hbnlEZXBlbmRlbmN5KHBhcmVudE5vZGUsIHJlbCkpO1xuICAgICAgcGFyZW50Tm9kZS5pc05lZWRlZEJ5LnB1c2gobmV3IEhhc01hbnlEZXBlbmRlbmN5KG5vZGUsIHJlbCkpO1xuXG4gICAgfSBlbHNlIGlmIChyZWwgaW5zdGFuY2VvZiBCZWxvbmdzVG9PbmVSZWxhdGlvbikge1xuXG4gICAgICBub2RlLmlzTmVlZGVkQnkucHVzaChuZXcgQmVsb25nc1RvT25lRGVwZW5kZW5jeShwYXJlbnROb2RlLCByZWwpKTtcbiAgICAgIHBhcmVudE5vZGUubmVlZHMucHVzaChuZXcgQmVsb25nc1RvT25lRGVwZW5kZW5jeShub2RlLCByZWwpKTtcblxuICAgIH0gZWxzZSBpZiAocmVsIGluc3RhbmNlb2YgTWFueVRvTWFueVJlbGF0aW9uKSB7XG5cbiAgICAgIC8vIE1hbnlUb01hbnlSZWxhdGlvbnMgY3JlYXRlIG5vIGRlcGVuZGVuY2llcyBzaW5jZSB3ZSBjYW4gY3JlYXRlIHRoZVxuICAgICAgLy8gam9pbiB0YWJsZSByb3dzIGFmdGVyIGV2ZXJ5dGhpbmcgZWxzZSBoYXMgYmVlbiBpbnNlcnRlZC5cbiAgICAgIHBhcmVudE5vZGUubWFueVRvTWFueUNvbm5lY3Rpb25zLnB1c2gobmV3IE1hbnlUb01hbnlDb25uZWN0aW9uKG5vZGUsIHJlbCkpO1xuXG4gICAgfVxuXG4gICAgdGhpcy5idWlsZEZvclJlbGF0aW9ucyhtb2RlbENsYXNzLCBtb2RlbCwgbm9kZSwgYWxsb3dlZFJlbGF0aW9ucyk7XG4gIH1cblxuICBidWlsZEZvclJlbGF0aW9ucyhtb2RlbENsYXNzLCBtb2RlbCwgbm9kZSwgYWxsb3dlZFJlbGF0aW9ucykge1xuICAgIGNvbnN0IHJlbGF0aW9ucyA9IG1vZGVsQ2xhc3MuZ2V0UmVsYXRpb25zKCk7XG4gICAgY29uc3QgcmVsTmFtZXMgPSBPYmplY3Qua2V5cyhyZWxhdGlvbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxOYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbE5hbWUgPSByZWxOYW1lc1tpXTtcbiAgICAgIGNvbnN0IHJlbE1vZGVscyA9IG1vZGVsW3JlbE5hbWVdO1xuICAgICAgY29uc3QgcmVsID0gcmVsYXRpb25zW3JlbE5hbWVdO1xuXG4gICAgICBsZXQgbmV4dEFsbG93ZWQgPSBudWxsO1xuXG4gICAgICBpZiAocmVsTW9kZWxzICYmIGFsbG93ZWRSZWxhdGlvbnMgaW5zdGFuY2VvZiBSZWxhdGlvbkV4cHJlc3Npb24pIHtcbiAgICAgICAgbmV4dEFsbG93ZWQgPSBhbGxvd2VkUmVsYXRpb25zLmNoaWxkRXhwcmVzc2lvbihyZWxOYW1lKTtcblxuICAgICAgICBpZiAoIW5leHRBbGxvd2VkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7YWxsb3dlZFJlbGF0aW9uczogJ3RyeWluZyB0byBpbnNlcnQgYW4gdW5hbGxvd2VkIHJlbGF0aW9uJ30pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlbE1vZGVscykpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxNb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgICAgdGhpcy5idWlsZEZvckl0ZW0ocmVsLnJlbGF0ZWRNb2RlbENsYXNzLCByZWxNb2RlbHNbaV0sIG5vZGUsIHJlbCwgbmV4dEFsbG93ZWQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlbE1vZGVscykge1xuICAgICAgICB0aGlzLmJ1aWxkRm9ySXRlbShyZWwucmVsYXRlZE1vZGVsQ2xhc3MsIHJlbE1vZGVscywgbm9kZSwgcmVsLCBuZXh0QWxsb3dlZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYnVpbGRGb3JJdGVtKG1vZGVsQ2xhc3MsIGl0ZW0sIHBhcmVudE5vZGUsIHJlbCwgYWxsb3dlZFJlbGF0aW9ucykge1xuICAgIGlmIChyZWwgaW5zdGFuY2VvZiBNYW55VG9NYW55UmVsYXRpb24gJiYgaXRlbVttb2RlbENsYXNzLmRiUmVmUHJvcF0pIHtcbiAgICAgIHRoaXMuYnVpbGRGb3JJZChtb2RlbENsYXNzLCBpdGVtLCBwYXJlbnROb2RlLCByZWwsIGFsbG93ZWRSZWxhdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1aWxkRm9yTW9kZWwobW9kZWxDbGFzcywgaXRlbSwgcGFyZW50Tm9kZSwgcmVsLCBhbGxvd2VkUmVsYXRpb25zKTtcbiAgICB9XG4gIH1cblxuICBidWlsZEZvcklkKG1vZGVsQ2xhc3MsIGl0ZW0sIHBhcmVudE5vZGUsIHJlbCkge1xuICAgIGNvbnN0IG5vZGUgPSBuZXcgRGVwZW5kZW5jeU5vZGUoaXRlbSwgbW9kZWxDbGFzcyk7XG4gICAgbm9kZS5oYW5kbGVkID0gdHJ1ZTtcblxuICAgIGl0ZW0uJGlkKGl0ZW1bbW9kZWxDbGFzcy5kYlJlZlByb3BdKTtcbiAgICBwYXJlbnROb2RlLm1hbnlUb01hbnlDb25uZWN0aW9ucy5wdXNoKG5ldyBNYW55VG9NYW55Q29ubmVjdGlvbihub2RlLCByZWwpKTtcbiAgfVxuXG4gIHNvbHZlUmVmZXJlbmNlcygpIHtcbiAgICBsZXQgcmVmTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIC8vIEZpcnN0IG1lcmdlIGFsbCByZWZlcmVuY2Ugbm9kZXMgaW50byB0aGUgYWN0dWFsIG5vZGUuXG4gICAgdGhpcy5tZXJnZVJlZmVyZW5jZXMocmVmTWFwKTtcblxuICAgIC8vIFJlcGxhY2UgYWxsIHJlZmVyZW5jZSBub2RlcyB3aXRoIHRoZSBhY3R1YWwgbm9kZXMuXG4gICAgdGhpcy5yZXBsYWNlUmVmZXJlbmNlTm9kZXMocmVmTWFwKTtcbiAgfVxuXG4gIG1lcmdlUmVmZXJlbmNlcyhyZWZNYXApIHtcbiAgICBmb3IgKGxldCBuID0gMCwgbG4gPSB0aGlzLm5vZGVzLmxlbmd0aDsgbiA8IGxuOyArK24pIHtcbiAgICAgIGxldCByZWZOb2RlID0gdGhpcy5ub2Rlc1tuXTtcblxuICAgICAgaWYgKHJlZk5vZGUuaGFuZGxlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZiA9IHJlZk5vZGUubW9kZWxbcmVmTm9kZS5tb2RlbENsYXNzLnVpZFJlZlByb3BdO1xuXG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIGxldCBhY3R1YWxOb2RlID0gdGhpcy5ub2Rlc0J5SWRbcmVmXTtcblxuICAgICAgICBpZiAoIWFjdHVhbE5vZGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtyZWY6IGBjb3VsZCBub3QgcmVzb2x2ZSByZWZlcmVuY2UgXCIke3JlZn1cImB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkLCBsZDtcblxuICAgICAgICBmb3IgKGQgPSAwLCBsZCA9IHJlZk5vZGUubmVlZHMubGVuZ3RoOyBkIDwgbGQ7ICsrZCkge1xuICAgICAgICAgIGFjdHVhbE5vZGUubmVlZHMucHVzaChyZWZOb2RlLm5lZWRzW2RdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoZCA9IDAsIGxkID0gcmVmTm9kZS5pc05lZWRlZEJ5Lmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgICBhY3R1YWxOb2RlLmlzTmVlZGVkQnkucHVzaChyZWZOb2RlLmlzTmVlZGVkQnlbZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgbSA9IDAsIGxtID0gcmVmTm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnMubGVuZ3RoOyBtIDwgbG07ICsrbSkge1xuICAgICAgICAgIGFjdHVhbE5vZGUubWFueVRvTWFueUNvbm5lY3Rpb25zLnB1c2gocmVmTm9kZS5tYW55VG9NYW55Q29ubmVjdGlvbnNbbV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVmTWFwW3JlZk5vZGUuaWRdID0gYWN0dWFsTm9kZTtcbiAgICAgICAgcmVmTm9kZS5oYW5kbGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXBsYWNlUmVmZXJlbmNlTm9kZXMocmVmTWFwKSB7XG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gdGhpcy5ub2Rlcy5sZW5ndGg7IG4gPCBsbjsgKytuKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZXNbbl07XG4gICAgICBsZXQgZCwgbGQsIGRlcCwgYWN0dWFsTm9kZTtcblxuICAgICAgZm9yIChkID0gMCwgbGQgPSBub2RlLm5lZWRzLmxlbmd0aDsgZCA8IGxkOyArK2QpIHtcbiAgICAgICAgZGVwID0gbm9kZS5uZWVkc1tkXTtcbiAgICAgICAgYWN0dWFsTm9kZSA9IHJlZk1hcFtkZXAubm9kZS5pZF07XG5cbiAgICAgICAgaWYgKGFjdHVhbE5vZGUpIHtcbiAgICAgICAgICBkZXAubm9kZSA9IGFjdHVhbE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZm9yIChkID0gMCwgbGQgPSBub2RlLmlzTmVlZGVkQnkubGVuZ3RoOyBkIDwgbGQ7ICsrZCkge1xuICAgICAgICBkZXAgPSBub2RlLmlzTmVlZGVkQnlbZF07XG4gICAgICAgIGFjdHVhbE5vZGUgPSByZWZNYXBbZGVwLm5vZGUuaWRdO1xuXG4gICAgICAgIGlmIChhY3R1YWxOb2RlKSB7XG4gICAgICAgICAgZGVwLm5vZGUgPSBhY3R1YWxOb2RlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IG0gPSAwLCBsbSA9IG5vZGUubWFueVRvTWFueUNvbm5lY3Rpb25zLmxlbmd0aDsgbSA8IGxtOyArK20pIHtcbiAgICAgICAgbGV0IGNvbm4gPSBub2RlLm1hbnlUb01hbnlDb25uZWN0aW9uc1ttXTtcbiAgICAgICAgYWN0dWFsTm9kZSA9IHJlZk1hcFtjb25uLm5vZGUuaWRdO1xuXG4gICAgICAgIGlmIChhY3R1YWxOb2RlKSB7XG4gICAgICAgICAgY29ubi5yZWZOb2RlID0gY29ubi5ub2RlO1xuICAgICAgICAgIGNvbm4ubm9kZSA9IGFjdHVhbE5vZGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVOb25SZWxhdGlvbkRlcHMoKSB7XG4gICAgZm9yIChsZXQgbiA9IDAsIGxuID0gdGhpcy5ub2Rlcy5sZW5ndGg7IG4gPCBsbjsgKytuKSB7XG4gICAgICBsZXQgbm9kZSA9IHRoaXMubm9kZXNbbl07XG5cbiAgICAgIGlmICghbm9kZS5oYW5kbGVkKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlTm9uUmVsYXRpb25EZXBzRm9yT2JqZWN0KG5vZGUubW9kZWwsIG5vZGUsIFtdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVOb25SZWxhdGlvbkRlcHNGb3JPYmplY3Qob2JqLCBub2RlLCBwYXRoKSB7XG4gICAgY29uc3QgcHJvcFJlZlJlZ2V4ID0gbm9kZS5tb2RlbENsYXNzLnByb3BSZWZSZWdleDtcbiAgICBjb25zdCByZWxhdGlvbnMgPSBub2RlLm1vZGVsQ2xhc3MuZ2V0UmVsYXRpb25zKCk7XG4gICAgY29uc3QgaXNNb2RlbCA9IG9iaiBpbnN0YW5jZW9mIE1vZGVsO1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG5cbiAgICAgIGlmIChpc01vZGVsICYmIHJlbGF0aW9uc1trZXldKSB7XG4gICAgICAgIC8vIERvbid0IHRyYXZlcnNlIHRoZSByZWxhdGlvbnMgb2YgbW9kZWwgaW5zdGFuY2VzLlxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHBhdGgucHVzaChrZXkpO1xuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBhbGxNYXRjaGVzKHByb3BSZWZSZWdleCwgdmFsdWUsIG1hdGNoUmVzdWx0ID0+IHtcbiAgICAgICAgICBsZXQgbWF0Y2ggPSBtYXRjaFJlc3VsdFswXTtcbiAgICAgICAgICBsZXQgcmVmSWQgPSBtYXRjaFJlc3VsdFsxXTtcbiAgICAgICAgICBsZXQgcmVmUHJvcCA9IG1hdGNoUmVzdWx0WzJdO1xuICAgICAgICAgIGxldCByZWZOb2RlID0gdGhpcy5ub2Rlc0J5SWRbcmVmSWRdO1xuXG4gICAgICAgICAgaWYgKCFyZWZOb2RlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVmFsaWRhdGlvbkVycm9yKHtyZWY6IGBjb3VsZCBub3QgcmVzb2x2ZSByZWZlcmVuY2UgXCIke3ZhbHVlfVwiYH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXRjaCBpcyB0aGUgd2hvbGUgc3RyaW5nLCByZXBsYWNlIHRoZSB2YWx1ZSB3aXRoIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAgICAgICAgICAgIC8vIFRoaXMgbWVhbnMgdGhhdCB0aGUgdmFsdWUgd2lsbCBoYXZlIHRoZSBzYW1lIHR5cGUgYXMgdGhlIHJlc29sdmVkIHZhbHVlXG4gICAgICAgICAgICAvLyAoZGF0ZSwgbnVtYmVyLCBldGMpLlxuICAgICAgICAgICAgbm9kZS5uZWVkcy5wdXNoKG5ldyBSZXBsYWNlVmFsdWVEZXBlbmRlbmN5KHJlZk5vZGUsIHBhdGgsIHJlZlByb3AsIGZhbHNlKSk7XG4gICAgICAgICAgICByZWZOb2RlLmlzTmVlZGVkQnkucHVzaChuZXcgUmVwbGFjZVZhbHVlRGVwZW5kZW5jeShub2RlLCBwYXRoLCByZWZQcm9wLCB0cnVlKSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXRjaCBpcyBpbnNpZGUgYSBzdHJpbmcsIHJlcGxhY2UgdGhlIHJlZmVyZW5jZSBpbnNpZGUgdGhlIHN0cmluZyB3aXRoXG4gICAgICAgICAgICAvLyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gICAgICAgICAgICBub2RlLm5lZWRzLnB1c2gobmV3IEludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5KHJlZk5vZGUsIHBhdGgsIHJlZlByb3AsIG1hdGNoLCBmYWxzZSkpO1xuICAgICAgICAgICAgcmVmTm9kZS5pc05lZWRlZEJ5LnB1c2gobmV3IEludGVycG9sYXRlVmFsdWVEZXBlbmRlbmN5KG5vZGUsIHBhdGgsIHJlZlByb3AsIG1hdGNoLCB0cnVlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICB0aGlzLmNyZWF0ZU5vblJlbGF0aW9uRGVwc0Zvck9iamVjdCh2YWx1ZSwgbm9kZSwgcGF0aCk7XG4gICAgICB9XG5cbiAgICAgIHBhdGgucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgaXNDeWNsaWMobm9kZXMpIHtcbiAgICBsZXQgaXNDeWNsaWMgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IG4gPSAwLCBsbiA9IG5vZGVzLmxlbmd0aDsgbiA8IGxuOyArK24pIHtcbiAgICAgIGxldCBub2RlID0gbm9kZXNbbl07XG5cbiAgICAgIGlmIChub2RlLmhhbmRsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0N5Y2xpY05vZGUobm9kZSkpIHtcbiAgICAgICAgaXNDeWNsaWMgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNsZWFyRmxhZ3ModGhpcy5ub2Rlcyk7XG4gICAgcmV0dXJuIGlzQ3ljbGljO1xuICB9XG5cbiAgaXNDeWNsaWNOb2RlKG5vZGUpIHtcbiAgICBpZiAoIW5vZGUudmlzaXRlZCkge1xuICAgICAgbm9kZS52aXNpdGVkID0gdHJ1ZTtcbiAgICAgIG5vZGUucmVjdXJzaW9uID0gdHJ1ZTtcblxuICAgICAgZm9yIChsZXQgZCA9IDAsIGxkID0gbm9kZS5uZWVkcy5sZW5ndGg7IGQgPCBsZDsgKytkKSB7XG4gICAgICAgIGxldCBkZXAgPSBub2RlLm5lZWRzW2RdO1xuXG4gICAgICAgIGlmICghZGVwLm5vZGUudmlzaXRlZCAmJiB0aGlzLmlzQ3ljbGljTm9kZShkZXAubm9kZSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChkZXAubm9kZS5yZWN1cnNpb24pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG5vZGUucmVjdXJzaW9uID0gZmFsc2U7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xlYXJGbGFncyhub2Rlcykge1xuICAgIGZvciAobGV0IG4gPSAwLCBsbiA9IG5vZGVzLmxlbmd0aDsgbiA8IGxuOyArK24pIHtcbiAgICAgIGxldCBub2RlID0gbm9kZXNbbl07XG5cbiAgICAgIG5vZGUudmlzaXRlZCA9IGZhbHNlO1xuICAgICAgbm9kZS5yZWN1cnNpb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVVaWQoKSB7XG4gICAgcmV0dXJuIGBfX29iamVjdGlvbl91aWQoJHsrK3RoaXMudWlkfSlfX2A7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsTWF0Y2hlcyhyZWdleCwgc3RyLCBjYikge1xuICBsZXQgbWF0Y2hSZXN1bHQgPSByZWdleC5leGVjKHN0cik7XG5cbiAgd2hpbGUgKG1hdGNoUmVzdWx0KSB7XG4gICAgY2IobWF0Y2hSZXN1bHQpO1xuICAgIG1hdGNoUmVzdWx0ID0gcmVnZXguZXhlYyhzdHIpO1xuICB9XG59Il19
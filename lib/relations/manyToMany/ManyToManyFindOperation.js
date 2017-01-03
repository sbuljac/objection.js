'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _FindOperation2 = require('../../queryBuilder/operations/FindOperation');

var _FindOperation3 = _interopRequireDefault(_FindOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ownerJoinColumnAliasPrefix = 'objectiontmpjoin';

var ManyToManyFindOperation = function (_FindOperation) {
  (0, _inherits3.default)(ManyToManyFindOperation, _FindOperation);

  function ManyToManyFindOperation(name, opt) {
    (0, _classCallCheck3.default)(this, ManyToManyFindOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _FindOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owners = opt.owners;

    _this.relatedIdxByOwnerId = null;
    _this.ownerJoinColumnAlias = new Array(_this.relation.joinTableOwnerCol.length);

    for (var i = 0, l = _this.relation.joinTableOwnerCol.length; i < l; ++i) {
      _this.ownerJoinColumnAlias[i] = ownerJoinColumnAliasPrefix + i;
    }
    return _this;
  }

  ManyToManyFindOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var ids = new Array(this.owners.length);

    for (var i = 0, l = this.owners.length; i < l; ++i) {
      ids[i] = this.owners[i].$values(this.relation.ownerProp);
    }

    if (!builder.has(/select/)) {
      // If the user hasn't specified a select clause, select the related model's columns.
      // If we don't do this we also get the join table's columns.
      builder.select(this.relation.relatedModelClass.tableName + '.*');

      // Also select all extra columns.
      for (var _i = 0, _l = this.relation.joinTableExtras.length; _i < _l; ++_i) {
        var extra = this.relation.joinTableExtras[_i];
        var joinTable = this.relation.joinTable;

        builder.select(joinTable + '.' + extra.joinTableCol + ' as ' + extra.aliasCol);
      }
    }

    this.relation.findQuery(builder, {
      ownerIds: _lodash2.default.uniqBy(ids, join)
    });

    var fullJoinTableOwnerCol = this.relation.fullJoinTableOwnerCol();
    // We must select the owner join columns so that we know for which owner model the related
    // models belong to after the requests.
    for (var _i2 = 0, _l2 = fullJoinTableOwnerCol.length; _i2 < _l2; ++_i2) {
      builder.select(fullJoinTableOwnerCol[_i2] + ' as ' + this.ownerJoinColumnAlias[_i2]);
    }
  };

  ManyToManyFindOperation.prototype.onRawResult = function onRawResult(builder, rows) {
    var relatedIdxByOwnerId = (0, _create2.default)(null);
    var propKey = this.relation.relatedModelClass.prototype.$propKey;

    for (var i = 0, l = rows.length; i < l; ++i) {
      var row = rows[i];
      var key = propKey.call(row, this.ownerJoinColumnAlias);
      var arr = relatedIdxByOwnerId[key];

      if (!arr) {
        arr = [];
        relatedIdxByOwnerId[key] = arr;
      }

      for (var j = 0, lc = this.ownerJoinColumnAlias.length; j < lc; ++j) {
        delete row[this.ownerJoinColumnAlias[j]];
      }

      arr.push(i);
    }

    this.relatedIdxByOwnerId = relatedIdxByOwnerId;
    return rows;
  };

  ManyToManyFindOperation.prototype.onAfterInternal = function onAfterInternal(builder, related) {
    for (var i = 0, l = this.owners.length; i < l; ++i) {
      var own = this.owners[i];
      var key = own.$propKey(this.relation.ownerProp);
      var idx = this.relatedIdxByOwnerId[key];

      if (idx) {
        var arr = new Array(idx.length);

        for (var j = 0, lr = idx.length; j < lr; ++j) {
          arr[j] = related[idx[j]];
        }

        own[this.relation.name] = arr;
      } else {
        own[this.relation.name] = [];
      }
    }

    return related;
  };

  return ManyToManyFindOperation;
}(_FindOperation3.default);

exports.default = ManyToManyFindOperation;


function join(arr) {
  return arr.join();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbnlUb01hbnlGaW5kT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIm93bmVySm9pbkNvbHVtbkFsaWFzUHJlZml4IiwiTWFueVRvTWFueUZpbmRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb24iLCJvd25lcnMiLCJyZWxhdGVkSWR4QnlPd25lcklkIiwib3duZXJKb2luQ29sdW1uQWxpYXMiLCJBcnJheSIsImpvaW5UYWJsZU93bmVyQ29sIiwibGVuZ3RoIiwiaSIsImwiLCJvbkJlZm9yZUJ1aWxkIiwiYnVpbGRlciIsImlkcyIsIiR2YWx1ZXMiLCJvd25lclByb3AiLCJoYXMiLCJzZWxlY3QiLCJyZWxhdGVkTW9kZWxDbGFzcyIsInRhYmxlTmFtZSIsImpvaW5UYWJsZUV4dHJhcyIsImV4dHJhIiwiam9pblRhYmxlIiwiam9pblRhYmxlQ29sIiwiYWxpYXNDb2wiLCJmaW5kUXVlcnkiLCJvd25lcklkcyIsInVuaXFCeSIsImpvaW4iLCJmdWxsSm9pblRhYmxlT3duZXJDb2wiLCJvblJhd1Jlc3VsdCIsInJvd3MiLCJwcm9wS2V5IiwicHJvdG90eXBlIiwiJHByb3BLZXkiLCJyb3ciLCJrZXkiLCJjYWxsIiwiYXJyIiwiaiIsImxjIiwicHVzaCIsIm9uQWZ0ZXJJbnRlcm5hbCIsInJlbGF0ZWQiLCJvd24iLCJpZHgiLCJsciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSw2QkFBNkIsa0JBQW5DOztJQUVxQkMsdUI7OztBQUVuQixtQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsMEJBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsUUFBTCxHQUFnQkQsSUFBSUMsUUFBcEI7QUFDQSxVQUFLQyxNQUFMLEdBQWNGLElBQUlFLE1BQWxCOztBQUVBLFVBQUtDLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0EsVUFBS0Msb0JB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OztBQUVELFdBQU8yQyxPQUFQO0FBQ0QsRzs7Ozs7a0JBOUZrQjVDLHVCOzs7QUFpR3JCLFNBQVM2QixJQUFULENBQWNVLEdBQWQsRUFBbUI7QUFDakIsU0FBT0EsSUFBSVYsSUFBSixFQUFQO0FBQ0QiLCJmaWxlIjoiTWFueVRvTWFueUZpbmRPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IEZpbmRPcGVyYXRpb24gZnJvbSAnLi4vLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvRmluZE9wZXJhdGlvbic7XG5cbmNvbnN0IG93bmVySm9pbkNvbHVtbkFsaWFzUHJlZml4ID0gJ29iamVjdGlvbnRtcGpvaW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYW55VG9NYW55RmluZE9wZXJhdGlvbiBleHRlbmRzIEZpbmRPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLnJlbGF0aW9uID0gb3B0LnJlbGF0aW9uO1xuICAgIHRoaXMub3duZXJzID0gb3B0Lm93bmVycztcblxuICAgIHRoaXMucmVsYXRlZElkeEJ5T3duZXJJZCA9IG51bGw7XG4gICAgdGhpcy5vd25lckpvaW5Db2x1bW5BbGlhcyA9IG5ldyBBcnJheSh0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZU93bmVyQ29sLmxlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVsYXRpb24uam9pblRhYmxlT3duZXJDb2wubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICB0aGlzLm93bmVySm9pbkNvbHVtbkFsaWFzW2ldID0gb3duZXJKb2luQ29sdW1uQWxpYXNQcmVmaXggKyBpO1xuICAgIH1cbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGNvbnN0IGlkcyA9IG5ldyBBcnJheSh0aGlzLm93bmVycy5sZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm93bmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGlkc1tpXSA9IHRoaXMub3duZXJzW2ldLiR2YWx1ZXModGhpcy5yZWxhdGlvbi5vd25lclByb3ApO1xuICAgIH1cblxuICAgIGlmICghYnVpbGRlci5oYXMoL3NlbGVjdC8pKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciBoYXNuJ3Qgc3BlY2lmaWVkIGEgc2VsZWN0IGNsYXVzZSwgc2VsZWN0IHRoZSByZWxhdGVkIG1vZGVsJ3MgY29sdW1ucy5cbiAgICAgIC8vIElmIHdlIGRvbid0IGRvIHRoaXMgd2UgYWxzbyBnZXQgdGhlIGpvaW4gdGFibGUncyBjb2x1bW5zLlxuICAgICAgYnVpbGRlci5zZWxlY3QodGhpcy5yZWxhdGlvbi5yZWxhdGVkTW9kZWxDbGFzcy50YWJsZU5hbWUgKyAnLionKTtcblxuICAgICAgLy8gQWxzbyBzZWxlY3QgYWxsIGV4dHJhIGNvbHVtbnMuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMucmVsYXRpb24uam9pblRhYmxlRXh0cmFzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICBjb25zdCBleHRyYSA9IHRoaXMucmVsYXRpb24uam9pblRhYmxlRXh0cmFzW2ldO1xuICAgICAgICBjb25zdCBqb2luVGFibGUgPSB0aGlzLnJlbGF0aW9uLmpvaW5UYWJsZTtcblxuICAgICAgICBidWlsZGVyLnNlbGVjdChgJHtqb2luVGFibGV9LiR7ZXh0cmEuam9pblRhYmxlQ29sfSBhcyAke2V4dHJhLmFsaWFzQ29sfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVsYXRpb24uZmluZFF1ZXJ5KGJ1aWxkZXIsIHtcbiAgICAgIG93bmVySWRzOiBfLnVuaXFCeShpZHMsIGpvaW4pXG4gICAgfSk7XG5cbiAgICBjb25zdCBmdWxsSm9pblRhYmxlT3duZXJDb2wgPSB0aGlzLnJlbGF0aW9uLmZ1bGxKb2luVGFibGVPd25lckNvbCgpO1xuICAgIC8vIFdlIG11c3Qgc2VsZWN0IHRoZSBvd25lciBqb2luIGNvbHVtbnMgc28gdGhhdCB3ZSBrbm93IGZvciB3aGljaCBvd25lciBtb2RlbCB0aGUgcmVsYXRlZFxuICAgIC8vIG1vZGVscyBiZWxvbmcgdG8gYWZ0ZXIgdGhlIHJlcXVlc3RzLlxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gZnVsbEpvaW5UYWJsZU93bmVyQ29sLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgYnVpbGRlci5zZWxlY3QoZnVsbEpvaW5UYWJsZU93bmVyQ29sW2ldICsgJyBhcyAnICsgdGhpcy5vd25lckpvaW5Db2x1bW5BbGlhc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgb25SYXdSZXN1bHQoYnVpbGRlciwgcm93cykge1xuICAgIGNvbnN0IHJlbGF0ZWRJZHhCeU93bmVySWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGNvbnN0IHByb3BLZXkgPSB0aGlzLnJlbGF0aW9uLnJlbGF0ZWRNb2RlbENsYXNzLnByb3RvdHlwZS4kcHJvcEtleTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcm93cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJvdyA9IHJvd3NbaV07XG4gICAgICBjb25zdCBrZXkgPSBwcm9wS2V5LmNhbGwocm93LCB0aGlzLm93bmVySm9pbkNvbHVtbkFsaWFzKTtcbiAgICAgIGxldCBhcnIgPSByZWxhdGVkSWR4QnlPd25lcklkW2tleV07XG5cbiAgICAgIGlmICghYXJyKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICByZWxhdGVkSWR4QnlPd25lcklkW2tleV0gPSBhcnI7XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IGogPSAwLCBsYyA9IHRoaXMub3duZXJKb2luQ29sdW1uQWxpYXMubGVuZ3RoOyBqIDwgbGM7ICsraikge1xuICAgICAgICBkZWxldGUgcm93W3RoaXMub3duZXJKb2luQ29sdW1uQWxpYXNbal1dO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaChpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbGF0ZWRJZHhCeU93bmVySWQgPSByZWxhdGVkSWR4QnlPd25lcklkO1xuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIHJlbGF0ZWQpIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMub3duZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgb3duID0gdGhpcy5vd25lcnNbaV07XG4gICAgICBjb25zdCBrZXkgPSBvd24uJHByb3BLZXkodGhpcy5yZWxhdGlvbi5vd25lclByb3ApO1xuICAgICAgY29uc3QgaWR4ID0gdGhpcy5yZWxhdGVkSWR4QnlPd25lcklkW2tleV07XG5cbiAgICAgIGlmIChpZHgpIHtcbiAgICAgICAgY29uc3QgYXJyID0gbmV3IEFycmF5KGlkeC5sZW5ndGgpO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsciA9IGlkeC5sZW5ndGg7IGogPCBscjsgKytqKSB7XG4gICAgICAgICAgYXJyW2pdID0gcmVsYXRlZFtpZHhbal1dO1xuICAgICAgICB9XG5cbiAgICAgICAgb3duW3RoaXMucmVsYXRpb24ubmFtZV0gPSBhcnI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvd25bdGhpcy5yZWxhdGlvbi5uYW1lXSA9IFtdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZWxhdGVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIGpvaW4oYXJyKSB7XG4gIHJldHVybiBhcnIuam9pbigpO1xufSJdfQ==
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

var _HasManyRelation2 = require('../hasMany/HasManyRelation');

var _HasManyRelation3 = _interopRequireDefault(_HasManyRelation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasOneRelation = function (_HasManyRelation) {
  (0, _inherits3.default)(HasOneRelation, _HasManyRelation);

  function HasOneRelation() {
    (0, _classCallCheck3.default)(this, HasOneRelation);
    return (0, _possibleConstructorReturn3.default)(this, _HasManyRelation.apply(this, arguments));
  }

  HasOneRelation.prototype.isOneToOne = function isOneToOne() {
    return true;
  };

  HasOneRelation.prototype.createRelationProp = function createRelationProp(owners, related) {
    var relatedByOwnerId = (0, _create2.default)(null);

    for (var i = 0, l = related.length; i < l; ++i) {
      var rel = related[i];
      var key = rel.$propKey(this.relatedProp);

      relatedByOwnerId[key] = rel;
    }

    for (var _i = 0, _l = owners.length; _i < _l; ++_i) {
      var own = owners[_i];
      var _key = own.$propKey(this.ownerProp);

      own[this.name] = relatedByOwnerId[_key] || null;
    }
  };

  HasOneRelation.prototype.appendRelationProp = function appendRelationProp(owner, related) {
    owner[this.name] = related[0] || null;
  };

  return HasOneRelation;
}(_HasManyRelation3.default);

exports.default = HasOneRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc09uZVJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIkhhc09uZVJlbGF0aW9uIiwiaXNPbmVUb09uZSIsImNyZWF0ZVJlbGF0aW9uUHJvcCIsIm93bmVycyIsInJlbGF0ZWQiLCJyZWxhdGVkQnlPd25lcklkIiwiaSIsImwiLCJsZW5ndGgiLCJyZWwiLCJrZXkiLCIkcHJvcEtleSIsInJlbGF0ZWRQcm9wIiwib3duIiwib3duZXJQcm9wIiwibmFtZSIsImFwcGVuZFJlbGF0aW9uUHJvcCIsIm93bmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLGM7Ozs7Ozs7OzJCQUVuQkMsVSx5QkFBYTtBQUNYLFdBQU8sSUFBUDtBQUNELEc7OzJCQUVEQyxrQiwrQkFBbUJDLE0sRUFBUUMsTyxFQUFTO0FBQ2xDLFFBQU1DLG1CQUFtQixzQkFBYyxJQUFkLENBQXpCOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUlILFFBQVFJLE1BQTVCLEVBQW9DRixJQUFJQyxDQUF4QyxFQUEyQyxFQUFFRCxDQUE3QyxFQUFnRDtBQUM5QyxVQUFNRyxNQUFNTCxRQUFRRSxDQUFSLENBQVo7QUFDQSxVQUFNSSxNQUFNRCxJQUFJRSxRQUFKLENBQWEsS0FBS0MsV0FBbEIsQ0FBWjs7QUFFQVAsdUJBQWlCSyxHQUFqQixJQUF3QkQsR0FBeEI7QUFDRDs7QUFFRCxTQUFLLElBQUlILEtBQUksQ0FBUixFQUFXQyxLQUFJSixPQUFPSyxNQUEzQixFQUFtQ0YsS0FBSUMsRUFBdkMsRUFBMEMsRUFBRUQsRUFBNUMsRUFBK0M7QUFDN0MsVUFBTU8sTUFBTVYsT0FBT0csRUFBUCxDQUFaO0FBQ0EsVUFBTUksT0FBTUcsSUFBSUYsUUFBSixDQUFhLEtBQUtHLFNBQWxCLENBQVo7O0FBRUFELFVBQUksS0FBS0UsSUFBVCxJQUFpQlYsaUJBQWlCSyxJQUFqQixLQUF5QixJQUExQztBQUNEO0FBQ0YsRzs7MkJBRURNLGtCLCtCQUFtQkMsSyxFQUFPYixPLEVBQVM7QUFDakNhLFVBQU0sS0FBS0YsSUFBWCxJQUFtQlgsUUFBUSxDQUFSLEtBQWMsSUFBakM7QUFDRCxHOzs7OztrQkExQmtCSixjIiwiZmlsZSI6Ikhhc09uZVJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhhc01hbnlSZWxhdGlvbiBmcm9tICcuLi9oYXNNYW55L0hhc01hbnlSZWxhdGlvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhhc09uZVJlbGF0aW9uIGV4dGVuZHMgSGFzTWFueVJlbGF0aW9uIHtcblxuICBpc09uZVRvT25lKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY3JlYXRlUmVsYXRpb25Qcm9wKG93bmVycywgcmVsYXRlZCkge1xuICAgIGNvbnN0IHJlbGF0ZWRCeU93bmVySWQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxhdGVkLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3QgcmVsID0gcmVsYXRlZFtpXTtcbiAgICAgIGNvbnN0IGtleSA9IHJlbC4kcHJvcEtleSh0aGlzLnJlbGF0ZWRQcm9wKTtcblxuICAgICAgcmVsYXRlZEJ5T3duZXJJZFtrZXldID0gcmVsO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gb3duZXJzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgb3duID0gb3duZXJzW2ldO1xuICAgICAgY29uc3Qga2V5ID0gb3duLiRwcm9wS2V5KHRoaXMub3duZXJQcm9wKTtcblxuICAgICAgb3duW3RoaXMubmFtZV0gPSByZWxhdGVkQnlPd25lcklkW2tleV0gfHwgbnVsbDtcbiAgICB9XG4gIH1cblxuICBhcHBlbmRSZWxhdGlvblByb3Aob3duZXIsIHJlbGF0ZWQpIHtcbiAgICBvd25lclt0aGlzLm5hbWVdID0gcmVsYXRlZFswXSB8fCBudWxsO1xuICB9XG59Il19
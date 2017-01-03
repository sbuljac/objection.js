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

var _Relation2 = require('../Relation');

var _Relation3 = _interopRequireDefault(_Relation2);

var _BelongsToOneInsertOperation = require('./BelongsToOneInsertOperation');

var _BelongsToOneInsertOperation2 = _interopRequireDefault(_BelongsToOneInsertOperation);

var _BelongsToOneRelateOperation = require('./BelongsToOneRelateOperation');

var _BelongsToOneRelateOperation2 = _interopRequireDefault(_BelongsToOneRelateOperation);

var _BelongsToOneUnrelateOperation = require('./BelongsToOneUnrelateOperation');

var _BelongsToOneUnrelateOperation2 = _interopRequireDefault(_BelongsToOneUnrelateOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BelongsToOneRelation = function (_Relation) {
  (0, _inherits3.default)(BelongsToOneRelation, _Relation);

  function BelongsToOneRelation() {
    (0, _classCallCheck3.default)(this, BelongsToOneRelation);
    return (0, _possibleConstructorReturn3.default)(this, _Relation.apply(this, arguments));
  }

  BelongsToOneRelation.prototype.isOneToOne = function isOneToOne() {
    return true;
  };

  BelongsToOneRelation.prototype.createRelationProp = function createRelationProp(owners, related) {
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

  BelongsToOneRelation.prototype.insert = function insert(builder, owner) {
    return new _BelongsToOneInsertOperation2.default('insert', {
      relation: this,
      owner: owner
    });
  };

  BelongsToOneRelation.prototype.relate = function relate(builder, owner) {
    return new _BelongsToOneRelateOperation2.default('relate', {
      relation: this,
      owner: owner
    });
  };

  BelongsToOneRelation.prototype.unrelate = function unrelate(builder, owner) {
    return new _BelongsToOneUnrelateOperation2.default('unrelate', {
      relation: this,
      owner: owner
    });
  };

  return BelongsToOneRelation;
}(_Relation3.default);

exports.default = BelongsToOneRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZVJlbGF0aW9uLmpzIl0sIm5hbWVzIjpbIkJlbG9uZ3NUb09uZVJlbGF0aW9uIiwiaXNPbmVUb09uZSIsImNyZWF0ZVJlbGF0aW9uUHJvcCIsIm93bmVycyIsInJlbGF0ZWQiLCJyZWxhdGVkQnlPd25lcklkIiwiaSIsImwiLCJsZW5ndGgiLCJyZWwiLCJrZXkiLCIkcHJvcEtleSIsInJlbGF0ZWRQcm9wIiwib3duIiwib3duZXJQcm9wIiwibmFtZSIsImluc2VydCIsImJ1aWxkZXIiLCJvd25lciIsInJlbGF0aW9uIiwicmVsYXRlIiwidW5yZWxhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsb0I7Ozs7Ozs7O2lDQUVuQkMsVSx5QkFBYTtBQUNYLFdBQU8sSUFBUDtBQUNELEc7O2lDQUVEQyxrQiwrQkFBbUJDLE0sRUFBUUMsTyxFQUFTO0FBQ2xDLFFBQU1DLG1CQUFtQixzQkFBYyxJQUFkLENBQXpCOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUlILFFBQVFJLE1BQTVCLEVBQW9DRixJQUFJQyxDQUF4QyxFQUEyQyxFQUFFRCxDQUE3QyxFQUFnRDtBQUM5QyxVQUFNRyxNQUFNTCxRQUFRRSxDQUFSLENBQVo7QUFDQSxVQUFNSSxNQUFNRCxJQUFJRSxRQUFKLENBQWEsS0FBS0MsV0FBbEIsQ0FBWjs7QUFFQVAsdUJBQWlCSyxHQUFqQixJQUF3QkQsR0FBeEI7QUFDRDs7QUFFRCxTQUFLLElBQUlILEtBQUksQ0FBUixFQUFXQyxLQUFJSixPQUFPSyxNQUEzQixFQUFtQ0YsS0FBSUMsRUFBdkMsRUFBMEMsRUFBRUQsRUFBNUMsRUFBK0M7QUFDN0MsVUFBTU8sTUFBTVYsT0FBT0csRUFBUCxDQUFaO0FBQ0EsVUFBTUksT0FBTUcsSUFBSUYsUUFBSixDQUFhLEtBQUtHLFNBQWxCLENBQVo7O0FBRUFELFVBQUksS0FBS0UsSUFBVCxJQUFpQlYsaUJBQWlCSyxJQUFqQixLQUF5QixJQUExQztBQUNEO0FBQ0YsRzs7aUNBRURNLE0sbUJBQU9DLE8sRUFBU0MsSyxFQUFPO0FBQ3JCLFdBQU8sMENBQWdDLFFBQWhDLEVBQTBDO0FBQy9DQyxnQkFBVSxJQURxQztBQUUvQ0QsYUFBT0E7QUFGd0MsS0FBMUMsQ0FBUDtBQUlELEc7O2lDQUVERSxNLG1CQUFPSCxPLEVBQVNDLEssRUFBTztBQUNyQixXQUFPLDBDQUFnQyxRQUFoQyxFQUEwQztBQUMvQ0MsZ0JBQVUsSUFEcUM7QUFFL0NELGFBQU9BO0FBRndDLEtBQTFDLENBQVA7QUFJRCxHOztpQ0FFREcsUSxxQkFBU0osTyxFQUFTQyxLLEVBQU87QUFDdkIsV0FBTyw0Q0FBa0MsVUFBbEMsRUFBOEM7QUFDbkRDLGdCQUFVLElBRHlDO0FBRW5ERCxhQUFPQTtBQUY0QyxLQUE5QyxDQUFQO0FBSUQsRzs7Ozs7a0JBM0NrQmxCLG9CIiwiZmlsZSI6IkJlbG9uZ3NUb09uZVJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbGF0aW9uIGZyb20gJy4uL1JlbGF0aW9uJztcblxuaW1wb3J0IEJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbiBmcm9tICcuL0JlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbic7XG5pbXBvcnQgQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vQmVsb25nc1RvT25lUmVsYXRlT3BlcmF0aW9uJztcbmltcG9ydCBCZWxvbmdzVG9PbmVVbnJlbGF0ZU9wZXJhdGlvbiBmcm9tICcuL0JlbG9uZ3NUb09uZVVucmVsYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmVsb25nc1RvT25lUmVsYXRpb24gZXh0ZW5kcyBSZWxhdGlvbiB7XG5cbiAgaXNPbmVUb09uZSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNyZWF0ZVJlbGF0aW9uUHJvcChvd25lcnMsIHJlbGF0ZWQpIHtcbiAgICBjb25zdCByZWxhdGVkQnlPd25lcklkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gcmVsYXRlZC5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbCA9IHJlbGF0ZWRbaV07XG4gICAgICBjb25zdCBrZXkgPSByZWwuJHByb3BLZXkodGhpcy5yZWxhdGVkUHJvcCk7XG5cbiAgICAgIHJlbGF0ZWRCeU93bmVySWRba2V5XSA9IHJlbDtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG93bmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG93biA9IG93bmVyc1tpXTtcbiAgICAgIGNvbnN0IGtleSA9IG93bi4kcHJvcEtleSh0aGlzLm93bmVyUHJvcCk7XG5cbiAgICAgIG93blt0aGlzLm5hbWVdID0gcmVsYXRlZEJ5T3duZXJJZFtrZXldIHx8IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaW5zZXJ0KGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCZWxvbmdzVG9PbmVJbnNlcnRPcGVyYXRpb24oJ2luc2VydCcsIHtcbiAgICAgIHJlbGF0aW9uOiB0aGlzLFxuICAgICAgb3duZXI6IG93bmVyXG4gICAgfSk7XG4gIH1cblxuICByZWxhdGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICByZXR1cm4gbmV3IEJlbG9uZ3NUb09uZVJlbGF0ZU9wZXJhdGlvbigncmVsYXRlJywge1xuICAgICAgcmVsYXRpb246IHRoaXMsXG4gICAgICBvd25lcjogb3duZXJcbiAgICB9KTtcbiAgfVxuXG4gIHVucmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBCZWxvbmdzVG9PbmVVbnJlbGF0ZU9wZXJhdGlvbigndW5yZWxhdGUnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG59Il19
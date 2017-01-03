'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _FindOperation2 = require('../queryBuilder/operations/FindOperation');

var _FindOperation3 = _interopRequireDefault(_FindOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RelationFindOperation = function (_FindOperation) {
  (0, _inherits3.default)(RelationFindOperation, _FindOperation);

  function RelationFindOperation(name, opt) {
    (0, _classCallCheck3.default)(this, RelationFindOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _FindOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owners = opt.owners;
    _this.alwaysReturnArray = false;
    return _this;
  }

  RelationFindOperation.prototype.onBeforeBuild = function onBeforeBuild(builder) {
    var ids = new Array(this.owners.length);

    for (var i = 0, l = this.owners.length; i < l; ++i) {
      ids[i] = this.owners[i].$values(this.relation.ownerProp);
    }

    this.relation.findQuery(builder, {
      ownerIds: _lodash2.default.uniqBy(ids, join)
    });
  };

  RelationFindOperation.prototype.onAfterInternal = function onAfterInternal(builder, related) {
    this.relation.createRelationProp(this.owners, related);

    if (!this.alwaysReturnArray && this.relation.isOneToOne() && related.length <= 1) {
      return related[0];
    } else {
      return related;
    }
  };

  return RelationFindOperation;
}(_FindOperation3.default);

exports.default = RelationFindOperation;


function join(arr) {
  return arr.join();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlbGF0aW9uRmluZE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJSZWxhdGlvbkZpbmRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb24iLCJvd25lcnMiLCJhbHdheXNSZXR1cm5BcnJheSIsIm9uQmVmb3JlQnVpbGQiLCJidWlsZGVyIiwiaWRzIiwiQXJyYXkiLCJsZW5ndGgiLCJpIiwibCIsIiR2YWx1ZXMiLCJvd25lclByb3AiLCJmaW5kUXVlcnkiLCJvd25lcklkcyIsInVuaXFCeSIsImpvaW4iLCJvbkFmdGVySW50ZXJuYWwiLCJyZWxhdGVkIiwiY3JlYXRlUmVsYXRpb25Qcm9wIiwiaXNPbmVUb09uZSIsImFyciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEscUI7OztBQUVuQixpQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsMEJBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsUUFBTCxHQUFnQkQsSUFBSUMsUUFBcEI7QUFDQSxVQUFLQyxNQUFMLEdBQWNGLElBQUlFLE1BQWxCO0FBQ0EsVUFBS0MsaUJBQUwsR0FBeUIsS0FBekI7QUFMcUI7QUFNdEI7O2tDQUVEQyxhLDBCQUFjQyxPLEVBQVM7QUFDckIsUUFBSUMsTUFBTSxJQUFJQyxLQUFKLENBQVUsS0FBS0wsTUFBTCxDQUFZTSxNQUF0QixDQUFWOztBQUVBLFNBQUssSUFBSUMsSUFBSSxDQUFSLEVBQVdDLElBQUksS0FBS1IsTUFBTCxDQUFZTSxNQUFoQyxFQUF3Q0MsSUFBSUMsQ0FBNUMsRUFBK0MsRUFBRUQsQ0FBakQsRUFBb0Q7QUFDbERILFVBQUlHLENBQUosSUFBUyxLQUFLUCxNQUFMLENBQVlPLENBQVosRUFBZUUsT0FBZixDQUF1QixLQUFLVixRQUFMLENBQWNXLFNBQXJDLENBQVQ7QUFDRDs7QUFFRCxTQUFLWCxRQUFMLENBQWNZLFNBQWQsQ0FBd0JSLE9BQXhCLEVBQWlDO0FBQy9CUyxnQkFBVSxpQkFBRUMsTUFBRixDQUFTVCxHQUFULEVBQWNVLElBQWQ7QUFEcUIsS0FBakM7QUFHRCxHOztrQ0FFREMsZSw0QkFBZ0JaLE8sRUFBU2EsTyxFQUFTO0FBQ2hDLFNBQUtqQixRQUFMLENBQWNrQixrQkFBZCxDQUFpQyxLQUFLakIsTUFBdEMsRUFBOENnQixPQUE5Qzs7QUFFQSxRQUFJLENBQUMsS0FBS2YsaUJBQU4sSUFBMkIsS0FBS0YsUUFBTCxDQUFjbUIsVUFBZCxFQUEzQixJQUF5REYsUUFBUVYsTUFBUixJQUFrQixDQUEvRSxFQUFrRjtBQUNoRixhQUFPVSxRQUFRLENBQVIsQ0FBUDtBQUNELEtBRkQsTUFFTztBQUNMLGFBQU9BLE9BQVA7QUFDRDtBQUNGLEc7Ozs7O2tCQTlCa0JwQixxQjs7O0FBaUNyQixTQUFTa0IsSUFBVCxDQUFjSyxHQUFkLEVBQW1CO0FBQ2pCLFNBQU9BLElBQUlMLElBQUosRUFBUDtBQUNEIiwiZmlsZSI6IlJlbGF0aW9uRmluZE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgRmluZE9wZXJhdGlvbiBmcm9tICcuLi9xdWVyeUJ1aWxkZXIvb3BlcmF0aW9ucy9GaW5kT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVsYXRpb25GaW5kT3BlcmF0aW9uIGV4dGVuZHMgRmluZE9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lcnMgPSBvcHQub3duZXJzO1xuICAgIHRoaXMuYWx3YXlzUmV0dXJuQXJyYXkgPSBmYWxzZTtcbiAgfVxuXG4gIG9uQmVmb3JlQnVpbGQoYnVpbGRlcikge1xuICAgIGxldCBpZHMgPSBuZXcgQXJyYXkodGhpcy5vd25lcnMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5vd25lcnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBpZHNbaV0gPSB0aGlzLm93bmVyc1tpXS4kdmFsdWVzKHRoaXMucmVsYXRpb24ub3duZXJQcm9wKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbGF0aW9uLmZpbmRRdWVyeShidWlsZGVyLCB7XG4gICAgICBvd25lcklkczogXy51bmlxQnkoaWRzLCBqb2luKVxuICAgIH0pO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIHJlbGF0ZWQpIHtcbiAgICB0aGlzLnJlbGF0aW9uLmNyZWF0ZVJlbGF0aW9uUHJvcCh0aGlzLm93bmVycywgcmVsYXRlZCk7XG5cbiAgICBpZiAoIXRoaXMuYWx3YXlzUmV0dXJuQXJyYXkgJiYgdGhpcy5yZWxhdGlvbi5pc09uZVRvT25lKCkgJiYgcmVsYXRlZC5sZW5ndGggPD0gMSkge1xuICAgICAgcmV0dXJuIHJlbGF0ZWRbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZWxhdGVkO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBqb2luKGFycikge1xuICByZXR1cm4gYXJyLmpvaW4oKTtcbn0iXX0=
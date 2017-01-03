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

var _InsertOperation2 = require('../../queryBuilder/operations/InsertOperation');

var _InsertOperation3 = _interopRequireDefault(_InsertOperation2);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasManyInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(HasManyInsertOperation, _InsertOperation);

  function HasManyInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, HasManyInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  HasManyInsertOperation.prototype.call = function call(builder, args) {
    var retVal = _InsertOperation.prototype.call.call(this, builder, args);

    for (var i = 0, lm = this.models.length; i < lm; ++i) {
      var model = this.models[i];

      for (var j = 0, lp = this.relation.relatedProp.length; j < lp; ++j) {
        var relatedProp = this.relation.relatedProp[j];
        var ownerProp = this.relation.ownerProp[j];

        model[relatedProp] = this.owner[ownerProp];
      }
    }

    return retVal;
  };

  HasManyInsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, inserted) {
    var _this2 = this;

    var maybePromise = _InsertOperation.prototype.onAfterQuery.call(this, builder, inserted);

    return (0, _promiseUtils.after)(maybePromise, function (inserted) {
      _this2.relation.appendRelationProp(_this2.owner, inserted);
      return inserted;
    });
  };

  return HasManyInsertOperation;
}(_InsertOperation3.default);

exports.default = HasManyInsertOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc01hbnlJbnNlcnRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiSGFzTWFueUluc2VydE9wZXJhdGlvbiIsIm5hbWUiLCJvcHQiLCJyZWxhdGlvbiIsIm93bmVyIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0VmFsIiwiaSIsImxtIiwibW9kZWxzIiwibGVuZ3RoIiwibW9kZWwiLCJqIiwibHAiLCJyZWxhdGVkUHJvcCIsIm93bmVyUHJvcCIsIm9uQWZ0ZXJRdWVyeSIsImluc2VydGVkIiwibWF5YmVQcm9taXNlIiwiYXBwZW5kUmVsYXRpb25Qcm9wIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztJQUVxQkEsc0I7OztBQUVuQixrQ0FBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsNEJBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsUUFBTCxHQUFnQkQsSUFBSUMsUUFBcEI7QUFDQSxVQUFLQyxLQUFMLEdBQWFGLElBQUlFLEtBQWpCO0FBSnFCO0FBS3RCOzttQ0FFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsUUFBTUMsU0FBUywyQkFBTUgsSUFBTixZQUFXQyxPQUFYLEVBQW9CQyxJQUFwQixDQUFmOztBQUVBLFNBQUssSUFBSUUsSUFBSSxDQUFSLEVBQVdDLEtBQUssS0FBS0MsTUFBTCxDQUFZQyxNQUFqQyxFQUF5Q0gsSUFBSUMsRUFBN0MsRUFBaUQsRUFBRUQsQ0FBbkQsRUFBc0Q7QUFDcEQsVUFBTUksUUFBUSxLQUFLRixNQUFMLENBQVlGLENBQVosQ0FBZDs7QUFFQSxXQUFLLElBQUlLLElBQUksQ0FBUixFQUFXQyxLQUFLLEtBQUtaLFFBQUwsQ0FBY2EsV0FBZCxDQUEwQkosTUFBL0MsRUFBdURFLElBQUlDLEVBQTNELEVBQStELEVBQUVELENBQWpFLEVBQW9FO0FBQ2xFLFlBQU1FLGNBQWMsS0FBS2IsUUFBTCxDQUFjYSxXQUFkLENBQTBCRixDQUExQixDQUFwQjtBQUNBLFlBQU1HLFlBQVksS0FBS2QsUUFBTCxDQUFjYyxTQUFkLENBQXdCSCxDQUF4QixDQUFsQjs7QUFFQUQsY0FBTUcsV0FBTixJQUFxQixLQUFLWixLQUFMLENBQVdhLFNBQVgsQ0FBckI7QUFDRDtBQUNGOztBQUVELFdBQU9ULE1BQVA7QUFDRCxHOzttQ0FFRFUsWSx5QkFBYVosTyxFQUFTYSxRLEVBQVU7QUFBQTs7QUFDOUIsUUFBTUMsZUFBZSwyQkFBTUYsWUFBTixZQUFtQlosT0FBbkIsRUFBNEJhLFFBQTVCLENBQXJCOztBQUVBLFdBQU8seUJBQU1DLFlBQU4sRUFBb0Isb0JBQVk7QUFDckMsYUFBS2pCLFFBQUwsQ0FBY2tCLGtCQUFkLENBQWlDLE9BQUtqQixLQUF0QyxFQUE2Q2UsUUFBN0M7QUFDQSxhQUFPQSxRQUFQO0FBQ0QsS0FITSxDQUFQO0FBSUQsRzs7Ozs7a0JBakNrQm5CLHNCIiwiZmlsZSI6Ikhhc01hbnlJbnNlcnRPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5zZXJ0T3BlcmF0aW9uIGZyb20gJy4uLy4uL3F1ZXJ5QnVpbGRlci9vcGVyYXRpb25zL0luc2VydE9wZXJhdGlvbic7XG5pbXBvcnQge2FmdGVyfSBmcm9tICcuLi8uLi91dGlscy9wcm9taXNlVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIYXNNYW55SW5zZXJ0T3BlcmF0aW9uIGV4dGVuZHMgSW5zZXJ0T3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgdGhpcy5yZWxhdGlvbiA9IG9wdC5yZWxhdGlvbjtcbiAgICB0aGlzLm93bmVyID0gb3B0Lm93bmVyO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0VmFsID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsbSA9IHRoaXMubW9kZWxzLmxlbmd0aDsgaSA8IGxtOyArK2kpIHtcbiAgICAgIGNvbnN0IG1vZGVsID0gdGhpcy5tb2RlbHNbaV07XG5cbiAgICAgIGZvciAobGV0IGogPSAwLCBscCA9IHRoaXMucmVsYXRpb24ucmVsYXRlZFByb3AubGVuZ3RoOyBqIDwgbHA7ICsraikge1xuICAgICAgICBjb25zdCByZWxhdGVkUHJvcCA9IHRoaXMucmVsYXRpb24ucmVsYXRlZFByb3Bbal07XG4gICAgICAgIGNvbnN0IG93bmVyUHJvcCA9IHRoaXMucmVsYXRpb24ub3duZXJQcm9wW2pdO1xuXG4gICAgICAgIG1vZGVsW3JlbGF0ZWRQcm9wXSA9IHRoaXMub3duZXJbb3duZXJQcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgb25BZnRlclF1ZXJ5KGJ1aWxkZXIsIGluc2VydGVkKSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gc3VwZXIub25BZnRlclF1ZXJ5KGJ1aWxkZXIsIGluc2VydGVkKTtcblxuICAgIHJldHVybiBhZnRlcihtYXliZVByb21pc2UsIGluc2VydGVkID0+IHtcbiAgICAgIHRoaXMucmVsYXRpb24uYXBwZW5kUmVsYXRpb25Qcm9wKHRoaXMub3duZXIsIGluc2VydGVkKTtcbiAgICAgIHJldHVybiBpbnNlcnRlZDtcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=
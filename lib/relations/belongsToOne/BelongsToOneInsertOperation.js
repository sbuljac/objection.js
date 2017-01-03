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

var BelongsToOneInsertOperation = function (_InsertOperation) {
  (0, _inherits3.default)(BelongsToOneInsertOperation, _InsertOperation);

  function BelongsToOneInsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, BelongsToOneInsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _InsertOperation.call(this, name, opt));

    _this.relation = opt.relation;
    _this.owner = opt.owner;
    return _this;
  }

  BelongsToOneInsertOperation.prototype.call = function call(builder, args) {
    var retVal = _InsertOperation.prototype.call.call(this, builder, args);

    if (this.models.length > 1) {
      this.relation.throwError('can only insert one model to a BelongsToOneRelation');
    }

    return retVal;
  };

  BelongsToOneInsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, inserted) {
    var _this2 = this;

    var maybePromise = _InsertOperation.prototype.onAfterQuery.call(this, builder, inserted);

    return (0, _promiseUtils.after)(maybePromise, function (inserted) {
      _this2.owner[_this2.relation.name] = inserted[0];
      var patch = {};

      for (var i = 0, l = _this2.relation.ownerProp.length; i < l; ++i) {
        var ownerProp = _this2.relation.ownerProp[i];
        var relatedProp = _this2.relation.relatedProp[i];
        var relatedValue = inserted[0][relatedProp];

        _this2.owner[ownerProp] = inserted[0][relatedProp];
        patch[ownerProp] = relatedValue;
      }

      return _this2.relation.ownerModelClass.query().childQueryOf(builder).patch(patch).whereComposite(_this2.relation.ownerModelClass.getFullIdColumn(), _this2.owner.$id()).return(inserted);
    });
  };

  return BelongsToOneInsertOperation;
}(_InsertOperation3.default);

exports.default = BelongsToOneInsertOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJCZWxvbmdzVG9PbmVJbnNlcnRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwicmVsYXRpb24iLCJvd25lciIsImNhbGwiLCJidWlsZGVyIiwiYXJncyIsInJldFZhbCIsIm1vZGVscyIsImxlbmd0aCIsInRocm93RXJyb3IiLCJvbkFmdGVyUXVlcnkiLCJpbnNlcnRlZCIsIm1heWJlUHJvbWlzZSIsInBhdGNoIiwiaSIsImwiLCJvd25lclByb3AiLCJyZWxhdGVkUHJvcCIsInJlbGF0ZWRWYWx1ZSIsIm93bmVyTW9kZWxDbGFzcyIsInF1ZXJ5IiwiY2hpbGRRdWVyeU9mIiwid2hlcmVDb21wb3NpdGUiLCJnZXRGdWxsSWRDb2x1bW4iLCIkaWQiLCJyZXR1cm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0lBRXFCQSwyQjs7O0FBRW5CLHVDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQiw0QkFBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUdyQixVQUFLQyxRQUFMLEdBQWdCRCxJQUFJQyxRQUFwQjtBQUNBLFVBQUtDLEtBQUwsR0FBYUYsSUFBSUUsS0FBakI7QUFKcUI7QUFLdEI7O3dDQUVEQyxJLGlCQUFLQyxPLEVBQVNDLEksRUFBTTtBQUNsQixRQUFNQyxTQUFTLDJCQUFNSCxJQUFOLFlBQVdDLE9BQVgsRUFBb0JDLElBQXBCLENBQWY7O0FBRUEsUUFBSSxLQUFLRSxNQUFMLENBQVlDLE1BQVosR0FBcUIsQ0FBekIsRUFBNEI7QUFDMUIsV0FBS1AsUUFBTCxDQUFjUSxVQUFkLENBQXlCLHFEQUF6QjtBQUNEOztBQUVELFdBQU9ILE1BQVA7QUFDRCxHOzt3Q0FFREksWSx5QkFBYU4sTyxFQUFTTyxRLEVBQVU7QUFBQTs7QUFDOUIsUUFBTUMsZUFBZSwyQkFBTUYsWUFBTixZQUFtQk4sT0FBbkIsRUFBNEJPLFFBQTVCLENBQXJCOztBQUVBLFdBQU8seUJBQU1DLFlBQU4sRUFBb0Isb0JBQVk7QUFDckMsYUFBS1YsS0FBTCxDQUFXLE9BQUtELFFBQUwsQ0FBY0YsSUFBekIsSUFBaUNZLFNBQVMsQ0FBVCxDQUFqQztBQUNBLFVBQUlFLFFBQVEsRUFBWjs7QUFFQSxXQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxJQUFJLE9BQUtkLFFBQUwsQ0FBY2UsU0FBZCxDQUF3QlIsTUFBNUMsRUFBb0RNLElBQUlDLENBQXhELEVBQTJELEVBQUVELENBQTdELEVBQWdFO0FBQzlELFlBQU1FLFlBQVksT0FBS2YsUUFBTCxDQUFjZSxTQUFkLENBQXdCRixDQUF4QixDQUFsQjtBQUNBLFlBQU1HLGNBQWMsT0FBS2hCLFFBQUwsQ0FBY2dCLFdBQWQsQ0FBMEJILENBQTFCLENBQXBCO0FBQ0EsWUFBTUksZUFBZVAsU0FBUyxDQUFULEVBQVlNLFdBQVosQ0FBckI7O0FBRUEsZUFBS2YsS0FBTCxDQUFXYyxTQUFYLElBQXdCTCxTQUFTLENBQVQsRUFBWU0sV0FBWixDQUF4QjtBQUNBSixjQUFNRyxTQUFOLElBQW1CRSxZQUFuQjtBQUNEOztBQUVELGFBQU8sT0FBS2pCLFFBQUwsQ0FBY2tCLGVBQWQsQ0FDSkMsS0FESSxHQUVKQyxZQUZJLENBRVNqQixPQUZULEVBR0pTLEtBSEksQ0FHRUEsS0FIRixFQUlKUyxjQUpJLENBSVcsT0FBS3JCLFFBQUwsQ0FBY2tCLGVBQWQsQ0FBOEJJLGVBQTlCLEVBSlgsRUFJNEQsT0FBS3JCLEtBQUwsQ0FBV3NCLEdBQVgsRUFKNUQsRUFLSkMsTUFMSSxDQUtHZCxRQUxILENBQVA7QUFNRCxLQW5CTSxDQUFQO0FBcUJELEc7Ozs7O2tCQTNDa0JiLDJCIiwiZmlsZSI6IkJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi4vLi4vcXVlcnlCdWlsZGVyL29wZXJhdGlvbnMvSW5zZXJ0T3BlcmF0aW9uJztcbmltcG9ydCB7YWZ0ZXJ9IGZyb20gJy4uLy4uL3V0aWxzL3Byb21pc2VVdGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJlbG9uZ3NUb09uZUluc2VydE9wZXJhdGlvbiBleHRlbmRzIEluc2VydE9wZXJhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IobmFtZSwgb3B0KSB7XG4gICAgc3VwZXIobmFtZSwgb3B0KTtcblxuICAgIHRoaXMucmVsYXRpb24gPSBvcHQucmVsYXRpb247XG4gICAgdGhpcy5vd25lciA9IG9wdC5vd25lcjtcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IHJldFZhbCA9IHN1cGVyLmNhbGwoYnVpbGRlciwgYXJncyk7XG5cbiAgICBpZiAodGhpcy5tb2RlbHMubGVuZ3RoID4gMSkge1xuICAgICAgdGhpcy5yZWxhdGlvbi50aHJvd0Vycm9yKCdjYW4gb25seSBpbnNlcnQgb25lIG1vZGVsIHRvIGEgQmVsb25nc1RvT25lUmVsYXRpb24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmV0VmFsO1xuICB9XG5cbiAgb25BZnRlclF1ZXJ5KGJ1aWxkZXIsIGluc2VydGVkKSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gc3VwZXIub25BZnRlclF1ZXJ5KGJ1aWxkZXIsIGluc2VydGVkKTtcblxuICAgIHJldHVybiBhZnRlcihtYXliZVByb21pc2UsIGluc2VydGVkID0+IHtcbiAgICAgIHRoaXMub3duZXJbdGhpcy5yZWxhdGlvbi5uYW1lXSA9IGluc2VydGVkWzBdO1xuICAgICAgbGV0IHBhdGNoID0ge307XG5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5yZWxhdGlvbi5vd25lclByb3AubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGNvbnN0IG93bmVyUHJvcCA9IHRoaXMucmVsYXRpb24ub3duZXJQcm9wW2ldO1xuICAgICAgICBjb25zdCByZWxhdGVkUHJvcCA9IHRoaXMucmVsYXRpb24ucmVsYXRlZFByb3BbaV07XG4gICAgICAgIGNvbnN0IHJlbGF0ZWRWYWx1ZSA9IGluc2VydGVkWzBdW3JlbGF0ZWRQcm9wXTtcblxuICAgICAgICB0aGlzLm93bmVyW293bmVyUHJvcF0gPSBpbnNlcnRlZFswXVtyZWxhdGVkUHJvcF07XG4gICAgICAgIHBhdGNoW293bmVyUHJvcF0gPSByZWxhdGVkVmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJlbGF0aW9uLm93bmVyTW9kZWxDbGFzc1xuICAgICAgICAucXVlcnkoKVxuICAgICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAgIC5wYXRjaChwYXRjaClcbiAgICAgICAgLndoZXJlQ29tcG9zaXRlKHRoaXMucmVsYXRpb24ub3duZXJNb2RlbENsYXNzLmdldEZ1bGxJZENvbHVtbigpLCB0aGlzLm93bmVyLiRpZCgpKVxuICAgICAgICAucmV0dXJuKGluc2VydGVkKTtcbiAgICB9KTtcblxuICB9XG5cbn1cbiJdfQ==
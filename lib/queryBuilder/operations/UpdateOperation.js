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

var _clone = require('lodash/clone');

var _clone2 = _interopRequireDefault(_clone);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _promiseUtils = require('../../utils/promiseUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UpdateOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(UpdateOperation, _QueryBuilderOperatio);

  function UpdateOperation(name, opt) {
    (0, _classCallCheck3.default)(this, UpdateOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.model = null;
    _this.modelOptions = (0, _clone2.default)(_this.opt.modelOptions) || {};
    _this.isWriteOperation = true;
    return _this;
  }

  UpdateOperation.prototype.call = function call(builder, args) {
    this.model = builder.modelClass().ensureModel(args[0], this.modelOptions);
    return true;
  };

  UpdateOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {
    var maybePromise = this.model.$beforeUpdate(this.modelOptions, builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, result);
  };

  UpdateOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {
    var json = this.model.$toDatabaseJson();
    knexBuilder.update(json);
  };

  UpdateOperation.prototype.onAfterInternal = function onAfterInternal(builder, numUpdated) {
    var maybePromise = this.model.$afterUpdate(this.modelOptions, builder.context());
    return (0, _promiseUtils.afterReturn)(maybePromise, numUpdated);
  };

  return UpdateOperation;
}(_QueryBuilderOperation2.default);

exports.default = UpdateOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVwZGF0ZU9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJVcGRhdGVPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwibW9kZWwiLCJtb2RlbE9wdGlvbnMiLCJpc1dyaXRlT3BlcmF0aW9uIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwibW9kZWxDbGFzcyIsImVuc3VyZU1vZGVsIiwib25CZWZvcmVJbnRlcm5hbCIsInJlc3VsdCIsIm1heWJlUHJvbWlzZSIsIiRiZWZvcmVVcGRhdGUiLCJjb250ZXh0Iiwib25CdWlsZCIsImtuZXhCdWlsZGVyIiwianNvbiIsIiR0b0RhdGFiYXNlSnNvbiIsInVwZGF0ZSIsIm9uQWZ0ZXJJbnRlcm5hbCIsIm51bVVwZGF0ZWQiLCIkYWZ0ZXJVcGRhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7SUFFcUJBLGU7OztBQUVuQiwyQkFBWUMsSUFBWixFQUFrQkMsR0FBbEIsRUFBdUI7QUFBQTs7QUFBQSwrREFDckIsaUNBQU1ELElBQU4sRUFBWUMsR0FBWixDQURxQjs7QUFHckIsVUFBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLHFCQUFNLE1BQUtGLEdBQUwsQ0FBU0UsWUFBZixLQUFnQyxFQUFwRDtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBTHFCO0FBTXRCOzs0QkFFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0wsS0FBTCxHQUFhSSxRQUFRRSxVQUFSLEdBQXFCQyxXQUFyQixDQUFpQ0YsS0FBSyxDQUFMLENBQWpDLEVBQTBDLEtBQUtKLFlBQS9DLENBQWI7QUFDQSxXQUFPLElBQVA7QUFDRCxHOzs0QkFFRE8sZ0IsNkJBQWlCSixPLEVBQVNLLE0sRUFBUTtBQUNoQyxRQUFNQyxlQUFlLEtBQUtWLEtBQUwsQ0FBV1csYUFBWCxDQUF5QixLQUFLVixZQUE5QixFQUE0Q0csUUFBUVEsT0FBUixFQUE1QyxDQUFyQjtBQUNBLFdBQU8sK0JBQVlGLFlBQVosRUFBMEJELE1BQTFCLENBQVA7QUFDRCxHOzs0QkFFREksTyxvQkFBUUMsVyxFQUFhVixPLEVBQVM7QUFDNUIsUUFBTVcsT0FBTyxLQUFLZixLQUFMLENBQVdnQixlQUFYLEVBQWI7QUFDQUYsZ0JBQVlHLE1BQVosQ0FBbUJGLElBQW5CO0FBQ0QsRzs7NEJBRURHLGUsNEJBQWdCZCxPLEVBQVNlLFUsRUFBWTtBQUNuQyxRQUFNVCxlQUFlLEtBQUtWLEtBQUwsQ0FBV29CLFlBQVgsQ0FBd0IsS0FBS25CLFlBQTdCLEVBQTJDRyxRQUFRUSxPQUFSLEVBQTNDLENBQXJCO0FBQ0EsV0FBTywrQkFBWUYsWUFBWixFQUEwQlMsVUFBMUIsQ0FBUDtBQUNELEc7Ozs7O2tCQTVCa0J0QixlIiwiZmlsZSI6IlVwZGF0ZU9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbG9uZSBmcm9tICdsb2Rhc2gvY2xvbmUnO1xuaW1wb3J0IFF1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1F1ZXJ5QnVpbGRlck9wZXJhdGlvbic7XG5pbXBvcnQge2FmdGVyUmV0dXJufSBmcm9tICcuLi8uLi91dGlscy9wcm9taXNlVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVcGRhdGVPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLm1vZGVsID0gbnVsbDtcbiAgICB0aGlzLm1vZGVsT3B0aW9ucyA9IGNsb25lKHRoaXMub3B0Lm1vZGVsT3B0aW9ucykgfHwge307XG4gICAgdGhpcy5pc1dyaXRlT3BlcmF0aW9uID0gdHJ1ZTtcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIHRoaXMubW9kZWwgPSBidWlsZGVyLm1vZGVsQ2xhc3MoKS5lbnN1cmVNb2RlbChhcmdzWzBdLCB0aGlzLm1vZGVsT3B0aW9ucyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvbkJlZm9yZUludGVybmFsKGJ1aWxkZXIsIHJlc3VsdCkge1xuICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IHRoaXMubW9kZWwuJGJlZm9yZVVwZGF0ZSh0aGlzLm1vZGVsT3B0aW9ucywgYnVpbGRlci5jb250ZXh0KCkpO1xuICAgIHJldHVybiBhZnRlclJldHVybihtYXliZVByb21pc2UsIHJlc3VsdCk7XG4gIH1cblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyLCBidWlsZGVyKSB7XG4gICAgY29uc3QganNvbiA9IHRoaXMubW9kZWwuJHRvRGF0YWJhc2VKc29uKCk7XG4gICAga25leEJ1aWxkZXIudXBkYXRlKGpzb24pO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIG51bVVwZGF0ZWQpIHtcbiAgICBjb25zdCBtYXliZVByb21pc2UgPSB0aGlzLm1vZGVsLiRhZnRlclVwZGF0ZSh0aGlzLm1vZGVsT3B0aW9ucywgYnVpbGRlci5jb250ZXh0KCkpO1xuICAgIHJldHVybiBhZnRlclJldHVybihtYXliZVByb21pc2UsIG51bVVwZGF0ZWQpO1xuICB9XG59XG4iXX0=
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _ValidationError = require('../../model/ValidationError');

var _ValidationError2 = _interopRequireDefault(_ValidationError);

var _EagerOperation2 = require('./EagerOperation');

var _EagerOperation3 = _interopRequireDefault(_EagerOperation2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WhereInEagerOperation = function (_EagerOperation) {
  (0, _inherits3.default)(WhereInEagerOperation, _EagerOperation);

  function WhereInEagerOperation() {
    (0, _classCallCheck3.default)(this, WhereInEagerOperation);
    return (0, _possibleConstructorReturn3.default)(this, _EagerOperation.apply(this, arguments));
  }

  WhereInEagerOperation.prototype.onAfterInternal = function onAfterInternal(builder, result) {
    if (!result) {
      return result;
    }

    var models = Array.isArray(result) ? result : [result];

    if (!models.length || !(models[0] instanceof builder.modelClass())) {
      return result;
    }

    var promises = [];

    this.expression.forEachChild(function (child) {
      var relation = builder.modelClass().getRelations()[child.name];

      if (!relation) {
        throw new _ValidationError2.default({ eager: 'unknown relation "' + child.name + '" in an eager expression' });
      }
    });

    var relations = builder.modelClass().getRelations();
    var relNames = (0, _keys2.default)(relations);

    for (var i = 0, l = relNames.length; i < l; ++i) {
      var relName = relNames[i];
      var relation = relations[relName];

      var childExpression = this.expression.childExpression(relation.name);

      if (childExpression) {
        promises.push(this._fetchRelation(builder, models, relation, childExpression));
      }
    }

    return _bluebird2.default.all(promises).return(result);
  };

  WhereInEagerOperation.prototype._fetchRelation = function _fetchRelation(builder, models, relation, childExpression) {
    var queryBuilder = relation.ownerModelClass.RelatedQueryBuilder.forClass(relation.relatedModelClass).childQueryOf(builder).eager(childExpression);

    var findOperation = relation.find(queryBuilder, models);
    findOperation.alwaysReturnArray = true;

    queryBuilder.callQueryBuilderOperation(findOperation, []);

    for (var i = 0, l = childExpression.args.length; i < l; ++i) {
      var filterName = childExpression.args[i];
      var filter = childExpression.filters[filterName];

      if (typeof filter !== 'function') {
        throw new _ValidationError2.default({ eager: 'could not find filter "' + filterName + '" for relation "' + relation.name + '"' });
      }

      filter(queryBuilder);
    }

    return queryBuilder;
  };

  return WhereInEagerOperation;
}(_EagerOperation3.default);

exports.default = WhereInEagerOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldoZXJlSW5FYWdlck9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJXaGVyZUluRWFnZXJPcGVyYXRpb24iLCJvbkFmdGVySW50ZXJuYWwiLCJidWlsZGVyIiwicmVzdWx0IiwibW9kZWxzIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwibW9kZWxDbGFzcyIsInByb21pc2VzIiwiZXhwcmVzc2lvbiIsImZvckVhY2hDaGlsZCIsInJlbGF0aW9uIiwiZ2V0UmVsYXRpb25zIiwiY2hpbGQiLCJuYW1lIiwiZWFnZXIiLCJyZWxhdGlvbnMiLCJyZWxOYW1lcyIsImkiLCJsIiwicmVsTmFtZSIsImNoaWxkRXhwcmVzc2lvbiIsInB1c2giLCJfZmV0Y2hSZWxhdGlvbiIsImFsbCIsInJldHVybiIsInF1ZXJ5QnVpbGRlciIsIm93bmVyTW9kZWxDbGFzcyIsIlJlbGF0ZWRRdWVyeUJ1aWxkZXIiLCJmb3JDbGFzcyIsInJlbGF0ZWRNb2RlbENsYXNzIiwiY2hpbGRRdWVyeU9mIiwiZmluZE9wZXJhdGlvbiIsImZpbmQiLCJhbHdheXNSZXR1cm5BcnJheSIsImNhbGxRdWVyeUJ1aWxkZXJPcGVyYXRpb24iLCJhcmdzIiwiZmlsdGVyTmFtZSIsImZpbHRlciIsImZpbHRlcnMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLHFCOzs7Ozs7OztrQ0FFbkJDLGUsNEJBQWdCQyxPLEVBQVNDLE0sRUFBUTtBQUMvQixRQUFJLENBQUNBLE1BQUwsRUFBYTtBQUNYLGFBQU9BLE1BQVA7QUFDRDs7QUFFRCxRQUFNQyxTQUFTQyxNQUFNQyxPQUFOLENBQWNILE1BQWQsSUFBd0JBLE1BQXhCLEdBQWlDLENBQUNBLE1BQUQsQ0FBaEQ7O0FBRUEsUUFBSSxDQUFDQyxPQUFPRyxNQUFSLElBQWtCLEVBQUVILE9BQU8sQ0FBUCxhQUFxQkYsUUFBUU0sVUFBUixFQUF2QixDQUF0QixFQUFvRTtBQUNsRSxhQUFPTCxNQUFQO0FBQ0Q7O0FBRUQsUUFBTU0sV0FBVyxFQUFqQjs7QUFFQSxTQUFLQyxVQUFMLENBQWdCQyxZQUFoQixDQUE2QixpQkFBUztBQUNwQyxVQUFJQyxXQUFXVixRQUFRTSxVQUFSLEdBQXFCSyxZQUFyQixHQUFvQ0MsTUFBTUMsSUFBMUMsQ0FBZjs7QUFFQSxVQUFJLENBQUNILFFBQUwsRUFBZTtBQUNiLGNBQU0sOEJBQW9CLEVBQUNJLDhCQUE0QkYsTUFBTUMsSUFBbEMsNkJBQUQsRUFBcEIsQ0FBTjtBQUNEO0FBQ0YsS0FORDs7QUFRQSxRQUFNRSxZQUFZZixRQUFRTSxVQUFSLEdBQXFCSyxZQUFyQixFQUFsQjtBQUNBLFFBQU1LLFdBQVcsb0JBQVlELFNBQVosQ0FBakI7O0FBRUEsU0FBSyxJQUFJRSxJQUFJLENBQVIsRUFBV0MsSUFBSUYsU0FBU1gsTUFBN0IsRUFBcUNZLElBQUlDLENBQXpDLEVBQTRDLEVBQUVELENBQTlDLEVBQWlEO0FBQy9DLFVBQU1FLFVBQVVILFNBQVNDLENBQVQsQ0FBaEI7QUFDQSxVQUFNUCxXQUFXSyxVQUFVSSxPQUFWLENBQWpCOztBQUVBLFVBQUlDLGtCQUFrQixLQUFLWixVQUFMLENBQWdCWSxlQUFoQixDQUFnQ1YsU0FBU0csSUFBekMsQ0FBdEI7O0FBRUEsVUFBSU8sZUFBSixFQUFxQjtBQUNuQmIsaUJBQVNjLElBQVQsQ0FBYyxLQUFLQyxjQUFMLENBQW9CdEIsT0FBcEIsRUFBNkJFLE1BQTdCLEVBQXFDUSxRQUFyQyxFQUErQ1UsZUFBL0MsQ0FBZDtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxtQkFBUUcsR0FBUixDQUFZaEIsUUFBWixFQUFzQmlCLE1BQXRCLENBQTZCdkIsTUFBN0IsQ0FBUDtBQUNELEc7O2tDQUVEcUIsYywyQkFBZXRCLE8sRUFBU0UsTSxFQUFRUSxRLEVBQVVVLGUsRUFBaUI7QUFDekQsUUFBTUssZUFBZWYsU0FBU2dCLGVBQVQsQ0FBeUJDLG1CQUF6QixDQUNsQkMsUUFEa0IsQ0FDVGxCLFNBQVNtQixpQkFEQSxFQUVsQkMsWUFGa0IsQ0FFTDlCLE9BRkssRUFHbEJjLEtBSGtCLENBR1pNLGVBSFksQ0FBckI7O0FBS0EsUUFBTVcsZ0JBQWdCckIsU0FBU3NCLElBQVQsQ0FBY1AsWUFBZCxFQUE0QnZCLE1BQTVCLENBQXRCO0FBQ0E2QixrQkFBY0UsaUJBQWQsR0FBa0MsSUFBbEM7O0FBRUFSLGlCQUFhUyx5QkFBYixDQUF1Q0gsYUFBdkMsRUFBc0QsRUFBdEQ7O0FBRUEsU0FBSyxJQUFJZCxJQUFJLENBQVIsRUFBV0MsSUFBSUUsZ0JBQWdCZSxJQUFoQixDQUFxQjlCLE1BQXpDLEVBQWlEWSxJQUFJQyxDQUFyRCxFQUF3RCxFQUFFRCxDQUExRCxFQUE2RDtBQUMzRCxVQUFNbUIsYUFBYWhCLGdCQUFnQmUsSUFBaEIsQ0FBcUJsQixDQUFyQixDQUFuQjtBQUNBLFVBQU1vQixTQUFTakIsZ0JBQWdCa0IsT0FBaEIsQ0FBd0JGLFVBQXhCLENBQWY7O0FBRUEsVUFBSSxPQUFPQyxNQUFQLEtBQWtCLFVBQXRCLEVBQWtDO0FBQ2hDLGNBQU0sOEJBQW9CLEVBQUN2QixtQ0FBaUNzQixVQUFqQyx3QkFBOEQxQixTQUFTRyxJQUF2RSxNQUFELEVBQXBCLENBQU47QUFDRDs7QUFFRHdCLGFBQU9aLFlBQVA7QUFDRDs7QUFFRCxXQUFPQSxZQUFQO0FBQ0QsRzs7Ozs7a0JBL0RrQjNCLHFCIiwiZmlsZSI6IldoZXJlSW5FYWdlck9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBWYWxpZGF0aW9uRXJyb3IgZnJvbSAnLi4vLi4vbW9kZWwvVmFsaWRhdGlvbkVycm9yJ1xuaW1wb3J0IEVhZ2VyT3BlcmF0aW9uIGZyb20gJy4vRWFnZXJPcGVyYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaGVyZUluRWFnZXJPcGVyYXRpb24gZXh0ZW5kcyBFYWdlck9wZXJhdGlvbiB7XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIHJlc3VsdCkge1xuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVscyA9IEFycmF5LmlzQXJyYXkocmVzdWx0KSA/IHJlc3VsdCA6IFtyZXN1bHRdO1xuXG4gICAgaWYgKCFtb2RlbHMubGVuZ3RoIHx8ICEobW9kZWxzWzBdIGluc3RhbmNlb2YgYnVpbGRlci5tb2RlbENsYXNzKCkpKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2VzID0gW107XG5cbiAgICB0aGlzLmV4cHJlc3Npb24uZm9yRWFjaENoaWxkKGNoaWxkID0+IHtcbiAgICAgIGxldCByZWxhdGlvbiA9IGJ1aWxkZXIubW9kZWxDbGFzcygpLmdldFJlbGF0aW9ucygpW2NoaWxkLm5hbWVdO1xuXG4gICAgICBpZiAoIXJlbGF0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBWYWxpZGF0aW9uRXJyb3Ioe2VhZ2VyOiBgdW5rbm93biByZWxhdGlvbiBcIiR7Y2hpbGQubmFtZX1cIiBpbiBhbiBlYWdlciBleHByZXNzaW9uYH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVsYXRpb25zID0gYnVpbGRlci5tb2RlbENsYXNzKCkuZ2V0UmVsYXRpb25zKCk7XG4gICAgY29uc3QgcmVsTmFtZXMgPSBPYmplY3Qua2V5cyhyZWxhdGlvbnMpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxOYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IHJlbE5hbWUgPSByZWxOYW1lc1tpXTtcbiAgICAgIGNvbnN0IHJlbGF0aW9uID0gcmVsYXRpb25zW3JlbE5hbWVdO1xuXG4gICAgICBsZXQgY2hpbGRFeHByZXNzaW9uID0gdGhpcy5leHByZXNzaW9uLmNoaWxkRXhwcmVzc2lvbihyZWxhdGlvbi5uYW1lKTtcblxuICAgICAgaWYgKGNoaWxkRXhwcmVzc2lvbikge1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMuX2ZldGNoUmVsYXRpb24oYnVpbGRlciwgbW9kZWxzLCByZWxhdGlvbiwgY2hpbGRFeHByZXNzaW9uKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKS5yZXR1cm4ocmVzdWx0KTtcbiAgfVxuXG4gIF9mZXRjaFJlbGF0aW9uKGJ1aWxkZXIsIG1vZGVscywgcmVsYXRpb24sIGNoaWxkRXhwcmVzc2lvbikge1xuICAgIGNvbnN0IHF1ZXJ5QnVpbGRlciA9IHJlbGF0aW9uLm93bmVyTW9kZWxDbGFzcy5SZWxhdGVkUXVlcnlCdWlsZGVyXG4gICAgICAuZm9yQ2xhc3MocmVsYXRpb24ucmVsYXRlZE1vZGVsQ2xhc3MpXG4gICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpXG4gICAgICAuZWFnZXIoY2hpbGRFeHByZXNzaW9uKTtcblxuICAgIGNvbnN0IGZpbmRPcGVyYXRpb24gPSByZWxhdGlvbi5maW5kKHF1ZXJ5QnVpbGRlciwgbW9kZWxzKTtcbiAgICBmaW5kT3BlcmF0aW9uLmFsd2F5c1JldHVybkFycmF5ID0gdHJ1ZTtcblxuICAgIHF1ZXJ5QnVpbGRlci5jYWxsUXVlcnlCdWlsZGVyT3BlcmF0aW9uKGZpbmRPcGVyYXRpb24sIFtdKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gY2hpbGRFeHByZXNzaW9uLmFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBmaWx0ZXJOYW1lID0gY2hpbGRFeHByZXNzaW9uLmFyZ3NbaV07XG4gICAgICBjb25zdCBmaWx0ZXIgPSBjaGlsZEV4cHJlc3Npb24uZmlsdGVyc1tmaWx0ZXJOYW1lXTtcblxuICAgICAgaWYgKHR5cGVvZiBmaWx0ZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFZhbGlkYXRpb25FcnJvcih7ZWFnZXI6IGBjb3VsZCBub3QgZmluZCBmaWx0ZXIgXCIke2ZpbHRlck5hbWV9XCIgZm9yIHJlbGF0aW9uIFwiJHtyZWxhdGlvbi5uYW1lfVwiYH0pO1xuICAgICAgfVxuXG4gICAgICBmaWx0ZXIocXVlcnlCdWlsZGVyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnlCdWlsZGVyO1xuICB9XG59Il19
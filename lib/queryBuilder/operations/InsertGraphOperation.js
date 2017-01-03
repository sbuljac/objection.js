'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _DelegateOperation2 = require('./DelegateOperation');

var _DelegateOperation3 = _interopRequireDefault(_DelegateOperation2);

var _InsertOperation = require('./InsertOperation');

var _InsertOperation2 = _interopRequireDefault(_InsertOperation);

var _inserter = require('../graphInserter/inserter');

var _inserter2 = _interopRequireDefault(_inserter);

var _GraphInserter = require('../graphInserter/GraphInserter');

var _GraphInserter2 = _interopRequireDefault(_GraphInserter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertGraphOperation = function (_DelegateOperation) {
  (0, _inherits3.default)(InsertGraphOperation, _DelegateOperation);

  function InsertGraphOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertGraphOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _DelegateOperation.call(this, name, opt));

    if (!_this.delegate.is(_InsertOperation2.default)) {
      throw new Error('Invalid delegate');
    }

    // Our delegate operation inherits from `InsertOperation`. Disable the call-time
    // validation. We do the validation in onAfterQuery instead.
    _this.delegate.modelOptions.skipValidation = true;
    return _this;
  }

  InsertGraphOperation.prototype.call = function call(builder, args) {
    var retVal = _DelegateOperation.prototype.call.call(this, builder, args);

    // We resolve this query here and will not execute it. This is because the root
    // value may depend on other models in the graph and cannot be inserted first.
    builder.resolve([]);

    return retVal;
  };

  InsertGraphOperation.prototype.onBefore = function onBefore() {
    // Do nothing.
  };

  InsertGraphOperation.prototype.onBeforeInternal = function onBeforeInternal() {
    // Do nothing. We override this with empty implementation so that
    // the $beforeInsert() hooks are not called twice for the root models.
  };

  InsertGraphOperation.prototype.onBeforeBuild = function onBeforeBuild() {
    // Do nothing.
  };

  InsertGraphOperation.prototype.onBuild = function onBuild() {}
  // Do nothing.


  // We overrode all other hooks but this one and do all the work in here.
  // This is a bit hacky.
  ;

  InsertGraphOperation.prototype.onAfterQuery = function onAfterQuery(builder) {
    var _this2 = this;

    var ModelClass = builder.modelClass();
    var insertFunc = (0, _inserter2.default)(builder);
    var graphInserter = new _GraphInserter2.default({
      modelClass: ModelClass,
      models: this.models,
      allowedRelations: builder._allowedInsertExpression || null,
      knex: builder.knex()
    });

    return graphInserter.execute(insertFunc).then(function () {
      return _DelegateOperation.prototype.onAfterQuery.call(_this2, builder, _this2.models);
    });
  };

  InsertGraphOperation.prototype.onAfterInternal = function onAfterInternal() {
    // We override this with empty implementation so that the $afterInsert() hooks
    // are not called twice for the root models.
    return this.isArray ? this.models : this.models[0] || null;
  };

  (0, _createClass3.default)(InsertGraphOperation, [{
    key: 'models',
    get: function get() {
      return this.delegate.models;
    }
  }, {
    key: 'isArray',
    get: function get() {
      return this.delegate.isArray;
    }
  }]);
  return InsertGraphOperation;
}(_DelegateOperation3.default);

exports.default = InsertGraphOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydEdyYXBoT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIkluc2VydEdyYXBoT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImRlbGVnYXRlIiwiaXMiLCJFcnJvciIsIm1vZGVsT3B0aW9ucyIsInNraXBWYWxpZGF0aW9uIiwiY2FsbCIsImJ1aWxkZXIiLCJhcmdzIiwicmV0VmFsIiwicmVzb2x2ZSIsIm9uQmVmb3JlIiwib25CZWZvcmVJbnRlcm5hbCIsIm9uQmVmb3JlQnVpbGQiLCJvbkJ1aWxkIiwib25BZnRlclF1ZXJ5IiwiTW9kZWxDbGFzcyIsIm1vZGVsQ2xhc3MiLCJpbnNlcnRGdW5jIiwiZ3JhcGhJbnNlcnRlciIsIm1vZGVscyIsImFsbG93ZWRSZWxhdGlvbnMiLCJfYWxsb3dlZEluc2VydEV4cHJlc3Npb24iLCJrbmV4IiwiZXhlY3V0ZSIsInRoZW4iLCJvbkFmdGVySW50ZXJuYWwiLCJpc0FycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7SUFFcUJBLG9COzs7QUFFbkIsZ0NBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLDhCQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFFBQUksQ0FBQyxNQUFLQyxRQUFMLENBQWNDLEVBQWQsMkJBQUwsRUFBd0M7QUFDdEMsWUFBTSxJQUFJQyxLQUFKLENBQVUsa0JBQVYsQ0FBTjtBQUNEOztBQUVEO0FBQ0E7QUFDQSxVQUFLRixRQUFMLENBQWNHLFlBQWQsQ0FBMkJDLGNBQTNCLEdBQTRDLElBQTVDO0FBVHFCO0FBVXRCOztpQ0FFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsUUFBTUMsU0FBUyw2QkFBTUgsSUFBTixZQUFXQyxPQUFYLEVBQW9CQyxJQUFwQixDQUFmOztBQUVBO0FBQ0E7QUFDQUQsWUFBUUcsT0FBUixDQUFnQixFQUFoQjs7QUFFQSxXQUFPRCxNQUFQO0FBQ0QsRzs7aUNBVURFLFEsdUJBQVc7QUFDVDtBQUNELEc7O2lDQUVEQyxnQiwrQkFBbUI7QUFDakI7QUFDQTtBQUNELEc7O2lDQUVEQyxhLDRCQUFnQjtBQUNkO0FBQ0QsRzs7aUNBRURDLE8sc0JBQVUsQ0FFVDtBQURDOzs7QUFHRjtBQUNBOzs7aUNBQ0FDLFkseUJBQWFSLE8sRUFBUztBQUFBOztBQUNwQixRQUFNUyxhQUFhVCxRQUFRVSxVQUFSLEVBQW5CO0FBQ0EsUUFBTUMsYUFBYSx3QkFBa0JYLE9BQWxCLENBQW5CO0FBQ0EsUUFBTVksZ0JBQWdCLDRCQUFrQjtBQUN0Q0Ysa0JBQVlELFVBRDBCO0FBRXRDSSxjQUFRLEtBQUtBLE1BRnlCO0FBR3RDQyx3QkFBa0JkLFFBQVFlLHdCQUFSLElBQW9DLElBSGhCO0FBSXRDQyxZQUFNaEIsUUFBUWdCLElBQVI7QUFKZ0MsS0FBbEIsQ0FBdEI7O0FBT0EsV0FBT0osY0FBY0ssT0FBZCxDQUFzQk4sVUFBdEIsRUFBa0NPLElBQWxDLENBQXVDLFlBQU07QUFDbEQsYUFBTyw2QkFBTVYsWUFBTixjQUFtQlIsT0FBbkIsRUFBNEIsT0FBS2EsTUFBakMsQ0FBUDtBQUNELEtBRk0sQ0FBUDtBQUdELEc7O2lDQUVETSxlLDhCQUFrQjtBQUNoQjtBQUNBO0FBQ0EsV0FBTyxLQUFLQyxPQUFMLEdBQWUsS0FBS1AsTUFBcEIsR0FBOEIsS0FBS0EsTUFBTCxDQUFZLENBQVosS0FBa0IsSUFBdkQ7QUFDRCxHOzs7O3dCQTlDWTtBQUNYLGFBQU8sS0FBS25CLFFBQUwsQ0FBY21CLE1BQXJCO0FBQ0Q7Ozt3QkFFYTtBQUNaLGFBQU8sS0FBS25CLFFBQUwsQ0FBYzBCLE9BQXJCO0FBQ0Q7Ozs7O2tCQTlCa0I3QixvQiIsImZpbGUiOiJJbnNlcnRHcmFwaE9wZXJhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWxlZ2F0ZU9wZXJhdGlvbiBmcm9tICcuL0RlbGVnYXRlT3BlcmF0aW9uJztcbmltcG9ydCBJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi9JbnNlcnRPcGVyYXRpb24nO1xuXG5pbXBvcnQgaW5zZXJ0RnVuY0J1aWxkZXIgZnJvbSAnLi4vZ3JhcGhJbnNlcnRlci9pbnNlcnRlcic7XG5pbXBvcnQgR3JhcGhJbnNlcnRlciBmcm9tICcuLi9ncmFwaEluc2VydGVyL0dyYXBoSW5zZXJ0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnNlcnRHcmFwaE9wZXJhdGlvbiBleHRlbmRzIERlbGVnYXRlT3BlcmF0aW9uIHtcblxuICBjb25zdHJ1Y3RvcihuYW1lLCBvcHQpIHtcbiAgICBzdXBlcihuYW1lLCBvcHQpO1xuXG4gICAgaWYgKCF0aGlzLmRlbGVnYXRlLmlzKEluc2VydE9wZXJhdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkZWxlZ2F0ZScpO1xuICAgIH1cblxuICAgIC8vIE91ciBkZWxlZ2F0ZSBvcGVyYXRpb24gaW5oZXJpdHMgZnJvbSBgSW5zZXJ0T3BlcmF0aW9uYC4gRGlzYWJsZSB0aGUgY2FsbC10aW1lXG4gICAgLy8gdmFsaWRhdGlvbi4gV2UgZG8gdGhlIHZhbGlkYXRpb24gaW4gb25BZnRlclF1ZXJ5IGluc3RlYWQuXG4gICAgdGhpcy5kZWxlZ2F0ZS5tb2RlbE9wdGlvbnMuc2tpcFZhbGlkYXRpb24gPSB0cnVlO1xuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0VmFsID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcblxuICAgIC8vIFdlIHJlc29sdmUgdGhpcyBxdWVyeSBoZXJlIGFuZCB3aWxsIG5vdCBleGVjdXRlIGl0LiBUaGlzIGlzIGJlY2F1c2UgdGhlIHJvb3RcbiAgICAvLyB2YWx1ZSBtYXkgZGVwZW5kIG9uIG90aGVyIG1vZGVscyBpbiB0aGUgZ3JhcGggYW5kIGNhbm5vdCBiZSBpbnNlcnRlZCBmaXJzdC5cbiAgICBidWlsZGVyLnJlc29sdmUoW10pO1xuXG4gICAgcmV0dXJuIHJldFZhbDtcbiAgfVxuXG4gIGdldCBtb2RlbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUubW9kZWxzO1xuICB9XG5cbiAgZ2V0IGlzQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuaXNBcnJheTtcbiAgfVxuXG4gIG9uQmVmb3JlKCkge1xuICAgIC8vIERvIG5vdGhpbmcuXG4gIH1cblxuICBvbkJlZm9yZUludGVybmFsKCkge1xuICAgIC8vIERvIG5vdGhpbmcuIFdlIG92ZXJyaWRlIHRoaXMgd2l0aCBlbXB0eSBpbXBsZW1lbnRhdGlvbiBzbyB0aGF0XG4gICAgLy8gdGhlICRiZWZvcmVJbnNlcnQoKSBob29rcyBhcmUgbm90IGNhbGxlZCB0d2ljZSBmb3IgdGhlIHJvb3QgbW9kZWxzLlxuICB9XG5cbiAgb25CZWZvcmVCdWlsZCgpIHtcbiAgICAvLyBEbyBub3RoaW5nLlxuICB9XG5cbiAgb25CdWlsZCgpIHtcbiAgICAvLyBEbyBub3RoaW5nLlxuICB9XG5cbiAgLy8gV2Ugb3ZlcnJvZGUgYWxsIG90aGVyIGhvb2tzIGJ1dCB0aGlzIG9uZSBhbmQgZG8gYWxsIHRoZSB3b3JrIGluIGhlcmUuXG4gIC8vIFRoaXMgaXMgYSBiaXQgaGFja3kuXG4gIG9uQWZ0ZXJRdWVyeShidWlsZGVyKSB7XG4gICAgY29uc3QgTW9kZWxDbGFzcyA9IGJ1aWxkZXIubW9kZWxDbGFzcygpO1xuICAgIGNvbnN0IGluc2VydEZ1bmMgPSBpbnNlcnRGdW5jQnVpbGRlcihidWlsZGVyKTtcbiAgICBjb25zdCBncmFwaEluc2VydGVyID0gbmV3IEdyYXBoSW5zZXJ0ZXIoe1xuICAgICAgbW9kZWxDbGFzczogTW9kZWxDbGFzcyxcbiAgICAgIG1vZGVsczogdGhpcy5tb2RlbHMsXG4gICAgICBhbGxvd2VkUmVsYXRpb25zOiBidWlsZGVyLl9hbGxvd2VkSW5zZXJ0RXhwcmVzc2lvbiB8fCBudWxsLFxuICAgICAga25leDogYnVpbGRlci5rbmV4KClcbiAgICB9KTtcblxuICAgIHJldHVybiBncmFwaEluc2VydGVyLmV4ZWN1dGUoaW5zZXJ0RnVuYykudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gc3VwZXIub25BZnRlclF1ZXJ5KGJ1aWxkZXIsIHRoaXMubW9kZWxzKVxuICAgIH0pO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKCkge1xuICAgIC8vIFdlIG92ZXJyaWRlIHRoaXMgd2l0aCBlbXB0eSBpbXBsZW1lbnRhdGlvbiBzbyB0aGF0IHRoZSAkYWZ0ZXJJbnNlcnQoKSBob29rc1xuICAgIC8vIGFyZSBub3QgY2FsbGVkIHR3aWNlIGZvciB0aGUgcm9vdCBtb2RlbHMuXG4gICAgcmV0dXJuIHRoaXMuaXNBcnJheSA/IHRoaXMubW9kZWxzIDogKHRoaXMubW9kZWxzWzBdIHx8IG51bGwpO1xuICB9XG59XG4iXX0=
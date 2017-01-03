'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _dbUtils = require('../../utils/dbUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InsertOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(InsertOperation, _QueryBuilderOperatio);

  function InsertOperation(name, opt) {
    (0, _classCallCheck3.default)(this, InsertOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.models = null;
    _this.isArray = false;
    _this.modelOptions = (0, _clone2.default)(_this.opt.modelOptions) || {};
    _this.isWriteOperation = true;
    return _this;
  }

  InsertOperation.prototype.call = function call(builder, args) {
    this.isArray = Array.isArray(args[0]);
    this.models = builder.modelClass().ensureModelArray(args[0], this.modelOptions);
    return true;
  };

  InsertOperation.prototype.onBeforeInternal = function onBeforeInternal(builder, result) {
    if (this.models.length > 1 && !(0, _dbUtils.isPostgres)(builder.knex())) {
      throw new Error('batch insert only works with Postgresql');
    } else {
      return (0, _promiseUtils.mapAfterAllReturn)(this.models, function (model) {
        return model.$beforeInsert(builder.context());
      }, result);
    }
  };

  InsertOperation.prototype.onBuild = function onBuild(knexBuilder, builder) {
    if (!builder.has(/returning/)) {
      // If the user hasn't specified a `returning` clause, we make sure
      // that at least the identifier is returned.
      knexBuilder.returning(builder.modelClass().idColumn);
    }

    var json = new Array(this.models.length);

    for (var i = 0, l = this.models.length; i < l; ++i) {
      json[i] = this.models[i].$toDatabaseJson();
    }

    knexBuilder.insert(json);
  };

  InsertOperation.prototype.onAfterQuery = function onAfterQuery(builder, ret) {
    if (!Array.isArray(ret) || !ret.length || ret === this.models) {
      // Early exit if there is nothing to do.
      return this.models;
    }

    if (ret[0] && (0, _typeof3.default)(ret[0]) === 'object') {
      // If the user specified a `returning` clause the result may be an array of objects.
      // Merge all values of the objects to our models.
      for (var i = 0, l = this.models.length; i < l; ++i) {
        this.models[i].$set(ret[i]);
      }
    } else {
      // If the return value is not an array of objects, we assume it is an array of identifiers.
      for (var _i = 0, _l = this.models.length; _i < _l; ++_i) {
        var model = this.models[_i];

        // Don't set the id if the model already has one. MySQL and Sqlite don't return the correct
        // primary key value if the id is not generated in db, but given explicitly.
        if (!model.$id()) {
          model.$id(ret[_i]);
        }
      }
    }

    return this.models;
  };

  InsertOperation.prototype.onAfterInternal = function onAfterInternal(builder, models) {
    var result = this.isArray ? models : models[0] || null;
    return (0, _promiseUtils.mapAfterAllReturn)(models, function (model) {
      return model.$afterInsert(builder.context());
    }, result);
  };

  return InsertOperation;
}(_QueryBuilderOperation2.default);

exports.default = InsertOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkluc2VydE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJJbnNlcnRPcGVyYXRpb24iLCJuYW1lIiwib3B0IiwibW9kZWxzIiwiaXNBcnJheSIsIm1vZGVsT3B0aW9ucyIsImlzV3JpdGVPcGVyYXRpb24iLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJBcnJheSIsIm1vZGVsQ2xhc3MiLCJlbnN1cmVNb2RlbEFycmF5Iiwib25CZWZvcmVJbnRlcm5hbCIsInJlc3VsdCIsImxlbmd0aCIsImtuZXgiLCJFcnJvciIsIm1vZGVsIiwiJGJlZm9yZUluc2VydCIsImNvbnRleHQiLCJvbkJ1aWxkIiwia25leEJ1aWxkZXIiLCJoYXMiLCJyZXR1cm5pbmciLCJpZENvbHVtbiIsImpzb24iLCJpIiwibCIsIiR0b0RhdGFiYXNlSnNvbiIsImluc2VydCIsIm9uQWZ0ZXJRdWVyeSIsInJldCIsIiRzZXQiLCIkaWQiLCJvbkFmdGVySW50ZXJuYWwiLCIkYWZ0ZXJJbnNlcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0lBRXFCQSxlOzs7QUFFbkIsMkJBQVlDLElBQVosRUFBa0JDLEdBQWxCLEVBQXVCO0FBQUE7O0FBQUEsK0RBQ3JCLGlDQUFNRCxJQUFOLEVBQVlDLEdBQVosQ0FEcUI7O0FBR3JCLFVBQUtDLE1BQUwsR0FBYyxJQUFkO0FBQ0EsVUFBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxVQUFLQyxZQUFMLEdBQW9CLHFCQUFNLE1BQUtILEdBQUwsQ0FBU0csWUFBZixLQUFnQyxFQUFwRDtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCLElBQXhCO0FBTnFCO0FBT3RCOzs0QkFFREMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsU0FBS0wsT0FBTCxHQUFlTSxNQUFNTixPQUFOLENBQWNLLEtBQUssQ0FBTCxDQUFkLENBQWY7QUFDQSxTQUFLTixNQUFMLEdBQWNLLFFBQVFHLFVBQVIsR0FBcUJD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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNsb25lIGZyb20gJ2xvZGFzaC9jbG9uZSc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCB7bWFwQWZ0ZXJBbGxSZXR1cm59IGZyb20gJy4uLy4uL3V0aWxzL3Byb21pc2VVdGlscyc7XG5pbXBvcnQge2lzUG9zdGdyZXN9IGZyb20gJy4uLy4uL3V0aWxzL2RiVXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnNlcnRPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG5cbiAgICB0aGlzLm1vZGVscyA9IG51bGw7XG4gICAgdGhpcy5pc0FycmF5ID0gZmFsc2U7XG4gICAgdGhpcy5tb2RlbE9wdGlvbnMgPSBjbG9uZSh0aGlzLm9wdC5tb2RlbE9wdGlvbnMpIHx8IHt9O1xuICAgIHRoaXMuaXNXcml0ZU9wZXJhdGlvbiA9IHRydWU7XG4gIH1cblxuICBjYWxsKGJ1aWxkZXIsIGFyZ3MpIHtcbiAgICB0aGlzLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGFyZ3NbMF0pO1xuICAgIHRoaXMubW9kZWxzID0gYnVpbGRlci5tb2RlbENsYXNzKCkuZW5zdXJlTW9kZWxBcnJheShhcmdzWzBdLCB0aGlzLm1vZGVsT3B0aW9ucyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBvbkJlZm9yZUludGVybmFsKGJ1aWxkZXIsIHJlc3VsdCkge1xuICAgIGlmICh0aGlzLm1vZGVscy5sZW5ndGggPiAxICYmICFpc1Bvc3RncmVzKGJ1aWxkZXIua25leCgpKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdiYXRjaCBpbnNlcnQgb25seSB3b3JrcyB3aXRoIFBvc3RncmVzcWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1hcEFmdGVyQWxsUmV0dXJuKHRoaXMubW9kZWxzLCBtb2RlbCA9PiBtb2RlbC4kYmVmb3JlSW5zZXJ0KGJ1aWxkZXIuY29udGV4dCgpKSwgcmVzdWx0KTtcbiAgICB9XG4gIH1cblxuICBvbkJ1aWxkKGtuZXhCdWlsZGVyLCBidWlsZGVyKSB7XG4gICAgaWYgKCFidWlsZGVyLmhhcygvcmV0dXJuaW5nLykpIHtcbiAgICAgIC8vIElmIHRoZSB1c2VyIGhhc24ndCBzcGVjaWZpZWQgYSBgcmV0dXJuaW5nYCBjbGF1c2UsIHdlIG1ha2Ugc3VyZVxuICAgICAgLy8gdGhhdCBhdCBsZWFzdCB0aGUgaWRlbnRpZmllciBpcyByZXR1cm5lZC5cbiAgICAgIGtuZXhCdWlsZGVyLnJldHVybmluZyhidWlsZGVyLm1vZGVsQ2xhc3MoKS5pZENvbHVtbik7XG4gICAgfVxuXG4gICAgbGV0IGpzb24gPSBuZXcgQXJyYXkodGhpcy5tb2RlbHMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBqc29uW2ldID0gdGhpcy5tb2RlbHNbaV0uJHRvRGF0YWJhc2VKc29uKCk7XG4gICAgfVxuXG4gICAga25leEJ1aWxkZXIuaW5zZXJ0KGpzb24pO1xuICB9XG5cbiAgb25BZnRlclF1ZXJ5KGJ1aWxkZXIsIHJldCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShyZXQpIHx8ICFyZXQubGVuZ3RoIHx8IHJldCA9PT0gdGhpcy5tb2RlbHMpIHtcbiAgICAgIC8vIEVhcmx5IGV4aXQgaWYgdGhlcmUgaXMgbm90aGluZyB0byBkby5cbiAgICAgIHJldHVybiB0aGlzLm1vZGVscztcbiAgICB9XG5cbiAgICBpZiAocmV0WzBdICYmIHR5cGVvZiByZXRbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICAvLyBJZiB0aGUgdXNlciBzcGVjaWZpZWQgYSBgcmV0dXJuaW5nYCBjbGF1c2UgdGhlIHJlc3VsdCBtYXkgYmUgYW4gYXJyYXkgb2Ygb2JqZWN0cy5cbiAgICAgIC8vIE1lcmdlIGFsbCB2YWx1ZXMgb2YgdGhlIG9iamVjdHMgdG8gb3VyIG1vZGVscy5cbiAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIHRoaXMubW9kZWxzW2ldLiRzZXQocmV0W2ldKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSWYgdGhlIHJldHVybiB2YWx1ZSBpcyBub3QgYW4gYXJyYXkgb2Ygb2JqZWN0cywgd2UgYXNzdW1lIGl0IGlzIGFuIGFycmF5IG9mIGlkZW50aWZpZXJzLlxuICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0aGlzLm1vZGVscy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgICAgY29uc3QgbW9kZWwgPSB0aGlzLm1vZGVsc1tpXTtcblxuICAgICAgICAvLyBEb24ndCBzZXQgdGhlIGlkIGlmIHRoZSBtb2RlbCBhbHJlYWR5IGhhcyBvbmUuIE15U1FMIGFuZCBTcWxpdGUgZG9uJ3QgcmV0dXJuIHRoZSBjb3JyZWN0XG4gICAgICAgIC8vIHByaW1hcnkga2V5IHZhbHVlIGlmIHRoZSBpZCBpcyBub3QgZ2VuZXJhdGVkIGluIGRiLCBidXQgZ2l2ZW4gZXhwbGljaXRseS5cbiAgICAgICAgaWYgKCFtb2RlbC4kaWQoKSkge1xuICAgICAgICAgIG1vZGVsLiRpZChyZXRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubW9kZWxzO1xuICB9XG5cbiAgb25BZnRlckludGVybmFsKGJ1aWxkZXIsIG1vZGVscykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuaXNBcnJheSA/IG1vZGVscyA6IChtb2RlbHNbMF0gfHwgbnVsbCk7XG4gICAgcmV0dXJuIG1hcEFmdGVyQWxsUmV0dXJuKG1vZGVscywgbW9kZWwgPT4gbW9kZWwuJGFmdGVySW5zZXJ0KGJ1aWxkZXIuY29udGV4dCgpKSwgcmVzdWx0KTtcbiAgfVxufVxuIl19
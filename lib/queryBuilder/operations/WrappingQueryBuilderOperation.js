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

var _QueryBuilderBase = require('../QueryBuilderBase');

var _QueryBuilderBase2 = _interopRequireDefault(_QueryBuilderBase);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _dbUtils = require('../../utils/dbUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrappingQueryBuilderOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(WrappingQueryBuilderOperation, _QueryBuilderOperatio);

  function WrappingQueryBuilderOperation(name, opt) {
    (0, _classCallCheck3.default)(this, WrappingQueryBuilderOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.call(this, name, opt));

    _this.args = null;
    return _this;
  }

  WrappingQueryBuilderOperation.prototype.call = function call(builder, args) {
    var ret = wrapArgs(this, builder, args);
    this.args = args;
    return ret;
  };

  return WrappingQueryBuilderOperation;
}(_QueryBuilderOperation2.default);

exports.default = WrappingQueryBuilderOperation;


function wrapArgs(op, builder, args) {
  var skipUndefined = builder.shouldSkipUndefined();
  var knex = builder.knex();

  for (var i = 0, l = args.length; i < l; ++i) {
    var arg = args[i];

    if (arg === undefined) {
      if (skipUndefined) {
        return false;
      } else {
        throw new Error('undefined passed as argument #' + l + ' for \'' + op.name + '\' operation. Call skipUndefined() method to ignore the undefined values.');
      }
    } else if (arg instanceof _QueryBuilderBase2.default) {
      // Convert QueryBuilderBase instances into knex query builders.
      args[i] = arg.build();
    } else if (Array.isArray(arg)) {
      if (skipUndefined) {
        args[i] = withoutUndefined(arg);
      } else if (includesUndefined(arg)) {
        throw new Error('undefined passed as an item in argument #' + l + ' for \'' + op.name + '\' operation. Call skipUndefined() method to ignore the undefined values.');
      }
    } else if (typeof arg === 'function') {
      // If an argument is a function, knex calls it with a query builder as
      // first argument (and as `this` context). We wrap the query builder into
      // a QueryBuilderBase instance.
      args[i] = wrapFunctionArg(arg, knex);
    }
  }

  return true;
}

function wrapFunctionArg(func, knex) {
  return function wrappedKnexFunctionArg() {
    if ((0, _dbUtils.isKnexQueryBuilder)(this)) {
      var knexQueryBuilder = this;
      // Wrap knex query builder into a QueryBuilderBase so that we can use
      // our extended query builder in nested queries.
      var wrappedQueryBuilder = new _QueryBuilderBase2.default(knex);

      func.call(wrappedQueryBuilder, wrappedQueryBuilder);
      wrappedQueryBuilder.buildInto(knexQueryBuilder);
    } else {
      // This case is for function argument `join` operation and other methods that
      // Don't take a query builder as the first parameter.
      return func.apply(this, arguments);
    }
  };
}

function withoutUndefined(arr) {
  var out = [];

  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] !== undefined) {
      out.push(arr[i]);
    }
  }

  return out;
}

function includesUndefined(arr) {
  for (var i = 0, l = arr.length; i < l; ++i) {
    if (arr[i] === undefined) {
      return true;
    }
  }

  return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uLmpzIl0sIm5hbWVzIjpbIldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uIiwibmFtZSIsIm9wdCIsImFyZ3MiLCJjYWxsIiwiYnVpbGRlciIsInJldCIsIndyYXBBcmdzIiwib3AiLCJza2lwVW5kZWZpbmVkIiwic2hvdWxkU2tpcFVuZGVmaW5lZCIsImtuZXgiLCJpIiwibCIsImxlbmd0aCIsImFyZyIsInVuZGVmaW5lZCIsIkVycm9yIiwiYnVpbGQiLCJBcnJheSIsImlzQXJyYXkiLCJ3aXRob3V0VW5kZWZpbmVkIiwiaW5jbHVkZXNVbmRlZmluZWQiLCJ3cmFwRnVuY3Rpb25BcmciLCJmdW5jIiwid3JhcHBlZEtuZXhGdW5jdGlvbkFyZyIsImtuZXhRdWVyeUJ1aWxkZXIiLCJ3cmFwcGVkUXVlcnlCdWlsZGVyIiwiYnVpbGRJbnRvIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJhcnIiLCJvdXQiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0lBRXFCQSw2Qjs7O0FBRW5CLHlDQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQixpQ0FBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUVyQixVQUFLQyxJQUFMLEdBQVksSUFBWjtBQUZxQjtBQUd0Qjs7MENBRURDLEksaUJBQUtDLE8sRUFBU0YsSSxFQUFNO0FBQ2xCLFFBQU1HLE1BQU1DLFNBQVMsSUFBVCxFQUFlRixPQUFmLEVBQXdCRixJQUF4QixDQUFaO0FBQ0EsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsV0FBT0csR0FBUDtBQUNELEc7Ozs7O2tCQVhrQk4sNkI7OztBQWNyQixTQUFTTyxRQUFULENBQWtCQyxFQUFsQixFQUFzQkgsT0FBdEIsRUFBK0JGLElBQS9CLEVBQXFDO0FBQ25DLE1BQU1NLGdCQUFnQkosUUFBUUssbUJBQVIsRUFBdEI7QUFDQSxNQUFNQyxPQUFPTixRQUFRTSxJQUFSLEVBQWI7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSVYsS0FBS1csTUFBekIsRUFBaUNGLElBQUlDLENBQXJDLEVBQXdDLEVBQUVELENBQTFDLEVBQTZDO0FBQzNDLFFBQU1HLE1BQU1aLEtBQUtTLENBQUwsQ0FBWjs7QUFFQSxRQUFJRyxRQUFRQyxTQUFaLEVBQXVCO0FBQ3JCLFVBQUlQLGFBQUosRUFBbUI7QUFDakIsZUFBTyxLQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsY0FBTSxJQUFJUSxLQUFKLG9DQUEyQ0osQ0FBM0MsZUFBcURMLEdBQUdQLElBQXhELCtFQUFOO0FBQ0Q7QUFDRixLQU5ELE1BTU8sSUFBSWMseUNBQUosRUFBcUM7QUFDMUM7QUFDQVosV0FBS1MsQ0FBTCxJQUFVRyxJQUFJRyxLQUFKLEVBQVY7QUFDRCxLQUhNLE1BR0EsSUFBSUMsTUFBTUMsT0FBTixDQUFjTCxHQUFkLENBQUosRUFBd0I7QUFDN0IsVUFBSU4sYUFBSixFQUFtQjtBQUNqQk4sYUFBS1MsQ0FBTCxJQUFVUyxpQkFBaUJOLEdBQWpCLENBQVY7QUFDRCxPQUZELE1BRU8sSUFBSU8sa0JBQWtCUCxHQUFsQixDQUFKLEVBQTRCO0FBQ2pDLGNBQU0sSUFBSUUsS0FBSiwrQ0FBc0RKLENBQXRELGVBQWdFTCxHQUFHUCxJQUFuRSwrRUFBTjtBQUNEO0FBQ0YsS0FOTSxNQU1BLElBQUksT0FBT2MsR0FBUCxLQUFlLFVBQW5CLEVBQStCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBWixXQUFLUyxDQUFMLElBQVVXLGdCQUFnQlIsR0FBaEIsRUFBcUJKLElBQXJCLENBQVY7QUFDRDtBQUNGOztBQUVELFNBQU8sSUFBUDtBQUNEOztBQUVELFNBQVNZLGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCYixJQUEvQixFQUFxQztBQUNuQyxTQUFPLFNBQVNjLHNCQUFULEdBQWtDO0FBQ3ZDLFFBQUksaUNBQW1CLElBQW5CLENBQUosRUFBOEI7QUFDNUIsVUFBTUMsbUJBQW1CLElBQXpCO0FBQ0E7QUFDQTtBQUNBLFVBQU1DLHNCQUFzQiwrQkFBcUJoQixJQUFyQixDQUE1Qjs7QUFFQWEsV0FBS3BCLElBQUwsQ0FBVXVCLG1CQUFWLEVBQStCQSxtQkFBL0I7QUFDQUEsMEJBQW9CQyxTQUFwQixDQUE4QkYsZ0JBQTlCO0FBQ0QsS0FSRCxNQVFPO0FBQ0w7QUFDQTtBQUNBLGFBQU9GLEtBQUtLLEtBQUwsQ0FBVyxJQUFYLEVBQWlCQyxTQUFqQixDQUFQO0FBQ0Q7QUFDRixHQWREO0FBZUQ7O0FBRUQsU0FBU1QsZ0JBQVQsQ0FBMEJVLEdBQTFCLEVBQStCO0FBQzdCLE1BQU1DLE1BQU0sRUFBWjs7QUFFQSxPQUFLLElBQUlwQixJQUFJLENBQVIsRUFBV0MsSUFBSWtCLElBQUlqQixNQUF4QixFQUFnQ0YsSUFBSUMsQ0FBcEMsRUFBdUMsRUFBRUQsQ0FBekMsRUFBNEM7QUFDMUMsUUFBSW1CLElBQUluQixDQUFKLE1BQVdJLFNBQWYsRUFBMEI7QUFDeEJnQixVQUFJQyxJQUFKLENBQVNGLElBQUluQixDQUFKLENBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU9vQixHQUFQO0FBQ0Q7O0FBRUQsU0FBU1YsaUJBQVQsQ0FBMkJTLEdBQTNCLEVBQWdDO0FBQzlCLE9BQUssSUFBSW5CLElBQUksQ0FBUixFQUFXQyxJQUFJa0IsSUFBSWpCLE1BQXhCLEVBQWdDRixJQUFJQyxDQUFwQyxFQUF1QyxFQUFFRCxDQUF6QyxFQUE0QztBQUMxQyxRQUFJbUIsSUFBSW5CLENBQUosTUFBV0ksU0FBZixFQUEwQjtBQUN4QixhQUFPLElBQVA7QUFDRDtBQUNGOztBQUVELFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6IldyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFF1ZXJ5QnVpbGRlckJhc2UgZnJvbSAnLi4vUXVlcnlCdWlsZGVyQmFzZSc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCB7aXNLbmV4UXVlcnlCdWlsZGVyfSBmcm9tICcuLi8uLi91dGlscy9kYlV0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24gZXh0ZW5kcyBRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5hcmdzID0gbnVsbDtcbiAgfVxuXG4gIGNhbGwoYnVpbGRlciwgYXJncykge1xuICAgIGNvbnN0IHJldCA9IHdyYXBBcmdzKHRoaXMsIGJ1aWxkZXIsIGFyZ3MpO1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgcmV0dXJuIHJldDtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwQXJncyhvcCwgYnVpbGRlciwgYXJncykge1xuICBjb25zdCBza2lwVW5kZWZpbmVkID0gYnVpbGRlci5zaG91bGRTa2lwVW5kZWZpbmVkKCk7XG4gIGNvbnN0IGtuZXggPSBidWlsZGVyLmtuZXgoKTtcblxuICBmb3IgKGxldCBpID0gMCwgbCA9IGFyZ3MubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgY29uc3QgYXJnID0gYXJnc1tpXTtcblxuICAgIGlmIChhcmcgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKHNraXBVbmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmRlZmluZWQgcGFzc2VkIGFzIGFyZ3VtZW50ICMke2x9IGZvciAnJHtvcC5uYW1lfScgb3BlcmF0aW9uLiBDYWxsIHNraXBVbmRlZmluZWQoKSBtZXRob2QgdG8gaWdub3JlIHRoZSB1bmRlZmluZWQgdmFsdWVzLmApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXJnIGluc3RhbmNlb2YgUXVlcnlCdWlsZGVyQmFzZSkge1xuICAgICAgLy8gQ29udmVydCBRdWVyeUJ1aWxkZXJCYXNlIGluc3RhbmNlcyBpbnRvIGtuZXggcXVlcnkgYnVpbGRlcnMuXG4gICAgICBhcmdzW2ldID0gYXJnLmJ1aWxkKCk7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcbiAgICAgIGlmIChza2lwVW5kZWZpbmVkKSB7XG4gICAgICAgIGFyZ3NbaV0gPSB3aXRob3V0VW5kZWZpbmVkKGFyZyk7XG4gICAgICB9IGVsc2UgaWYgKGluY2x1ZGVzVW5kZWZpbmVkKGFyZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bmRlZmluZWQgcGFzc2VkIGFzIGFuIGl0ZW0gaW4gYXJndW1lbnQgIyR7bH0gZm9yICcke29wLm5hbWV9JyBvcGVyYXRpb24uIENhbGwgc2tpcFVuZGVmaW5lZCgpIG1ldGhvZCB0byBpZ25vcmUgdGhlIHVuZGVmaW5lZCB2YWx1ZXMuYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBJZiBhbiBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uLCBrbmV4IGNhbGxzIGl0IHdpdGggYSBxdWVyeSBidWlsZGVyIGFzXG4gICAgICAvLyBmaXJzdCBhcmd1bWVudCAoYW5kIGFzIGB0aGlzYCBjb250ZXh0KS4gV2Ugd3JhcCB0aGUgcXVlcnkgYnVpbGRlciBpbnRvXG4gICAgICAvLyBhIFF1ZXJ5QnVpbGRlckJhc2UgaW5zdGFuY2UuXG4gICAgICBhcmdzW2ldID0gd3JhcEZ1bmN0aW9uQXJnKGFyZywga25leCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbkFyZyhmdW5jLCBrbmV4KSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVkS25leEZ1bmN0aW9uQXJnKCkge1xuICAgIGlmIChpc0tuZXhRdWVyeUJ1aWxkZXIodGhpcykpIHtcbiAgICAgIGNvbnN0IGtuZXhRdWVyeUJ1aWxkZXIgPSB0aGlzO1xuICAgICAgLy8gV3JhcCBrbmV4IHF1ZXJ5IGJ1aWxkZXIgaW50byBhIFF1ZXJ5QnVpbGRlckJhc2Ugc28gdGhhdCB3ZSBjYW4gdXNlXG4gICAgICAvLyBvdXIgZXh0ZW5kZWQgcXVlcnkgYnVpbGRlciBpbiBuZXN0ZWQgcXVlcmllcy5cbiAgICAgIGNvbnN0IHdyYXBwZWRRdWVyeUJ1aWxkZXIgPSBuZXcgUXVlcnlCdWlsZGVyQmFzZShrbmV4KTtcblxuICAgICAgZnVuYy5jYWxsKHdyYXBwZWRRdWVyeUJ1aWxkZXIsIHdyYXBwZWRRdWVyeUJ1aWxkZXIpO1xuICAgICAgd3JhcHBlZFF1ZXJ5QnVpbGRlci5idWlsZEludG8oa25leFF1ZXJ5QnVpbGRlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRoaXMgY2FzZSBpcyBmb3IgZnVuY3Rpb24gYXJndW1lbnQgYGpvaW5gIG9wZXJhdGlvbiBhbmQgb3RoZXIgbWV0aG9kcyB0aGF0XG4gICAgICAvLyBEb24ndCB0YWtlIGEgcXVlcnkgYnVpbGRlciBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyLlxuICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdpdGhvdXRVbmRlZmluZWQoYXJyKSB7XG4gIGNvbnN0IG91dCA9IFtdO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0gYXJyLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGlmIChhcnJbaV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgb3V0LnB1c2goYXJyW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBpbmNsdWRlc1VuZGVmaW5lZChhcnIpIHtcbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=
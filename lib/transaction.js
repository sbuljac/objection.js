'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = transaction;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Model = require('./model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _classUtils = require('./utils/classUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @returns {Promise}
 */
function transaction() {
  var _arguments = arguments;

  // There must be at least one model class and the callback.
  if (arguments.length < 2) {
    return _bluebird2.default.reject(new Error('objection.transaction: provide at least one Model class to bind to the transaction or a knex instance'));
  }

  if (!(0, _classUtils.isSubclassOf)(arguments[0], _Model2.default) && _lodash2.default.isFunction(arguments[0].transaction)) {
    var args = _lodash2.default.toArray(arguments);
    var knex = _lodash2.default.first(args);
    args = args.slice(1);

    // If the function is a generator, wrap it using Promise.coroutine.
    if (isGenerator(args[0])) {
      args[0] = _bluebird2.default.coroutine(args[0]);
    }

    return knex.transaction.apply(knex, args);
  } else {
    var _ret = function () {
      // The last argument should be the callback and all other Model subclasses.
      var callback = _lodash2.default.last(_arguments);
      var modelClasses = _lodash2.default.take(_arguments, _arguments.length - 1);
      var i = void 0;

      for (i = 0; i < modelClasses.length; ++i) {
        if (!(0, _classUtils.isSubclassOf)(modelClasses[i], _Model2.default)) {
          return {
            v: _bluebird2.default.reject(new Error('objection.transaction: all but the last argument should be Model subclasses'))
          };
        }
      }

      var knex = _lodash2.default.first(modelClasses).knex();
      for (i = 0; i < modelClasses.length; ++i) {
        if (modelClasses[i].knex() !== knex) {
          return {
            v: _bluebird2.default.reject(new Error('objection.transaction: all Model subclasses must be bound to the same database'))
          };
        }
      }

      // If the function is a generator, wrap it using Promise.coroutine.
      if (isGenerator(callback)) {
        callback = _bluebird2.default.coroutine(callback);
      }

      return {
        v: knex.transaction(function (trx) {
          var args = new Array(modelClasses.length + 1);

          for (var _i = 0; _i < modelClasses.length; ++_i) {
            args[_i] = modelClasses[_i].bindTransaction(trx);
          }

          args[args.length - 1] = trx;

          return _bluebird2.default.try(function () {
            return callback.apply(trx, args);
          });
        })
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
  }
}

/**
 * @param {Constructor.<Model>|knex} modelClassOrKnex
 * @returns {Promise}
 */
transaction.start = function (modelClassOrKnex) {
  var knex = modelClassOrKnex;

  if ((0, _classUtils.isSubclassOf)(modelClassOrKnex, _Model2.default)) {
    knex = modelClassOrKnex.knex();
  }

  if (!_lodash2.default.isFunction(knex.transaction)) {
    return _bluebird2.default.reject(new Error('objection.transaction.start: first argument must be a model class or a knex instance'));
  }

  return new _bluebird2.default(function (resolve, reject) {
    knex.transaction(function (trx) {
      resolve(trx);
    }).catch(function (err) {
      reject(err);
    });
  });
};

function isGenerator(fn) {
  return fn && fn.constructor && fn.constructor.name === 'GeneratorFunction';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyYW5zYWN0aW9uLmpzIl0sIm5hbWVzIjpbInRyYW5zYWN0aW9uIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwicmVqZWN0IiwiRXJyb3IiLCJpc0Z1bmN0aW9uIiwiYXJncyIsInRvQXJyYXkiLCJrbmV4IiwiZmlyc3QiLCJzbGljZSIsImlzR2VuZXJhdG9yIiwiY29yb3V0aW5lIiwiYXBwbHkiLCJjYWxsYmFjayIsImxhc3QiLCJtb2RlbENsYXNzZXMiLCJ0YWtlIiwiaSIsIkFycmF5IiwiYmluZFRyYW5zYWN0aW9uIiwidHJ4IiwidHJ5Iiwic3RhcnQiLCJtb2RlbENsYXNzT3JLbmV4IiwicmVzb2x2ZSIsImNhdGNoIiwiZXJyIiwiZm4iLCJjb25zdHJ1Y3RvciIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0JBUXdCQSxXOztBQVJ4Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7QUFHZSxTQUFTQSxXQUFULEdBQXVCO0FBQUE7O0FBQ3BDO0FBQ0EsTUFBSUMsVUFBVUMsTUFBVixHQUFtQixDQUF2QixFQUEwQjtBQUN4QixXQUFPLG1CQUFRQyxNQUFSLENBQWUsSUFBSUMsS0FBSixDQUFVLHVHQUFWLENBQWYsQ0FBUDtBQUNEOztBQUVELE1BQUksQ0FBQyw4QkFBYUgsVUFBVSxDQUFWLENBQWIsa0JBQUQsSUFBc0MsaUJBQUVJLFVBQUYsQ0FBYUosVUFBVSxDQUFWLEVBQWFELFdBQTFCLENBQTFDLEVBQWtGO0FBQ2hGLFFBQUlNLE9BQU8saUJBQUVDLE9BQUYsQ0FBVU4sU0FBVixDQUFYO0FBQ0EsUUFBSU8sT0FBTyxpQkFBRUMsS0FBRixDQUFRSCxJQUFSLENBQVg7QUFDQUEsV0FBT0EsS0FBS0ksS0FBTCxDQUFXLENBQVgsQ0FBUDs7QUFFQTtBQUNBLFFBQUlDLFlBQVlMLEtBQUssQ0FBTCxDQUFaLENBQUosRUFBMEI7QUFDeEJBLFdBQUssQ0FBTCxJQUFVLG1CQUFRTSxTQUFSLENBQWtCTixLQUFLLENBQUwsQ0FBbEIsQ0FB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bnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBNb2RlbCBmcm9tICcuL21vZGVsL01vZGVsJztcbmltcG9ydCB7aXNTdWJjbGFzc09mfSBmcm9tICcuL3V0aWxzL2NsYXNzVXRpbHMnO1xuXG4vKipcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2FjdGlvbigpIHtcbiAgLy8gVGhlcmUgbXVzdCBiZSBhdCBsZWFzdCBvbmUgbW9kZWwgY2xhc3MgYW5kIHRoZSBjYWxsYmFjay5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignb2JqZWN0aW9uLnRyYW5zYWN0aW9uOiBwcm92aWRlIGF0IGxlYXN0IG9uZSBNb2RlbCBjbGFzcyB0byBiaW5kIHRvIHRoZSB0cmFuc2FjdGlvbiBvciBhIGtuZXggaW5zdGFuY2UnKSk7XG4gIH1cblxuICBpZiAoIWlzU3ViY2xhc3NPZihhcmd1bWVudHNbMF0sIE1vZGVsKSAmJiBfLmlzRnVuY3Rpb24oYXJndW1lbnRzWzBdLnRyYW5zYWN0aW9uKSkge1xuICAgIGxldCBhcmdzID0gXy50b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgbGV0IGtuZXggPSBfLmZpcnN0KGFyZ3MpO1xuICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDEpO1xuXG4gICAgLy8gSWYgdGhlIGZ1bmN0aW9uIGlzIGEgZ2VuZXJhdG9yLCB3cmFwIGl0IHVzaW5nIFByb21pc2UuY29yb3V0aW5lLlxuICAgIGlmIChpc0dlbmVyYXRvcihhcmdzWzBdKSkge1xuICAgICAgYXJnc1swXSA9IFByb21pc2UuY29yb3V0aW5lKGFyZ3NbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiBrbmV4LnRyYW5zYWN0aW9uLmFwcGx5KGtuZXgsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZSBsYXN0IGFyZ3VtZW50IHNob3VsZCBiZSB0aGUgY2FsbGJhY2sgYW5kIGFsbCBvdGhlciBNb2RlbCBzdWJjbGFzc2VzLlxuICAgIGxldCBjYWxsYmFjayA9IF8ubGFzdChhcmd1bWVudHMpO1xuICAgIGxldCBtb2RlbENsYXNzZXMgPSBfLnRha2UoYXJndW1lbnRzLCBhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgbGV0IGk7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbW9kZWxDbGFzc2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICBpZiAoIWlzU3ViY2xhc3NPZihtb2RlbENsYXNzZXNbaV0sIE1vZGVsKSkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdvYmplY3Rpb24udHJhbnNhY3Rpb246IGFsbCBidXQgdGhlIGxhc3QgYXJndW1lbnQgc2hvdWxkIGJlIE1vZGVsIHN1YmNsYXNzZXMnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGtuZXggPSBfLmZpcnN0KG1vZGVsQ2xhc3Nlcykua25leCgpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBtb2RlbENsYXNzZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGlmIChtb2RlbENsYXNzZXNbaV0ua25leCgpICE9PSBrbmV4KSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ29iamVjdGlvbi50cmFuc2FjdGlvbjogYWxsIE1vZGVsIHN1YmNsYXNzZXMgbXVzdCBiZSBib3VuZCB0byB0aGUgc2FtZSBkYXRhYmFzZScpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZnVuY3Rpb24gaXMgYSBnZW5lcmF0b3IsIHdyYXAgaXQgdXNpbmcgUHJvbWlzZS5jb3JvdXRpbmUuXG4gICAgaWYgKGlzR2VuZXJhdG9yKGNhbGxiYWNrKSkge1xuICAgICAgY2FsbGJhY2sgPSBQcm9taXNlLmNvcm91dGluZShjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGtuZXgudHJhbnNhY3Rpb24odHJ4ID0+IHtcbiAgICAgIGxldCBhcmdzID0gbmV3IEFycmF5KG1vZGVsQ2xhc3Nlcy5sZW5ndGggKyAxKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb2RlbENsYXNzZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgYXJnc1tpXSA9IG1vZGVsQ2xhc3Nlc1tpXS5iaW5kVHJhbnNhY3Rpb24odHJ4KTtcbiAgICAgIH1cblxuICAgICAgYXJnc1thcmdzLmxlbmd0aCAtIDFdID0gdHJ4O1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS50cnkoKCkgPT4ge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkodHJ4LCBhcmdzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtDb25zdHJ1Y3Rvci48TW9kZWw+fGtuZXh9IG1vZGVsQ2xhc3NPcktuZXhcbiAqIEByZXR1cm5zIHtQcm9taXNlfVxuICovXG50cmFuc2FjdGlvbi5zdGFydCA9IGZ1bmN0aW9uIChtb2RlbENsYXNzT3JLbmV4KSB7XG4gIGxldCBrbmV4ID0gbW9kZWxDbGFzc09yS25leDtcblxuICBpZiAoaXNTdWJjbGFzc09mKG1vZGVsQ2xhc3NPcktuZXgsIE1vZGVsKSkge1xuICAgIGtuZXggPSBtb2RlbENsYXNzT3JLbmV4LmtuZXgoKTtcbiAgfVxuXG4gIGlmICghXy5pc0Z1bmN0aW9uKGtuZXgudHJhbnNhY3Rpb24pKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignb2JqZWN0aW9uLnRyYW5zYWN0aW9uLnN0YXJ0OiBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgbW9kZWwgY2xhc3Mgb3IgYSBrbmV4IGluc3RhbmNlJykpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBrbmV4LnRyYW5zYWN0aW9uKHRyeCA9PiB7XG4gICAgICByZXNvbHZlKHRyeCk7XG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIGlzR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmbiAmJiBmbi5jb25zdHJ1Y3RvciAmJiBmbi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnR2VuZXJhdG9yRnVuY3Rpb24nO1xufVxuIl19
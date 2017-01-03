'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (builder) {
  // Postgres is the only db engine that returns identifiers of all inserted rows. Therefore
  // we can insert batches only with postgres.
  var batchSize = (0, _dbUtils.isPostgres)(builder.knex()) ? POSTGRES_INSERT_BATCH_SIZE : 1;

  return function (tableInsertion) {
    var inputs = [];
    var others = [];
    var queries = [];

    var insertQuery = tableInsertion.modelClass.query().childQueryOf(builder);

    for (var i = 0, l = tableInsertion.models.length; i < l; ++i) {
      var model = tableInsertion.models[i];

      // We need to validate here since at this point the models should no longer contain any special properties.
      model.$validate();

      if (tableInsertion.isInputModel[i]) {
        inputs.push(model);
      } else {
        others.push(model);
      }
    }

    batchInsert(inputs, insertQuery.clone().copyFrom(builder, /returning/), batchSize, queries);
    batchInsert(others, insertQuery.clone(), batchSize, queries);

    return _bluebird2.default.all(queries);
  };
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _dbUtils = require('../../utils/dbUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var POSTGRES_INSERT_BATCH_SIZE = 100;

/**
 * @param {QueryBuilder} builder
 * @return {function(TableInsertion)}
 */


function batchInsert(models, queryBuilder, batchSize, queries) {
  var batches = _lodash2.default.chunk(models, batchSize);

  for (var i = 0, l = batches.length; i < l; ++i) {
    queries.push(queryBuilder.clone().insert(batches[i]));
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluc2VydGVyLmpzIl0sIm5hbWVzIjpbImJ1aWxkZXIiLCJiYXRjaFNpemUiLCJrbmV4IiwiUE9TVEdSRVNfSU5TRVJUX0JBVENIX1NJWkUiLCJ0YWJsZUluc2VydGlvbiIsImlucHV0cyIsIm90aGVycyIsInF1ZXJpZXMiLCJpbnNlcnRRdWVyeSIsIm1vZGVsQ2xhc3MiLCJxdWVyeSIsImNoaWxkUXVlcnlPZiIsImkiLCJsIiwibW9kZWxzIiwibGVuZ3RoIiwibW9kZWwiLCIkdmFsaWRhdGUiLCJpc0lucHV0TW9kZWwiLCJwdXNoIiwiYmF0Y2hJbnNlcnQiLCJjbG9uZSIsImNvcHlGcm9tIiwiYWxsIiwicXVlcnlCdWlsZGVyIiwiYmF0Y2hlcyIsImNodW5rIiwiaW5zZXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBVWUsVUFBVUEsT0FBVixFQUFtQjtBQUNoQztBQUNBO0FBQ0EsTUFBTUMsWUFBWSx5QkFBV0QsUUFBUUUsSUFBUixFQUFYLElBQTZCQywwQkFBN0IsR0FBMEQsQ0FBNUU7O0FBRUEsU0FBTyxVQUFDQyxjQUFELEVBQW9CO0FBQ3pCLFFBQU1DLFNBQVMsRUFBZjtBQUNBLFFBQU1DLFNBQVMsRUFBZjtBQUNBLFFBQU1DLFVBQVUsRUFBaEI7O0FBRUEsUUFBSUMsY0FBY0osZUFBZUssVUFBZixDQUNmQyxLQURlLEdBRWZDLFlBRmUsQ0FFRlgsT0FGRSxDQUFsQjs7QUFJQSxTQUFLLElBQUlZLElBQUksQ0FBUixFQUFXQyxJQUFJVCxlQUFlVSxNQUFmLENBQXNCQyxNQUExQyxFQUFrREgsSUFBSUMsQ0FBdEQsRUFBeUQsRUFBRUQsQ0FBM0QsRUFBOEQ7QUFDNUQsVUFBTUksUUFBUVosZUFBZVUsTUFBZixDQUFzQkYsQ0FBdEIsQ0FBZDs7QUFFQTtBQUNBSSxZQUFNQyxTQUFOOztBQUVBLFVBQUliLGVBQWVjLFlBQWYsQ0FBNEJOLENBQTVCLENBQUosRUFBb0M7QUFDbENQLGVBQU9jLElBQVAsQ0FBWUgsS0FBWjtBQUNELE9BRkQsTUFFTztBQUNMVixlQUFPYSxJQUFQLENBQVlILEtBQVo7QUFDRDtBQUNGOztBQUVESSxnQkFBWWYsTUFBWixFQUFvQkcsWUFBWWEsS0FBWixHQUFvQkMsUUFBcEIsQ0FBNkJ0QixPQUE3QixFQUFzQyxXQUF0QyxDQUFwQixFQUF3RUMsU0FBeEUsRUFBbUZNLE9BQW5GO0FBQ0FhLGdCQUFZZCxNQUFaLEVBQW9CRSxZQUFZYSxLQUFaLEVBQXBCLEVBQXlDcEIsU0FBekMsRUFBb0RNLE9BQXBEOztBQUVBLFdBQU8sbUJBQVFnQixHQUFSLENBQVloQixPQUFaLENBQVA7QUFDRCxHQTFCRDtBQTJCRCxDOztBQTFDRDs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQSxJQUFNSiw2QkFBNkIsR0FBbkM7O0FBRUE7Ozs7OztBQXNDQSxTQUFTaUIsV0FBVCxDQUFxQk4sTUFBckIsRUFBNkJVLFlBQTdCLEVBQTJDdkIsU0FBM0MsRUFBc0RNLE9BQXRELEVBQStEO0FBQzdELE1BQU1rQixVQUFVLGlCQUFFQyxLQUFGLENBQVFaLE1BQVIsRUFBZ0JiLFNBQWhCLENBQWhCOztBQUVBLE9BQUssSUFBSVcsSUFBSSxDQUFSLEVBQVdDLElBQUlZLFFBQVFWLE1BQTVCLEVBQW9DSCxJQUFJQyxDQUF4QyxFQUEyQyxFQUFFRCxDQUE3QyxFQUFnRDtBQUM5Q0wsWUFBUVksSUFBUixDQUFhSyxhQUFhSCxLQUFiLEdBQXFCTSxNQUFyQixDQUE0QkYsUUFBUWIsQ0FBUixDQUE1QixDQUFiO0FBQ0Q7QUFDRiIsImZpbGUiOiJpbnNlcnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQge2lzUG9zdGdyZXN9IGZyb20gJy4uLy4uL3V0aWxzL2RiVXRpbHMnO1xuXG5jb25zdCBQT1NUR1JFU19JTlNFUlRfQkFUQ0hfU0laRSA9IDEwMDtcblxuLyoqXG4gKiBAcGFyYW0ge1F1ZXJ5QnVpbGRlcn0gYnVpbGRlclxuICogQHJldHVybiB7ZnVuY3Rpb24oVGFibGVJbnNlcnRpb24pfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYnVpbGRlcikge1xuICAvLyBQb3N0Z3JlcyBpcyB0aGUgb25seSBkYiBlbmdpbmUgdGhhdCByZXR1cm5zIGlkZW50aWZpZXJzIG9mIGFsbCBpbnNlcnRlZCByb3dzLiBUaGVyZWZvcmVcbiAgLy8gd2UgY2FuIGluc2VydCBiYXRjaGVzIG9ubHkgd2l0aCBwb3N0Z3Jlcy5cbiAgY29uc3QgYmF0Y2hTaXplID0gaXNQb3N0Z3JlcyhidWlsZGVyLmtuZXgoKSkgPyBQT1NUR1JFU19JTlNFUlRfQkFUQ0hfU0laRSA6IDE7XG5cbiAgcmV0dXJuICh0YWJsZUluc2VydGlvbikgPT4ge1xuICAgIGNvbnN0IGlucHV0cyA9IFtdO1xuICAgIGNvbnN0IG90aGVycyA9IFtdO1xuICAgIGNvbnN0IHF1ZXJpZXMgPSBbXTtcblxuICAgIGxldCBpbnNlcnRRdWVyeSA9IHRhYmxlSW5zZXJ0aW9uLm1vZGVsQ2xhc3NcbiAgICAgIC5xdWVyeSgpXG4gICAgICAuY2hpbGRRdWVyeU9mKGJ1aWxkZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSB0YWJsZUluc2VydGlvbi5tb2RlbHMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBtb2RlbCA9IHRhYmxlSW5zZXJ0aW9uLm1vZGVsc1tpXTtcblxuICAgICAgLy8gV2UgbmVlZCB0byB2YWxpZGF0ZSBoZXJlIHNpbmNlIGF0IHRoaXMgcG9pbnQgdGhlIG1vZGVscyBzaG91bGQgbm8gbG9uZ2VyIGNvbnRhaW4gYW55IHNwZWNpYWwgcHJvcGVydGllcy5cbiAgICAgIG1vZGVsLiR2YWxpZGF0ZSgpO1xuXG4gICAgICBpZiAodGFibGVJbnNlcnRpb24uaXNJbnB1dE1vZGVsW2ldKSB7XG4gICAgICAgIGlucHV0cy5wdXNoKG1vZGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG90aGVycy5wdXNoKG1vZGVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBiYXRjaEluc2VydChpbnB1dHMsIGluc2VydFF1ZXJ5LmNsb25lKCkuY29weUZyb20oYnVpbGRlciwgL3JldHVybmluZy8pLCBiYXRjaFNpemUsIHF1ZXJpZXMpO1xuICAgIGJhdGNoSW5zZXJ0KG90aGVycywgaW5zZXJ0UXVlcnkuY2xvbmUoKSwgYmF0Y2hTaXplLCBxdWVyaWVzKTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChxdWVyaWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYmF0Y2hJbnNlcnQobW9kZWxzLCBxdWVyeUJ1aWxkZXIsIGJhdGNoU2l6ZSwgcXVlcmllcykge1xuICBjb25zdCBiYXRjaGVzID0gXy5jaHVuayhtb2RlbHMsIGJhdGNoU2l6ZSk7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBiYXRjaGVzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIHF1ZXJpZXMucHVzaChxdWVyeUJ1aWxkZXIuY2xvbmUoKS5pbnNlcnQoYmF0Y2hlc1tpXSkpO1xuICB9XG59XG5cbiJdfQ==
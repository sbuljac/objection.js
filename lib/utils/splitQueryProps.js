'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = function (ModelClass, obj) {
  if (QueryBuilderBase === null) {
    // Lazy loading to prevent circular deps.
    QueryBuilderBase = require('../queryBuilder/QueryBuilderBase').default;
  }

  var keys = (0, _keys2.default)(obj);
  var needsSplit = false;

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var value = obj[key];

    if (value instanceof KnexQueryBuilder || value instanceof QueryBuilderBase || value instanceof KnexRaw) {
      needsSplit = true;
      break;
    }
  }

  if (needsSplit) {
    return split(obj);
  } else {
    return { json: obj, query: null };
  }
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KnexQueryBuilder = require('knex/lib/query/builder');
var KnexRaw = require('knex/lib/raw');
var QueryBuilderBase = null;

function split(obj) {
  var ret = { json: {}, query: {} };
  var keys = (0, _keys2.default)(obj);

  for (var i = 0, l = keys.length; i < l; ++i) {
    var key = keys[i];
    var value = obj[key];

    if (value instanceof KnexQueryBuilder || value instanceof KnexRaw) {
      ret.query[key] = value;
    } else if (value instanceof QueryBuilderBase) {
      ret.query[key] = value.build();
    } else {
      ret.json[key] = value;
    }
  }

  return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwbGl0UXVlcnlQcm9wcy5qcyJdLCJuYW1lcyI6WyJNb2RlbENsYXNzIiwib2JqIiwiUXVlcnlCdWlsZGVyQmFzZSIsInJlcXVpcmUiLCJkZWZhdWx0Iiwia2V5cyIsIm5lZWRzU3BsaXQiLCJpIiwibCIsImxlbmd0aCIsImtleSIsInZhbHVlIiwiS25leFF1ZXJ5QnVpbGRlciIsIktuZXhSYXciLCJzcGxpdCIsImpzb24iLCJxdWVyeSIsInJldCIsImJ1aWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O2tCQUllLFVBQVVBLFVBQVYsRUFBc0JDLEdBQXRCLEVBQTJCO0FBQ3hDLE1BQUlDLHFCQUFxQixJQUF6QixFQUErQjtBQUM3QjtBQUNBQSx1QkFBbUJDLFFBQVEsa0NBQVIsRUFBNENDLE9BQS9EO0FBQ0Q7O0FBRUQsTUFBTUMsT0FBTyxvQkFBWUosR0FBWixDQUFiO0FBQ0EsTUFBSUssYUFBYSxLQUFqQjs7QUFFQSxPQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxJQUFJSCxLQUFLSSxNQUF6QixFQUFpQ0YsSUFBSUMsQ0FBckMsRUFBd0MsRUFBRUQsQ0FBMUMsRUFBNkM7QUFDM0MsUUFBTUcsTUFBTUwsS0FBS0UsQ0FBTCxDQUFaO0FBQ0EsUUFBTUksUUFBUVYsSUFBSVMsR0FBSixDQUFkOztBQUVBLFFBQUlDLGlCQUFpQkMsZ0JBQWpCLElBQXFDRCxpQkFBaUJULGdCQUF0RCxJQUEwRVMsaUJBQWlCRSxPQUEvRixFQUF3RztBQUN0R1AsbUJBQWEsSUFBYjtBQUNBO0FBQ0Q7QUFDRjs7QUFFRCxNQUFJQSxVQUFKLEVBQWdCO0FBQ2QsV0FBT1EsTUFBTWIsR0FBTixDQUFQO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsV0FBTyxFQUFDYyxNQUFNZCxHQUFQLEVBQVllLE9BQU8sSUFBbkIsRUFBUDtBQUNEO0FBQ0YsQzs7OztBQTVCRCxJQUFNSixtQkFBbUJULFFBQVEsd0JBQVIsQ0FBekI7QUFDQSxJQUFNVSxVQUFVVixRQUFRLGNBQVIsQ0FBaEI7QUFDQSxJQUFJRCxtQkFBbUIsSUFBdkI7O0FBNEJBLFNBQVNZLEtBQVQsQ0FBZWIsR0FBZixFQUFvQjtBQUNsQixNQUFNZ0IsTUFBTSxFQUFDRixNQUFNLEVBQVAsRUFBV0MsT0FBTyxFQUFsQixFQUFaO0FBQ0EsTUFBTVgsT0FBTyxvQkFBWUosR0FBWixDQUFiOztBQUVBLE9BQUssSUFBSU0sSUFBSSxDQUFSLEVBQVdDLElBQUlILEtBQUtJLE1BQXpCLEVBQWlDRixJQUFJQyxDQUFyQyxFQUF3QyxFQUFFRCxDQUExQyxFQUE2QztBQUMzQyxRQUFNRyxNQUFNTCxLQUFLRSxDQUFMLENBQVo7QUFDQSxRQUFNSSxRQUFRVixJQUFJUyxHQUFKLENBQWQ7O0FBRUEsUUFBSUMsaUJBQWlCQyxnQkFBakIsSUFBcUNELGlCQUFpQkUsT0FBMUQsRUFBbUU7QUFDakVJLFVBQUlELEtBQUosQ0FBVU4sR0FBVixJQUFpQkMsS0FBakI7QUFDRCxLQUZELE1BRU8sSUFBSUEsaUJBQWlCVCxnQkFBckIsRUFBdUM7QUFDNUNlLFVBQUlELEtBQUosQ0FBVU4sR0FBVixJQUFpQkMsTUFBTU8sS0FBTixFQUFqQjtBQUNELEtBRk0sTUFFQTtBQUNMRCxVQUFJRixJQUFKLENBQVNMLEdBQVQsSUFBZ0JDLEtBQWhCO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPTSxHQUFQO0FBQ0QiLCJmaWxlIjoic3BsaXRRdWVyeVByb3BzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgS25leFF1ZXJ5QnVpbGRlciA9IHJlcXVpcmUoJ2tuZXgvbGliL3F1ZXJ5L2J1aWxkZXInKTtcbmNvbnN0IEtuZXhSYXcgPSByZXF1aXJlKCdrbmV4L2xpYi9yYXcnKTtcbmxldCBRdWVyeUJ1aWxkZXJCYXNlID0gbnVsbDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKE1vZGVsQ2xhc3MsIG9iaikge1xuICBpZiAoUXVlcnlCdWlsZGVyQmFzZSA9PT0gbnVsbCkge1xuICAgIC8vIExhenkgbG9hZGluZyB0byBwcmV2ZW50IGNpcmN1bGFyIGRlcHMuXG4gICAgUXVlcnlCdWlsZGVyQmFzZSA9IHJlcXVpcmUoJy4uL3F1ZXJ5QnVpbGRlci9RdWVyeUJ1aWxkZXJCYXNlJykuZGVmYXVsdDtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBsZXQgbmVlZHNTcGxpdCA9IGZhbHNlO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBLbmV4UXVlcnlCdWlsZGVyIHx8IHZhbHVlIGluc3RhbmNlb2YgUXVlcnlCdWlsZGVyQmFzZSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEtuZXhSYXcpIHtcbiAgICAgIG5lZWRzU3BsaXQgPSB0cnVlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG5lZWRzU3BsaXQpIHtcbiAgICByZXR1cm4gc3BsaXQob2JqKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge2pzb246IG9iaiwgcXVlcnk6IG51bGx9O1xuICB9XG59XG5cbmZ1bmN0aW9uIHNwbGl0KG9iaikge1xuICBjb25zdCByZXQgPSB7anNvbjoge30sIHF1ZXJ5OiB7fX07XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCBrZXkgPSBrZXlzW2ldO1xuICAgIGNvbnN0IHZhbHVlID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBLbmV4UXVlcnlCdWlsZGVyIHx8IHZhbHVlIGluc3RhbmNlb2YgS25leFJhdykge1xuICAgICAgcmV0LnF1ZXJ5W2tleV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgUXVlcnlCdWlsZGVyQmFzZSkge1xuICAgICAgcmV0LnF1ZXJ5W2tleV0gPSB2YWx1ZS5idWlsZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXQuanNvbltrZXldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJldDtcbn0iXX0=
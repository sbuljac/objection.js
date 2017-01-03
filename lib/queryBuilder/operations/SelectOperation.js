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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _WrappingQueryBuilderOperation = require('./WrappingQueryBuilderOperation');

var _WrappingQueryBuilderOperation2 = _interopRequireDefault(_WrappingQueryBuilderOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectOperation = function (_WrappingQueryBuilder) {
  (0, _inherits3.default)(SelectOperation, _WrappingQueryBuilder);

  function SelectOperation(name, opt) {
    (0, _classCallCheck3.default)(this, SelectOperation);

    var _this = (0, _possibleConstructorReturn3.default)(this, _WrappingQueryBuilder.call(this, name, opt));

    _this.selections = [];
    return _this;
  }

  SelectOperation.parseSelection = function parseSelection(selection) {
    if (!_lodash2.default.isString(selection)) {
      return null;
    }

    // Discard the possible alias.
    selection = selection.split(/\s+as\s+}/i)[0].trim();
    var dotIdx = selection.indexOf('.');

    if (dotIdx !== -1) {
      return {
        table: selection.substr(0, dotIdx),
        column: selection.substr(dotIdx + 1)
      };
    } else {
      return {
        table: null,
        column: selection
      };
    }
  };

  SelectOperation.prototype.call = function call(builder, args) {
    var ret = _WrappingQueryBuilder.prototype.call.call(this, builder, args);
    var selections = _lodash2.default.flatten(this.args);

    for (var i = 0, l = selections.length; i < l; ++i) {
      var selection = SelectOperation.parseSelection(selections[i]);

      if (selection) {
        this.selections.push(selection);
      }
    }

    return ret;
  };

  SelectOperation.prototype.onBuild = function onBuild(builder) {
    builder.select.apply(builder, this.args);
  };

  SelectOperation.prototype.hasSelection = function hasSelection(fromTable, selection) {
    var select1 = SelectOperation.parseSelection(selection);

    if (!select1) {
      return false;
    }

    for (var i = 0, l = this.selections.length; i < l; ++i) {
      var select2 = this.selections[i];

      var match = select1.table === select2.table && select1.column === select2.column || select1.table === select2.table && select2.column === '*' || select1.table === null && select2.table === fromTable && select1.column === select2.column || select2.table === null && select1.table === fromTable && select1.column === select2.column;

      if (match) {
        return true;
      }
    }

    return false;
  };

  return SelectOperation;
}(_WrappingQueryBuilderOperation2.default);

exports.default = SelectOperation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGVjdE9wZXJhdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWxlY3RPcGVyYXRpb24iLCJuYW1lIiwib3B0Iiwic2VsZWN0aW9ucyIsInBhcnNlU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiaXNTdHJpbmciLCJzcGxpdCIsInRyaW0iLCJkb3RJZHgiLCJpbmRleE9mIiwidGFibGUiLCJzdWJzdHIiLCJjb2x1bW4iLCJjYWxsIiwiYnVpbGRlciIsImFyZ3MiLCJyZXQiLCJmbGF0dGVuIiwiaSIsImwiLCJsZW5ndGgiLCJwdXNoIiwib25CdWlsZCIsInNlbGVjdCIsImFwcGx5IiwiaGFzU2VsZWN0aW9uIiwiZnJvbVRhYmxlIiwic2VsZWN0MSIsInNlbGVjdDIiLCJtYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsZTs7O0FBRW5CLDJCQUFZQyxJQUFaLEVBQWtCQyxHQUFsQixFQUF1QjtBQUFBOztBQUFBLCtEQUNyQixpQ0FBTUQsSUFBTixFQUFZQyxHQUFaLENBRHFCOztBQUVyQixVQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBRnFCO0FBR3RCOztrQkFFTUMsYywyQkFBZUMsUyxFQUFXO0FBQy9CLFFBQUksQ0FBQyxpQkFBRUMsUUFBRixDQUFXRCxTQUFYLENBQUwsRUFBNEI7QUFDMUIsYUFBTyxJQUFQO0FBQ0Q7O0FBRUQ7QUFDQUEsZ0JBQVlBLFVBQVVFLEtBQVYsQ0FBZ0IsWUFBaEIsRUFBOEIsQ0FBOUIsRUFBaUNDLElBQWpDLEVBQVo7QUFDQSxRQUFNQyxTQUFTSixVQUFVSyxPQUFWLENBQWtCLEdBQWxCLENBQWY7O0FBRUEsUUFBSUQsV0FBVyxDQUFDLENBQWhCLEVBQW1CO0FBQ2pCLGFBQU87QUFDTEUsZUFBT04sVUFBVU8sTUFBVixDQUFpQixDQUFqQixFQUFvQkgsTUFBcEIsQ0FERjtBQUVMSSxnQkFBUVIsVUFBVU8sTUFBVixDQUFpQkgsU0FBUyxDQUExQjtBQUZILE9BQVA7QUFJRCxLQUxELE1BS087QUFDTCxhQUFPO0FBQ0xFLGVBQU8sSUFERjtBQUVMRSxnQkFBUVI7QUFGSCxPQUFQO0FBSUQ7QUFDRixHOzs0QkFFRFMsSSxpQkFBS0MsTyxFQUFTQyxJLEVBQU07QUFDbEIsUUFBTUMsTUFBTSxnQ0FBTUgsSUFBTixZQUFXQyxPQUFYLEVBQW9CQyxJQUFwQixDQUFaO0FBQ0EsUUFBTWIsYUFBYSxpQkFBRWUsT0FBRixDQUFVLEtBQUtGLElBQWYsQ0FBbkI7O0FBRUEsU0FBSyxJQUFJRyxJQUFJLENBQVIsRUFBV0MsSUFBSWpCLFdBQVdrQixNQUEvQixFQUF1Q0YsSUFBSUMsQ0FBM0MsRUFBOEMsRUFBRUQsQ0FBaEQsRUFBbUQ7QUFDakQsVUFBTWQsWUFBWUwsZ0JBQWdCSSxjQUFoQixDQUErQkQsV0FBV2dCLENBQVgsQ0FBL0IsQ0FBbEI7O0FBRUEsVUFBSWQsU0FBSixFQUFlO0FBQ2IsYUFBS0YsVUFBTCxDQUFnQm1CLElBQWhCLENBQXFCakIsU0FBckI7QUFDRDtBQUNGOztBQUVELFdBQU9ZLEdBQVA7QUFDRCxHOzs0QkFFRE0sTyxvQkFBUVIsTyxFQUFTO0FBQ2ZBLFlBQVFTLE1BQVIsQ0FBZUMsS0FBZixDQUFxQlYsT0FBckIsRUFBOEIsS0FBS0MsSUFBbkM7QUFDRCxHOzs0QkFFRFUsWSx5QkFBYUMsUyxFQUFXdEIsUyxFQUFXO0FBQ2pDLFFBQU11QixVQUFVNUIsZ0JBQWdCSSxjQUFoQixDQUErQkMsU0FBL0IsQ0FBaEI7O0FBRUEsUUFBSSxDQUFDdUIsT0FBTCxFQUFjO0FBQ1osYUFBTyxLQUFQO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJVCxJQUFJLENBQVIsRUFBV0MsSUFBSSxLQUFLakIsVUFBTCxDQUFnQmtCLE1BQXBDLEVBQTRDRixJQUFJQyxDQUFoRCxFQUFtRCxFQUFFRCxDQUFyRCxFQUF3RDtBQUN0RCxVQUFNVSxVQUFVLEtBQUsxQixVQUFMLENBQWdCZ0IsQ0FBaEIsQ0FBaEI7O0FBRUEsVUFBTVcsUUFBU0YsUUFBUWpCLEtBQVIsS0FBa0JrQixRQUFRbEIsS0FBMUIsSUFBbUNpQixRQUFRZixNQUFSLEtBQW1CZ0IsUUFBUWhCLE1BQS9ELElBQ1JlLFFBQVFqQixLQUFSLEtBQWtCa0IsUUFBUWxCLEtBQTFCLElBQW1Da0IsUUFBUWhCLE1BQVIsS0FBbUIsR0FEOUMsSUFFUmUsUUFBUWpCLEtBQVIsS0FBa0IsSUFBbEIsSUFBMEJrQixRQUFRbEIsS0FBUixLQUFrQmdCLFNBQTVDLElBQXlEQyxRQUFRZixNQUFSLEtBQW1CZ0IsUUFBUWhCLE1BRjVFLElBR1JnQixRQUFRbEIsS0FBUixLQUFrQixJQUFsQixJQUEwQmlCLFFBQVFqQixLQUFSLEtBQWtCZ0IsU0FBNUMsSUFBeURDLFFBQVFmLE1BQVIsS0FBbUJnQixRQUFRaEIsTUFIMUY7O0FBS0EsVUFBSWlCLEtBQUosRUFBVztBQUNULGVBQU8sSUFBUDtBQUNEO0FBQ0Y7O0FBRUQsV0FBTyxLQUFQO0FBQ0QsRzs7Ozs7a0JBckVrQjlCLGUiLCJmaWxlIjoiU2VsZWN0T3BlcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBXcmFwcGluZ1F1ZXJ5QnVpbGRlck9wZXJhdGlvbiBmcm9tICcuL1dyYXBwaW5nUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0T3BlcmF0aW9uIGV4dGVuZHMgV3JhcHBpbmdRdWVyeUJ1aWxkZXJPcGVyYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKG5hbWUsIG9wdCkge1xuICAgIHN1cGVyKG5hbWUsIG9wdCk7XG4gICAgdGhpcy5zZWxlY3Rpb25zID0gW107XG4gIH1cblxuICBzdGF0aWMgcGFyc2VTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgaWYgKCFfLmlzU3RyaW5nKHNlbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIERpc2NhcmQgdGhlIHBvc3NpYmxlIGFsaWFzLlxuICAgIHNlbGVjdGlvbiA9IHNlbGVjdGlvbi5zcGxpdCgvXFxzK2FzXFxzK30vaSlbMF0udHJpbSgpO1xuICAgIGNvbnN0IGRvdElkeCA9IHNlbGVjdGlvbi5pbmRleE9mKCcuJyk7XG5cbiAgICBpZiAoZG90SWR4ICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFibGU6IHNlbGVjdGlvbi5zdWJzdHIoMCwgZG90SWR4KSxcbiAgICAgICAgY29sdW1uOiBzZWxlY3Rpb24uc3Vic3RyKGRvdElkeCArIDEpXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YWJsZTogbnVsbCxcbiAgICAgICAgY29sdW1uOiBzZWxlY3Rpb25cbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY2FsbChidWlsZGVyLCBhcmdzKSB7XG4gICAgY29uc3QgcmV0ID0gc3VwZXIuY2FsbChidWlsZGVyLCBhcmdzKTtcbiAgICBjb25zdCBzZWxlY3Rpb25zID0gXy5mbGF0dGVuKHRoaXMuYXJncyk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHNlbGVjdGlvbnMubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSBTZWxlY3RPcGVyYXRpb24ucGFyc2VTZWxlY3Rpb24oc2VsZWN0aW9uc1tpXSk7XG5cbiAgICAgIGlmIChzZWxlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zLnB1c2goc2VsZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmV0O1xuICB9XG5cbiAgb25CdWlsZChidWlsZGVyKSB7XG4gICAgYnVpbGRlci5zZWxlY3QuYXBwbHkoYnVpbGRlciwgdGhpcy5hcmdzKTtcbiAgfVxuXG4gIGhhc1NlbGVjdGlvbihmcm9tVGFibGUsIHNlbGVjdGlvbikge1xuICAgIGNvbnN0IHNlbGVjdDEgPSBTZWxlY3RPcGVyYXRpb24ucGFyc2VTZWxlY3Rpb24oc2VsZWN0aW9uKTtcblxuICAgIGlmICghc2VsZWN0MSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdGhpcy5zZWxlY3Rpb25zLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgY29uc3Qgc2VsZWN0MiA9IHRoaXMuc2VsZWN0aW9uc1tpXTtcblxuICAgICAgY29uc3QgbWF0Y2ggPSAoc2VsZWN0MS50YWJsZSA9PT0gc2VsZWN0Mi50YWJsZSAmJiBzZWxlY3QxLmNvbHVtbiA9PT0gc2VsZWN0Mi5jb2x1bW4pXG4gICAgICAgIHx8IChzZWxlY3QxLnRhYmxlID09PSBzZWxlY3QyLnRhYmxlICYmIHNlbGVjdDIuY29sdW1uID09PSAnKicpXG4gICAgICAgIHx8IChzZWxlY3QxLnRhYmxlID09PSBudWxsICYmIHNlbGVjdDIudGFibGUgPT09IGZyb21UYWJsZSAmJiBzZWxlY3QxLmNvbHVtbiA9PT0gc2VsZWN0Mi5jb2x1bW4pXG4gICAgICAgIHx8IChzZWxlY3QyLnRhYmxlID09PSBudWxsICYmIHNlbGVjdDEudGFibGUgPT09IGZyb21UYWJsZSAmJiBzZWxlY3QxLmNvbHVtbiA9PT0gc2VsZWN0Mi5jb2x1bW4pO1xuXG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59Il19
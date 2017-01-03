'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _clone2 = require('lodash/clone');

var _clone3 = _interopRequireDefault(_clone2);

var _Model = require('../../model/Model');

var _Model2 = _interopRequireDefault(_Model);

var _QueryBuilderOperation = require('./QueryBuilderOperation');

var _QueryBuilderOperation2 = _interopRequireDefault(_QueryBuilderOperation);

var _promiseUtils = require('../../utils/promiseUtils');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FindOperation = function (_QueryBuilderOperatio) {
  (0, _inherits3.default)(FindOperation, _QueryBuilderOperatio);

  function FindOperation() {
    (0, _classCallCheck3.default)(this, FindOperation);
    return (0, _possibleConstructorReturn3.default)(this, _QueryBuilderOperatio.apply(this, arguments));
  }

  FindOperation.prototype.clone = function clone(props) {
    props = props || {};
    return new this.constructor(this.name, props.opt || (0, _clone3.default)(this.opt));
  };

  FindOperation.prototype.onAfter = function onAfter(builder, results) {
    if (this.opt.dontCallAfterGet) {
      return results;
    } else {
      return callAfterGet(builder.context(), results, !!this.opt.callAfterGetDeeply);
    }
  };

  return FindOperation;
}(_QueryBuilderOperation2.default);

exports.default = FindOperation;


function callAfterGet(ctx, results, deep) {
  if (Array.isArray(results)) {
    if (results.length === 1) {
      return callAfterGetForOne(ctx, results[0], results, deep);
    } else {
      return callAfterGetArray(ctx, results, deep);
    }
  } else {
    return callAfterGetForOne(ctx, results, results, deep);
  }
}

function callAfterGetArray(ctx, results, deep) {
  if (results.length === 0 || (0, _typeof3.default)(results[0]) !== 'object') {
    return results;
  }

  var mapped = new Array(results.length);
  var containsPromise = false;

  for (var i = 0, l = results.length; i < l; ++i) {
    mapped[i] = callAfterGetForOne(ctx, results[i], results[i], deep);

    if ((0, _promiseUtils.isPromise)(mapped[i])) {
      containsPromise = true;
    }
  }

  if (containsPromise) {
    return _bluebird2.default.all(mapped);
  } else {
    return mapped;
  }
}

function callAfterGetForOne(ctx, model, result, deep) {
  if (!(model instanceof _Model2.default)) {
    return result;
  }

  if (deep) {
    var results = [];
    var containsPromise = callAfterGetForRelations(ctx, model, results);

    if (containsPromise) {
      return _bluebird2.default.all(results).then(function () {
        return doCallAfterGet(ctx, model, result);
      });
    } else {
      return doCallAfterGet(ctx, model, result);
    }
  } else {
    return doCallAfterGet(ctx, model, result);
  }
}

function callAfterGetForRelations(ctx, model, results) {
  var relations = model.constructor.getRelations();
  var relNames = (0, _keys2.default)(relations);

  var containsPromise = false;

  for (var i = 0, l = relNames.length; i < l; ++i) {
    var relName = relNames[i];

    if (model[relName]) {
      var maybePromise = callAfterGet(ctx, model[relName], true);

      if ((0, _promiseUtils.isPromise)(maybePromise)) {
        containsPromise = true;
      }

      results.push(maybePromise);
    }
  }

  return containsPromise;
}

function doCallAfterGet(ctx, model, result) {
  if (model.$afterGet !== _Model2.default.prototype.$afterGet) {
    var maybePromise = model.$afterGet(ctx);

    if (maybePromise instanceof _bluebird2.default) {
      return maybePromise.return(result);
    } else if ((0, _promiseUtils.isPromise)(maybePromise)) {
      return maybePromise.then(function () {
        return result;
      });
    } else {
      return result;
    }
  } else {
    return result;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbmRPcGVyYXRpb24uanMiXSwibmFtZXMiOlsiRmluZE9wZXJhdGlvbiIsImNsb25lIiwicHJvcHMiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJvcHQiLCJvbkFmdGVyIiwiYnVpbGRlciIsInJlc3VsdHMiLCJkb250Q2FsbEFmdGVyR2V0IiwiY2FsbEFmdGVyR2V0IiwiY29udGV4dCIsImNhbGxBZnRlckdldERlZXBseSIsImN0eCIsImRlZXAiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJjYWxsQWZ0ZXJHZXRGb3JPbmUiLCJjYWxsQWZ0ZXJHZXRBcnJheSIsIm1hcHBlZCIsImNvbnRhaW5zUHJvbWlzZSIsImkiLCJsIiwiYWxsIiwibW9kZWwiLCJyZXN1bHQiLCJjYWxsQWZ0ZXJHZXRGb3JSZWxhdGlvbnMiLCJ0aGVuIiwiZG9DYWxsQWZ0ZXJHZXQiLCJyZWxhdGlvbnMiLCJnZXRSZWxhdGlvbnMiLCJyZWxOYW1lcyIsInJlbE5hbWUiLCJtYXliZVByb21pc2UiLCJwdXNoIiwiJGFmdGVyR2V0IiwicHJvdG90eXBlIiwicmV0dXJuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7O0lBRXFCQSxhOzs7Ozs7OzswQkFFbkJDLEssa0JBQU1DLEssRUFBTztBQUNYQSxZQUFRQSxTQUFTLEVBQWpCO0FBQ0EsV0FBTyxJQUFJLEtBQUtDLFdBQVQsQ0FBcUIsS0FBS0MsSUFBMUIsRUFBZ0NGLE1BQU1HLEdBQU4sSUFBYSxxQkFBTSxLQUFLQSxHQUFYLENBQTdDLENBQVA7QUFDRCxHOzswQkFFREMsTyxvQkFBUUMsTyxFQUFTQyxPLEVBQVM7QUFDeEIsUUFBSSxLQUFLSCxHQUFMLENBQVNJLGdCQUFiLEVBQStCO0FBQzdCLGFBQU9ELE9BQVA7QUFDRCxLQUZELE1BRU87QUFDTCxhQUFPRSxhQUFhSCxRQUFRSSxPQUFSLEVBQWIsRUFBZ0NILE9BQWhDLEVBQXlD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S0FBdEI7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSVMsU0FBU2YsTUFBN0IsRUFBcUNLLElBQUlDLENBQXpDLEVBQTRDLEVBQUVELENBQTlDLEVBQWlEO0FBQy9DLFFBQU1XLFVBQVVELFNBQVNWLENBQVQsQ0FBaEI7O0FBRUEsUUFBSUcsTUFBTVEsT0FBTixDQUFKLEVBQW9CO0FBQ2xCLFVBQU1DLGVBQWV4QixhQUFhRyxHQUFiLEVBQWtCWSxNQUFNUSxPQUFOLENBQWxCLEVBQWtDLElBQWxDLENBQXJCOztBQUVBLFVBQUksNkJBQVVDLFlBQVYsQ0FBSixFQUE2QjtBQUMzQmIsMEJBQWtCLElBQWxCO0FBQ0Q7O0FBRURiLGNBQVEyQixJQUFSLENBQWFELFlBQWI7QUFDRDtBQUNGOztBQUVELFNBQU9iLGVBQVA7QUFDRDs7QUFFRCxTQUFTUSxjQUFULENBQXdCaEIsR0FBeEIsRUFBNkJZLEtBQTdCLEVBQW9DQyxNQUFwQyxFQUE0QztBQUMxQyxNQUFJRCxNQUFNVyxTQUFOLEtBQW9CLGdCQUFNQyxTQUFOLENBQWdCRCxTQUF4QyxFQUFtRDtBQUNqRCxRQUFNRixlQUFlVCxNQUFNVyxTQUFOLENBQWdCdkIsR0FBaEIsQ0FBckI7O0FBRUEsUUFBSXFCLDBDQUFKLEVBQXFDO0FBQ25DLGFBQU9BLGFBQWFJLE1BQWIsQ0FBb0JaLE1BQXBCLENBQVA7QUFDRCxLQUZELE1BRU8sSUFBSSw2QkFBVVEsWUFBVixDQUFKLEVBQTZCO0FBQ2xDLGFBQU9BLGFBQWFOLElBQWIsQ0FBa0I7QUFBQSxlQUFNRixNQUFOO0FBQUEsT0FBbEIsQ0FBUDtBQUNELEtBRk0sTUFFQTtBQUNMLGFBQU9BLE1BQVA7QUFDRDtBQUNGLEdBVkQsTUFVTztBQUNMLFdBQU9BLE1BQVA7QUFDRDtBQUNGIiwiZmlsZSI6IkZpbmRPcGVyYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2xvbmUgZnJvbSAnbG9kYXNoL2Nsb25lJztcbmltcG9ydCBNb2RlbCBmcm9tICcuLi8uLi9tb2RlbC9Nb2RlbCc7XG5pbXBvcnQgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIGZyb20gJy4vUXVlcnlCdWlsZGVyT3BlcmF0aW9uJztcbmltcG9ydCB7aXNQcm9taXNlfSBmcm9tICcuLi8uLi91dGlscy9wcm9taXNlVXRpbHMnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaW5kT3BlcmF0aW9uIGV4dGVuZHMgUXVlcnlCdWlsZGVyT3BlcmF0aW9uIHtcblxuICBjbG9uZShwcm9wcykge1xuICAgIHByb3BzID0gcHJvcHMgfHwge307XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMubmFtZSwgcHJvcHMub3B0IHx8IGNsb25lKHRoaXMub3B0KSk7XG4gIH1cblxuICBvbkFmdGVyKGJ1aWxkZXIsIHJlc3VsdHMpIHtcbiAgICBpZiAodGhpcy5vcHQuZG9udENhbGxBZnRlckdldCkge1xuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjYWxsQWZ0ZXJHZXQoYnVpbGRlci5jb250ZXh0KCksIHJlc3VsdHMsICEhdGhpcy5vcHQuY2FsbEFmdGVyR2V0RGVlcGx5KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEFmdGVyR2V0KGN0eCwgcmVzdWx0cywgZGVlcCkge1xuICBpZiAoQXJyYXkuaXNBcnJheShyZXN1bHRzKSkge1xuICAgIGlmIChyZXN1bHRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIGNhbGxBZnRlckdldEZvck9uZShjdHgsIHJlc3VsdHNbMF0sIHJlc3VsdHMsIGRlZXApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY2FsbEFmdGVyR2V0QXJyYXkoY3R4LCByZXN1bHRzLCBkZWVwKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNhbGxBZnRlckdldEZvck9uZShjdHgsIHJlc3VsdHMsIHJlc3VsdHMsIGRlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxBZnRlckdldEFycmF5KGN0eCwgcmVzdWx0cywgZGVlcCkge1xuICBpZiAocmVzdWx0cy5sZW5ndGggPT09IDAgfHwgdHlwZW9mIHJlc3VsdHNbMF0gIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBjb25zdCBtYXBwZWQgPSBuZXcgQXJyYXkocmVzdWx0cy5sZW5ndGgpO1xuICBsZXQgY29udGFpbnNQcm9taXNlID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSByZXN1bHRzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIG1hcHBlZFtpXSA9IGNhbGxBZnRlckdldEZvck9uZShjdHgsIHJlc3VsdHNbaV0sIHJlc3VsdHNbaV0sIGRlZXApO1xuXG4gICAgaWYgKGlzUHJvbWlzZShtYXBwZWRbaV0pKSB7XG4gICAgICBjb250YWluc1Byb21pc2UgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb250YWluc1Byb21pc2UpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwobWFwcGVkKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFwcGVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxBZnRlckdldEZvck9uZShjdHgsIG1vZGVsLCByZXN1bHQsIGRlZXApIHtcbiAgaWYgKCEobW9kZWwgaW5zdGFuY2VvZiBNb2RlbCkpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKGRlZXApIHtcbiAgICBjb25zdCByZXN1bHRzID0gW107XG4gICAgY29uc3QgY29udGFpbnNQcm9taXNlID0gY2FsbEFmdGVyR2V0Rm9yUmVsYXRpb25zKGN0eCwgbW9kZWwsIHJlc3VsdHMpO1xuXG4gICAgaWYgKGNvbnRhaW5zUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnRoZW4oKCkgPT4ge1xuICAgICAgICByZXR1cm4gZG9DYWxsQWZ0ZXJHZXQoY3R4LCBtb2RlbCwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZG9DYWxsQWZ0ZXJHZXQoY3R4LCBtb2RlbCwgcmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRvQ2FsbEFmdGVyR2V0KGN0eCwgbW9kZWwsIHJlc3VsdCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsbEFmdGVyR2V0Rm9yUmVsYXRpb25zKGN0eCwgbW9kZWwsIHJlc3VsdHMpIHtcbiAgY29uc3QgcmVsYXRpb25zID0gbW9kZWwuY29uc3RydWN0b3IuZ2V0UmVsYXRpb25zKCk7XG4gIGNvbnN0IHJlbE5hbWVzID0gT2JqZWN0LmtleXMocmVsYXRpb25zKTtcblxuICBsZXQgY29udGFpbnNQcm9taXNlID0gZmFsc2U7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSByZWxOYW1lcy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBjb25zdCByZWxOYW1lID0gcmVsTmFtZXNbaV07XG5cbiAgICBpZiAobW9kZWxbcmVsTmFtZV0pIHtcbiAgICAgIGNvbnN0IG1heWJlUHJvbWlzZSA9IGNhbGxBZnRlckdldChjdHgsIG1vZGVsW3JlbE5hbWVdLCB0cnVlKTtcblxuICAgICAgaWYgKGlzUHJvbWlzZShtYXliZVByb21pc2UpKSB7XG4gICAgICAgIGNvbnRhaW5zUHJvbWlzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdHMucHVzaChtYXliZVByb21pc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb250YWluc1Byb21pc2U7XG59XG5cbmZ1bmN0aW9uIGRvQ2FsbEFmdGVyR2V0KGN0eCwgbW9kZWwsIHJlc3VsdCkge1xuICBpZiAobW9kZWwuJGFmdGVyR2V0ICE9PSBNb2RlbC5wcm90b3R5cGUuJGFmdGVyR2V0KSB7XG4gICAgY29uc3QgbWF5YmVQcm9taXNlID0gbW9kZWwuJGFmdGVyR2V0KGN0eCk7XG5cbiAgICBpZiAobWF5YmVQcm9taXNlIGluc3RhbmNlb2YgUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIG1heWJlUHJvbWlzZS5yZXR1cm4ocmVzdWx0KTtcbiAgICB9IGVsc2UgaWYgKGlzUHJvbWlzZShtYXliZVByb21pc2UpKSB7XG4gICAgICByZXR1cm4gbWF5YmVQcm9taXNlLnRoZW4oKCkgPT4gcmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl19
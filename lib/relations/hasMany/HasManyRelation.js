'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Relation2 = require('../Relation');

var _Relation3 = _interopRequireDefault(_Relation2);

var _HasManyInsertOperation = require('./HasManyInsertOperation');

var _HasManyInsertOperation2 = _interopRequireDefault(_HasManyInsertOperation);

var _HasManyRelateOperation = require('./HasManyRelateOperation');

var _HasManyRelateOperation2 = _interopRequireDefault(_HasManyRelateOperation);

var _HasManyUnrelateOperation = require('./HasManyUnrelateOperation');

var _HasManyUnrelateOperation2 = _interopRequireDefault(_HasManyUnrelateOperation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HasManyRelation = function (_Relation) {
  (0, _inherits3.default)(HasManyRelation, _Relation);

  function HasManyRelation() {
    (0, _classCallCheck3.default)(this, HasManyRelation);
    return (0, _possibleConstructorReturn3.default)(this, _Relation.apply(this, arguments));
  }

  HasManyRelation.prototype.createRelationProp = function createRelationProp(owners, related) {
    var relatedByOwnerId = (0, _create2.default)(null);

    for (var i = 0, l = related.length; i < l; ++i) {
      var rel = related[i];
      var key = rel.$propKey(this.relatedProp);
      var arr = relatedByOwnerId[key];

      if (!arr) {
        arr = [];
        relatedByOwnerId[key] = arr;
      }

      arr.push(rel);
    }

    for (var _i = 0, _l = owners.length; _i < _l; ++_i) {
      var own = owners[_i];
      var _key = own.$propKey(this.ownerProp);

      own[this.name] = relatedByOwnerId[_key] || [];
    }
  };

  HasManyRelation.prototype.appendRelationProp = function appendRelationProp(owner, related) {
    owner[this.name] = this.mergeModels(owner[this.name], related);
  };

  HasManyRelation.prototype.insert = function insert(builder, owner) {
    return new _HasManyInsertOperation2.default('insert', {
      relation: this,
      owner: owner
    });
  };

  HasManyRelation.prototype.relate = function relate(builder, owner) {
    return new _HasManyRelateOperation2.default('relate', {
      relation: this,
      owner: owner
    });
  };

  HasManyRelation.prototype.unrelate = function unrelate(builder, owner) {
    return new _HasManyUnrelateOperation2.default('unrelate', {
      relation: this,
      owner: owner
    });
  };

  return HasManyRelation;
}(_Relation3.default);

exports.default = HasManyRelation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhhc01hbnlSZWxhdGlvbi5qcyJdLCJuYW1lcyI6WyJIYXNNYW55UmVsYXRpb24iLCJjcmVhdGVSZWxhdGlvblByb3AiLCJvd25lcnMiLCJyZWxhdGVkIiwicmVsYXRlZEJ5T3duZXJJZCIsImkiLCJsIiwibGVuZ3RoIiwicmVsIiwia2V5IiwiJHByb3BLZXkiLCJyZWxhdGVkUHJvcCIsImFyciIsInB1c2giLCJvd24iLCJvd25lclByb3AiLCJuYW1lIiwiYXBwZW5kUmVsYXRpb25Qcm9wIiwib3duZXIiLCJtZXJnZU1vZGVscyIsImluc2VydCIsImJ1aWxkZXIiLCJyZWxhdGlvbiIsInJlbGF0ZSIsInVucmVsYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLGU7Ozs7Ozs7OzRCQUVuQkMsa0IsK0JBQW1CQyxNLEVBQVFDLE8sRUFBUztBQUNsQyxRQUFJQyxtQkFBbUIsc0JBQWMsSUFBZCxDQUF2Qjs7QUFFQSxTQUFLLElBQUlDLElBQUksQ0FBUixFQUFXQyxJQUFJSCxRQUFRSSxNQUE1QixFQUFvQ0YsSUFBSUMsQ0FBeEMsRUFBMkMsRUFBRUQsQ0FBN0MsRUFBZ0Q7QUFDOUMsVUFBTUcsTUFBTUwsUUFBUUUsQ0FBUixDQUFaO0FBQ0EsVUFBTUksTUFBTUQsSUFBSUUsUUFBSixDQUFhLEtBQUtDLFdBQWxCLENBQVo7QUFDQSxVQUFJQyxNQUFNUixpQkFBaUJLLEdBQWpCLENBQVY7O0FBRUEsVUFBSSxDQUFDRyxHQUFMLEVBQVU7QUFDUkEsY0FBTSxFQUFOO0FBQ0FSLHlCQUFpQkssR0FBakIsSUFBd0JHLEdBQXhCO0FBQ0Q7O0FBRURBLFVBQUlDLElBQUosQ0FBU0wsR0FBVDtBQUNEOztBQUVELFNBQUssSUFBSUgsS0FBSSxDQUFSLEVBQVdDLEtBQUlKLE9BQU9LLE1BQTNCLEVBQW1DRixLQUFJQyxFQUF2QyxFQUEwQyxFQUFFRCxFQUE1QyxFQUErQztBQUM3QyxVQUFNUyxNQUFNWixPQUFPRyxFQUFQLENBQVo7QUFDQSxVQUFNSSxPQUFNSyxJQUFJSixRQUFKLENBQWEsS0FBS0ssU0FBbEIsQ0FBWjs7QUFFQUQsVUFBSSxLQUFLRSxJQUFULElBQWlCWixpQkFBaUJLLElBQWpCLEtBQXlCLEVBQTFDO0FBQ0Q7QUFDRixHOzs0QkFFRFEsa0IsK0JBQW1CQyxLLEVBQU9mLE8sRUFBUztBQUNqQ2UsVUFBTSxLQUFLRixJQUFYLElBQW1CLEtBQUtHLFdBQUwsQ0FBaUJELE1BQU0sS0FBS0YsSUFBWCxDQUFqQixFQUFtQ2IsT0FBbkMsQ0FBbkI7QUFDRCxHOzs0QkFFRGlCLE0sbUJBQU9DLE8sRUFBU0gsSyxFQUFPO0FBQ3JCLFdBQU8scUNBQTJCLFFBQTNCLEVBQXFDO0FBQzFDSSxnQkFBVSxJQURnQztBQUUxQ0osYUFBT0E7QUFGbUMsS0FBckMsQ0FBUDtBQUlELEc7OzRCQUVESyxNLG1CQUFPRixPLEVBQVNILEssRUFBTztBQUNyQixXQUFPLHFDQUEyQixRQUEzQixFQUFxQztBQUMxQ0ksZ0JBQVUsSUFEZ0M7QUFFMUNKLGFBQU9BO0FBRm1DLEtBQXJDLENBQVA7QUFJRCxHOzs0QkFFRE0sUSxxQkFBU0gsTyxFQUFTSCxLLEVBQU87QUFDdkIsV0FBTyx1Q0FBNkIsVUFBN0IsRUFBeUM7QUFDOUNJLGdCQUFVLElBRG9DO0FBRTlDSixhQUFPQTtBQUZ1QyxLQUF6QyxDQUFQO0FBSUQsRzs7Ozs7a0JBakRrQmxCLGUiLCJmaWxlIjoiSGFzTWFueVJlbGF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlbGF0aW9uIGZyb20gJy4uL1JlbGF0aW9uJztcblxuaW1wb3J0IEhhc01hbnlJbnNlcnRPcGVyYXRpb24gZnJvbSAnLi9IYXNNYW55SW5zZXJ0T3BlcmF0aW9uJztcbmltcG9ydCBIYXNNYW55UmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vSGFzTWFueVJlbGF0ZU9wZXJhdGlvbic7XG5pbXBvcnQgSGFzTWFueVVucmVsYXRlT3BlcmF0aW9uIGZyb20gJy4vSGFzTWFueVVucmVsYXRlT3BlcmF0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFzTWFueVJlbGF0aW9uIGV4dGVuZHMgUmVsYXRpb24ge1xuXG4gIGNyZWF0ZVJlbGF0aW9uUHJvcChvd25lcnMsIHJlbGF0ZWQpIHtcbiAgICBsZXQgcmVsYXRlZEJ5T3duZXJJZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHJlbGF0ZWQubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgICBjb25zdCByZWwgPSByZWxhdGVkW2ldO1xuICAgICAgY29uc3Qga2V5ID0gcmVsLiRwcm9wS2V5KHRoaXMucmVsYXRlZFByb3ApO1xuICAgICAgbGV0IGFyciA9IHJlbGF0ZWRCeU93bmVySWRba2V5XTtcblxuICAgICAgaWYgKCFhcnIpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIHJlbGF0ZWRCeU93bmVySWRba2V5XSA9IGFycjtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2gocmVsKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IG93bmVycy5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGNvbnN0IG93biA9IG93bmVyc1tpXTtcbiAgICAgIGNvbnN0IGtleSA9IG93bi4kcHJvcEtleSh0aGlzLm93bmVyUHJvcCk7XG5cbiAgICAgIG93blt0aGlzLm5hbWVdID0gcmVsYXRlZEJ5T3duZXJJZFtrZXldIHx8IFtdO1xuICAgIH1cbiAgfVxuXG4gIGFwcGVuZFJlbGF0aW9uUHJvcChvd25lciwgcmVsYXRlZCkge1xuICAgIG93bmVyW3RoaXMubmFtZV0gPSB0aGlzLm1lcmdlTW9kZWxzKG93bmVyW3RoaXMubmFtZV0sIHJlbGF0ZWQpO1xuICB9XG5cbiAgaW5zZXJ0KGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBIYXNNYW55SW5zZXJ0T3BlcmF0aW9uKCdpbnNlcnQnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgcmVsYXRlKGJ1aWxkZXIsIG93bmVyKSB7XG4gICAgcmV0dXJuIG5ldyBIYXNNYW55UmVsYXRlT3BlcmF0aW9uKCdyZWxhdGUnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG5cbiAgdW5yZWxhdGUoYnVpbGRlciwgb3duZXIpIHtcbiAgICByZXR1cm4gbmV3IEhhc01hbnlVbnJlbGF0ZU9wZXJhdGlvbigndW5yZWxhdGUnLCB7XG4gICAgICByZWxhdGlvbjogdGhpcyxcbiAgICAgIG93bmVyOiBvd25lclxuICAgIH0pO1xuICB9XG59XG5cbiJdfQ==
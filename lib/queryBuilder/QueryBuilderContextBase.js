"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueryBuilderContextBase = function () {
  function QueryBuilderContextBase(userContext) {
    (0, _classCallCheck3.default)(this, QueryBuilderContextBase);

    this.userContext = userContext;
    this.skipUndefined = false;
    this.knex = null;
  }

  QueryBuilderContextBase.prototype.clone = function clone() {
    var ctx = new this.constructor();

    ctx.userContext = this.userContext;
    ctx.skipUndefined = this.skipUndefined;
    ctx.knex = this.knex;

    return ctx;
  };

  return QueryBuilderContextBase;
}();

exports.default = QueryBuilderContextBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1ZXJ5QnVpbGRlckNvbnRleHRCYXNlLmpzIl0sIm5hbWVzIjpbIlF1ZXJ5QnVpbGRlckNvbnRleHRCYXNlIiwidXNlckNvbnRleHQiLCJza2lwVW5kZWZpbmVkIiwia25leCIsImNsb25lIiwiY3R4IiwiY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLHVCO0FBRW5CLG1DQUFZQyxXQUFaLEVBQXlCO0FBQUE7O0FBQ3ZCLFNBQUtBLFdBQUwsR0FBbUJBLFdBQW5CO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFyQjtBQUNBLFNBQUtDLElBQUwsR0FBWSxJQUFaO0FBQ0Q7O29DQUVEQyxLLG9CQUFRO0FBQ04sUUFBTUMsTUFBTSxJQUFJLEtBQUtDLFdBQVQsRUFBWjs7QUFFQUQsUUFBSUosV0FBSixHQUFrQixLQUFLQSxXQUF2QjtBQUNBSSxRQUFJSCxhQUFKLEdBQW9CLEtBQUtBLGFBQXpCO0FBQ0FHLFFBQUlGLElBQUosR0FBVyxLQUFLQSxJQUFoQjs7QUFFQSxXQUFPRSxHQUFQO0FBQ0QsRzs7Ozs7a0JBaEJrQkwsdUIiLCJmaWxlIjoiUXVlcnlCdWlsZGVyQ29udGV4dEJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBRdWVyeUJ1aWxkZXJDb250ZXh0QmFzZSB7XG5cbiAgY29uc3RydWN0b3IodXNlckNvbnRleHQpIHtcbiAgICB0aGlzLnVzZXJDb250ZXh0ID0gdXNlckNvbnRleHQ7XG4gICAgdGhpcy5za2lwVW5kZWZpbmVkID0gZmFsc2U7XG4gICAgdGhpcy5rbmV4ID0gbnVsbDtcbiAgfVxuXG4gIGNsb25lKCkge1xuICAgIGNvbnN0IGN0eCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKCk7XG5cbiAgICBjdHgudXNlckNvbnRleHQgPSB0aGlzLnVzZXJDb250ZXh0O1xuICAgIGN0eC5za2lwVW5kZWZpbmVkID0gdGhpcy5za2lwVW5kZWZpbmVkO1xuICAgIGN0eC5rbmV4ID0gdGhpcy5rbmV4O1xuXG4gICAgcmV0dXJuIGN0eDtcbiAgfVxufSJdfQ==
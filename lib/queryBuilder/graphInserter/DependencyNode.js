"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DependencyNode = function DependencyNode(model, modelClass) {
  (0, _classCallCheck3.default)(this, DependencyNode);

  this.id = model[model.constructor.uidProp];

  /**
   * @type {Model}
   */
  this.model = model;

  /**
   * @type {Constructor.<Model>}
   */
  this.modelClass = modelClass;

  /**
   * @type {Array.<Dependency>}
   */
  this.needs = [];

  /**
   * @type {Array.<Dependency>}
   */
  this.isNeededBy = [];

  /**
   * @type {Array.<ManyToManyConnection>}
   */
  this.manyToManyConnections = [];

  this.numHandledNeeds = 0;
  this.handled = false;
  this.visited = false;
  this.recursion = false;
};

exports.default = DependencyNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlcGVuZGVuY3lOb2RlLmpzIl0sIm5hbWVzIjpbIkRlcGVuZGVuY3lOb2RlIiwibW9kZWwiLCJtb2RlbENsYXNzIiwiaWQiLCJjb25zdHJ1Y3RvciIsInVpZFByb3AiLCJuZWVkcyIsImlzTmVlZGVkQnkiLCJtYW55VG9NYW55Q29ubmVjdGlvbnMiLCJudW1IYW5kbGVkTmVlZHMiLCJoYW5kbGVkIiwidmlzaXRlZCIsInJlY3Vyc2lvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztJQUFxQkEsYyxHQUVuQix3QkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0I7QUFBQTs7QUFDN0IsT0FBS0MsRUFBTCxHQUFVRixNQUFNQSxNQUFNRyxXQUFOLENBQWtCQyxPQUF4QixDQUFWOztBQUVBOzs7QUFHQSxPQUFLSixLQUFMLEdBQWFBLEtBQWI7O0FBRUE7OztBQUdBLE9BQUtDLFVBQUwsR0FBa0JBLFVBQWxCOztBQUVBOzs7QUFHQSxPQUFLSSxLQUFMLEdBQWEsRUFBYjs7QUFFQTs7O0FBR0EsT0FBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQTs7O0FBR0EsT0FBS0MscUJBQUwsR0FBNkIsRUFBN0I7O0FBRUEsT0FBS0MsZUFBTCxHQUF1QixDQUF2QjtBQUNBLE9BQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxPQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0QsQzs7a0JBbENrQlosYyIsImZpbGUiOiJEZXBlbmRlbmN5Tm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIERlcGVuZGVuY3lOb2RlIHtcblxuICBjb25zdHJ1Y3Rvcihtb2RlbCwgbW9kZWxDbGFzcykge1xuICAgIHRoaXMuaWQgPSBtb2RlbFttb2RlbC5jb25zdHJ1Y3Rvci51aWRQcm9wXTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtNb2RlbH1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q29uc3RydWN0b3IuPE1vZGVsPn1cbiAgICAgKi9cbiAgICB0aGlzLm1vZGVsQ2xhc3MgPSBtb2RlbENsYXNzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxEZXBlbmRlbmN5Pn1cbiAgICAgKi9cbiAgICB0aGlzLm5lZWRzID0gW107XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPERlcGVuZGVuY3k+fVxuICAgICAqL1xuICAgIHRoaXMuaXNOZWVkZWRCeSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxNYW55VG9NYW55Q29ubmVjdGlvbj59XG4gICAgICovXG4gICAgdGhpcy5tYW55VG9NYW55Q29ubmVjdGlvbnMgPSBbXTtcblxuICAgIHRoaXMubnVtSGFuZGxlZE5lZWRzID0gMDtcbiAgICB0aGlzLmhhbmRsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlY3Vyc2lvbiA9IGZhbHNlO1xuICB9XG5cbn0iXX0=
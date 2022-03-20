"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

require("../../../TwilioVideoProvider.css");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoomHeading = props => {
  const {
    room
  } = (0, _useVideoContext.default)();
  const title = room.name || '';
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "headingContainer",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
      className: "roomTitle",
      children: title
    })
  });
};

RoomHeading.propTypes = {};
var _default = RoomHeading;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

require("../../../TwilioVideoProvider.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RoomHeading = props => {
  const {
    room
  } = (0, _useVideoContext.default)();
  const title = room.name || '';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "headingContainer"
  }, /*#__PURE__*/_react.default.createElement("strong", {
    className: "roomTitle"
  }, title));
};

RoomHeading.propTypes = {};
var _default = RoomHeading;
exports.default = _default;
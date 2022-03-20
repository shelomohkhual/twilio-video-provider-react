"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToggleAudioButton;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _useLocalAudioToggle = _interopRequireDefault(require("../../hooks/useLocalAudioToggle"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import micIcon from '../../../../assets/twillio/micIcon.svg'
// import micMuteIcon from '../../../../assets/twillio/micMuteIcon.svg';
function ToggleAudioButton(_ref) {
  let {
    disabled
  } = _ref;
  const [isAudioEnabled, toggleAudioEnabled] = (0, _useLocalAudioToggle.default)();
  const {
    localTracks
  } = (0, _useVideoContext.default)();
  const hasAudioTrack = localTracks.some(track => track.kind === 'audio');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "videoActionsContainer__actions-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      className: "videoActionsContainer__actions-icon",
      onClick: toggleAudioEnabled,
      disabled: !hasAudioTrack || disabled,
      children: isAudioEnabled ? /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "Mic"
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: "unmic"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "videoActionsContainer__actions-label",
      children: "Mic"
    })]
  });
}
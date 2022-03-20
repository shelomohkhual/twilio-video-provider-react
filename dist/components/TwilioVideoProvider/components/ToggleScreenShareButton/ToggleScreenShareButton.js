"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STOP_SCREEN_SHARE_TEXT = exports.SHARE_NOT_SUPPORTED_TEXT = exports.SHARE_IN_PROGRESS_TEXT = exports.SCREEN_SHARE_TEXT = void 0;
exports.default = ToggleScreenShareButton;

var _react = _interopRequireDefault(require("react"));

var _useScreenShareParticipant = _interopRequireDefault(require("../../hooks/useScreenShareParticipant"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

require("./toggleShareScreenButton.css");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import shareScreen from '../../../../assets/twillio/shareScreen.svg';
// import stopShareScreen from '../../../../assets/twillio/stopShareScreen.svg';
const SCREEN_SHARE_TEXT = 'Screen'; // export const SCREEN_SHARE_TEXT = <img src={shareScreen}></img>;

exports.SCREEN_SHARE_TEXT = SCREEN_SHARE_TEXT;
const STOP_SCREEN_SHARE_TEXT = 'Stop';
exports.STOP_SCREEN_SHARE_TEXT = STOP_SCREEN_SHARE_TEXT;
const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
exports.SHARE_IN_PROGRESS_TEXT = SHARE_IN_PROGRESS_TEXT;
const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';
exports.SHARE_NOT_SUPPORTED_TEXT = SHARE_NOT_SUPPORTED_TEXT;

function ToggleScreenShareButton(_ref) {
  let {
    hide,
    disabled,
    isSharingScreen,
    onStopSharing
  } = _ref;
  const screenShareParticipant = (0, _useScreenShareParticipant.default)();
  const {
    toggleScreenShare
  } = (0, _useVideoContext.default)();
  const disableScreenShareButton = Boolean(screenShareParticipant);
  const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
  const isDisabled = disabled || disableScreenShareButton || !isScreenShareSupported;
  let tooltipMessage = '';

  if (hide) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {});
  }

  if (disableScreenShareButton) {
    tooltipMessage = SHARE_IN_PROGRESS_TEXT;
  }

  if (!isScreenShareSupported) {
    tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
  } // isSharingScreen={ isSharingScreen} onStopSharing={toggleScreenShare} 


  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "videoActionsContainer__actions-container",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
      className: 'videoActionsContainer__actions-icon',
      onClick: () => !isSharingScreen ? toggleScreenShare() : onStopSharing(),
      children: [isSharingScreen && STOP_SCREEN_SHARE_TEXT, !isSharingScreen && SCREEN_SHARE_TEXT]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "videoActionsContainer__actions-label",
      children: "Screen Share"
    })]
  });
}
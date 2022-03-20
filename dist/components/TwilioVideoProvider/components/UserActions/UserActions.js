"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ToggleAudioButton = _interopRequireDefault(require("../ToggleAudioButton/ToggleAudioButton"));

var _ToggleScreenShareButton = _interopRequireDefault(require("../ToggleScreenShareButton/ToggleScreenShareButton"));

var _ToggleVideoButton = _interopRequireDefault(require("../ToggleVideoButton/ToggleVideoButton"));

var _useRoomState = _interopRequireDefault(require("../../hooks/useRoomState"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

require("../../../TwilioVideoProvider.css");

var _useTwilioState = require("../../hooks/useTwilioState");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserActions = props => {
  const {
    isConnecting,
    room,
    connect,
    isSharingScreen,
    toggleScreenShare
  } = (0, _useVideoContext.default)();
  const {
    accessToken
  } = (0, _useTwilioState.useTwilioState)();
  const roomState = (0, _useRoomState.default)();
  const isReconnecting = roomState === 'reconnecting';

  const handleOnJoin = () => {
    connect(accessToken);
  };

  const onEndCall = () => {
    room === null || room === void 0 ? void 0 : room.disconnect();
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "userVideoActionContainer",
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "videoActionsContainer__actions",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleAudioButton.default, {
        disabled: isReconnecting
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleVideoButton.default, {
        disabled: isReconnecting
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleScreenShareButton.default, {
        disabled: isReconnecting,
        hide: !room,
        isSharingScreen: isSharingScreen,
        onStopSharing: toggleScreenShare
      }), !room && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "videoActionsContainer__actions-container",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: 'videoActionsContainer__actions-icon',
          onClick: handleOnJoin,
          disabled: isConnecting || isReconnecting,
          children: "Room"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "videoActionsContainer__actions-label",
          children: "Join Room"
        })]
      }), room && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "videoActionsContainer__actions-container",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
          className: 'videoActionsContainer__actions-icon',
          onClick: onEndCall,
          disabled: isConnecting,
          children: "End"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          className: "videoActionsContainer__actions-label",
          children: "End Call"
        })]
      })]
    })
  });
};

UserActions.propTypes = {};
var _default = UserActions;
exports.default = _default;
;
;
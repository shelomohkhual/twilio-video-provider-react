"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wDeviceSelectionScreen;

var _react = _interopRequireDefault(require("react"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _LocalVideoPreview = _interopRequireDefault(require("./LocalVideoPreview/LocalVideoPreview"));

var _SettingsMenu = _interopRequireDefault(require("./SettingsMenu/SettingsMenu"));

var _PreJoinScreens = require("../PreJoinScreens");

var _ToggleAudioButton = _interopRequireDefault(require("../../Buttons/ToggleAudioButton/ToggleAudioButton"));

var _ToggleVideoButton = _interopRequireDefault(require("../../Buttons/ToggleVideoButton/ToggleVideoButton"));

var _state = require("../../../state");

var _useChatContext = _interopRequireDefault(require("../../../hooks/useChatContext/useChatContext"));

var _useVideoContext = _interopRequireDefault(require("../../../hooks/useVideoContext/useVideoContext"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = {};

function wDeviceSelectionScreen(_ref) {
  let {
    name,
    roomName,
    setStep
  } = _ref;
  const {
    getToken,
    isFetching
  } = (0, _state.useAppState)();
  const {
    connect: chatConnect
  } = (0, _useChatContext.default)();
  const {
    connect: videoConnect,
    isAcquiringLocalTracks,
    isConnecting
  } = (0, _useVideoContext.default)();
  const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

  const handleJoin = () => {
    getToken(name, roomName).then(_ref2 => {
      let {
        token
      } = _ref2;
      videoConnect(token);
      process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
    });
  };

  if (isFetching || isConnecting) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        direction: "column"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: "Loading..."
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          variant: "body2",
          style: {
            fontWeight: 'bold',
            fontSize: '16px'
          },
          children: "Joining Meeting"
        })
      })]
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      variant: "h5",
      className: style.gutterBottom,
      children: ["Join ", roomName]
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: {
        justifyContent: "center"
      },
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        item: true,
        md: 7,
        sm: 12,
        xs: 12,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: style.localPreviewContainer,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LocalVideoPreview.default, {
            identity: name
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: style.mobileButtonBar,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleAudioButton.default, {
              className: style.mobileButton,
              disabled: disableButtons
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleVideoButton.default, {
              className: style.mobileButton,
              disabled: disableButtons
            })]
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SettingsMenu.default, {
            mobileButtonClass: style.mobileButton
          })]
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        item: true,
        md: 5,
        sm: 12,
        xs: 12,
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          container: true,
          direction: "column",
          justifyContent: "space-between",
          style: {
            height: '100%'
          },
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
            children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
              children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleAudioButton.default, {
                className: style.deviceButton,
                disabled: disableButtons
              }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ToggleVideoButton.default, {
                className: style.deviceButton,
                disabled: disableButtons
              })]
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
            className: style.joinButtons,
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              variant: "outlined",
              color: "primary",
              onClick: () => setStep(_PreJoinScreens.Steps.roomNameStep),
              children: "Cancel"
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
              variant: "contained",
              color: "primary",
              "data-cy-join-now": true,
              onClick: handleJoin,
              disabled: disableButtons,
              children: "Join Now"
            })]
          })]
        })
      })]
    })]
  });
}
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
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        direction: "column"
      }
    }, /*#__PURE__*/_react.default.createElement("div", null, "Loading..."), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", {
      variant: "body2",
      style: {
        fontWeight: 'bold',
        fontSize: '16px'
      }
    }, "Joining Meeting")));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("h3", {
    variant: "h5",
    className: style.gutterBottom
  }, "Join ", roomName), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      justifyContent: "center"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    item: true,
    md: 7,
    sm: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: style.localPreviewContainer
  }, /*#__PURE__*/_react.default.createElement(_LocalVideoPreview.default, {
    identity: name
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: style.mobileButtonBar
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ToggleAudioButton.default, {
    className: style.mobileButton,
    disabled: disableButtons
  }), /*#__PURE__*/_react.default.createElement(_ToggleVideoButton.default, {
    className: style.mobileButton,
    disabled: disableButtons
  })), /*#__PURE__*/_react.default.createElement(_SettingsMenu.default, {
    mobileButtonClass: style.mobileButton
  }))), /*#__PURE__*/_react.default.createElement("div", {
    item: true,
    md: 5,
    sm: 12,
    xs: 12
  }, /*#__PURE__*/_react.default.createElement("div", {
    container: true,
    direction: "column",
    justifyContent: "space-between",
    style: {
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_ToggleAudioButton.default, {
    className: style.deviceButton,
    disabled: disableButtons
  }), /*#__PURE__*/_react.default.createElement(_ToggleVideoButton.default, {
    className: style.deviceButton,
    disabled: disableButtons
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: style.joinButtons
  }, /*#__PURE__*/_react.default.createElement("button", {
    variant: "outlined",
    color: "primary",
    onClick: () => setStep(_PreJoinScreens.Steps.roomNameStep)
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("button", {
    variant: "contained",
    color: "primary",
    "data-cy-join-now": true,
    onClick: handleJoin,
    disabled: disableButtons
  }, "Join Now"))))));
}
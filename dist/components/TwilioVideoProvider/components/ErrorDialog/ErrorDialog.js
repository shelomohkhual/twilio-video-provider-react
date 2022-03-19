"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This function is used to provide error messages to the user that are
// different than the error messages provided by the SDK.
function enhanceMessage() {
  let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  let code = arguments.length > 1 ? arguments[1] : undefined;

  switch (code) {
    case 20101:
      // Invalid token error
      return message + '. Please make sure you are using the correct credentials.';

    default:
      return message;
  }
}

function ErrorDialog(_ref) {
  let {
    dismissError,
    error
  } = _ref;
  const {
    message,
    code
  } = error || {};
  const enhancedMessage = enhanceMessage(message, code);

  if (!error) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      position: 'absolute',
      zIndex: '1000',
      background: 'white',
      width: ' 100%',
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("h2", null, "ERROR"), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, enhancedMessage), Boolean(code) && /*#__PURE__*/_react.default.createElement("pre", null, /*#__PURE__*/_react.default.createElement("code", null, "Error Code: ", code))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    style: {
      borderRadius: '20px',
      width: '100px',
      margin: '10px'
    },
    onClick: () => dismissError(),
    color: "primary",
    autoFocus: true
  }, "OK")));
}

var _default = ErrorDialog;
exports.default = _default;
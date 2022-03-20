"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

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
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {});
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      position: 'absolute',
      zIndex: '1000',
      background: 'white',
      width: ' 100%',
      textAlign: 'center'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h2", {
      children: "ERROR"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: enhancedMessage
      }), Boolean(code) && /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("code", {
          children: ["Error Code: ", code]
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        style: {
          borderRadius: '20px',
          width: '100px',
          margin: '10px'
        },
        onClick: () => dismissError(),
        color: "primary",
        autoFocus: true,
        children: "OK"
      })
    })]
  });
}

var _default = ErrorDialog;
exports.default = _default;
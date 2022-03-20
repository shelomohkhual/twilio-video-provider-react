"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NetworkQualityLevel;

var _react = _interopRequireDefault(require("react"));

var _useParticipantNetworkQualityLevel = _interopRequireDefault(require("../../hooks/useParticipantNetworkQualityLevel"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const style = {};
const STEP = 3;
const BARS_ARRAY = [0, 1, 2, 3, 4];

function NetworkQualityLevel(_ref) {
  let {
    participant
  } = _ref;
  const networkQualityLevel = (0, _useParticipantNetworkQualityLevel.default)(participant);
  if (networkQualityLevel === null) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: style.outerContainer,
    style: {
      width: '2em',
      height: '2em',
      padding: '0.9em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)'
    },
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: style.innerContainer,
      style: {
        display: 'flex',
        alignItems: 'flex-end',
        '& div': {
          width: '2px',
          marginRight: '1px',
          '&:not(:last-child)': {
            borderRight: 'none'
          }
        }
      },
      children: BARS_ARRAY.map(level => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          height: "".concat(STEP * (level + 1), "px"),
          background: networkQualityLevel > level ? 'white' : 'rgba(255, 255, 255, 0.2)'
        }
      }, level))
    })
  });
}
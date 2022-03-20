"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Steps = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _VideoProvider = require("./TwilioVideoProvider/contexts/VideoProvider");

var _useTwilioState = _interopRequireDefault(require("./TwilioVideoProvider/hooks/useTwilioState"));

var _ErrorDialog = _interopRequireDefault(require("./TwilioVideoProvider/components/ErrorDialog/ErrorDialog"));

var _VideoRoom = _interopRequireDefault(require("./TwilioVideoProvider/VideoRoom"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const Steps = {
  roomNameStep: 'roomNameStep',
  deviceSelectionStep: 'deviceSelectionStep'
};
exports.Steps = Steps;

const TwilioVideoProvider = props => {
  const [error, setError] = (0, _react.useState)();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_useTwilioState.default, _objectSpread(_objectSpread({}, props), {}, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_VideoProvider.VideoProvider, {
      onError: setError,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorDialog.default, {
        dismissError: () => setError(null),
        error: error
      }), !props.hideVideoRoom && /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoRoom.default, _objectSpread({}, props)), props.children && props.children]
    })
  }));
};

TwilioVideoProvider.propTypes = {
  accessToken: _propTypes.default.string
};
var _default = TwilioVideoProvider;
exports.default = _default;
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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Steps = {
  roomNameStep: 'roomNameStep',
  deviceSelectionStep: 'deviceSelectionStep'
};
exports.Steps = Steps;

const TwilioVideoProvider = props => {
  const [error, setError] = (0, _react.useState)();
  return /*#__PURE__*/_react.default.createElement(_useTwilioState.default, props, /*#__PURE__*/_react.default.createElement(_VideoProvider.VideoProvider, {
    onError: setError
  }, /*#__PURE__*/_react.default.createElement(_ErrorDialog.default, {
    dismissError: () => setError(null),
    error: error
  }), !props.hideVideoRoom && /*#__PURE__*/_react.default.createElement(_VideoRoom.default, props), props.children && props.children));
};

TwilioVideoProvider.propTypes = {
  accessToken: _propTypes.default.string
};
var _default = TwilioVideoProvider;
exports.default = _default;
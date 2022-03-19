"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ToggleVideoButton;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _useDevices = _interopRequireDefault(require("../../hooks/useDevices"));

var _useLocalVideoToggle = _interopRequireDefault(require("../../hooks/useLocalVideoToggle"));

require("./toggleVideoButton.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import videoOn from '../../../../assets/twillio/videoOn.svg'
// import videoOff from '../../../../assets/twillio/videoOff.svg'
function ToggleVideoButton(_ref) {
  let {
    disabled
  } = _ref;
  const [isVideoEnabled, toggleVideoEnabled] = (0, _useLocalVideoToggle.default)();
  const lastClickTimeRef = (0, _react.useRef)(0);
  const {
    hasVideoInputDevices
  } = (0, _useDevices.default)();
  const toggleVideo = (0, _react.useCallback)(() => {
    if (Date.now() - lastClickTimeRef.current > 500) {
      lastClickTimeRef.current = Date.now();
      toggleVideoEnabled();
    }
  }, [toggleVideoEnabled]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "videoActionsContainer__actions-container"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "videoActionsContainer__actions-icon",
    onClick: toggleVideo,
    disabled: !hasVideoInputDevices || disabled // startIcon={isVideoEnabled ? <>VideoOnIcon</> : <>VideoOnIcon</>}

  }, isVideoEnabled ? 'videoOn' : 'videoOff'), /*#__PURE__*/_react.default.createElement("p", {
    className: "videoActionsContainer__actions-label"
  }, "Screen Share"));
}
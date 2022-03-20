"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("../../../TwilioVideoProvider");

var _VideoTrack = _interopRequireDefault(require("../VideoTrack/VideoTrack"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _useRestartAudioTrackOnDeviceChange = _interopRequireDefault(require("../../hooks/useRestartAudioTrackOnDeviceChange"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalVideoPreview = _ => {
  const {
    localTracks
  } = (0, _useVideoContext.default)();
  (0, _useRestartAudioTrackOnDeviceChange.default)(localTracks);
  const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: "mainVideoContainer",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "mainVideoWrapper",
      children: videoTrack ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoTrack.default, {
        track: videoTrack,
        isLocal: true
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
        children: "Camera off"
      })
    })
  });
};

LocalVideoPreview.propTypes = {};
var _default = LocalVideoPreview;
exports.default = _default;
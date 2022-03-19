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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LocalVideoPreview = _ => {
  const {
    localTracks
  } = (0, _useVideoContext.default)();
  (0, _useRestartAudioTrackOnDeviceChange.default)(localTracks);
  const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "mainVideoContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "mainVideoWrapper"
  }, videoTrack ? /*#__PURE__*/_react.default.createElement(_VideoTrack.default, {
    track: videoTrack,
    isLocal: true
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Camera off")));
};

LocalVideoPreview.propTypes = {};
var _default = LocalVideoPreview;
exports.default = _default;
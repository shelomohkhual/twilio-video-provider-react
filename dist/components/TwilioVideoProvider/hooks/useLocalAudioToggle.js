"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLocalAudioToggle;

var _twilioVideo = require("twilio-video");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

var _useIsTrackEnabled = _interopRequireDefault(require("./useIsTrackEnabled"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useLocalAudioToggle() {
  const {
    localTracks
  } = (0, _useVideoContext.default)();
  const audioTrack = localTracks.find(track => track.kind === 'audio');
  const isEnabled = (0, _useIsTrackEnabled.default)(audioTrack);
  const toggleAudioEnabled = (0, _react.useCallback)(() => {
    if (audioTrack) {
      audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
    }
  }, [audioTrack]);
  return [isEnabled, toggleAudioEnabled];
}
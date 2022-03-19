"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AudioTrack;

var _react = require("react");

var _useTwilioState = require("../../hooks/useTwilioState");

function AudioTrack(_ref) {
  let {
    track
  } = _ref;
  const {
    activeSinkId
  } = (0, _useTwilioState.useTwilioState)();
  const audioEl = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    audioEl.current = track.attach();
    audioEl.current.setAttribute('data-cy-audio-track-name', track.name);
    document.body.appendChild(audioEl.current);
    return () => track.detach().forEach(el => {
      el.remove(); // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
      // See: https://github.com/twilio/twilio-video.js/issues/1528

      el.srcObject = null;
    });
  }, [track]);
  (0, _react.useEffect)(() => {
    var _audioEl$current, _audioEl$current$setS;

    (_audioEl$current = audioEl.current) === null || _audioEl$current === void 0 ? void 0 : (_audioEl$current$setS = _audioEl$current.setSinkId) === null || _audioEl$current$setS === void 0 ? void 0 : _audioEl$current$setS.call(_audioEl$current, activeSinkId);
  }, [activeSinkId]);
  return null;
}
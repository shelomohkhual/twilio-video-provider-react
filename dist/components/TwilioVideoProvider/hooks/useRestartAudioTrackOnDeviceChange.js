"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRestartAudioTrackOnDeviceChange;

var _react = require("react");

/*
 * If a user has published an audio track from an external audio input device and
 * disconnects the device, the published audio track will be stopped and the user
 * will no longer be heard by other participants.
 *
 * To prevent this issue, this hook will re-acquire a mediaStreamTrack from the system's
 * default audio device when it detects that the published audio device has been disconnected.
 */
function useRestartAudioTrackOnDeviceChange(localTracks) {
  const audioTrack = localTracks.find(track => track.kind === 'audio');
  (0, _react.useEffect)(() => {
    const handleDeviceChange = () => {
      if ((audioTrack === null || audioTrack === void 0 ? void 0 : audioTrack.mediaStreamTrack.readyState) === 'ended') {
        audioTrack.restart({});
      }
    };

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, [audioTrack]);
}
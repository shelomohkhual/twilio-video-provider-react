"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActiveSinkId;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useDevices = _interopRequireDefault(require("./useDevices"));

var _useLocalTracks = require("./useLocalTracks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useActiveSinkId() {
  const {
    audioOutputDevices
  } = (0, _useDevices.default)();
  const [activeSinkId, _setActiveSinkId] = (0, _react.useState)('default');
  const setActiveSinkId = (0, _react.useCallback)(sinkId => {
    window.localStorage.setItem(_useLocalTracks.SELECTED_AUDIO_OUTPUT_KEY, sinkId);

    _setActiveSinkId(sinkId);
  }, []);
  (0, _react.useEffect)(() => {
    const selectedSinkId = window.localStorage.getItem(_useLocalTracks.SELECTED_AUDIO_OUTPUT_KEY);
    const hasSelectedAudioOutputDevice = audioOutputDevices.some(device => selectedSinkId && device.deviceId === selectedSinkId);

    if (hasSelectedAudioOutputDevice) {
      _setActiveSinkId(selectedSinkId);
    }
  }, [audioOutputDevices]);
  return [activeSinkId, setActiveSinkId];
}
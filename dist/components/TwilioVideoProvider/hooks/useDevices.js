"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDevices;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _utils = require("../utils");

// This returns the type of the value that is returned by a promise resolution
function useDevices() {
  const [deviceInfo, setDeviceInfo] = (0, _react.useState)({
    audioInputDevices: [],
    videoInputDevices: [],
    audioOutputDevices: [],
    hasAudioInputDevices: false,
    hasVideoInputDevices: false
  });
  (0, _react.useEffect)(() => {
    const getDevices = () => (0, _utils.getDeviceInfo)().then(devices => setDeviceInfo(devices));

    navigator.mediaDevices.addEventListener('devicechange', getDevices);
    getDevices();
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', getDevices);
    };
  }, []);
  return deviceInfo;
}
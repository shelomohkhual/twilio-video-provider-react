"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsTrackSwitchedOff;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

// The 'switchedOff' event is emitted when there is not enough bandwidth to support
// a track. See: https://www.twilio.com/docs/video/tutorials/using-bandwidth-profile-api#understanding-track-switch-offs
function useIsTrackSwitchedOff(track) {
  const [isSwitchedOff, setIsSwitchedOff] = (0, _react.useState)(track && track.isSwitchedOff);
  (0, _react.useEffect)(() => {
    // Reset the value if the 'track' variable changes
    setIsSwitchedOff(track && track.isSwitchedOff);

    if (track) {
      const handleSwitchedOff = () => setIsSwitchedOff(true);

      const handleSwitchedOn = () => setIsSwitchedOff(false);

      track.on('switchedOff', handleSwitchedOff);
      track.on('switchedOn', handleSwitchedOn);
      return () => {
        track.off('switchedOff', handleSwitchedOff);
        track.off('switchedOn', handleSwitchedOn);
      };
    }
  }, [track]);
  return !!isSwitchedOff;
}
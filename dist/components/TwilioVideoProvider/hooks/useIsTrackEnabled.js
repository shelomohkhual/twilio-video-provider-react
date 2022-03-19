"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsTrackEnabled;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useIsTrackEnabled(track) {
  const [isEnabled, setIsEnabled] = (0, _react.useState)(track ? track.isEnabled : false);
  (0, _react.useEffect)(() => {
    setIsEnabled(track ? track.isEnabled : false);

    if (track) {
      const setEnabled = () => setIsEnabled(true);

      const setDisabled = () => setIsEnabled(false);

      track.on('enabled', setEnabled);
      track.on('disabled', setDisabled);
      return () => {
        track.off('enabled', setEnabled);
        track.off('disabled', setDisabled);
      };
    }
  }, [track]);
  return isEnabled;
}
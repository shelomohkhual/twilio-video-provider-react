"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMediaStreamTrack;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

/*
 * This hook allows components to reliably use the 'mediaStreamTrack' property of
 * an AudioTrack or a VideoTrack. Whenever 'localTrack.restart(...)' is called, it
 * will replace the mediaStreamTrack property of the localTrack, but the localTrack
 * object will stay the same. Therefore this hook is needed in order for components
 * to rerender in response to the mediaStreamTrack changing.
 */
function useMediaStreamTrack(track) {
  const [mediaStreamTrack, setMediaStreamTrack] = (0, _react.useState)(track === null || track === void 0 ? void 0 : track.mediaStreamTrack);
  (0, _react.useEffect)(() => {
    setMediaStreamTrack(track === null || track === void 0 ? void 0 : track.mediaStreamTrack);

    if (track) {
      const handleStarted = () => setMediaStreamTrack(track.mediaStreamTrack);

      track.on('started', handleStarted);
      return () => {
        track.off('started', handleStarted);
      };
    }
  }, [track]);
  return mediaStreamTrack;
}
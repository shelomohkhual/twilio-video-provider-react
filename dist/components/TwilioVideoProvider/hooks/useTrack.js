"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useTrack;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useTrack(publication) {
  const [track, setTrack] = (0, _react.useState)(publication && publication.track);
  (0, _react.useEffect)(() => {
    // Reset the track when the 'publication' variable changes.
    setTrack(publication && publication.track);

    if (publication) {
      const removeTrack = () => setTrack(null);

      publication.on('subscribed', setTrack);
      publication.on('unsubscribed', removeTrack);
      return () => {
        publication.off('subscribed', setTrack);
        publication.off('unsubscribed', removeTrack);
      };
    }
  }, [publication]);
  return track;
}
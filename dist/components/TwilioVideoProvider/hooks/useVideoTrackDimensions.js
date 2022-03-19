"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVideoTrackDimensions;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useVideoTrackDimensions(track) {
  const [dimensions, setDimensions] = (0, _react.useState)(track === null || track === void 0 ? void 0 : track.dimensions);
  (0, _react.useEffect)(() => {
    setDimensions(track === null || track === void 0 ? void 0 : track.dimensions);

    if (track) {
      const handleDimensionsChanged = newTrack => setDimensions({
        width: newTrack.dimensions.width,
        height: newTrack.dimensions.height
      });

      track.on('dimensionsChanged', handleDimensionsChanged);
      return () => {
        track.off('dimensionsChanged', handleDimensionsChanged);
      };
    }
  }, [track]);
  return dimensions;
}
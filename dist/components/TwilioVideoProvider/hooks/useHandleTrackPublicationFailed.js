"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useHandleTrackPublicationFailed;

var _react = require("react");

function useHandleTrackPublicationFailed(room, onError) {
  (0, _react.useEffect)(() => {
    if (room) {
      room.localParticipant.on('trackPublicationFailed', onError);
      return () => {
        room.localParticipant.off('trackPublicationFailed', onError);
      };
    }
  }, [room, onError]);
}
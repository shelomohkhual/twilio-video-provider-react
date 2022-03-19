"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScreenShareToggle;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _twilioVideo = require("twilio-video");

function useScreenShareToggle(room, onError) {
  const [isSharing, setIsSharing] = (0, _react.useState)(false);
  const stopScreenShareRef = (0, _react.useRef)();
  const shareScreen = (0, _react.useCallback)(() => {
    navigator.mediaDevices.getDisplayMedia({
      audio: false,
      video: {
        frameRate: 10,
        height: 1080,
        width: 1920
      }
    }).then(stream => {
      const track = stream.getTracks()[0]; // All video tracks are published with 'low' priority. This works because the video
      // track that is displayed in the 'MainParticipant' component will have it's priority
      // set to 'high' via track.setPriority()

      room === null || room === void 0 ? void 0 : room.localParticipant.publishTrack(track, {
        name: 'screen',
        // Tracks can be named to easily find them later
        priority: 'low' // Priority is set to high by the subscriber when the video track is rendered

      }).then(trackPublication => {
        stopScreenShareRef.current = () => {
          room === null || room === void 0 ? void 0 : room.localParticipant.unpublishTrack(track); // TODO: remove this if the SDK is updated to emit this event

          room === null || room === void 0 ? void 0 : room.localParticipant.emit('trackUnpublished', trackPublication);
          track.stop();
          setIsSharing(false);
        };

        track.onended = stopScreenShareRef.current;
        setIsSharing(true);
      }).catch(onError);
    }).catch(error => {
      // Don't display an error if the user closes the screen share dialog
      if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
        onError(error);
      }
    });
  }, [room, onError]);
  const toggleScreenShare = (0, _react.useCallback)(() => {
    if (room) {
      !isSharing ? shareScreen() : stopScreenShareRef.current();
    }
  }, [isSharing, shareScreen, room]);
  return [isSharing, toggleScreenShare];
}
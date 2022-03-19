"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useHandleRoomDisconnection;

var _twilioVideo = require("twilio-video");

var _react = require("react");

function useHandleRoomDisconnection(room, onError, removeLocalAudioTrack, removeLocalVideoTrack, isSharingScreen, toggleScreenShare) {
  (0, _react.useEffect)(() => {
    if (room) {
      const onDisconnected = (_, error) => {
        if (error) {
          onError(error);
        }

        removeLocalAudioTrack();
        removeLocalVideoTrack();

        if (isSharingScreen) {
          toggleScreenShare();
        }
      };

      room.on('disconnected', onDisconnected);
      return () => {
        room.off('disconnected', onDisconnected);
      };
    }
  }, [room, onError, removeLocalAudioTrack, removeLocalVideoTrack, isSharingScreen, toggleScreenShare]);
}
import { Room, TwilioError } from 'twilio-video';
import { useEffect } from 'react';


export default function useHandleRoomDisconnection(
  room,
  onError,
  removeLocalAudioTrack,
  removeLocalVideoTrack,
  isSharingScreen,
  toggleScreenShare,
) {
  useEffect(() => {
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

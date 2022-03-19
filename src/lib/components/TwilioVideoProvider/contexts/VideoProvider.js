import React, { createContext, useCallback, useState } from 'react';
import AttachVisibilityHandler from '../components/AttachVisibilityHandler/AttachVisibilityHandler';
import useHandleRoomDisconnection from '../hooks/useHandleRoomDisconnection';
import useHandleTrackPublicationFailed from '../hooks/useHandleTrackPublicationFailed';
import useLocalTracks from '../hooks/useLocalTracks';
import useRestartAudioTrackOnDeviceChange from '../hooks/useRestartAudioTrackOnDeviceChange';
import useRoom from '../hooks/useRoom';
import useScreenShareToggle from '../hooks/useScreenShareToggle';

import { SelectedParticipantProvider } from './SelectedParticipantProvider';

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */

export const VideoContext = createContext();

export function VideoProvider({ options, children, onError = () => {} }) {
  const onErrorCallback = useCallback(
    error => {
      console.log(`ERROR: ${error.message}`, error);
      onError(error);
    },
    [onError]
  );

  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks,
  } = useLocalTracks();
  const { room, isConnecting, connect } = useRoom(localTracks, onErrorCallback, options);

  const [isSharingScreen, toggleScreenShare] = useScreenShareToggle(room, onError);

  // Register callback functions to be called on room disconnect.
  useHandleRoomDisconnection(
    room,
    onError,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    isSharingScreen,
    toggleScreenShare
  );
  useHandleTrackPublicationFailed(room, onError);
  useRestartAudioTrackOnDeviceChange(localTracks);

  const [isBackgroundSelectionOpen, setIsBackgroundSelectionOpen] = useState(false);
  const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video')
//   const [backgroundSettings, setBackgroundSettings] = useBackgroundSettings(videoTrack, room);

  return (
    <VideoContext.Provider
      value={{
        room,
        localTracks,
        isConnecting,
        onError: onErrorCallback,
        getLocalVideoTrack,
        getLocalAudioTrack,
        connect,
        isAcquiringLocalTracks,
        removeLocalVideoTrack,
        isSharingScreen,
        toggleScreenShare,
        getAudioAndVideoTracks,
        isBackgroundSelectionOpen,
        setIsBackgroundSelectionOpen,
        // backgroundSettings,
        // setBackgroundSettings,
      }}
    >
      <SelectedParticipantProvider room={room}>{children}</SelectedParticipantProvider>
      {/* 
        The AttachVisibilityHandler component is using the useLocalVideoToggle hook
        which must be used within the VideoContext Provider.
      */}
      <AttachVisibilityHandler />
    </VideoContext.Provider>
  );
}

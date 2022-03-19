import { useEffect, useState } from 'react';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MainParticipant from './components/MainParticipant/MainParticipant';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ToggleAudioButton from './components/ToggleAudioButton/ToggleAudioButton';
import ToggleScreenShareButton from './components/ToggleScreenShareButton/ToggleScreenShareButton';
import ToggleVideoButton from './components/ToggleVideoButton/ToggleVideoButton';
import useVideoContext from './contexts/useVideoContext';
import useRestartAudioTrackOnDeviceChange from './hooks/useRestartAudioTrackOnDeviceChange';
import useRoomState from './hooks/useRoomState';

const VideoRoom = props => {
    const { userName, accessToken } = props;

    const {
        localTracks,
        getAudioAndVideoTracks,
        connect: videoConnect,
        isConnecting,
        room,
        isSharingScreen,
        toggleScreenShare
    } = useVideoContext();
    useRestartAudioTrackOnDeviceChange(localTracks);

    const roomState = useRoomState();
    const isReconnecting = roomState === 'reconnecting';

    const [mediaError, setMediaError] = useState();

    useEffect(() => {
        if (!mediaError) {
            getAudioAndVideoTracks().catch(error => {
                console.log('Error acquiring local media:');
                console.dir(error);
                setMediaError(error);
            });
        }
    }, [getAudioAndVideoTracks, mediaError]);

    const handleOnJoin = () => {
        videoConnect(accessToken);
    };
    const onEndCall = () => {
        room?.disconnect();
        // props.handleOnEndCall();
    };
    console.log('roomState', roomState);
    return <div className={'videoRoom'}>
        {/* ROOM */}
        <div className={'roomContainer'}>
            {!room ?
                <LocalVideoPreview
                    localTracks={localTracks}
                    identity={userName}
                    user={userName}
                />
                : <div className={'allParticipantsContainer'}>
                    {/* ParticipantList */}
                    <div id='paricipant-container' className={'participantContainer'}>
                        <ParticipantList />
                    </div>
                    {/* MainParticipant */}
                    <div id='primary-display-container' className={'primaryDisplayContainer'}>
                        <MainParticipant />
                    </div>
                </div>}
        </div>

        {/* MENU BAR */}
        <div className={'menuBarContainer'}>
            {/* {isSharingScreen && (
            <div container className={screenShareBanner}>
                <p variant="h6">You are sharing your screen</p>
                <button onClick={() => toggleScreenShare()}>Stop Sharing</button>
            </div>
        )} */}
            <ToggleAudioButton disabled={isReconnecting} />
            <ToggleVideoButton disabled={isReconnecting} />
            <ToggleScreenShareButton disabled={isReconnecting}
                hide={!room}
                isSharingScreen={isSharingScreen} onStopSharing={toggleScreenShare} />

            {!room ? <>
                <button className={'joinMeeting'} onClick={handleOnJoin} disabled={isConnecting || isReconnecting}>
                    Join Room
                </button>
            </> : <>
            </>
            }

            {room && <button className={'endCall'} onClick={onEndCall} disabled={isConnecting}>
                End Call
            </button>}

        </div>
    </div>;
};

export default VideoRoom;

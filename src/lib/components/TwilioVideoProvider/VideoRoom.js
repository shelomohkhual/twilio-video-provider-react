import { useEffect, useState } from 'react';
import LocalVideoPreview from './components/LocalVideoPreview/LocalVideoPreview';
import MainParticipant from './components/MainParticipant/MainParticipant';
import ParticipantList from './components/ParticipantList/ParticipantList';
import RoomHeading from './components/RoomHeading/RoomHeading';
import UserActions from './components/UserActions/UserActions';
import useVideoContext from './contexts/useVideoContext';

const VideoRoom = props => {
    const {
        getAudioAndVideoTracks,
        room,
    } = useVideoContext();

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

    return <div className={'videoRoom'}>
        {/* ROOM */}
        {room && <ParticipantList />}

        <div className={'mainContainer'}>
            {room && <RoomHeading />}
            {!room && <LocalVideoPreview />}

            {room && <MainParticipant />}
            {room && <ParticipantList mobile />}

            {/* MENU BAR */}
            {/* {isSharingScreen && (
            <div container className={screenShareBanner}>
                <p variant="h6">You are sharing your screen</p>
                <button onClick={() => toggleScreenShare()}>Stop Sharing</button>
            </div>
        )} */}

            <UserActions />
        </div>
    </div>;
};

export default VideoRoom;

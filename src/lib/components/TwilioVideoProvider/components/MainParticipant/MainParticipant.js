import React from 'react';
import PropTypes from 'prop-types';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
import useSelectedParticipant from '../../contexts/SelectedParticipantProvider';
import useVideoContext from '../../contexts/useVideoContext';
import useMainParticipant from '../../hooks/useMainParticipant';
import MainParticipantInfo from '../MainParticipantInfo/MainParticipantInfo';
import ParticipantTracks from '../ParticipantTracks/ParticipantTracks';

const MainParticipant = props => {
    const mainParticipant = useMainParticipant();
    const { room } = useVideoContext();
    const localParticipant = room?.localParticipant;
    const [selectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();

    const videoPriority =
        (mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant) &&
            mainParticipant !== localParticipant
            ? 'high'
            : null;

    return (
        /* audio is disabled for this participant component because this participant's audio
   is already being rendered in the <ParticipantStrip /> component.  */
        <div className='mainVideoContainer'>
            <MainParticipantInfo participant={mainParticipant}>
                <ParticipantTracks
                    participant={mainParticipant}
                    videoOnly
                    // enableScreenShare={mainParticipant !== localParticipant}
                    enableScreenShare
                    videoPriority={videoPriority}
                    isLocalParticipant={mainParticipant === localParticipant}
                />
            </MainParticipantInfo>
        </div>
    );
};

MainParticipant.propTypes = {};

export default MainParticipant;
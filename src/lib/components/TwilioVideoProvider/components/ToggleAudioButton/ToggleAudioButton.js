import React from 'react';

import useLocalAudioToggle from "../../hooks/useLocalAudioToggle";
import useVideoContext from "../../contexts/useVideoContext";

// import micIcon from '../../../../assets/twillio/micIcon.svg'
// import micMuteIcon from '../../../../assets/twillio/micMuteIcon.svg';

export default function ToggleAudioButton({ disabled }) {
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
    const { localTracks } = useVideoContext();
    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

    return (
        <div className='videoActionsContainer__actions-container'>
            <button
                className={"videoActionsContainer__actions-icon"}
                onClick={toggleAudioEnabled}
                disabled={!hasAudioTrack || disabled}
            >
                {isAudioEnabled ? <p>Mic</p> : <p>unmic</p>}
                {/* {isAudioEnabled ? <img src={micIcon}></img> : <img src={micMuteIcon}></img>} */}
                {/* {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'} */}
            </button>
            <p className='videoActionsContainer__actions-label'>
                Mic
            </p>
        </div>

    );
}

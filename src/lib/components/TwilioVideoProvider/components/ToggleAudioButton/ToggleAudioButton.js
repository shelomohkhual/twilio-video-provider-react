import React from 'react';

import useLocalAudioToggle from "../../hooks/useLocalAudioToggle";
import useVideoContext from "../../contexts/useVideoContext";

// import micIcon from '../../../../assets/twillio/micIcon.svg'
// import micMuteIcon from '../../../../assets/twillio/micMuteIcon.svg';

export default function ToggleAudioButton({ disabled, className = 'toggleAudioButton' }) {
    const [isAudioEnabled, toggleAudioEnabled] = useLocalAudioToggle();
    const { localTracks } = useVideoContext();
    const hasAudioTrack = localTracks.some(track => track.kind === 'audio');

    return (
        <button
            className={className}
            onClick={toggleAudioEnabled}
            disabled={!hasAudioTrack || disabled}
        >
            {isAudioEnabled ? <p>Mic</p> : <p>unmic</p>}
            {/* {isAudioEnabled ? <img src={micIcon}></img> : <img src={micMuteIcon}></img>} */}
            {/* {!hasAudioTrack ? 'No Audio' : isAudioEnabled ? 'Mute' : 'Unmute'} */}
        </button>
    );
}

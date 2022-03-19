import React from 'react';

import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
import useVideoContext from '../../contexts/useVideoContext';

// import shareScreen from '../../../../assets/twillio/shareScreen.svg';
// import stopShareScreen from '../../../../assets/twillio/stopShareScreen.svg';
import './toggleShareScreenButton.css';

export const SCREEN_SHARE_TEXT = 'Screen';
// export const SCREEN_SHARE_TEXT = <img src={shareScreen}></img>;
export const STOP_SCREEN_SHARE_TEXT = 'Stop';
export const SHARE_IN_PROGRESS_TEXT = 'Cannot share screen when another user is sharing';
export const SHARE_NOT_SUPPORTED_TEXT = 'Screen sharing is not supported with this browser';


export default function ToggleScreenShareButton({ hide, disabled, isSharingScreen, onStopSharing }) {
    const screenShareParticipant = useScreenShareParticipant();
    const { toggleScreenShare } = useVideoContext();
    const disableScreenShareButton = Boolean(screenShareParticipant);
    const isScreenShareSupported = navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia;
    const isDisabled = disabled || disableScreenShareButton || !isScreenShareSupported;

    let tooltipMessage = '';

    if (hide) {
        return <></>;
    }

    if (disableScreenShareButton) {
        tooltipMessage = SHARE_IN_PROGRESS_TEXT;
    }

    if (!isScreenShareSupported) {
        tooltipMessage = SHARE_NOT_SUPPORTED_TEXT;
    }

    // isSharingScreen={ isSharingScreen} onStopSharing={toggleScreenShare} 

    return (
        <div className='videoActionsContainer__actions-container'>
            <button
                className={'videoActionsContainer__actions-icon'}
                onClick={() => !isSharingScreen ? toggleScreenShare() : onStopSharing()}
            >
                {isSharingScreen && STOP_SCREEN_SHARE_TEXT}
                {!isSharingScreen && SCREEN_SHARE_TEXT}

            </button>
            <p className='videoActionsContainer__actions-label'>
                Screen Share
            </p>
        </div>
    );
}

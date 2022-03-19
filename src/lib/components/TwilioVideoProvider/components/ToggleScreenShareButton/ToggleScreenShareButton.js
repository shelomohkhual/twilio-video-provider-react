import React from 'react';

import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
import useVideoContext from '../../contexts/useVideoContext';

// import shareScreen from '../../../../assets/twillio/shareScreen.svg';
// import stopShareScreen from '../../../../assets/twillio/stopShareScreen.svg';
import './toggleShareScreenButton.css';

export const SCREEN_SHARE_TEXT = 'ScreenShare';
// export const SCREEN_SHARE_TEXT = <img src={shareScreen}></img>;
export const STOP_SCREEN_SHARE_TEXT = 'Stop Sharing Screen';
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
        <div
        //   title={tooltipMessage}
        //   placement="top"
        //   PopperProps={{ disablePortal: true }}
        //   style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
        >
            <span>
                {/* The span element is needed because a disabled button will not emit hover events and we want to display
                a tooltip when screen sharing is disabled */}
                <button
                    className={'toggleShareScreen'}
                    onClick={() => !isSharingScreen ? toggleScreenShare() : onStopSharing()}
                // disabled={isDisabled}
                // startIcon={<ScreenShareIcon />}
                //   data-cy-share-screen
                >
                    {isSharingScreen && STOP_SCREEN_SHARE_TEXT}
                    {!isSharingScreen && SCREEN_SHARE_TEXT}

                </button>
            </span>
        </div>
    );
}

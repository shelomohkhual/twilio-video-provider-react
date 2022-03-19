import PropTypes from 'prop-types';
import React from 'react';

import ToggleAudioButton from '../ToggleAudioButton/ToggleAudioButton';
import ToggleScreenShareButton from '../ToggleScreenShareButton/ToggleScreenShareButton';
import ToggleVideoButton from '../ToggleVideoButton/ToggleVideoButton';
import useRoomState from '../../hooks/useRoomState';
import useVideoContext from '../../contexts/useVideoContext';

import '../../../TwilioVideoProvider.css';
import { useTwilioState } from '../../hooks/useTwilioState';

const UserActions = props => {
    const {
        isConnecting,
        room,
        connect,
        isSharingScreen,
        toggleScreenShare
    } = useVideoContext();

    const { accessToken } = useTwilioState();

    const roomState = useRoomState();

    const isReconnecting = roomState === 'reconnecting';

    const handleOnJoin = () => {
        connect(accessToken);
    };

    const onEndCall = () => {
        room?.disconnect();
    };

    return (
        <div className='userVideoActionContainer'>
            <div className="videoActionsContainer__actions">
                <ToggleAudioButton
                    disabled={isReconnecting} />

                <ToggleVideoButton
                    disabled={isReconnecting} />

                <ToggleScreenShareButton
                    disabled={isReconnecting}
                    hide={!room}
                    isSharingScreen={isSharingScreen} onStopSharing={toggleScreenShare} />

                {!room && <div className='videoActionsContainer__actions-container'>
                    <button className={'videoActionsContainer__actions-icon'} onClick={handleOnJoin} disabled={isConnecting || isReconnecting}>
                        Room
                    </button>
                    <p className='videoActionsContainer__actions-label'>
                        Join Room
                    </p>
                </div>}

                {room && <div className='videoActionsContainer__actions-container'>
                    <button className={'videoActionsContainer__actions-icon'} onClick={onEndCall} disabled={isConnecting}>
                        End
                    </button>
                    <p className='videoActionsContainer__actions-label'>
                        End Call
                    </p>
                </div>
                }
            </div>
        </div>
    );
};

UserActions.propTypes = {};

export default UserActions;;;
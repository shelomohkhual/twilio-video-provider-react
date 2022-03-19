import React, { useCallback, useRef } from 'react';
import useDevices from '../../hooks/useDevices';
import useLocalVideoToggle from '../../hooks/useLocalVideoToggle';
// import videoOn from '../../../../assets/twillio/videoOn.svg'
// import videoOff from '../../../../assets/twillio/videoOff.svg'
import './toggleVideoButton.css';

export default function ToggleVideoButton({ disabled }) {
    const [isVideoEnabled, toggleVideoEnabled] = useLocalVideoToggle();
    const lastClickTimeRef = useRef(0);
    const { hasVideoInputDevices } = useDevices();

    const toggleVideo = useCallback(() => {
        if (Date.now() - lastClickTimeRef.current > 500) {
            lastClickTimeRef.current = Date.now();
            toggleVideoEnabled();
        }
    }, [toggleVideoEnabled]);

    return (<div className='videoActionsContainer__actions-container'>
        <button
            className={"videoActionsContainer__actions-icon"}
            onClick={toggleVideo}
            disabled={!hasVideoInputDevices || disabled}
        // startIcon={isVideoEnabled ? <>VideoOnIcon</> : <>VideoOnIcon</>}
        >
            {isVideoEnabled ? 'videoOn' : 'videoOff'}
            {/* {isVideoEnabled ? <img src={videoOn}></img> : <img src={videoOff}></img>} */}
            {/* {!hasVideoInputDevices ? 'No Video' : isVideoEnabled ? ' Video' : 'Start Video'} */}
        </button>
        <p className='videoActionsContainer__actions-label'>
            Screen Share
        </p>
    </div>
    );
}

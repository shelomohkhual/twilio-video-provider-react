import React from 'react';
import PropTypes from 'prop-types';

import '../../../TwilioVideoProvider';
import VideoTrack from '../VideoTrack/VideoTrack';
import useVideoContext from '../../contexts/useVideoContext';
import useRestartAudioTrackOnDeviceChange from '../../hooks/useRestartAudioTrackOnDeviceChange';

const LocalVideoPreview = _ => {
    const {
        localTracks,
    } = useVideoContext();
    useRestartAudioTrackOnDeviceChange(localTracks);

    const videoTrack = localTracks.find(
        track => !track.name.includes('screen') && track.kind === 'video'
    );

    return (
        <div className='mainVideoContainer' >
            <div className='mainVideoWrapper' >
                {
                    videoTrack ? (
                        <VideoTrack track={videoTrack} isLocal />
                    ) : (<>
                        Camera off
                        {/* <div className={'identityContainer'}>
                        <span className={identity}> */}
                        {/* <LocalAudioLevelIndicator />
                    <Typography variant="body1" color="inherit" component="span">
                    </Typography> */}
                        {/* {identity}
                        </span>
                    </div> */}
                    </>)}
            </div >
        </div >
    );
};

LocalVideoPreview.propTypes = {};

export default LocalVideoPreview;
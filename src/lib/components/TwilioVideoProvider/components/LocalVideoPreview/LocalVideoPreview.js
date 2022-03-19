import React from 'react';
import PropTypes from 'prop-types';

import './LocalVideoPreview.css';
import VideoTrack from '../VideoTrack/VideoTrack';

const LocalVideoPreview = props => {
    const { localTracks, identity, user } = props;

    const videoTrack = localTracks.find(
        track => !track.name.includes('screen') && track.kind === 'video'
    );

    var str = identity;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');


    return (
        <div className={'innerContainer'}>
            {videoTrack ? (
                <VideoTrack track={videoTrack} isLocal />
            ) : (<>
                <div className={'identityContainer'}>
                    <span className={identity}>
                        {/* <LocalAudioLevelIndicator />
                    <Typography variant="body1" color="inherit" component="span">
                    </Typography> */}
                        {identity}
                    </span>
                </div>
                <div>
                    <div className={'avatarContainer'}>
                        <span>{acronym}</span>
                    </div>
                </div>
            </>)}
        </div>
    );
};

LocalVideoPreview.propTypes = {};

export default LocalVideoPreview;
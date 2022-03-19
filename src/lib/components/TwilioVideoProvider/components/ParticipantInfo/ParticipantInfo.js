import React from 'react';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting';
import usePublications from '../../hooks/usePublications';
import useTrack from '../../hooks/useTrack';
import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
// import clsx from 'clsx';

import style from '../twilioComponentsShared.css';

export default function ParticipantInfo({
    participant,
    onClick,
    isSelected,
    children,
    isLocalParticipant,
    hideParticipant,
}) {
    const publications = usePublications(participant);

    const audioPublication = publications.find(p => p.kind === 'audio');
    const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');

    const isVideoEnabled = Boolean(videoPublication);
    const isScreenShareEnabled = publications.find(p => p.trackName.includes('screen'));

    const videoTrack = useTrack(videoPublication);
    const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

    const audioTrack = useTrack(audioPublication);
    const isParticipantReconnecting = useParticipantIsReconnecting(participant);

    var str = participant.identity;
    var matches = str.match(/\b(\w)/g);
    var acronym = matches.join('');

    return (
        <div className={isSelected ? style.oneParticipantSelected : style.oneParticipant}
            //   className={clsx(style.container, {
            //     [style.hideParticipant]: hideParticipant,
            //     [style.cursorPointer]: Boolean(onClick),
            //   })}
            onClick={onClick}
        // data-cy-participant={participant.identity}
        >
            <div className={style.infoContainer}>
                <NetworkQualityLevel participant={participant} />
                <div className={style.infoRowBottom}>
                    {isScreenShareEnabled && (
                        <span className={style.screenShareIconContainer}>
                            ScreenShareIcon
                        </span>
                    )}
                    <span className={style.identity}>
                        <AudioLevelIndicator audioTrack={audioTrack} />
                        {participant.identity}
                        {/* <p variant="body1" className={style.typeography} component="span">
                            {participant.identity}
                            {isLocalParticipant && ' (You)'}
                        </p> */}
                    </span>
                </div>
                {/* <div>{isSelected &&< <PinIcon />}</div> */}
                {/* <div>{isSelected && <p>PinIcon</p>}</div> */}
            </div>
            <div className={style.innerContainer}>
                {(!isVideoEnabled || isVideoSwitchedOff) && (
                    <div>
                        <div className={style.avatarContainer}>
                            <span>{acronym}</span>
                        </div>
                    </div>
                )}
                {isParticipantReconnecting && (
                    <div className={style.reconnectingContainer}>
                        <p variant="body1" className={style.typeography}>
                            Reconnecting...
                        </p>
                    </div>
                )}
                {children}
            </div>
        </div>
    );
}

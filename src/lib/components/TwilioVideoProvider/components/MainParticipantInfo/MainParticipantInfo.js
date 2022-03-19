import React from 'react';
// import clsx from 'clsx';
import useVideoContext from '../../contexts/useVideoContext';
// import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
import usePublications from '../../hooks/usePublications';
import useTrack from '../../hooks/useTrack';
import useIsTrackSwitchedOff from '../../hooks/useIsTrackSwitchedOff';
import useParticipantIsReconnecting from '../../hooks/useParticipantIsReconnecting';
// import useIsRecording from '../../hooks/useIsRecording';
// import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
// import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';

import '../twilioComponentsShared.css';

export default function MainParticipantInfo({ participant, children }) {
  const { room } = useVideoContext();
  const localParticipant = room?.localParticipant;
  const isLocal = localParticipant === participant;

  // const screenShareParticipant = useScreenShareParticipant();
  // const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

  const publications = usePublications(participant);
  const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');
  const screenSharePublication = publications.find(p => p.trackName.includes('screen'));

  const videoTrack = useTrack(screenSharePublication || videoPublication);
  const isVideoEnabled = Boolean(videoTrack);

  // const audioPublication = publications.find(p => p.kind === 'audio');
  // const audioTrack = useTrack(audioPublication);

  const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);
  const isParticipantReconnecting = useParticipantIsReconnecting(participant);

  // const isRecording = useIsRecording();

  var str = participant.identity;
  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join('');

  return (
    <div
    // data-cy-main-participant
    // data-cy-participant={participant.identity}
    // className={clsx(container, {
    //   [fullWidth]: !isRemoteParticipantScreenSharing,
    // })}
    >
      <div className={'infoContainer'}>
        <div style={{ display: 'flex' }}>
          <div className={'identity'}>
            {/* <AudioLevelIndicator audioTrack={audioTrack} /> */}
            {/* <p >
              {participant.identity}
              {isLocal && ' (You)'}
              {screenSharePublication && ' - Screen'}
            </p> */}
          </div>
          {/* <NetworkQualityLevel participant={participant} /> */}
        </div>
        {/* {isRecording && (
          <Tooltip
            title="All participants' audio and video is currently being recorded. Visit the app settings to stop recording."
            placement="top"
          >
            <div className={recordingIndicator}>
              <div className={circle}></div>
              <Typography variant="body1" color="inherit" data-cy-recording-indicator>
                Recording
              </Typography>
            </div>
          </Tooltip>
        )} */}
      </div>
      {(!isVideoEnabled || isVideoSwitchedOff) && (
        <div>
          <div className={'avatarContainer'}>
            <span>{acronym}</span>
          </div>
        </div>
      )}
      {isParticipantReconnecting && (
        <div className={'reconnectingContainer'}>
          <p variant="body1" style={{ color: 'white' }}>
            Reconnecting...
          </p>
        </div>
      )}
      {children}
    </div>
  );
}

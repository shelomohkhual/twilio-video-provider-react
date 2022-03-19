import { useEffect, useRef } from 'react';
import { useTwilioState } from '../../hooks/useTwilioState';

export default function AudioTrack({ track }) {
  const { activeSinkId } = useTwilioState();
  const audioEl = useRef();

  useEffect(() => {
    audioEl.current = track.attach();
    audioEl.current.setAttribute('data-cy-audio-track-name', track.name);
    document.body.appendChild(audioEl.current);
    return () =>
      track.detach().forEach(el => {
        el.remove();

        // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
        // See: https://github.com/twilio/twilio-video.js/issues/1528
        el.srcObject = null;
      });
  }, [track]);

  useEffect(() => {
    audioEl.current?.setSinkId?.(activeSinkId);
  }, [activeSinkId]);

  return null;
}

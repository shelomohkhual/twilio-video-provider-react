import { LocalAudioTrack } from 'twilio-video';
import { useCallback } from 'react';
import useVideoContext from '../contexts/useVideoContext';
import useIsTrackEnabled from './useIsTrackEnabled';

export default function useLocalAudioToggle() {
    const { localTracks } = useVideoContext();
    const audioTrack = localTracks.find(track => track.kind === 'audio');
    const isEnabled = useIsTrackEnabled(audioTrack);

    const toggleAudioEnabled = useCallback(() => {
        if (audioTrack) {
            audioTrack.isEnabled ? audioTrack.disable() : audioTrack.enable();
        }
    }, [audioTrack]);

    return [isEnabled, toggleAudioEnabled];
}

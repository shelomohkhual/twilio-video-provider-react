import { useCallback, useState } from 'react';
import Video from 'twilio-video';

// import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_AUDIO_INPUT_KEY, SELECTED_VIDEO_INPUT_KEY } from '../../src/constants';
// import { getDeviceInfo, isPermissionDenied } from '../utils/localDevice';
export const DEFAULT_VIDEO_CONSTRAINTS = {
    width: 1280,
    height: 720,
    frameRate: 24,
};

// These are used to store the selected media devices in localStorage
export const SELECTED_AUDIO_INPUT_KEY = 'TwilioVideoApp-selectedAudioInput';
export const SELECTED_AUDIO_OUTPUT_KEY = 'TwilioVideoApp-selectedAudioOutput';
export const SELECTED_VIDEO_INPUT_KEY = 'TwilioVideoApp-selectedVideoInput';

// This is used to store the current background settings in localStorage
export const SELECTED_BACKGROUND_SETTINGS_KEY = 'TwilioVideoApp-selectedBackgroundSettings';

export const getDeviceInfo = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return {
        audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
        videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
        audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
        hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
        hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
    };
};

// This function will return 'true' when the specified permission has been denied by the user.
// If the API doesn't exist, or the query function returns an error, 'false' will be returned.
export const isPermissionDenied = async (name) => {
    if (navigator.permissions) {
        try {
            const result = await navigator.permissions.query({ name });
            return result.state === 'denied';
        } catch {
            return false;
        }
    } else {
        return false;
    }
};


export default function useLocalTracks() {
    const [audioTrack, setAudioTrack] = useState();
    const [videoTrack, setVideoTrack] = useState();
    const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = useState(false);

    const getLocalAudioTrack = useCallback((deviceId) => {
        const options = {};

        if (deviceId) {
            options.deviceId = { exact: deviceId };
        }

        return Video.createLocalAudioTrack(options).then(newTrack => {
            setAudioTrack(newTrack);
            return newTrack;
        });
    }, []);

    const getLocalVideoTrack = useCallback(async () => {
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

        const { videoInputDevices } = await getDeviceInfo();

        const hasSelectedVideoDevice = videoInputDevices.some(
            device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
        );

        const options = {
            ...(DEFAULT_VIDEO_CONSTRAINTS),
            name: `camera-${Date.now()}`,
            ...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } }),
        };

        return Video.createLocalVideoTrack(options).then(newTrack => {
            setVideoTrack(newTrack);
            return newTrack;
        });
    }, []);

    const removeLocalAudioTrack = useCallback(() => {
        if (audioTrack) {
            audioTrack.stop();
            setAudioTrack(undefined);
        }
    }, [audioTrack]);

    const removeLocalVideoTrack = useCallback(() => {
        if (videoTrack) {
            videoTrack.stop();
            setVideoTrack(undefined);
        }
    }, [videoTrack]);

    const getAudioAndVideoTracks = useCallback(async () => {
        const { audioInputDevices, videoInputDevices, hasAudioInputDevices, hasVideoInputDevices } = await getDeviceInfo();

        if (!hasAudioInputDevices && !hasVideoInputDevices) return Promise.resolve();
        if (isAcquiringLocalTracks || audioTrack || videoTrack) return Promise.resolve();

        setIsAcquiringLocalTracks(true);

        const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);
        const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

        const hasSelectedAudioDevice = audioInputDevices.some(
            device => selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId
        );
        const hasSelectedVideoDevice = videoInputDevices.some(
            device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
        );

        // In Chrome, it is possible to deny permissions to only audio or only video.
        // If that has happened, then we don't want to attempt to acquire the device.
        const isCameraPermissionDenied = await isPermissionDenied('camera');
        const isMicrophonePermissionDenied = await isPermissionDenied('microphone');

        const shouldAcquireVideo = hasVideoInputDevices && !isCameraPermissionDenied;
        const shouldAcquireAudio = hasAudioInputDevices && !isMicrophonePermissionDenied;

        const localTrackConstraints = {
            video: shouldAcquireVideo && {
                ...(DEFAULT_VIDEO_CONSTRAINTS),
                name: `camera-${Date.now()}`,
                ...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } }),
            },
            audio:
                shouldAcquireAudio &&
                (hasSelectedAudioDevice ? { deviceId: { exact: selectedAudioDeviceId } } : hasAudioInputDevices),
        };

        return Video.createLocalTracks(localTrackConstraints)
            .then(tracks => {
                const newVideoTrack = tracks.find(track => track.kind === 'video');
                const newAudioTrack = tracks.find(track => track.kind === 'audio');
                if (newVideoTrack) {
                    setVideoTrack(newVideoTrack);
                    // Save the deviceId so it can be picked up by the VideoInputList component. This only matters
                    // in cases where the user's video is disabled.
                    window.localStorage.setItem(
                        SELECTED_VIDEO_INPUT_KEY,
                        newVideoTrack.mediaStreamTrack.getSettings().deviceId ?? ''
                    );
                }
                if (newAudioTrack) {
                    setAudioTrack(newAudioTrack);
                }

                // These custom errors will be picked up by the MediaErrorSnackbar component.
                if (isCameraPermissionDenied && isMicrophonePermissionDenied) {
                    const error = new Error();
                    error.name = 'NotAllowedError';
                    throw error;
                }

                if (isCameraPermissionDenied) {
                    throw new Error('CameraPermissionsDenied');
                }

                if (isMicrophonePermissionDenied) {
                    throw new Error('MicrophonePermissionsDenied');
                }
            })
            .finally(() => setIsAcquiringLocalTracks(false));
    }, [audioTrack, videoTrack, isAcquiringLocalTracks]);

    const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined);

    return {
        localTracks,
        getLocalVideoTrack,
        getLocalAudioTrack,
        isAcquiringLocalTracks,
        removeLocalAudioTrack,
        removeLocalVideoTrack,
        getAudioAndVideoTracks,
    };
}

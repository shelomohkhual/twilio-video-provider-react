"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTED_VIDEO_INPUT_KEY = exports.SELECTED_BACKGROUND_SETTINGS_KEY = exports.SELECTED_AUDIO_OUTPUT_KEY = exports.SELECTED_AUDIO_INPUT_KEY = exports.DEFAULT_VIDEO_CONSTRAINTS = void 0;
exports.default = useLocalTracks;
exports.isPermissionDenied = exports.getDeviceInfo = void 0;

require("core-js/modules/es.promise.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.finally.js");

var _react = require("react");

var _twilioVideo = _interopRequireDefault(require("twilio-video"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_AUDIO_INPUT_KEY, SELECTED_VIDEO_INPUT_KEY } from '../../src/constants';
// import { getDeviceInfo, isPermissionDenied } from '../utils/localDevice';
const DEFAULT_VIDEO_CONSTRAINTS = {
  width: 1280,
  height: 720,
  frameRate: 24
}; // These are used to store the selected media devices in localStorage

exports.DEFAULT_VIDEO_CONSTRAINTS = DEFAULT_VIDEO_CONSTRAINTS;
const SELECTED_AUDIO_INPUT_KEY = 'TwilioVideoApp-selectedAudioInput';
exports.SELECTED_AUDIO_INPUT_KEY = SELECTED_AUDIO_INPUT_KEY;
const SELECTED_AUDIO_OUTPUT_KEY = 'TwilioVideoApp-selectedAudioOutput';
exports.SELECTED_AUDIO_OUTPUT_KEY = SELECTED_AUDIO_OUTPUT_KEY;
const SELECTED_VIDEO_INPUT_KEY = 'TwilioVideoApp-selectedVideoInput'; // This is used to store the current background settings in localStorage

exports.SELECTED_VIDEO_INPUT_KEY = SELECTED_VIDEO_INPUT_KEY;
const SELECTED_BACKGROUND_SETTINGS_KEY = 'TwilioVideoApp-selectedBackgroundSettings';
exports.SELECTED_BACKGROUND_SETTINGS_KEY = SELECTED_BACKGROUND_SETTINGS_KEY;

const getDeviceInfo = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  return {
    audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
    videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
    audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
    hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
    hasVideoInputDevices: devices.some(device => device.kind === 'videoinput')
  };
}; // This function will return 'true' when the specified permission has been denied by the user.
// If the API doesn't exist, or the query function returns an error, 'false' will be returned.


exports.getDeviceInfo = getDeviceInfo;

const isPermissionDenied = async name => {
  if (navigator.permissions) {
    try {
      const result = await navigator.permissions.query({
        name
      });
      return result.state === 'denied';
    } catch (_unused) {
      return false;
    }
  } else {
    return false;
  }
};

exports.isPermissionDenied = isPermissionDenied;

function useLocalTracks() {
  const [audioTrack, setAudioTrack] = (0, _react.useState)();
  const [videoTrack, setVideoTrack] = (0, _react.useState)();
  const [isAcquiringLocalTracks, setIsAcquiringLocalTracks] = (0, _react.useState)(false);
  const getLocalAudioTrack = (0, _react.useCallback)(deviceId => {
    const options = {};

    if (deviceId) {
      options.deviceId = {
        exact: deviceId
      };
    }

    return _twilioVideo.default.createLocalAudioTrack(options).then(newTrack => {
      setAudioTrack(newTrack);
      return newTrack;
    });
  }, []);
  const getLocalVideoTrack = (0, _react.useCallback)(async () => {
    const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);
    const {
      videoInputDevices
    } = await getDeviceInfo();
    const hasSelectedVideoDevice = videoInputDevices.some(device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId);

    const options = _objectSpread(_objectSpread({}, DEFAULT_VIDEO_CONSTRAINTS), {}, {
      name: "camera-".concat(Date.now())
    }, hasSelectedVideoDevice && {
      deviceId: {
        exact: selectedVideoDeviceId
      }
    });

    return _twilioVideo.default.createLocalVideoTrack(options).then(newTrack => {
      setVideoTrack(newTrack);
      return newTrack;
    });
  }, []);
  const removeLocalAudioTrack = (0, _react.useCallback)(() => {
    if (audioTrack) {
      audioTrack.stop();
      setAudioTrack(undefined);
    }
  }, [audioTrack]);
  const removeLocalVideoTrack = (0, _react.useCallback)(() => {
    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(undefined);
    }
  }, [videoTrack]);
  const getAudioAndVideoTracks = (0, _react.useCallback)(async () => {
    const {
      audioInputDevices,
      videoInputDevices,
      hasAudioInputDevices,
      hasVideoInputDevices
    } = await getDeviceInfo();
    if (!hasAudioInputDevices && !hasVideoInputDevices) return Promise.resolve();
    if (isAcquiringLocalTracks || audioTrack || videoTrack) return Promise.resolve();
    setIsAcquiringLocalTracks(true);
    const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);
    const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);
    const hasSelectedAudioDevice = audioInputDevices.some(device => selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId);
    const hasSelectedVideoDevice = videoInputDevices.some(device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId); // In Chrome, it is possible to deny permissions to only audio or only video.
    // If that has happened, then we don't want to attempt to acquire the device.

    const isCameraPermissionDenied = await isPermissionDenied('camera');
    const isMicrophonePermissionDenied = await isPermissionDenied('microphone');
    const shouldAcquireVideo = hasVideoInputDevices && !isCameraPermissionDenied;
    const shouldAcquireAudio = hasAudioInputDevices && !isMicrophonePermissionDenied;
    const localTrackConstraints = {
      video: shouldAcquireVideo && _objectSpread(_objectSpread({}, DEFAULT_VIDEO_CONSTRAINTS), {}, {
        name: "camera-".concat(Date.now())
      }, hasSelectedVideoDevice && {
        deviceId: {
          exact: selectedVideoDeviceId
        }
      }),
      audio: shouldAcquireAudio && (hasSelectedAudioDevice ? {
        deviceId: {
          exact: selectedAudioDeviceId
        }
      } : hasAudioInputDevices)
    };
    return _twilioVideo.default.createLocalTracks(localTrackConstraints).then(tracks => {
      const newVideoTrack = tracks.find(track => track.kind === 'video');
      const newAudioTrack = tracks.find(track => track.kind === 'audio');

      if (newVideoTrack) {
        var _newVideoTrack$mediaS;

        setVideoTrack(newVideoTrack); // Save the deviceId so it can be picked up by the VideoInputList component. This only matters
        // in cases where the user's video is disabled.

        window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, (_newVideoTrack$mediaS = newVideoTrack.mediaStreamTrack.getSettings().deviceId) !== null && _newVideoTrack$mediaS !== void 0 ? _newVideoTrack$mediaS : '');
      }

      if (newAudioTrack) {
        setAudioTrack(newAudioTrack);
      } // These custom errors will be picked up by the MediaErrorSnackbar component.


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
    }).finally(() => setIsAcquiringLocalTracks(false));
  }, [audioTrack, videoTrack, isAcquiringLocalTracks]);
  const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined);
  return {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks
  };
}
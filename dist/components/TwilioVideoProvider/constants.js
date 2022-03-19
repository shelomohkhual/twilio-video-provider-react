"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SELECTED_VIDEO_INPUT_KEY = exports.SELECTED_BACKGROUND_SETTINGS_KEY = exports.SELECTED_AUDIO_OUTPUT_KEY = exports.SELECTED_AUDIO_INPUT_KEY = exports.DEFAULT_VIDEO_CONSTRAINTS = void 0;
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
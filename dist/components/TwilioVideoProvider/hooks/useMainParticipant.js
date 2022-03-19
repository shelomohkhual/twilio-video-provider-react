"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useMainParticipant;

require("core-js/modules/web.dom-collections.iterator.js");

var _SelectedParticipantProvider = _interopRequireDefault(require("../contexts/SelectedParticipantProvider"));

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

var _useDominantSpeaker = _interopRequireDefault(require("./useDominantSpeaker"));

var _useParticipants = _interopRequireDefault(require("./useParticipants"));

var _useScreenShareParticipant = _interopRequireDefault(require("./useScreenShareParticipant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useMainParticipant() {
  const [selectedParticipant] = (0, _SelectedParticipantProvider.default)();
  const screenShareParticipant = (0, _useScreenShareParticipant.default)();
  const dominantSpeaker = (0, _useDominantSpeaker.default)();
  const participants = (0, _useParticipants.default)();
  const {
    room
  } = (0, _useVideoContext.default)();
  const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
  const remoteScreenShareParticipant = screenShareParticipant !== localParticipant ? screenShareParticipant : null; // The participant that is returned is displayed in the main video area. Changing the order of the following
  // variables will change the how the main speaker is determined.

  return selectedParticipant || remoteScreenShareParticipant || dominantSpeaker || participants[0] || localParticipant;
}
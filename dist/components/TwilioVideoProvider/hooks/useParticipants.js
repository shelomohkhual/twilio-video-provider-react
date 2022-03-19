"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParticipants;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

var _useDominantSpeaker = _interopRequireDefault(require("./useDominantSpeaker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useParticipants() {
  var _room$participants$va;

  const {
    room
  } = (0, _useVideoContext.default)();
  const dominantSpeaker = (0, _useDominantSpeaker.default)();
  const [participants, setParticipants] = (0, _react.useState)(Array.from((_room$participants$va = room === null || room === void 0 ? void 0 : room.participants.values()) !== null && _room$participants$va !== void 0 ? _room$participants$va : [])); // When the dominant speaker changes, they are moved to the front of the participants array.
  // This means that the most recent dominant speakers will always be near the top of the
  // ParticipantStrip component.

  (0, _react.useEffect)(() => {
    if (dominantSpeaker) {
      setParticipants(prevParticipants => [dominantSpeaker, ...prevParticipants.filter(participant => participant !== dominantSpeaker)]);
    }
  }, [dominantSpeaker]);
  (0, _react.useEffect)(() => {
    if (room) {
      const participantConnected = participant => setParticipants(prevParticipants => [...prevParticipants, participant]);

      const participantDisconnected = participant => setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));

      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      return () => {
        room.off('participantConnected', participantConnected);
        room.off('participantDisconnected', participantDisconnected);
      };
    }
  }, [room]);
  return participants;
}
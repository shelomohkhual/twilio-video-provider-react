"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScreenShareParticipant;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  Returns the participant that is sharing their screen (if any). This hook assumes that only one participant
  can share their screen at a time.
*/
function useScreenShareParticipant() {
  const {
    room
  } = (0, _useVideoContext.default)();
  const [screenShareParticipant, setScreenShareParticipant] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (room) {
      const updateScreenShareParticipant = () => {
        setScreenShareParticipant(Array.from(room.participants.values()) // the screenshare participant could be the localParticipant
        .concat(room.localParticipant).find(participant => Array.from(participant.tracks.values()).find(track => track.trackName.includes('screen'))));
      };

      updateScreenShareParticipant();
      room.on('trackPublished', updateScreenShareParticipant);
      room.on('trackUnpublished', updateScreenShareParticipant);
      room.on('participantDisconnected', updateScreenShareParticipant); // the room object does not emit 'trackPublished' events for the localParticipant,
      // so we need to listen for them here.

      room.localParticipant.on('trackPublished', updateScreenShareParticipant);
      room.localParticipant.on('trackUnpublished', updateScreenShareParticipant);
      return () => {
        room.off('trackPublished', updateScreenShareParticipant);
        room.off('trackUnpublished', updateScreenShareParticipant);
        room.off('participantDisconnected', updateScreenShareParticipant);
        room.localParticipant.off('trackPublished', updateScreenShareParticipant);
        room.localParticipant.off('trackUnpublished', updateScreenShareParticipant);
      };
    }
  }, [room]);
  return screenShareParticipant;
}
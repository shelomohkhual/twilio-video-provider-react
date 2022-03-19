"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useDominantSpeaker;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useDominantSpeaker() {
  var _room$dominantSpeaker;

  const {
    room
  } = (0, _useVideoContext.default)();
  const [dominantSpeaker, setDominantSpeaker] = (0, _react.useState)((_room$dominantSpeaker = room === null || room === void 0 ? void 0 : room.dominantSpeaker) !== null && _room$dominantSpeaker !== void 0 ? _room$dominantSpeaker : null);
  (0, _react.useEffect)(() => {
    if (room) {
      // Sometimes, the 'dominantSpeakerChanged' event can emit 'null', which means that
      // there is no dominant speaker. If we change the main participant when 'null' is
      // emitted, the effect can be jarring to the user. Here we ignore any 'null' values
      // and continue to display the previous dominant speaker as the main participant.
      const handleDominantSpeakerChanged = newDominantSpeaker => {
        if (newDominantSpeaker !== null) {
          setDominantSpeaker(newDominantSpeaker);
        }
      }; // Since 'null' values are ignored, we will need to listen for the 'participantDisconnected'
      // event, so we can set the dominantSpeaker to 'null' when they disconnect.


      const handleParticipantDisconnected = participant => {
        setDominantSpeaker(prevDominantSpeaker => {
          return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
        });
      };

      room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
      room.on('participantDisconnected', handleParticipantDisconnected);
      return () => {
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
        room.off('participantDisconnected', handleParticipantDisconnected);
      };
    }
  }, [room]);
  return dominantSpeaker;
}
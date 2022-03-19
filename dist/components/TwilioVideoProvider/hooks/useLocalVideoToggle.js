"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLocalVideoToggle;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useLocalVideoToggle() {
  const {
    room,
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
    onError
  } = (0, _useVideoContext.default)();
  const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
  const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
  const [isPublishing, setIspublishing] = (0, _react.useState)(false);
  const toggleVideoEnabled = (0, _react.useCallback)(() => {
    if (!isPublishing) {
      if (videoTrack) {
        const localTrackPublication = localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.unpublishTrack(videoTrack); // TODO: remove when SDK implements this event. See: https://issues.corp.twilio.com/browse/JSDK-2592

        localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.emit('trackUnpublished', localTrackPublication);
        removeLocalVideoTrack();
      } else {
        setIspublishing(true);
        getLocalVideoTrack().then(track => localParticipant === null || localParticipant === void 0 ? void 0 : localParticipant.publishTrack(track, {
          priority: 'low'
        })).catch(onError).finally(() => {
          setIspublishing(false);
        });
      }
    }
  }, [videoTrack, localParticipant, getLocalVideoTrack, isPublishing, onError, removeLocalVideoTrack]);
  return [!!videoTrack, toggleVideoEnabled];
}
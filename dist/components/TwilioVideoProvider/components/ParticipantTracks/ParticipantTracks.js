"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ParticipantTracks;

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireDefault(require("react"));

var _usePublications = _interopRequireDefault(require("../../hooks/usePublications"));

var _Publication = _interopRequireDefault(require("../Publication/Publication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */
function ParticipantTracks(_ref) {
  let {
    participant,
    videoOnly,
    enableScreenShare,
    videoPriority,
    isLocalParticipant
  } = _ref;
  const publications = (0, _usePublications.default)(participant);
  let filteredPublications;

  if (enableScreenShare && publications.some(p => p.trackName.includes('screen'))) {
    // When displaying a screenshare track is allowed, and a screen share track exists,
    // remove all video tracks without the name 'screen'.
    filteredPublications = publications.filter(p => p.trackName.includes('screen') || p.kind !== 'video');
  } else {
    // Else, remove all screenshare tracks
    filteredPublications = publications.filter(p => !p.trackName.includes('screen'));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, filteredPublications.map(publication => /*#__PURE__*/_react.default.createElement(_Publication.default, {
    key: publication.kind,
    publication: publication,
    participant: participant,
    isLocalParticipant: isLocalParticipant,
    videoOnly: videoOnly,
    videoPriority: videoPriority
  })));
}
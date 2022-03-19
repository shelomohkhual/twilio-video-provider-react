"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ParticipantInfo;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _react = _interopRequireDefault(require("react"));

var _useIsTrackSwitchedOff = _interopRequireDefault(require("../../hooks/useIsTrackSwitchedOff"));

var _useParticipantIsReconnecting = _interopRequireDefault(require("../../hooks/useParticipantIsReconnecting"));

var _usePublications = _interopRequireDefault(require("../../hooks/usePublications"));

var _useTrack = _interopRequireDefault(require("../../hooks/useTrack"));

var _AudioLevelIndicator = _interopRequireDefault(require("../AudioLevelIndicator/AudioLevelIndicator"));

var _NetworkQualityLevel = _interopRequireDefault(require("../NetworkQualityLevel/NetworkQualityLevel"));

var _twilioComponentsShared = _interopRequireDefault(require("../twilioComponentsShared.css"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import clsx from 'clsx';
function ParticipantInfo(_ref) {
  let {
    participant,
    onClick,
    isSelected,
    children,
    isLocalParticipant,
    hideParticipant
  } = _ref;
  const publications = (0, _usePublications.default)(participant);
  const audioPublication = publications.find(p => p.kind === 'audio');
  const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');
  const isVideoEnabled = Boolean(videoPublication);
  const isScreenShareEnabled = publications.find(p => p.trackName.includes('screen'));
  const videoTrack = (0, _useTrack.default)(videoPublication);
  const isVideoSwitchedOff = (0, _useIsTrackSwitchedOff.default)(videoTrack);
  const audioTrack = (0, _useTrack.default)(audioPublication);
  const isParticipantReconnecting = (0, _useParticipantIsReconnecting.default)(participant);
  var str = participant.identity;
  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join('');
  if (isSelected) return null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "participantVideoContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: isSelected ? _twilioComponentsShared.default.oneParticipantSelected : _twilioComponentsShared.default.oneParticipant //   className={clsx(style.container, {
    //     [style.hideParticipant]: hideParticipant,
    //     [style.cursorPointer]: Boolean(onClick),
    //   })}
    ,
    onClick: onClick,
    "data-cy-participant": participant.identity
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _twilioComponentsShared.default.infoContainer
  }, /*#__PURE__*/_react.default.createElement(_NetworkQualityLevel.default, {
    participant: participant
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: _twilioComponentsShared.default.infoRowBottom
  }, isScreenShareEnabled && /*#__PURE__*/_react.default.createElement("span", {
    className: _twilioComponentsShared.default.screenShareIconContainer
  }, "ScreenShareIcon"), /*#__PURE__*/_react.default.createElement("span", {
    className: _twilioComponentsShared.default.identity
  }, /*#__PURE__*/_react.default.createElement(_AudioLevelIndicator.default, {
    audioTrack: audioTrack
  }), participant.identity))), /*#__PURE__*/_react.default.createElement("div", {
    className: _twilioComponentsShared.default.innerContainer
  }, (!isVideoEnabled || isVideoSwitchedOff) && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: _twilioComponentsShared.default.avatarContainer
  }, /*#__PURE__*/_react.default.createElement("span", null, acronym))), isParticipantReconnecting && /*#__PURE__*/_react.default.createElement("div", {
    className: _twilioComponentsShared.default.reconnectingContainer
  }, /*#__PURE__*/_react.default.createElement("p", {
    variant: "body1",
    className: _twilioComponentsShared.default.typeography
  }, "Reconnecting...")), children)));
}
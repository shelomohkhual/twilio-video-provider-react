"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MainParticipantInfo;

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.match.js");

var _react = _interopRequireDefault(require("react"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _usePublications = _interopRequireDefault(require("../../hooks/usePublications"));

var _useTrack = _interopRequireDefault(require("../../hooks/useTrack"));

var _useIsTrackSwitchedOff = _interopRequireDefault(require("../../hooks/useIsTrackSwitchedOff"));

var _useParticipantIsReconnecting = _interopRequireDefault(require("../../hooks/useParticipantIsReconnecting"));

require("../twilioComponentsShared.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import clsx from 'clsx';
// import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
// import useIsRecording from '../../hooks/useIsRecording';
// import AudioLevelIndicator from '../AudioLevelIndicator/AudioLevelIndicator';
// import NetworkQualityLevel from '../NetworkQualityLevel/NetworkQualityLevel';
function MainParticipantInfo(_ref) {
  let {
    participant,
    children
  } = _ref;
  const {
    room
  } = (0, _useVideoContext.default)();
  const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
  const isLocal = localParticipant === participant; // const screenShareParticipant = useScreenShareParticipant();
  // const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

  const publications = (0, _usePublications.default)(participant);
  const videoPublication = publications.find(p => !p.trackName.includes('screen') && p.kind === 'video');
  const screenSharePublication = publications.find(p => p.trackName.includes('screen'));
  const videoTrack = (0, _useTrack.default)(screenSharePublication || videoPublication);
  const isVideoEnabled = Boolean(videoTrack); // const audioPublication = publications.find(p => p.kind === 'audio');
  // const audioTrack = useTrack(audioPublication);

  const isVideoSwitchedOff = (0, _useIsTrackSwitchedOff.default)(videoTrack);
  const isParticipantReconnecting = (0, _useParticipantIsReconnecting.default)(participant); // const isRecording = useIsRecording();

  var str = participant.identity;
  var matches = str.match(/\b(\w)/g);
  var acronym = matches.join('');
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: 'infoContainer'
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'identity'
  }, /*#__PURE__*/_react.default.createElement("p", null, participant.identity, isLocal && ' (You)', screenSharePublication && ' - Screen')))), isParticipantReconnecting && /*#__PURE__*/_react.default.createElement("div", {
    className: 'reconnectingContainer'
  }, /*#__PURE__*/_react.default.createElement("p", {
    variant: "body1",
    style: {
      color: 'white'
    }
  }, "Reconnecting...")), (!isVideoEnabled || isVideoSwitchedOff) && /*#__PURE__*/_react.default.createElement("span", {
    className: "avatarText"
  }, acronym), /*#__PURE__*/_react.default.createElement("div", {
    className: "mainVideoWrapper"
  }, children));
}
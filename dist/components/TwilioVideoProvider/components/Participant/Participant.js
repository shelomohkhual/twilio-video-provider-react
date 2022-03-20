"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Participant;

var _react = _interopRequireDefault(require("react"));

var _ParticipantInfo = _interopRequireDefault(require("../ParticipantInfo/ParticipantInfo"));

var _ParticipantTracks = _interopRequireDefault(require("../ParticipantTracks/ParticipantTracks"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Participant(_ref) {
  let {
    participant,
    videoOnly,
    enableScreenShare,
    onClick,
    isSelected,
    isLocalParticipant,
    hideParticipant
  } = _ref;
  if (!participant) return;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParticipantInfo.default, {
    participant: participant,
    onClick: onClick,
    isSelected: isSelected,
    isLocalParticipant: isLocalParticipant,
    hideParticipant: hideParticipant,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParticipantTracks.default, {
      participant: participant,
      videoOnly: videoOnly,
      enableScreenShare: enableScreenShare,
      isLocalParticipant: isLocalParticipant
    })
  });
}
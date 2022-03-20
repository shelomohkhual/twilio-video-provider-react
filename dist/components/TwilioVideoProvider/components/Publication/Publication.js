"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Publication;

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireDefault(require("react"));

var _useTrack = _interopRequireDefault(require("../../hooks/useTrack"));

var _AudioTrack = _interopRequireDefault(require("../AudioTrack/AudioTrack"));

var _VideoTrack = _interopRequireDefault(require("../VideoTrack/VideoTrack"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Publication(_ref) {
  let {
    publication,
    isLocalParticipant,
    videoOnly,
    videoPriority
  } = _ref;
  const track = (0, _useTrack.default)(publication);
  if (!track) return null;

  switch (track.kind) {
    case 'video':
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_VideoTrack.default, {
        track: track,
        priority: videoPriority,
        isLocal: !track.name.includes('screen') && isLocalParticipant
      });

    case 'audio':
      return videoOnly ? null : /*#__PURE__*/(0, _jsxRuntime.jsx)(_AudioTrack.default, {
        track: track
      });

    default:
      return null;
  }
}
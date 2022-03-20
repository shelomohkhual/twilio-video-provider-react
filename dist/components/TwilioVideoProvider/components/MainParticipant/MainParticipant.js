"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useScreenShareParticipant = _interopRequireDefault(require("../../hooks/useScreenShareParticipant"));

var _SelectedParticipantProvider = _interopRequireDefault(require("../../contexts/SelectedParticipantProvider"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _useMainParticipant = _interopRequireDefault(require("../../hooks/useMainParticipant"));

var _MainParticipantInfo = _interopRequireDefault(require("../MainParticipantInfo/MainParticipantInfo"));

var _ParticipantTracks = _interopRequireDefault(require("../ParticipantTracks/ParticipantTracks"));

var _LocalVideoPreview = _interopRequireDefault(require("../LocalVideoPreview/LocalVideoPreview"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MainParticipant = _ => {
  const mainParticipant = (0, _useMainParticipant.default)();
  const {
    room
  } = (0, _useVideoContext.default)();
  const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
  const [selectedParticipant] = (0, _SelectedParticipantProvider.default)();
  const screenShareParticipant = (0, _useScreenShareParticipant.default)();
  if (!mainParticipant) return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LocalVideoPreview.default, {});
  const videoPriority = (mainParticipant === selectedParticipant || mainParticipant === screenShareParticipant) && mainParticipant !== localParticipant ? 'high' : null;
  return (
    /*#__PURE__*/

    /* audio is disabled for this participant component because this participant's audio
    is already being rendered in the <ParticipantStrip /> component.  */
    (0, _jsxRuntime.jsx)("div", {
      className: "mainVideoContainer",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MainParticipantInfo.default, {
        participant: mainParticipant,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParticipantTracks.default, {
          participant: mainParticipant,
          videoOnly: true // enableScreenShare={mainParticipant !== localParticipant}
          ,
          enableScreenShare: true,
          videoPriority: videoPriority,
          isLocalParticipant: mainParticipant === localParticipant
        })
      })
    })
  );
};

MainParticipant.propTypes = {};
var _default = MainParticipant;
exports.default = _default;
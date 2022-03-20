"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _LocalVideoPreview = _interopRequireDefault(require("./components/LocalVideoPreview/LocalVideoPreview"));

var _MainParticipant = _interopRequireDefault(require("./components/MainParticipant/MainParticipant"));

var _ParticipantList = _interopRequireDefault(require("./components/ParticipantList/ParticipantList"));

var _RoomHeading = _interopRequireDefault(require("./components/RoomHeading/RoomHeading"));

var _UserActions = _interopRequireDefault(require("./components/UserActions/UserActions"));

var _useVideoContext = _interopRequireDefault(require("./contexts/useVideoContext"));

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VideoRoom = props => {
  const {
    getAudioAndVideoTracks,
    room
  } = (0, _useVideoContext.default)();
  const [mediaError, setMediaError] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (!mediaError) {
      getAudioAndVideoTracks().catch(error => {
        console.log('Error acquiring local media:');
        console.dir(error);
        setMediaError(error);
      });
    }
  }, [getAudioAndVideoTracks, mediaError]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: 'videoRoom',
    children: [room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParticipantList.default, {}), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: 'mainContainer',
      children: [room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_RoomHeading.default, {}), !room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LocalVideoPreview.default, {}), room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_MainParticipant.default, {}), room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ParticipantList.default, {
        mobile: true
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_UserActions.default, {})]
    })]
  });
};

var _default = VideoRoom;
exports.default = _default;
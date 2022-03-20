"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoContext = void 0;
exports.VideoProvider = VideoProvider;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _AttachVisibilityHandler = _interopRequireDefault(require("../components/AttachVisibilityHandler/AttachVisibilityHandler"));

var _useHandleRoomDisconnection = _interopRequireDefault(require("../hooks/useHandleRoomDisconnection"));

var _useHandleTrackPublicationFailed = _interopRequireDefault(require("../hooks/useHandleTrackPublicationFailed"));

var _useLocalTracks = _interopRequireDefault(require("../hooks/useLocalTracks"));

var _useRestartAudioTrackOnDeviceChange = _interopRequireDefault(require("../hooks/useRestartAudioTrackOnDeviceChange"));

var _useRoom = _interopRequireDefault(require("../hooks/useRoom"));

var _useScreenShareToggle = _interopRequireDefault(require("../hooks/useScreenShareToggle"));

var _SelectedParticipantProvider = require("./SelectedParticipantProvider");

var _jsxRuntime = require("react/jsx-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/*
 *  The hooks used by the VideoProvider component are different than the hooks found in the 'hooks/' directory. The hooks
 *  in the 'hooks/' directory can be used anywhere in a video application, and they can be used any number of times.
 *  the hooks in the 'VideoProvider/' directory are intended to be used by the VideoProvider component only. Using these hooks
 *  elsewhere in the application may cause problems as these hooks should not be used more than once in an application.
 */
const VideoContext = /*#__PURE__*/(0, _react.createContext)();
exports.VideoContext = VideoContext;

function VideoProvider(_ref) {
  let {
    options,
    children,
    onError = () => {}
  } = _ref;
  const onErrorCallback = (0, _react.useCallback)(error => {
    console.log("ERROR: ".concat(error.message), error);
    onError(error);
  }, [onError]);
  const {
    localTracks,
    getLocalVideoTrack,
    getLocalAudioTrack,
    isAcquiringLocalTracks,
    removeLocalAudioTrack,
    removeLocalVideoTrack,
    getAudioAndVideoTracks
  } = (0, _useLocalTracks.default)();
  const {
    room,
    isConnecting,
    connect
  } = (0, _useRoom.default)(localTracks, onErrorCallback, options);
  const [isSharingScreen, toggleScreenShare] = (0, _useScreenShareToggle.default)(room, onError); // Register callback functions to be called on room disconnect.

  (0, _useHandleRoomDisconnection.default)(room, onError, removeLocalAudioTrack, removeLocalVideoTrack, isSharingScreen, toggleScreenShare);
  (0, _useHandleTrackPublicationFailed.default)(room, onError);
  (0, _useRestartAudioTrackOnDeviceChange.default)(localTracks);
  const [isBackgroundSelectionOpen, setIsBackgroundSelectionOpen] = (0, _react.useState)(false); // const videoTrack = localTracks.find(track => !track.name.includes('screen') && track.kind === 'video');
  //   const [backgroundSettings, setBackgroundSettings] = useBackgroundSettings(videoTrack, room);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(VideoContext.Provider, {
    value: {
      room,
      localTracks,
      isConnecting,
      onError: onErrorCallback,
      getLocalVideoTrack,
      getLocalAudioTrack,
      connect,
      isAcquiringLocalTracks,
      removeLocalVideoTrack,
      isSharingScreen,
      toggleScreenShare,
      getAudioAndVideoTracks,
      isBackgroundSelectionOpen,
      setIsBackgroundSelectionOpen // backgroundSettings,
      // setBackgroundSettings,

    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SelectedParticipantProvider.SelectedParticipantProvider, {
      room: room,
      children: children
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_AttachVisibilityHandler.default, {})]
  });
}
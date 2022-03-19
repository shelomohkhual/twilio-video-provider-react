"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsRecording;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useIsRecording() {
  const {
    room
  } = (0, _useVideoContext.default)();
  const [isRecording, setIsRecording] = (0, _react.useState)(Boolean(room === null || room === void 0 ? void 0 : room.isRecording));
  (0, _react.useEffect)(() => {
    if (room) {
      setIsRecording(room.isRecording);

      const handleRecordingStarted = () => setIsRecording(true);

      const handleRecordingStopped = () => setIsRecording(false);

      room.on('recordingStarted', handleRecordingStarted);
      room.on('recordingStopped', handleRecordingStopped);
      return () => {
        room.off('recordingStarted', handleRecordingStarted);
        room.off('recordingStopped', handleRecordingStopped);
      };
    }
  }, [room]);
  return isRecording;
}
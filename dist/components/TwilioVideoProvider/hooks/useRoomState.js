"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRoomState;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../contexts/useVideoContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useRoomState() {
  const {
    room
  } = (0, _useVideoContext.default)();
  const [state, setState] = (0, _react.useState)('disconnected');
  (0, _react.useEffect)(() => {
    if (room) {
      const setRoomState = () => setState(room.state);

      setRoomState();
      room.on('disconnected', setRoomState).on('reconnected', setRoomState).on('reconnecting', setRoomState);
      return () => {
        room.off('disconnected', setRoomState).off('reconnected', setRoomState).off('reconnecting', setRoomState);
      };
    }
  }, [room]);
  return state;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AttachVisibilityHandler;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _useLocalVideoToggle = _interopRequireDefault(require("../../hooks/useLocalVideoToggle"));

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
  This component adds a visibilitychange handler to the document when
  the user is using a mobile device. When the handler detects that
  the browser has been backgrounded, it unpublishes the users local
  video track. The browser cannot send video to the room when it has
  been backgrounded, so unpublishing the track stops video capture
  on the device, and triggers a UI update for all other participants
  to show that this user's video track has been turned off.
*/
function AttachVisibilityHandler() {
  const {
    room
  } = (0, _useVideoContext.default)();
  const [isVideoEnabled, toggleVideoEnabled] = (0, _useLocalVideoToggle.default)();
  const shouldRepublishVideoOnForeground = (0, _react.useRef)(false);
  (0, _react.useEffect)(() => {
    if (room && _utils.isMobile) {
      const handleVisibilityChange = () => {
        // We don't need to unpublish the local video track if it has already been unpublished
        if (document.visibilityState === 'hidden' && isVideoEnabled) {
          shouldRepublishVideoOnForeground.current = true;
          toggleVideoEnabled(); // Don't publish the local video track if it wasn't published before the app was backgrounded
        } else if (shouldRepublishVideoOnForeground.current) {
          shouldRepublishVideoOnForeground.current = false;
          toggleVideoEnabled();
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, [isVideoEnabled, room, toggleVideoEnabled]);
  return null;
}
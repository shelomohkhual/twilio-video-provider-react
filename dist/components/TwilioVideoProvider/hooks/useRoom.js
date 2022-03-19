"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRoom;
exports.isMobile = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _twilioVideo = _interopRequireDefault(require("twilio-video"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

window.TwilioVideo = _twilioVideo.default;

const isMobile = (() => {
  if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
    return false;
  }

  return /Mobile/.test(navigator.userAgent);
})();

exports.isMobile = isMobile;

function useRoom(localTracks, onError, options) {
  const [room, setRoom] = (0, _react.useState)(null);
  const [isConnecting, setIsConnecting] = (0, _react.useState)(false);
  const optionsRef = (0, _react.useRef)(options);
  (0, _react.useEffect)(() => {
    // This allows the connect function to always access the most recent version of the options object. This allows us to
    // reliably use the connect function at any time.
    optionsRef.current = options;
  }, [options]);
  const connect = (0, _react.useCallback)(token => {
    setIsConnecting(true);
    return _twilioVideo.default.connect(token, _objectSpread(_objectSpread({}, optionsRef.current), {}, {
      tracks: localTracks // "room": "A new webinar",
      // "name": "A new webinar"

    })).then(newRoom => {
      setRoom(newRoom); //   VideoRoomMonitor.registerVideoRoom(newRoom);

      const disconnect = () => newRoom.disconnect(); // This app can add up to 13 'participantDisconnected' listeners to the room object, which can trigger
      // a warning from the EventEmitter object. Here we increase the max listeners to suppress the warning.


      newRoom.setMaxListeners(15);
      newRoom.once('disconnected', () => {
        // Reset the room only after all other `disconnected` listeners have been called.
        setTimeout(() => setRoom(null));
        window.removeEventListener('beforeunload', disconnect);

        if (isMobile) {
          window.removeEventListener('pagehide', disconnect);
        }
      }); // @ts-ignore

      window.twilioRoom = newRoom;
      newRoom.localParticipant.videoTracks.forEach(publication => // All video tracks are published with 'low' priority because the video track
      // that is displayed in the 'MainParticipant' component will have it's priority
      // set to 'high' via track.setPriority()
      publication.setPriority('low'));
      setIsConnecting(false); // Add a listener to disconnect from the room when a user closes their browser

      window.addEventListener('beforeunload', disconnect);

      if (isMobile) {
        // Add a listener to disconnect from the room when a mobile user closes their browser
        window.addEventListener('pagehide', disconnect);
      }
    }, error => {
      onError(error);
      setIsConnecting(false);
    });
  }, [localTracks, onError]);
  return {
    room,
    isConnecting,
    connect
  };
}
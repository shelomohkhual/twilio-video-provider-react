"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.string.includes.js");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _useMediaStreamTrack = _interopRequireDefault(require("../../hooks/useMediaStreamTrack"));

var _useVideoTrackDimensions = _interopRequireDefault(require("../../hooks/useVideoTrackDimensions"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VideoTrack = props => {
  var _dimensions$height, _dimensions$width;

  const {
    track,
    isLocal,
    priority
  } = props;
  const ref = (0, _react.useRef)(null);
  const mediaStreamTrack = (0, _useMediaStreamTrack.default)(track);
  const dimensions = (0, _useVideoTrackDimensions.default)(track);
  const isPortrait = ((_dimensions$height = dimensions === null || dimensions === void 0 ? void 0 : dimensions.height) !== null && _dimensions$height !== void 0 ? _dimensions$height : 0) > ((_dimensions$width = dimensions === null || dimensions === void 0 ? void 0 : dimensions.width) !== null && _dimensions$width !== void 0 ? _dimensions$width : 0);
  (0, _react.useEffect)(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;

    if (track.setPriority && priority) {
      track.setPriority(priority);
    }

    track.attach(el);
    return () => {
      track.detach(el); // This addresses a Chrome issue where the number of WebMediaPlayers is limited.
      // See: https://github.com/twilio/twilio-video.js/issues/1528

      el.srcObject = null;

      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]); // The local video track is mirrored if it is not facing the environment.

  const isFrontFacing = (mediaStreamTrack === null || mediaStreamTrack === void 0 ? void 0 : mediaStreamTrack.getSettings().facingMode) !== 'environment';
  const style = {
    transform: isLocal && isFrontFacing ? 'rotateY(180deg)' : '',
    objectFit: isPortrait || track.name.includes('screen') ? 'contain' : 'cover'
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("video", {
    ref: ref,
    style: {
      width: '100%',
      height: '100%'
    }
  });
};

VideoTrack.propTypes = {};
var _default = VideoTrack;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectedParticipantProvider = SelectedParticipantProvider;
exports.default = useSelectedParticipant;
exports.selectedParticipantContext = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const selectedParticipantContext = /*#__PURE__*/(0, _react.createContext)(null);
exports.selectedParticipantContext = selectedParticipantContext;

function useSelectedParticipant() {
  const [selectedParticipant, setSelectedParticipant] = (0, _react.useContext)(selectedParticipantContext);
  return [selectedParticipant, setSelectedParticipant];
}

function SelectedParticipantProvider(_ref) {
  let {
    room,
    children
  } = _ref;
  const [selectedParticipant, _setSelectedParticipant] = (0, _react.useState)(null);

  const setSelectedParticipant = participant => _setSelectedParticipant(prevParticipant => prevParticipant === participant ? null : participant);

  (0, _react.useEffect)(() => {
    if (room) {
      const onDisconnect = () => _setSelectedParticipant(null);

      const handleParticipantDisconnected = participant => _setSelectedParticipant(prevParticipant => prevParticipant === participant ? null : prevParticipant);

      room.on('disconnected', onDisconnect);
      room.on('participantDisconnected', handleParticipantDisconnected);
      return () => {
        room.off('disconnected', onDisconnect);
        room.off('participantDisconnected', handleParticipantDisconnected);
      };
    }
  }, [room]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(selectedParticipantContext.Provider, {
    value: [selectedParticipant, setSelectedParticipant],
    children: children
  });
}
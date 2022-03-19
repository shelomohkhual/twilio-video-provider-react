"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParticipantIsReconnecting;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useParticipantIsReconnecting(participant) {
  const [isReconnecting, setIsReconnecting] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const handleReconnecting = () => setIsReconnecting(true);

    const handleReconnected = () => setIsReconnecting(false);

    handleReconnected(); // Reset state when there is a new participant

    participant.on('reconnecting', handleReconnecting);
    participant.on('reconnected', handleReconnected);
    return () => {
      participant.off('reconnecting', handleReconnecting);
      participant.off('reconnected', handleReconnected);
    };
  }, [participant]);
  return isReconnecting;
}
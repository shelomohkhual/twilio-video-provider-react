"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useParticipantNetworkQualityLevel;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useParticipantNetworkQualityLevel(participant) {
  const [networkQualityLevel, setNetworkQualityLevel] = (0, _react.useState)(participant.networkQualityLevel);
  (0, _react.useEffect)(() => {
    const handleNewtorkQualityLevelChange = newNetworkQualityLevel => setNetworkQualityLevel(newNetworkQualityLevel);

    setNetworkQualityLevel(participant.networkQualityLevel);
    participant.on('networkQualityLevelChanged', handleNewtorkQualityLevelChange);
    return () => {
      participant.off('networkQualityLevelChanged', handleNewtorkQualityLevelChange);
    };
  }, [participant]);
  return networkQualityLevel;
}
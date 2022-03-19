"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = usePublications;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function usePublications(participant) {
  const [publications, setPublications] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // Reset the publications when the 'participant' variable changes.
    setPublications(Array.from(participant.tracks.values()));

    const publicationAdded = publication => setPublications(prevPublications => [...prevPublications, publication]);

    const publicationRemoved = publication => setPublications(prevPublications => prevPublications.filter(p => p !== publication));

    participant.on('trackPublished', publicationAdded);
    participant.on('trackUnpublished', publicationRemoved);
    return () => {
      participant.off('trackPublished', publicationAdded);
      participant.off('trackUnpublished', publicationRemoved);
    };
  }, [participant]);
  return publications;
}
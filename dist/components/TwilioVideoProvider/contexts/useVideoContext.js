"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useVideoContext;

var _react = require("react");

var _VideoProvider = require("./VideoProvider");

function useVideoContext() {
  const context = (0, _react.useContext)(_VideoProvider.VideoContext);

  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }

  return context;
}
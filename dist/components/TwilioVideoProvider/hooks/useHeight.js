"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useHeight;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

function useHeight() {
  var _window$visualViewpor;

  const [height, setHeight] = (0, _react.useState)(window.innerHeight * (((_window$visualViewpor = window.visualViewport) === null || _window$visualViewpor === void 0 ? void 0 : _window$visualViewpor.scale) || 1));
  (0, _react.useEffect)(() => {
    const onResize = () => {
      var _window$visualViewpor2;

      setHeight(window.innerHeight * (((_window$visualViewpor2 = window.visualViewport) === null || _window$visualViewpor2 === void 0 ? void 0 : _window$visualViewpor2.scale) || 1));
    };

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  });
  return height + 'px';
}
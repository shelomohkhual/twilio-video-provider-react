"use strict";

var _jsxRuntime = require("react/jsx-runtime");

/*#__PURE__*/
(0, _jsxRuntime.jsxs)("div", {
  style: {
    width: '100%'
  },
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      width: '100%',
      minHeight: 'calc(100vh - (var(--topbarHeightDesktop) + 70px))',
      display: 'flex'
    },
    children: !room ? /*#__PURE__*/(0, _jsxRuntime.jsx)(LocalVideoPreview, {
      localTracks: localTracks,
      identity: "shelomoh",
      user: convertAllSdkTypes(currentUser)
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "paricipant-container",
        style: {
          width: '25%',
          backgroundColor: 'black'
        },
        children: room && /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        id: "primary-display-container",
        style: {
          width: '75%',
          backgroundColor: 'grey'
        }
      })]
    })
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      children: "Mic"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      children: "Cam"
    }), !room ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_jsxRuntime.Fragment, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleOnJoin,
        children: "Join"
      })
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleOnShareScreen,
        children: "Screen"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
        onClick: handleOnEndCall,
        children: "End"
      })]
    })]
  })]
});
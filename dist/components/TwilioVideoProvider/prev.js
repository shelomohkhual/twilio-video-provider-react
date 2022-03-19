"use strict";

/*#__PURE__*/
React.createElement("div", {
  style: {
    width: '100%'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: '100%',
    minHeight: 'calc(100vh - (var(--topbarHeightDesktop) + 70px))',
    display: 'flex'
  }
}, !room ? /*#__PURE__*/React.createElement(LocalVideoPreview, {
  localTracks: localTracks,
  identity: "shelomoh",
  user: convertAllSdkTypes(currentUser)
}) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
  id: "paricipant-container",
  style: {
    width: '25%',
    backgroundColor: 'black'
  }
}, room && /*#__PURE__*/React.createElement(React.Fragment, null)), /*#__PURE__*/React.createElement("div", {
  id: "primary-display-container",
  style: {
    width: '75%',
    backgroundColor: 'grey'
  }
}))), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    justifyContent: 'center'
  }
}, /*#__PURE__*/React.createElement("button", null, "Mic"), /*#__PURE__*/React.createElement("button", null, "Cam"), !room ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
  onClick: handleOnJoin
}, "Join")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
  onClick: handleOnShareScreen
}, "Screen"), /*#__PURE__*/React.createElement("button", {
  onClick: handleOnEndCall
}, "End"))));
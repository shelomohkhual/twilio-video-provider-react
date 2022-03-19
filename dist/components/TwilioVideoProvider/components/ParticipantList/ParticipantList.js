"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _useMainParticipant = _interopRequireDefault(require("../../hooks/useMainParticipant"));

var _useParticipants = _interopRequireDefault(require("../../hooks/useParticipants"));

var _useScreenShareParticipant = _interopRequireDefault(require("../../hooks/useScreenShareParticipant"));

var _SelectedParticipantProvider = _interopRequireDefault(require("../../contexts/SelectedParticipantProvider"));

var _useVideoContext = _interopRequireDefault(require("../../contexts/useVideoContext"));

var _Participant = _interopRequireDefault(require("../Participant/Participant"));

var _usePublications = _interopRequireDefault(require("../../hooks/usePublications"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ParticipantList = props => {
  const {
    mobile
  } = props;
  const {
    room
  } = (0, _useVideoContext.default)();
  const localParticipant = room === null || room === void 0 ? void 0 : room.localParticipant;
  const participants = (0, _useParticipants.default)();
  const [selectedParticipant, setSelectedParticipant] = (0, _SelectedParticipantProvider.default)();
  const screenShareParticipant = (0, _useScreenShareParticipant.default)();
  const mainParticipant = (0, _useMainParticipant.default)();
  const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;
  if (participants.length === 0) return null; // Don't render this component if there are no remote participants.

  return (
    /*#__PURE__*/
    // <aside
    //     //   className={clsx(style.container, {
    //     //     [style.transparentBackground]: !isRemoteParticipantScreenSharing,
    //     //   })}
    //     style={{
    //         overflowY: 'auto',
    //         // background: 'rgb(79, 83, 85)',
    //         gridArea: '1 / 2 / 1 / 3',
    //         zIndex: 5,
    //         // [theme.breakpoints.down('sm')]: {
    //         // gridArea: '2 / 1 / 3 / 3',
    //         // overflowY: 'initial',
    //         overflowX: 'auto',
    //         display: 'flex',
    //         background: isRemoteParticipantScreenSharing ? 'transparent' : 'rgb(79, 83, 85)',
    //         // },
    //     }}
    // // >
    //     <div
    //         // className={style.scrollContainer}
    //         style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //         }}
    //     >
    // <div className={style.innerScrollContainer} style={{
    //     width: `calc(${100}px - 3em)`,
    //     padding: '1.5em 0',
    // [theme.breakpoints.down('sm')]: {
    // width: 'auto',
    // padding: `${theme.sidebarMobilePadding}px`,
    // display: 'flex',
    // }
    // }}>
    _react.default.createElement("div", {
      className: "participantsContainer ".concat(mobile ? 'mobile' : 'desktop')
    }, /*#__PURE__*/_react.default.createElement(_Participant.default, {
      participant: localParticipant,
      isLocalParticipant: true,
      isSelected: false // isSelected={localParticipant === selectedParticipant}
      ,
      onClick: () => setSelectedParticipant(localParticipant)
    }), participants.map(participant => {
      const isSelected = false; // participant === selectedParticipant;

      const hideParticipant = false; // participant === mainParticipant
      // && participant !== screenShareParticipant && !isSelected;

      return /*#__PURE__*/_react.default.createElement(_Participant.default, {
        enableScreenShare: true,
        key: participant.sid,
        participant: participant,
        isSelected: isSelected,
        onClick: () => setSelectedParticipant(participant),
        hideParticipant: hideParticipant
      });
    })) // </div>
    //     </div>
    // </aside>

  );
};

var _default = ParticipantList;
exports.default = _default;
import React from 'react';

import useMainParticipant from '../../hooks/useMainParticipant';
import useParticipants from '../../hooks/useParticipants';
import useScreenShareParticipant from '../../hooks/useScreenShareParticipant';
import useSelectedParticipant from '../../contexts/SelectedParticipantProvider';
import useVideoContext from '../../contexts/useVideoContext';
import Participant from '../Participant/Participant';
import usePublications from '../../hooks/usePublications';


export default function ParticipantList(props) {
    const { mobile } = props;

    const { room } = useVideoContext();
    const localParticipant = room?.localParticipant;
    const participants = useParticipants();
    const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant();
    const screenShareParticipant = useScreenShareParticipant();
    const mainParticipant = useMainParticipant();
    const isRemoteParticipantScreenSharing = screenShareParticipant && screenShareParticipant !== localParticipant;

    if (participants.length === 0) return null; // Don't render this component if there are no remote participants.
    return (
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
        <div className={`participantsContainer ${mobile ? 'mobile' : 'desktop'}`}>
            <Participant
                participant={localParticipant}
                isLocalParticipant={true}
                isSelected={false}
                // isSelected={localParticipant === selectedParticipant}
                onClick={() => setSelectedParticipant(localParticipant)}
            />
            {participants.map(participant => {
                const isSelected = false;
                // participant === selectedParticipant;
                const hideParticipant = false;
                // participant === mainParticipant
                // && participant !== screenShareParticipant && !isSelected;

                return (<Participant
                    enableScreenShare
                    key={participant.sid}
                    participant={participant}
                    isSelected={isSelected}
                    onClick={() => setSelectedParticipant(participant)}
                    hideParticipant={hideParticipant}
                />
                );
            })}
        </div>
        // </div>
        //     </div>
        // </aside>
    );
}

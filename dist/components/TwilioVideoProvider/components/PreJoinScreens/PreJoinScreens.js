// import React, { useState, useEffect } from 'react';
// import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
// import IntroContainer from '../IntroContainer/IntroContainer';
// import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
// import { useParams } from 'react-router-dom';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';
// export const Steps = {
//     roomNameStep: 'roomNameStep',
//     deviceSelectionStep: 'deviceSelectionStep'
// };
// export default function PreJoinScreens({ user }) {
//     const { getAudioAndVideoTracks } = useVideoContext();
//     const { URLRoomName } = useParams();
//     const [step, setStep] = useState(Steps.roomNameStep);
//     const [name, setName] = useState(user?.displayName || '');
//     const [roomName, setRoomName] = useState('');
//     const [mediaError, setMediaError] = useState();
//     useEffect(() => {
//         if (URLRoomName) {
//             setRoomName(URLRoomName);
//             if (user?.displayName) {
//                 setStep(Steps.deviceSelectionStep);
//             }
//         }
//     }, [user, URLRoomName]);
//     useEffect(() => {
//         if (step === Steps.deviceSelectionStep && !mediaError) {
//             getAudioAndVideoTracks().catch(error => {
//                 console.log('Error acquiring local media:');
//                 console.dir(error);
//                 setMediaError(error);
//             });
//         }
//     }, [getAudioAndVideoTracks, step, mediaError]);
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
//         // if (!window.location.origin.includes('twil.io')) {
//         //   window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
//         // }
//         setStep(Steps.deviceSelectionStep);
//     };
//     return (
//         <IntroContainer>
//             <MediaErrorSnackbar error={mediaError} />
//             {step === Steps.roomNameStep && (
//                 <button onClick={handleSubmit}>Join</button>
//             )}
//             {step === Steps.deviceSelectionStep && (
//                 <DeviceSelectionScreen name={name} roomName={roomName} setStep={setStep} />
//             )}
//         </IntroContainer>
//     );
// }
"use strict";
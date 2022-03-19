import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LocalVideoPreview from './LocalVideoPreview/LocalVideoPreview';
import SettingsMenu from './SettingsMenu/SettingsMenu';
import { Steps } from '../PreJoinScreens';
import ToggleAudioButton from '../../Buttons/ToggleAudioButton/ToggleAudioButton';
import ToggleVideoButton from '../../Buttons/ToggleVideoButton/ToggleVideoButton';
import { useAppState } from '../../../state';
import useChatContext from '../../../hooks/useChatContext/useChatContext';
import useVideoContext from '../../../hooks/useVideoContext/useVideoContext';

const style ={}

export default function wDeviceSelectionScreen({ name, roomName, setStep }) {
    const { getToken, isFetching } = useAppState();
    const { connect: chatConnect } = useChatContext();
    const { connect: videoConnect, isAcquiringLocalTracks, isConnecting } = useVideoContext();
    const disableButtons = isFetching || isAcquiringLocalTracks || isConnecting;

    const handleJoin = () => {
        getToken(name, roomName).then(({ token }) => {
            videoConnect(token);
            process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true' && chatConnect(token);
        });
    };

    if (isFetching || isConnecting) {
        return (
            <div style={{
                height: '100%',
                justifyContent: "center",
                alignItems: "center",
                direction: "column"
            }}>
                <div>
                    Loading...
                </div>
                <div>
                    <h3 variant="body2" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Joining Meeting
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <>
            <h3 variant="h5" className={style.gutterBottom}>
                Join {roomName}
            </h3>

            <div style={{
                justifyContent: "center"
            }}>
                <div item md={7} sm={12} xs={12}>
                    <div className={style.localPreviewContainer}>
                        <LocalVideoPreview identity={name} />
                    </div>
                    <div className={style.mobileButtonBar}>
                        <div >
                            <ToggleAudioButton className={style.mobileButton} disabled={disableButtons} />
                            <ToggleVideoButton className={style.mobileButton} disabled={disableButtons} />
                        </div>
                        <SettingsMenu mobileButtonClass={style.mobileButton} />
                    </div>
                </div>
                <div item md={5} sm={12} xs={12}>
                    <div container direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <div>
                            <div >
                                <ToggleAudioButton className={style.deviceButton} disabled={disableButtons} />
                                <ToggleVideoButton className={style.deviceButton} disabled={disableButtons} />
                            </div>
                        </div>
                        <div className={style.joinButtons}>
                            <button variant="outlined" color="primary" onClick={() => setStep(Steps.roomNameStep)}>
                                Cancel
                            </button>
                            <button
                                variant="contained"
                                color="primary"
                                data-cy-join-now
                                onClick={handleJoin}
                                disabled={disableButtons}
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

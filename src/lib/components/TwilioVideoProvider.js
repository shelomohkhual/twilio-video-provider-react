import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { VideoProvider } from './TwilioVideoProvider/contexts/VideoProvider';
import AppStateProvider from './TwilioVideoProvider/hooks/useTwilioState';
import ErrorDialog from './TwilioVideoProvider/components/ErrorDialog/ErrorDialog';
import VideoRoom from './TwilioVideoProvider/VideoRoom';

export const Steps = {
    roomNameStep: 'roomNameStep',
    deviceSelectionStep: 'deviceSelectionStep'
};

const TwilioVideoProvider = props => {
    const [error, setError] = useState();
    return (
        <AppStateProvider {...props}>
            <VideoProvider onError={setError}>
                <ErrorDialog dismissError={() => setError(null)} error={error} />

                {!props.hideVideoRoom && <VideoRoom {...props} />}

                {props.children && props.children}
            </VideoProvider>
        </AppStateProvider>
    );
};

TwilioVideoProvider.propTypes = {
    accessToken: PropTypes.string,
};

export default TwilioVideoProvider;


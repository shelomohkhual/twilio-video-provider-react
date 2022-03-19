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
        <AppStateProvider>
            <VideoProvider onError={setError}>
                <ErrorDialog dismissError={() => setError(null)} error={error} />

                <VideoRoom {...props} />
            </VideoProvider>
        </AppStateProvider>
    );
};

TwilioVideoProvider.propTypes = {
    userName: PropTypes.string.isRequired,
    accessToken: PropTypes.string.isRequired,
};

export default TwilioVideoProvider;


import React from 'react';
import PropTypes from 'prop-types';
import useVideoContext from '../../contexts/useVideoContext';

import '../../../TwilioVideoProvider.css';

const RoomHeading = props => {
    const {
        room,
    } = useVideoContext();

    const title = room.name || '';
    return (
        <div className='headingContainer'>
            <strong className="roomTitle">
                {title}
            </strong>
        </div>
    );
};

RoomHeading.propTypes = {};

export default RoomHeading;
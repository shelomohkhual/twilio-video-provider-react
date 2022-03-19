import React from 'react';

import useParticipantNetworkQualityLevel from '../../hooks/useParticipantNetworkQualityLevel';

const style = {};

const STEP = 3;
const BARS_ARRAY = [0, 1, 2, 3, 4];

export default function NetworkQualityLevel({ participant }) {
    const networkQualityLevel = useParticipantNetworkQualityLevel(participant);

    if (networkQualityLevel === null) return null;

    return (
        <div className={style.outerContainer} style={{
            width: '2em',
            height: '2em',
            padding: '0.9em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
        }}>
            <div className={style.innerContainer} style={{
                display: 'flex',
                alignItems: 'flex-end',
                '& div': {
                    width: '2px',
                    marginRight: '1px',
                    '&:not(:last-child)': {
                        borderRight: 'none',
                    },
                },
            }}>
                {BARS_ARRAY.map(level => (
                    <div
                        key={level}
                        style={{
                            height: `${STEP * (level + 1)}px`,
                            background: networkQualityLevel > level ? 'white' : 'rgba(255, 255, 255, 0.2)',
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

import { useEffect } from 'react';

export default function useHandleTrackPublicationFailed(room, onError) {
    useEffect(() => {
        if (room) {
            room.localParticipant.on('trackPublicationFailed', onError);
            return () => {
                room.localParticipant.off('trackPublicationFailed', onError);
            };
        }
    }, [room, onError]);
}

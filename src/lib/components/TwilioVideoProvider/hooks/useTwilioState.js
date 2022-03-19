import React, { createContext, useContext, useReducer, useState } from 'react';
import useActiveSinkId from './useActiveSinkId';

export const StateContext = createContext(null);

/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks from being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/
export default function AppStateProvider(props) {
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSinkId, setActiveSinkId] = useActiveSinkId();
  // const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);
  const [roomType, setRoomType] = useState();

  let contextValue = {
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    // settings,
    // dispatchSetting,
    roomType,
  };

  contextValue = {
    ...contextValue,
    getToken: async (user_identity, room_name) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';

      return fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          user_identity,
          room_name,
          create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true',
        }),
      }).then(res => res.json());
    },
    updateRecordingRules: async (room_sid, rules) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';

      return fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ room_sid, rules }),
        method: 'POST',
      })
        .then(async res => {
          const jsonResponse = await res.json();

          if (!res.ok) {
            const recordingError = new Error(
              jsonResponse.error?.message || 'There was an error updating recording rules'
            );
            recordingError.code = jsonResponse.error?.code;
            return Promise.reject(recordingError);
          }

          return jsonResponse;
        })
        .catch(err => setError(err));
    },
  };

  const getToken = (name, room) => {
    setIsFetching(true);
    return contextValue
      .getToken(name, room)
      .then(res => {
        setRoomType(res.room_type);
        setIsFetching(false);
        return res;
      })
      .catch(err => {
        setError(err);
        setIsFetching(false);
        return Promise.reject(err);
      });
  };

  //   const updateRecordingRules= (room_sid, rules) => {
  //     setIsFetching(true);
  //     return contextValue
  //       .updateRecordingRules(room_sid, rules)
  //       .then(res => {
  //         setIsFetching(false);
  //         return res;
  //       })
  //       .catch(err => {
  //         setError(err);
  //         setIsFetching(false);
  //         return Promise.reject(err);
  //       });
  //   };

  return (
    <StateContext.Provider value={{
      ...contextValue, getToken,
      //   updateRecordingRules
    }}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useTwilioState() {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useTwilioState must be used within the AppStateProvider');
  }
  return context;
}

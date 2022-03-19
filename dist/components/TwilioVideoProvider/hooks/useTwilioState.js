"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateContext = void 0;
exports.default = AppStateProvider;
exports.useTwilioState = useTwilioState;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.json.stringify.js");

var _react = _interopRequireWildcard(require("react"));

var _useActiveSinkId = _interopRequireDefault(require("./useActiveSinkId"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const StateContext = /*#__PURE__*/(0, _react.createContext)(null);
/*
  The 'react-hooks/rules-of-hooks' linting rules prevent React Hooks from being called
  inside of if() statements. This is because hooks must always be called in the same order
  every time a component is rendered. The 'react-hooks/rules-of-hooks' rule is disabled below
  because the "if (process.env.REACT_APP_SET_AUTH === 'firebase')" statements are evaluated
  at build time (not runtime). If the statement evaluates to false, then the code is not
  included in the bundle that is produced (due to tree-shaking). Thus, in this instance, it
  is ok to call hooks inside if() statements.
*/

exports.StateContext = StateContext;

function AppStateProvider(props) {
  const [error, setError] = (0, _react.useState)(null);
  const [isFetching, setIsFetching] = (0, _react.useState)(false);
  const [activeSinkId, setActiveSinkId] = (0, _useActiveSinkId.default)(); // const [settings, dispatchSetting] = useReducer(settingsReducer, initialSettings);

  const [roomType, setRoomType] = (0, _react.useState)();
  let contextValue = {
    accessToken: props.accessToken || null,
    error,
    setError,
    isFetching,
    activeSinkId,
    setActiveSinkId,
    // settings,
    // dispatchSetting,
    roomType
  };
  contextValue = _objectSpread(_objectSpread({}, contextValue), {}, {
    getToken: async (user_identity, room_name) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/token';
      return fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          user_identity,
          room_name,
          create_conversation: process.env.REACT_APP_DISABLE_TWILIO_CONVERSATIONS !== 'true'
        })
      }).then(res => res.json());
    },
    updateRecordingRules: async (room_sid, rules) => {
      const endpoint = process.env.REACT_APP_TOKEN_ENDPOINT || '/recordingrules';
      return fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          room_sid,
          rules
        }),
        method: 'POST'
      }).then(async res => {
        const jsonResponse = await res.json();

        if (!res.ok) {
          var _jsonResponse$error, _jsonResponse$error2;

          const recordingError = new Error(((_jsonResponse$error = jsonResponse.error) === null || _jsonResponse$error === void 0 ? void 0 : _jsonResponse$error.message) || 'There was an error updating recording rules');
          recordingError.code = (_jsonResponse$error2 = jsonResponse.error) === null || _jsonResponse$error2 === void 0 ? void 0 : _jsonResponse$error2.code;
          return Promise.reject(recordingError);
        }

        return jsonResponse;
      }).catch(err => setError(err));
    }
  });

  const getToken = (name, room) => {
    setIsFetching(true);
    return contextValue.getToken(name, room).then(res => {
      setRoomType(res.room_type);
      setIsFetching(false);
      return res;
    }).catch(err => {
      setError(err);
      setIsFetching(false);
      return Promise.reject(err);
    });
  }; //   const updateRecordingRules= (room_sid, rules) => {
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


  return /*#__PURE__*/_react.default.createElement(StateContext.Provider, {
    value: _objectSpread(_objectSpread({}, contextValue), {}, {
      getToken //   updateRecordingRules

    })
  }, props.children);
}

function useTwilioState() {
  const context = (0, _react.useContext)(StateContext);

  if (!context) {
    throw new Error('useTwilioState must be used within the AppStateProvider');
  }

  return context;
}
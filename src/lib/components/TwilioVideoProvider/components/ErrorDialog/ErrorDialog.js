import React from 'react';

// This function is used to provide error messages to the user that are
// different than the error messages provided by the SDK.
function enhanceMessage(message = '', code) {
    switch (code) {
        case 20101: // Invalid token error
            return message + '. Please make sure you are using the correct credentials.';
        default:
            return message;
    }
}

function ErrorDialog({ dismissError, error }) {
    const { message, code } = error || {};
    const enhancedMessage = enhanceMessage(message, code);
    if (!error) {
        return <></>;
    }

    return (
        <div style={{
            position: 'absolute',
            zIndex: '1000',
            background: 'white',
            width: ' 100%',
            textAlign: 'center',
        }}>
            <h2>ERROR</h2>
            <div>
                <p>{enhancedMessage}</p>
                {Boolean(code) && (
                    <pre>
                        <code>Error Code: {code}</code>
                    </pre>
                )}
            </div>
            <div>
                <button style={{
                    borderRadius: '20px',
                    width: '100px',
                    margin: '10px',
                }}
                    onClick={() => dismissError()} color="primary" autoFocus>
                    OK
                </button>
            </div>
        </div>
    );
}

export default ErrorDialog;

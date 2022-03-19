import { isPlainObject } from 'is-plain-object';

export const isMobile = (() => {
    if (typeof navigator === 'undefined' || typeof navigator.userAgent !== 'string') {
        return false;
    }
    return /Mobile/.test(navigator.userAgent);
})();

// Recursively removes any object keys with a value of undefined
export function removeUndefineds(obj) {
    if (!isPlainObject(obj)) return obj;

    const target = {};

    for (const key in obj) {
        const val = obj[key];
        if (typeof val !== 'undefined') {
            target[key] = removeUndefineds(val);
        }
    }

    return target;
}

export async function getDeviceInfo() {
    const devices = await navigator.mediaDevices.enumerateDevices();

    return {
        audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
        videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
        audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
        hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
        hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
    };
}

// This function will return 'true' when the specified permission has been denied by the user.
// If the API doesn't exist, or the query function returns an error, 'false' will be returned.
export async function isPermissionDenied(name) {
    if (navigator.permissions) {
        try {
            const result = await navigator.permissions.query({ name });
            return result.state === 'denied';
        } catch {
            return false;
        }
    } else {
        return false;
    }
}

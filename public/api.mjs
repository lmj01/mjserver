
export const authToken = 'mjTokenForAuth';
function request(data, method='post', url='', options={}) {
    const useJson = options.json || true;
    const useToken = options.token;
    return new Promise((resolve)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (useJson) xhr.setRequestHeader('Content-Type', 'application/json');
        if (useToken) xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem(authToken)}`);
        xhr.addEventListener('loadend', (event)=>resolve(event.target));
        xhr.send(data);
    })
}

export function postLogin(data) {
    return request(data, 'post', '/api/auth/login', { token: false });
}

export function postProfile() {
    return request(null, 'get', '/api/auth/profile', { token: true });
}

export function postAudioTranscode() {
    return request(null, 'post', '/api/audio/transcode', { token: false });
}


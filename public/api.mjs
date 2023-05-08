
export const authToken = 'mjTokenForAuth';
function request(data, method='post', url='', options={}) {
    const useJson = options.json;
    return new Promise((resolve)=>{
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        if (options.formfile) xhr.setRequestHeader('Content-Type', `multipart/form-data`);
        if (options.json) xhr.setRequestHeader('Content-Type', 'application/json');
        if (options.token) xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem(authToken)}`);        
        xhr.addEventListener('loadend', (event)=>resolve(event.target));
        xhr.send(data);
    })
}

export function postLogin(data) {
    return request(data, 'post', '/api/auth/login', { token: false, json: true });
}

export function postProfile() {
    return request(null, 'get', '/api/auth/profile', { token: true, json: true });
}

export function postAudioTranscode() {
    return request(null, 'post', '/api/audio/transcode', { token: false, json: true });
}

export function postFile(data) {
    // 原生的不需要设置参数，FORMDATA自带boundary
    return request(data, 'post', '/api/file/upload', { token: false, formfile: false });
}

export function postListFile(data) {
    // 原生的不需要设置参数，FORMDATA自带boundary
    return request(data, 'post', '/api/file/uploadList', { token: false, formfile: false });
}

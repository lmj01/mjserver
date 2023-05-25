export const authToken = 'mjTokenForAuth';
export function request(data, method = 'post', url = '', options = {}) {
	return new Promise((resolve) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		if (options.formfile) xhr.setRequestHeader('Content-Type', `multipart/form-data`);
		if (options.json) xhr.setRequestHeader('Content-Type', 'application/json');
		if (options.token) xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem(authToken)}`);
		xhr.addEventListener('loadend', (event) => resolve(event.target));
		xhr.send(data);
	});
}

export function handleRes(res, options = {}) {
	if (!options.json) options.json = true;
	const { status, response } = res;
	if (status == 200) {
		if (options.json) return JSON.parse(response);
	} else {
		console.error(response);
	}
}

export function getElById(id) {
	return document.getElementById(id);
}

export function postLogin(data) {
	return request(data, 'post', '/api/auth/login', { token: false, json: true });
}

export function getUserInit() {
	return request(null, 'get', '/api/user/init', { token: false, json: true });
}

export function postPhotoTest(data) {
	return request(data, 'post', '/api/photo/test', { token: true, json: true });
}

export function getUserAll() {
	return request(null, 'get', '/api/user/all', { token: true, json: true });
}

export function getUserById(id) {
	return request(null, 'get', `/api/user/${id}`, { token: true, json: true });
}

export function getProfile() {
	return request(null, 'get', '/api/auth/profile', { token: true, json: true });
}

export function getFilePackage(type) {
	return request(null, 'get', '/api/file/package' + type, {
		token: false,
		json: true,
	});
}

export function postAudioTranscode() {
	return request(null, 'post', '/api/audio/transcode', {
		token: false,
		json: true,
	});
}

export function postFile(data) {
	// 原生的不需要设置参数，FORMDATA自带boundary
	return request(data, 'post', '/api/file/upload', {
		token: false,
		formfile: false,
	});
}

export function postListFile(data) {
	// 原生的不需要设置参数，FORMDATA自带boundary
	return request(data, 'post', '/api/file/uploadList', {
		token: false,
		formfile: false,
	});
}

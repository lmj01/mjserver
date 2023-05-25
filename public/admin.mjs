import { handleRes, request } from './api.mjs';
function getRoleList() {
	return request(null, 'get', '/api/role', { token: true, json: true });
}

function getPermissionList() {
	return request(null, 'get', '/api/permission', { token: true, json: true });
}

function getGenderList() {
	return request(null, 'get', '/api/user/gender', { token: true, json: true });
}

function postCreateUser(data) {
	return request(data, 'post', '/api/permission', { token: true, json: true });
}

function getEl(id) {
	return document.querySelector(`form.form-create ${id}`);
}
const dto = {
	name: '',
	password: '',
	role: -1,
	permission: -1,
	gender: -1,
};

function selectChange(type, event) {
	dto[type] = event.target.value;
}

function updateSelect(type, data) {
	const elSelect = getEl('select#' + type);
	data.forEach((e) => {
		const elOption = document.createElement('option');
		elOption.value = e.id;
		elOption.textContent = e.name;
		elSelect.appendChild(elOption);
	});
	elSelect.addEventListener('change', (e) => selectChange(type, e), true);
	return elSelect;
}
export function init() {
	dto.name = '';
	dto.password = '';
	getGenderList().then((res) => {
		const data = handleRes(res);
		updateSelect(
			'gender',
			data.map((e) => ({ id: e.id, name: e.name })),
		).value = dto.gender;
	});
	getRoleList().then((res) => {
		const data = handleRes(res);
		updateSelect(
			'role',
			data.map((e) => ({ id: e.id, name: e.name })),
		).value = dto.role;
	});
	getPermissionList().then((res) => {
		const data = handleRes(res);
		updateSelect(
			'permission',
			data.map((e) => ({ id: e.id, name: e.label })),
		).value = dto.permission;
	});
	getEl('button#btnCreateUser').addEventListener('click', () => {
		dto.name = getEl('input#name').value;
		dto.password = getEl('input#password').value;
		console.log('submit', dto);
	});
}

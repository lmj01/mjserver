import { request } from './api.mjs';
function getRoleList() {
  return request(null, 'get', '/api/role', { token: false });
}

function getPermissionList() {
  return request(null, 'get', '/api/permission', { token: false });
}

export function init() {
  getRoleList().then((res) => {
    console.log(res);
  });
  getPermissionList().then((res) => {
    console.log(res);
  });
}

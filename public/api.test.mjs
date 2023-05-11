import {
    getUserAll,
    getUserById,
} from './api.mjs';

export function runTest() {
    document.getElementById('btnUserAll').addEventListener('click', () => {
        getUserAll().then(res => {
            const {status, response} = res;
            if (status == 200 && response.length > 0) {                
                const userList = JSON.parse(res.response);
                const elSelect = document.getElementById('selectUserList');                
                userList.forEach((e,i) => {
                    if (i == 0) {
                        const option0 = document.createElement('option');
                        option0.selected = true;
                        option0.textContent = 'Select user to get profile';
                        elSelect.appendChild(option0);
                    }
                    const option = document.createElement('option');
                    option.value = e.id;
                    option.textContent = e.name;
                    option.style.backgroundColor = e.isActive ? 'red' : 'unset';
                    elSelect.appendChild(option);
                })
                elSelect.addEventListener('change',selectUserId);
            } else {
                console.log(res.response);
            }
        })
    });
}

function selectUserId(e) {
    const userId = e.target.value;
    userId && getUserById(userId).then((res) => {
        const {status, response} = res;
        if (status == 200) {
            const data = JSON.parse(response);
            console.log(data);
        } else {
            console.error(response);
        }
    });
}
export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
        })
    })
        .then(checkResponse)
};

export const authorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(checkResponse)
        .then((data) => {
            if (data.token) {
                localStorage.setItem('jwt', data.token)
                return data.token;
            }
        })
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(checkResponse)
        .then((data) => data)
}

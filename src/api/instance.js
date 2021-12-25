import axios from 'axios'
export const HTTP = axios.create({
    baseURL: 'http://localhost:8080/api/tests/questions/',
    headers: {
        post: {
            'Content-Type': 'application/json'
        },
        accept: 'application/json',
        mode: 'cors',
        xsrfHeaderName: 'X-XSRF-TOKEN',
        xsrfCookieName: 'XSRF-TOKEN', // default

    },

})

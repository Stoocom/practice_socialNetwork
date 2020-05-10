import * as axios from 'axios'

//const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "aefe3d13-769e-4201-8170-a0f001057380"
    }
});

export const authAPI = {
    getLogin() {
        return instance.get(`auth/me`,
            // { withCredentials: true }
            )
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
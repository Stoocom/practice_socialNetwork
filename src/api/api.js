import * as axios from 'axios'

//const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "b5b6b6a0-04b0-4ac6-9fa6-22a0a4a07d51"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => { return response.data })
    },
    follow(id) {
        return instance.delete(`follow/${id}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "b5b6b6a0-04b0-4ac6-9fa6-22a0a4a07d51"
            }
        })
    },
    unfollow(id) {
        return instance.post(`follow/${id}`, {}, {
            withCredentials: true,
            headers: {
                "API-KEY": "b5b6b6a0-04b0-4ac6-9fa6-22a0a4a07d51"
            }
        })
    }
}

// export const authAPI = {
//     getLogin() {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`,
//             { withCredentials: true })
//     }
// }

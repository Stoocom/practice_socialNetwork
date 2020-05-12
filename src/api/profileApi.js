import * as axios from 'axios'

//const baseUrl = 'https://social-network.samuraijs.com/api/1.0/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "b5b6b6a0-04b0-4ac6-9fa6-22a0a4a07d51"
    }
});

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId,
            { withCredentials: true }
        )
    },
    getStatus(userId) {
        return instance.get(`/profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photos) {
        const formData = new FormData();
        formData.append('image', photos)
        return instance.put(`profile/photo`, formData, { header: {
            'Content-Type': "multipart/form-data"
        }})
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    }
}

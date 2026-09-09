import axios from 'axios'
export const BaseUrl='http://localhost:8000'

const instance=axios.create({
    baseURL:BaseUrl,
    withCredentials:true
})

// Protected API routes use a Bearer token. Keeping this in one place means
// every request made through this service has the same authentication setup.
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export const get=(url, params)=> instance.get(url,{params})
export const post=(url, data)=> instance.post(url, data)
export const patch=(url, data)=> instance.patch(url, data)
export const del=(url)=> instance.delete(url)

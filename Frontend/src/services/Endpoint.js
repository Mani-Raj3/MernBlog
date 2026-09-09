import axios from 'axios'
import { data } from 'react-router-dom'
export const BaseUrl='http://localhost:8000'

const instance=axios.create({
    baseURL:BaseUrl,
    withCredentials:true
})

export const get=(url, params)=> instance.get(url,{params})
export const post=(url, data)=> instance.post(url, data)
export const patch=(url, data)=> instance.patch(url, data)
export const del=(url)=> instance.delete(url)
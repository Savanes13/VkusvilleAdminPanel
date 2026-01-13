import axios from 'axios'
import { useUserStore } from '@/store/user/userStore'
import { refreshAccessToken } from './user/apiUser'

const api = axios.create({
  baseURL: 'https://api.example.com'
})

api.interceptors.request.use(config => {
  const userStore = useUserStore()
  if (userStore.accessToken) { config.headers.Authorization = `Bearer ${userStore.accessToken}` };
  return config
})

let isRefreshing = false
let queue: ((token: string) => void)[] = []

api.interceptors.response.use(
  res => res,
  async error => {
    const userStore = useUserStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise(resolve => {
          queue.push(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      isRefreshing = true

      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        // разлогинить
      } 

      const response = await refreshAccessToken(refreshToken);
      const newToken = response.access_token;


      isRefreshing = false

      if (!newToken) {
        return Promise.reject(error)
      }

      queue.forEach(cb => cb(newToken))
      queue = []

      originalRequest.headers.Authorization = `Bearer ${newToken}`
      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default api
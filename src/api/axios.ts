import axios from 'axios'
import { useUserStore } from '@/store/user/userStore'
import { refreshAccessToken } from './user/apiUser'
import router from '@/router';
import { useCompanyStore } from '@/store/company/companyStore';

const api = axios.create({
  // baseURL: 'https://ajasdc-test.vv-rea.management',
  withCredentials: true 
})

api.interceptors.request.use(config => {
  const companyStore = useCompanyStore();
  config.baseURL = companyStore.selectedCompany === 'Reo' ? 'https://ajasdc-test.vv-rea.management' : 'https://ajasdc-test2.vv-rea.management';
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

      try {
        const response = await refreshAccessToken()
        const newToken = response.access_token
        userStore.setAccessToken(newToken)
        queue.forEach(cb => cb(newToken))
        queue = []
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (e) {
        // выход сделать
        // userStore.logout()
        router.replace({ name: 'authorization' });
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api
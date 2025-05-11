import axios, { type AxiosResponse } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_DEV_BASE_URL

axios.interceptors.response.use(
  function (response) {
    const res: AxiosResponse = {
      ...response,
      data: response.data.data,
    }
    return res
  },
  function (error) {
    return Promise.reject(error)
  }
)

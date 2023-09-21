import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api/v1/'
})

export const errorHandler = (error) => {
  alert(error?.response?.data?.message)
  console.error(error?.response?.data)
}

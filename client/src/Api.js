import axios from 'axios'

export const Api = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT || 'http://localhost:3000/api/v1'
})
// Set token in auth headers
Api.defaults.headers.common.Authorization = localStorage.getItem('token')

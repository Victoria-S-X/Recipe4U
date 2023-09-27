import { Api, errorHandler } from '@/Api'

async function login(credentials) {
  try {
    const response = await Api.post('login', credentials)
    localStorage.setItem('token', 'Bearer ' + response.data.jwt)

    return response
  } catch (error) {
    errorHandler(error)
  }
}

export default {
  register: login
}

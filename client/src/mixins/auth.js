import { Api, errorHandler } from '@/Api'
import user from '@/mixins/user'

async function login(credentials) {
  try {
    const response = await Api.post('login', credentials)
    localStorage.setItem('token', 'Bearer ' + response.data.jwt)
    await this.loadUser()

    return response
  } catch (error) {
    errorHandler(error)
  }
}

export default {
  methods: {
    login
  },
  mixins: [user]
}

import { Api } from '@/Api'
import user from '@/mixins/user'

async function login(credentials) {
  const response = await Api.post('login', credentials)
  localStorage.setItem('token', 'Bearer ' + response.data.jwt)
  await this.loadUser()

  return response
}

export default {
  methods: {
    login
  },
  mixins: [user]
}

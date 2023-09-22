import { Api, errorHandler } from '@/Api'

export default {
  methods: {
    async isAttendingAsync(course) {
      const user = await this.getUser()
      if (!user) return false

      const isAttending = user?.attends.includes(course._id)

      return isAttending
    },
    async getUser() {
      try {
        const user = await Api.get('/users')
        return user.data
      } catch (error) {
        errorHandler(error)
      }
    }
  }
}

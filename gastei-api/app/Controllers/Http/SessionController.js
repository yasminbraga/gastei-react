'use strict'

class SessionController {
  async store({ request, auth }) {
    const {email, password} =  request.only(['email', 'password'])

    try {
      const { token } = await auth.attempt(email, password)

      return { token, success: true}
    } catch (error) {
      return { success: false, message: 'Email ou senha inválidos, tente novamente!' }
    }
  }
}

module.exports = SessionController

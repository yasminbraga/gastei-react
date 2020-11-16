'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class UserController {
  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const userData = request.only(['name', 'password', 'email'])

    if (!(userData.email && userData.name && userData.password)) {
      return {success: false, message: 'Dados inválidos, tente novamente'}
    }

    const emailExists = await User.findBy('email', userData.email)

    if (emailExists) {
      return {success: false, message: 'Email já cadastrado.'}
    }

    try {
      const user = await User.create(userData)
      return {user: user.toJSON(), success: true}
      
    } catch (error) {
      return {success: false, message: error.message}      
    }

  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }
}

module.exports = UserController

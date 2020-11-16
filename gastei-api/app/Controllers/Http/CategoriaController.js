'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with categorias
 */

const Categoria = use('App/Models/Categoria')

class CategoriaController {
  /**
   * Show a list of all categorias.
   * GET categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ auth }) {
    
    const user = await auth.getUser()
    
    const categorias = await user.categorias().fetch()

    return {categorias: categorias.toJSON(), success: true};
  }

  /**
   * Create/save a new categoria.
   * POST categorias
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, auth }) {
    const categoriaData = request.only(['nome', 'descricao']);

    const user = await auth.getUser()

    if (!(categoriaData.nome && categoriaData.descricao)) {
      return { success: false, message: "Dados inválidos, tente novamente!"};
    }

    try {
      const categoria = await user.categorias().create(categoriaData);
      return { success: true, categoria: categoria.toJSON() }
    } catch (error) {
      return { success: false, message: error.message};
    }

  }

  /**
   * Update categoria details.
   * PUT or PATCH categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request }) {
    const categoriaData = request.only(['nome', 'descricao']);
    
    try {
      const categoria = await Categoria.find(params.id)
      
      categoria.merge(categoriaData)

      await categoria.save()

      return {success: true, categoria: categoria.toJSON()}
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  /**
   * Delete a categoria with id.
   * DELETE categorias/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    try {
      const categoria = await Categoria.find(params.id)

      await categoria.delete()

      return { success: true, message: "Categoria deletada"}
    } catch (error) {
      return {success: false, message: error.message}
    }
  }
}

module.exports = CategoriaController

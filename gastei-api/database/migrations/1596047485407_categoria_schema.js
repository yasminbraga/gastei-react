'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategoriaSchema extends Schema {
  up () {
    this.create('categorias', (table) => {
      table.increments()
      
      table.string('nome').notNullable()
      table.string('descricao').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')

      table.timestamps()
    })
  }

  down () {
    this.drop('categorias')
  }
}

module.exports = CategoriaSchema

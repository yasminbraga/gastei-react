'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovimentoSchema extends Schema {
  up () {
    this.create('movimentos', (table) => {
      table.increments()
      table.enu('tipo', ['entrada', 'saida'])
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('categoria_id').unsigned().references('id').inTable('categorias')

      table.decimal('valor').notNullable()
      
      table.timestamps()
    })
  }

  down () {
    this.drop('movimentos')
  }
}

module.exports = MovimentoSchema

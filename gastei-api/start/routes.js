'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('users', 'UserController').only(['store'])
Route.post('sessions', 'SessionController.store').as('sessions.store')

Route.group('AuthRoutes', () => {
  Route.resource('categorias', 'CategoriaController').only(['index', 'store', 'destroy', 'update']);
}).middleware(['auth'])

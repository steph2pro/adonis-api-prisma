/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const BookController = () => import('#controllers/books_controller')
const CategoryController = () => import('#controllers/categories_controller')

router.get('/', async () => {
  return {
    hello: ' Prisma world ',
  }
})

router.group(() => {
//users
  router.get('/users', [UsersController, 'index'])
  router.get('/users/:id', [UsersController, 'show'])
  router.post('/users', [UsersController, 'store'])
  router.put('/users/:id', [UsersController, 'update'])
  router.delete('/users/:id', [UsersController, 'destroy'])

//books
router.get('/books', [BookController, 'index'])
router.get('/books/:id', [BookController, 'show'])
router.post('/books', [BookController, 'store'])
router.put('/books/:id', [BookController, 'update'])
router.delete('/books/:id', [BookController, 'destroy'])

//categories
router.get('/categories', [CategoryController, 'index'])
router.get('/categories/:id', [CategoryController, 'show'])
router.post('/categories', [CategoryController, 'store'])
router.put('/categories/:id', [CategoryController, 'update'])
router.delete('/categories/:id', [CategoryController, 'destroy'])

}).prefix('/api');

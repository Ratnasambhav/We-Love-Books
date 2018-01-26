const express = require('express')
const { catchErrors } = require('../handlers/errorHandlers')
const bookController = require('../controllers/bookController')
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const router = express.Router()

router.get('/', catchErrors(bookController.getBooksFromDB))
router.get('/books', (req, res) => res.render('search', { title: '📚' }))
router.post('/search', catchErrors(bookController.searchGoodReads))
router.get('/books/:id', catchErrors(bookController.getBooksFromGoodReads))
router.get('/add/:id', catchErrors(bookController.addBookForm)) // Shows all the book details before adding it to shelf/DB
router.post('/add',
  authController.isLoggedIn,
  catchErrors(bookController.saveBookToDB)
)
router.get('/login', userController.loginForm)
router.post('/login', authController.login)
router.get('/register', userController.registerForm)
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.register),
  authController.login
)
router.get('/logout', authController.logout)

module.exports = router

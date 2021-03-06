const mongoose = require('mongoose')
const User = mongoose.model('User')
const promisify = require('es6-promisify')

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' })
}

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' })
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must enter a name!').notEmpty()
  req.checkBody('email', 'Email is not valid!').isEmail()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: true,
    remove_extensions: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('password', 'Password cannot be empty!').notEmpty()
  req.checkBody('password-confirm', 'Confirm Password cannot be empty!').notEmpty()
  req.checkBody('password-confirm', 'Opps! Your Password and Confirm-Password are not the same').equals(req.body.password)
  const errors = req.validationErrors()
  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() })
    return
  }
  next()
}

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name
  })
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}

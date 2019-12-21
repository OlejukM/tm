const router = require('express').Router()

const SignInController = require('../controllers/SignInController')
const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')

router.post('/',
  GoogleAuthMiddleware('signIn'),
  SignInController('signIn')
)

module.exports = router

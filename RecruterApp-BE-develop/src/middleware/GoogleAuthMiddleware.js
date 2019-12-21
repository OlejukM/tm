const { asValue } = require('awilix')
const { makeInvoker } = require('awilix-express')

class GoogleAuthMiddleware {
  constructor ({ AppError, UnauthorizedAccessError, parseHeader, verifyGoogleIdToken, userService }) {
    this.AppError = AppError
    this.UnauthorizedAccessError = UnauthorizedAccessError
    this.parseHeader = parseHeader
    this.verifyGoogleIdToken = verifyGoogleIdToken
    this.userService = userService
  }

  async signIn (req, res, next) {
    try {
      const payload = await this.verifyGoogleIdToken(this.parseHeader(req))
      const userData = {
        firstName: payload['given_name'],
        lastName: payload['family_name'],
        email: payload['email'],
        googleId: payload['sub']
      }

      req.container.register({
        currentUserData: asValue(userData)
      })

      next()
    } catch (err) {
      return next(new this.UnauthorizedAccessError(err))
    }
  }

  async authenticate (req, res, next) {
    try {
      const payload = await this.verifyGoogleIdToken(this.parseHeader(req))

      const user = await this.userService.findUser({ googleId: payload.sub })
      if (!user) throw new this.UnauthorizedAccessError('You do not have rights to access page')

      req.container.register({
        currentUser: asValue(user)
      })

      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      return next(new this.AppError(err))
    }
  }
}

module.exports = makeInvoker(GoogleAuthMiddleware)

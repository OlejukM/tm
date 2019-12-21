const { asValue } = require('awilix')
const { makeInvoker } = require('awilix-express')

class JWTAuthMiddleware {
  constructor ({ AppError, UnauthorizedAccessError, parseHeader, verifyJWT, userService, constants, applicationService }) {
    this.AppError = AppError
    this.UnauthorizedAccessError = UnauthorizedAccessError
    this.parseHeader = parseHeader
    this.verifyJWT = verifyJWT
    this.userService = userService
    this.constants = constants
    this.applicationService = applicationService
  }

  async authenticate (req, res, next) {
    try {
      const payload = await this.verifyJWT(this.parseHeader(req))
      const application = await this.applicationService.findById(payload.application)
      const user = await this.userService.findById(application.candidate)

      req.container.register({
        payload: asValue(payload),
        currentUser: asValue(user)
      })

      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      return next(new this.AppError(err))
    }
  }
}

module.exports = makeInvoker(JWTAuthMiddleware)

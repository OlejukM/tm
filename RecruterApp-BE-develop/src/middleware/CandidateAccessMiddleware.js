const { makeInvoker } = require('awilix-express')

class CandidateAccessMiddleware {
  constructor ({ AppError, ForbiddenError, NotFoundError, applicationService, constants, payload, currentUser }) {
    this.AppError = AppError
    this.ForbiddenError = ForbiddenError
    this.NotFoundError = NotFoundError
    this.applicationService = applicationService
    this.constants = constants
    this.payload = payload
    this.currentUser = currentUser
  }

  async grantAccess (req, res, next) {
    try {
      const application = await this.applicationService.findById(this.payload.application)
      if (!application) {
        throw new this.NotFoundError('Application not found')
      }

      if (req.params.id !== this.payload.application) {
        throw new this.ForbiddenError('Access denied')
      }

      if (application.candidate._id.toString() !== this.currentUser._id.toString()) {
        throw new this.ForbiddenError('Access denied')
      }

      if (application.status === this.constants.application_status.completed ||
        application.status === this.constants.application_status.evaluated) {
        throw new this.ForbiddenError('You cannot view your application after it was submitted')
      }

      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      return next(new this.AppError(err))
    }
  }
}

module.exports = makeInvoker(CandidateAccessMiddleware)

const AppError = require('./AppError')

class ForbiddenError extends AppError {
  constructor (message) {
    super(`Forbidden: ${message}`)
  }
}

module.exports = ForbiddenError

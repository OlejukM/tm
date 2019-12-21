const AppError = require('./AppError')

class NotFoundError extends AppError {
  constructor (message) {
    super(`Not found: ${message}`)
  }
}

module.exports = NotFoundError

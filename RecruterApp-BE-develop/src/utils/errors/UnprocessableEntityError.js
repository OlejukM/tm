const AppError = require('./AppError')

class UnprocessableEntityError extends AppError {
  constructor (message) {
    super(`UnprocessableEntityError: ${message}`)
  }
}

module.exports = UnprocessableEntityError

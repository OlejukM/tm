const AppError = require('./AppError')

class ValidationError extends AppError {
  constructor (message) {
    super(`${message}`)
  }
}

module.exports = ValidationError

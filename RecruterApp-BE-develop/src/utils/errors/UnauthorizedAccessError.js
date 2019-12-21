const AppError = require('./AppError')

class UnauthorizedAccessError extends AppError {
  constructor (message) {
    super(`Access denied: ${message}`)
  }
}

module.exports = UnauthorizedAccessError

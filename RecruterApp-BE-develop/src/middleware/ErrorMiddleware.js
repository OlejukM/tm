const logger = require('../utils/logger')
const statusError = require('../utils/errors/errorStatus')

class ErrorMiddleware {
  errorHandler (err, req, res, next) {
    err.status = statusError[err.name]
    logger.error(err.stack)

    res.status(err.status || 500)
    res.json({
      error: {
        message: err.message
      }
    })
  }
}

module.exports = new ErrorMiddleware()

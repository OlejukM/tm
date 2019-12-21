const UnauthorizedAccessError = require('../errors/UnauthorizedAccessError')

module.exports = function parseHeader (req) {
  if (!req.headers || !req.headers.authorization) {
    // Unauthorized
    throw new UnauthorizedAccessError('No authorization header')
  }

  const auth = req.headers.authorization.split(' ')
  if (auth[0] !== 'Bearer') {
    // Unauthorized
    throw new UnauthorizedAccessError('Wrong token type')
  }

  return auth[1]
}

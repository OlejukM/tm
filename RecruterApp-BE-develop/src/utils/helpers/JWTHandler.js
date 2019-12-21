const jwt = require('jsonwebtoken')
const UnauthorizedAccessError = require('../errors/UnauthorizedAccessError')

async function verifyJWT (token) {
  try {
    return await jwt.verify(token, process.env.EMAIL_SECRET)
  } catch (err) {
    throw err
  }
}

async function signJWT (obj, expiry) {
  try {
    const signed = await jwt.sign(
      obj,
      process.env.EMAIL_SECRET,
      { expiresIn: expiry }
    )
    return signed
  } catch (err) {
    if (err.name && this.constants.jwt_error_names.includes(err.name)) {
      throw (new UnauthorizedAccessError(err))
    } else throw err
  }
}

module.exports = { verifyJWT, signJWT }

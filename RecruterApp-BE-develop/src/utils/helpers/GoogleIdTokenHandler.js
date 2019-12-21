const { OAuth2Client } = require('google-auth-library')
const UnauthorizedAccessError = require('../errors/UnauthorizedAccessError')

async function verifyGoogleIdToken (token) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: this.client
    })
    return await ticket.getPayload()
  } catch (err) {
    throw new UnauthorizedAccessError(err)
  }
}

module.exports = { verifyGoogleIdToken }

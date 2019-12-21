const { makeInvoker } = require('awilix-express')
const { asValue } = require('awilix')

class HasPublicRights {
  authorize (req, res, next) {
    const userData = {
      firstName: 'guest_user',
      isActive: true
    }

    req.container.register({
      currentUser: asValue(userData)
    })
    next()
  }
}

module.exports = makeInvoker(HasPublicRights)

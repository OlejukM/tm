const { makeInvoker } = require('awilix-express')

class HasReviewerRights {
  constructor ({ UnauthorizedAccessError, userService, currentUser }) {
    this.UnauthorizedAccessError = UnauthorizedAccessError
    this.userService = userService
    this.currentUser = currentUser
  }

  async authorize (req, res, next) {
    const accessLevel = this.currentUser.accessLevel

    if (accessLevel >= 2) next()
    else throw new this.UnauthorizedAccessError('You do not have rights to perform this action')
  }
}

module.exports = makeInvoker(HasReviewerRights)

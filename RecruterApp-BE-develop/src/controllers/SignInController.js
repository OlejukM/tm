const { makeInvoker } = require('awilix-express')

class SignInController {
  constructor ({ UserDto, userService, currentUserData }) {
    this.UserDto = UserDto
    this.userService = userService
    this.currentUserData = currentUserData
  }

  async signIn (req, res, next) {
    try {
      const user = await this.userService.signUserIn(this.currentUserData)
      res.json(this.UserDto.create(user))
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = makeInvoker(SignInController)

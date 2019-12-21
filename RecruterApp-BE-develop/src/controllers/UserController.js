const { makeInvoker } = require('awilix-express')

class UserController {
  constructor ({ userService, UserDto }) {
    this.userService = userService
    this.UserDto = UserDto
  }

  async find (req, res, next) {
    try {
      const result = await this.userService.findUsers(req.query)

      res.json(result.map(user => this.UserDto.create(user)))
    } catch (err) {
      return next(err)
    }
  }

  async findRecruiters (req, res, next) {
    try {
      const users = await this.userService.findRecruiters()
      const count = users.length
      res.json(this.UserDto.createUserList(users, count))
    } catch (err) {
      return next(err)
    }
  }

  async recruiterInvite (req, res, next) {
    try {
      const user = await this.userService.recruiterInvite(req.body.email)
      res.json(this.UserDto.create(user))
    } catch (err) {
      throw next(err)
    }
  }

  async reviewerInvite (req, res, next) {
    try {
      const user = await this.userService.reviewerInvite(req.body.email)
      res.json(this.UserDto.create(user))
    } catch (err) {
      throw next(err)
    }
  }
}
module.exports = makeInvoker(UserController)

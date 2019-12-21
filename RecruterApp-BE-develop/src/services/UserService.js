class UserService {
  constructor ({ AppError, userRepository, mailingService, constants, UnprocessableEntityError, ForbiddenError, NotFoundError }) {
    this.AppError = AppError
    this.userRepository = userRepository
    this.mailingService = mailingService
    this.constants = constants
    this.UnprocessableEntityError = UnprocessableEntityError
    this.ForbiddenError = ForbiddenError
    this.NotFoundError = NotFoundError
  }

  async signUserIn (currentUser) {
    try {
      let searchQuery = {}
      let user = await this.userRepository.findOne({ googleId: currentUser.googleId })
      if (!user) {
        user = await this.userRepository.findOne({ email: currentUser.email })
        if (!user) {
          throw new this.ForbiddenError('only invited users can log in')
        }
        searchQuery = { email: user.email }
      }
      if (user.googleId) {
        searchQuery = { googleId: user.googleId }
      }
      currentUser.isActive = true

      const result = await this.userRepository.createOrUpdate(searchQuery, currentUser)
      return result
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async createUser (data) {
    try {
      const result = await this.userRepository.create(data)

      if (!result) throw new this.AppError('unable to create user')
      else return result
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findUser (query) {
    try {
      const result = await this.userRepository.findOne(query)
      return result
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findUsers (query) {
    try {
      const result = await this.userRepository.findMany(query)
      return result
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findRecruiters () {
    try {
      const users = await this.userRepository.findRecruiters()
      return users
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async updateUser (id, data) {
    try {
      const result = await this.userRepository.updateOne(id, data)
      return result
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findById (id) {
    try {
      const user = await this.userRepository.findById(id)

      if (!user) throw new this.NotFoundError('user not found')
      return user
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async recruiterInvite (email) {
    try {
      let user = await this.userRepository.findOne({ email: email })
      if (user && user.role !== this.constants.user_role.recruiter) throw new this.UnprocessableEntityError('user already assigned a different role')
      if (!user) {
        user = await this.userRepository.create({
          email: email,
          role: this.constants.user_role.recruiter,
          isActive: false
        })
      }
      await this.mailingService.sendEmail(user, this.constants.email_type.administrationInvintation)

      return user
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async reviewerInvite (email) {
    try {
      let user = await this.userRepository.findOne({ email: email })
      if (user && user.role !== this.constants.user_role.reviewer) throw new this.UnprocessableEntityError('user already assigned a different role')
      if (!user) {
        user = await this.userRepository.create({
          email: email,
          role: this.constants.user_role.reviewer,
          isActive: false
        })
      }
      await this.mailingService.sendEmail(user, this.constants.email_type.administrationInvintation)

      return user
    } catch (err) {
      throw new this.AppError(err)
    }
  }
}

module.exports = UserService

class UserRepository {
  constructor ({ UserModel, constants }) {
    this.UserModel = UserModel
    this.constants = constants
  }

  create (userData) {
    return this.UserModel.create(userData)
  }

  createOrUpdate (searchQuery, newData) {
    return this.UserModel.findOneAndUpdate(searchQuery, {
      $set: newData
    }, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true
    })
  }

  findOne (query) {
    return this.UserModel.findOne(query)
  }

  findMany (query) {
    return this.UserModel.find(query)
  }

  updateOne (userId, newData) {
    return this.UserModel.findByIdAndUpdate(userId, newData)
  }

  findById (id) {
    return this.UserModel.findById(id)
  }

  findRecruiters () {
    return this.UserModel.find({ role: this.constants.user_role.recruiter, isActive: true })
  }
}

module.exports = UserRepository

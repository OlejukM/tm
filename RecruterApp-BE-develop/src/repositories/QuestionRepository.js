class QuestionRepository {
  constructor ({ QuestionModel }) {
    this.QuestionModel = QuestionModel
  }

  create (data) {
    const question = this.QuestionModel.create(data)
    return question
  }

  update (data, id) {
    return this.QuestionModel.findByIdAndUpdate({ _id: id }, data, { new: true })
  }

  findById (id) {
    return this.QuestionModel.findById(id)
  }

  findAll (findObj, skip, limit, sortBy = 'title', order) {
    return this.QuestionModel
      .find(findObj)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: order })
  }

  count () {
    return this.QuestionModel.countDocuments()
  }
}

module.exports = QuestionRepository

class ApplicationRepository {
  constructor ({ ApplicationModel, constants }) {
    this.ApplicationModel = ApplicationModel
    this.constants = constants
  }

  create (user, vacancyId, questions) {
    return this.ApplicationModel.create({
      candidate: user,
      vacancy: vacancyId,
      questions: questions,
      status: this.constants.application_status.invited,
      invitedAt: Date.now()
    })
  }

  findByVacancy (sortBy, order, pageNumber, pageSize, vacancyId) {
    return this.ApplicationModel
      .find({ vacancy: vacancyId })
      .populate({ path: 'candidate', select: 'firstName lastName -_id' })
      .populate({ path: 'reviewer', select: 'firstName lastName -_id' })
      .populate({ path: 'vacancy', select: 'title -_id' })
      .sort({ [sortBy]: order })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
  }

  findRecent (sortBy, order, limit, days) {
    let period = new Date()
    period.setDate(period.getDate() - days)

    return this.ApplicationModel
      .find({ completedAt: { $gte: period } })
      .populate({ path: 'candidate', select: 'firstName lastName -_id' })
      .populate({ path: 'reviewer', select: 'firstName lastName -_id' })
      .populate({ path: 'vacancy', select: 'title -_id' })
      .sort({ [sortBy]: order })
      .limit(limit)
  }

  findByReviewer (reviewerId, sortBy, order, pageNumber, pageSize) {
    return this.ApplicationModel
      .find({ reviewer: reviewerId })
      .populate({ path: 'candidate', select: 'firstName lastName -_id' })
      .populate({ path: 'vacancy', select: 'title -_id' })
      .sort({ [sortBy]: order })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
  }

  count (query) {
    let filter = {}
    if (query) filter = query
    return this.ApplicationModel.countDocuments(filter)
  }

  findById (id) {
    return this.ApplicationModel.findById(id)
      .populate({ path: 'questions.question' })
  }

  updateOne (id, data, options) {
    return this.ApplicationModel.findByIdAndUpdate(id, data, { new: true, arrayFilters: options })
  }

  async updateMany (reviewer, ids) {
    await this.ApplicationModel.updateMany({ _id: { $in: ids } }, { reviewer }, { multi: true })
    return this.ApplicationModel.find({ _id: { $in: ids } })
  }

  delete (ids) {
    return this.ApplicationModel.deleteMany({ _id: { $in: ids } })
  }

  findBestScorePerPeriod (days) {
    let period = new Date()
    period.setDate(period.getDate() - days)

    return this.ApplicationModel.find({ completedAt:
      { $gte: period } }).sort({ score: -1 }).limit(1)
  }

  createComment (id, by, author, text) {
    return this.ApplicationModel.findByIdAndUpdate(id, {
      $push: {
        comments: {
          by,
          author,
          text
        }
      }
    }, { new: true })
      .select('comments -_id')
  }

  findByVacancyId (vacancyId) {
    return this.ApplicationModel.find({ vacancy: vacancyId })
  }

  setAnswer (applicationId, questionId, answer) {
    const query = { _id: applicationId }
    const update = { $set: { 'questions.$[question].answer': answer } }
    const options = {
      arrayFilters: [ { 'question._id': questionId, 'question.locked': false } ],
      new: true,
      populate: 'questions.question'
    }

    return this.ApplicationModel.findOneAndUpdate(query, update, options)
  }

  async unlockQuestion (applicationId, questionId) {
    const query = { _id: applicationId }
    const update = { $set: { 'questions.$[question].locked': false } }
    const options = {
      arrayFilters: [ { 'question._id': questionId } ],
      new: true,
      populate: 'questions.question'
    }

    const result = await this.ApplicationModel.findOneAndUpdate(query, update, options)
    return result
  }

  async getQuestion (applicationId, questionId) { // inner question id
    const application = await this.ApplicationModel.findById(applicationId).populate({ path: 'questions.question' })
    const question = application.questions.id(questionId)

    return question
  }

  async getApplicationVacancy (applicationId) {
    const application = await this.ApplicationModel.findById(applicationId).populate({ path: 'vacancy' }).select('vacancy')

    return application.vacancy
  }
}

module.exports = ApplicationRepository

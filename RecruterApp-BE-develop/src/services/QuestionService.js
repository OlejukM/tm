class QuestionService {
  constructor ({ questionRepository, NotFoundError, userRepository, ForbiddenError, mapQuery, AppError,
    constants, settingService }) {
    this.questionRepository = questionRepository
    this.settingService = settingService
    this.NotFoundError = NotFoundError
    this.userRepository = userRepository
    this.ForbiddenError = ForbiddenError
    this.mapQuery = mapQuery
    this.AppError = AppError
    this.constants = constants
  }

  async createQuestion (data, currentUser) {
    try {
      data.author = currentUser.id

      await this.addTopics(data.topics)

      const question = await this.questionRepository.create(data)
      return question
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async addTopics (topics) {
    try {
      const questionTopics = await this.settingService.getQuestionTopics()

      const difference = topics.filter(x => !questionTopics.includes(x))

      await this.settingService.addQuestionTopics(difference)
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async updateQuestion (data, id, currentUser) {
    try {
      const question = await this.questionRepository.findById(id)
      if (!question) throw new this.NotFoundError('question not found')

      if (currentUser.role === this.constants.user_role.admin) {
        await this.addTopics(data.topics)
        return this.questionRepository.update(data, id)
      }

      if (currentUser.role === this.constants.user_role.recruiter ||
          currentUser.role === this.constants.user_role.reviewer) {
        if (JSON.stringify(question.author) === JSON.stringify(currentUser._id)) {
          await this.addTopics(data.topics)
          return this.questionRepository.update(data, id)
        }
        throw new this.ForbiddenError('not enough rights to update this question')
      }
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findAll (req) {
    const query = this.mapQuery(req.query)
    const titleSearch = query.title ? query.title.replace(/['+*?^$\\.[\]{}()|/~`!@#...]/g, '\\$&') : ''
    const regex = new RegExp('.*' + titleSearch + '.*', 'i')
    const { sortBy, order, skip, limit } = query

    const findObj = {}

    if (query.topics) findObj.topics = { $in: query.topics }
    if (query.title) findObj.title = regex
    if (query.type) findObj.type = query.type

    try {
      const questions = await this.questionRepository.findAll(findObj, skip, limit, sortBy, order)
      return questions
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findById (id) {
    try {
      const question = await this.questionRepository.findById(id)
      if (!question) throw new this.NotFoundError('question not found')
      return question
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async count () {
    try {
      const count = await this.questionRepository.count()
      return count
    } catch (err) {
      throw new this.AppError(err)
    }
  }
}

module.exports = QuestionService

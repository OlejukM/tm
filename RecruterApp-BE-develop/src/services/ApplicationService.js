class ApplicationService {
  constructor ({ AppError, ForbiddenError, NotFoundError, UnprocessableEntityError,
    applicationRepository, userRepository, vacancyRepository,
    userService, mailingService,
    constants, mapQuery, logger, signJWT, randomNumber
  }) {
    this.AppError = AppError
    this.ForbiddenError = ForbiddenError
    this.NotFoundError = NotFoundError
    this.UnprocessableEntityError = UnprocessableEntityError
    this.applicationRepository = applicationRepository
    this.userRepository = userRepository
    this.vacancyRepository = vacancyRepository
    this.userService = userService
    this.mailingService = mailingService
    this.logger = logger
    this.constants = constants
    this.mapQuery = mapQuery
    this.logger = logger
    this.signJWT = signJWT
    this.randomNumber = randomNumber
  }

  async createApplication (data) {
    try {
      const vacancy = await this.vacancyRepository.findById(data.vacancy)
      if (!vacancy) throw new this.NotFoundError('vacancy not found')

      if (vacancy.status !== this.constants.vacancy_status.active) throw new this.UnprocessableEntityError('vacancy is not currently open')

      const vacancyId = vacancy._id
      const questions = vacancy.questions.map(question => {
        return {
          question: question._id
        }
      })

      questions[0].locked = false

      let candidate = await this.userService.findUser({
        email: data.candidate.email
      })

      if (candidate && candidate.role !== this.constants.user_role.candidate) {
        throw new this.UnprocessableEntityError('user already exists and is not a candidate')
      }

      if (!candidate) {
        data.candidate.role = this.constants.user_role.candidate
        candidate = await this.userService.createUser(data.candidate)
      }

      const application = await this.applicationRepository.create(candidate, vacancyId, questions)

      const result = await this.mailingService.sendEmail(
        application.candidate,
        this.constants.email_type.candidateInvitation,
        { applicationId: application._id })

      this.logger.info(`Message sent from "${result.envelope.from}" to "${result.envelope.to}"`)

      return application
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async generateCode (applicationId) {
    try {
      let application = await this.applicationRepository.findById(applicationId)
      if (!application) throw new this.NotFoundError('application not found')

      const candidate = await this.userService.findUser({
        _id: application.candidate
      })
      if (!candidate) throw new this.NotFoundError('user not found')

      const code = this.randomNumber(6)

      application = await this.applicationRepository.updateOne(applicationId, { verificationCode: code })

      const result = await this.mailingService.sendEmail(
        candidate,
        this.constants.email_type.verification,
        { code: code })

      this.logger.info(`Message sent from "${result.envelope.from}" to "${result.envelope.to}"`)
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async generateToken (code, applicationId) {
    try {
      let application = await this.applicationRepository.findById(applicationId)
      if (!application) throw new this.NotFoundError('application not found')

      if (application.verificationCode !== code) throw new this.ForbiddenError('incorrect code')

      const token = await this.signJWT({ application: applicationId }, '24h')
      application = await this.applicationRepository.updateOne(applicationId, { verificationCode: null })

      if (application.status === this.constants.application_status.invited) {
        await this.applicationRepository.updateOne(application._id, {
          status: this.constants.application_status.started,
          startedAt: Date.now()
        })
      }

      return token
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async setAnswer (applicationId, questionId, answer) {
    try {
      const question = await this.applicationRepository.getQuestion(applicationId, questionId)
      if (question.locked) throw new this.UnprocessableEntityError('the question is locked')

      let application = await this.applicationRepository.setAnswer(applicationId, questionId, answer)
      if (!application) throw new this.NotFoundError('application not found')

      const questionIndex = application.questions.findIndex(q => q._id.toString() === questionId)
      if (questionIndex + 1 < application.questions.length) { // if next question's index is within array bounds
        const nextQuestionId = application.questions[questionIndex + 1]._id
        application = await this.applicationRepository.unlockQuestion(applicationId, nextQuestionId)
      }

      return application
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async getQuestionDetails (applicationId, questionId) {
    try {
      const question = await this.applicationRepository.getQuestion(applicationId, questionId)

      if (!question) throw new this.NotFoundError('question not found')
      if (question.locked) throw new this.UnprocessableEntityError('you must answer the previous questions first')

      return question
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async getQuestions (applicationId) {
    try {
      const application = await this.applicationRepository.findById(applicationId)
      if (!application) throw new this.NotFoundError('application not found')

      return application.questions
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async submitApplication (applicationId, submissionTime) {
    try {
      let application = await this.applicationRepository.findById(applicationId)
      if (!application) throw new this.NotFoundError('application not found')

      if (application.status !== this.constants.application_status.started) {
        throw new this.UnprocessableEntityError('cannot submit application that is not currently in progress')
      }

      application = await this.applicationRepository.updateOne(application._id, {
        status: this.constants.application_status.completed,
        completedAt: submissionTime
      })

      return application
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async getVacancyDetails (applicationId) {
    try {
      const vacancy = await this.applicationRepository.getApplicationVacancy(applicationId)
      if (!vacancy) throw new this.NotFoundError('vacancy not found')

      return vacancy
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findByVacancy (data, id) {
    const query = this.mapQuery(data)
    const { sortBy, order, skip, limit } = query

    const vacancy = await this.vacancyRepository.findById(id)
    if (!vacancy) throw new this.NotFoundError('vacancy not found')

    try {
      const applications = await this.applicationRepository.findByVacancy(sortBy, order, skip, limit, vacancy.id)
      return applications
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findRecent (data) {
    try {
      const query = this.mapQuery(data)
      let { sortBy, order, limit } = query
      const days = parseInt(query.days)

      if (!query.sortBy && !query.order) {
        sortBy = 'completedAt'
        order = -1
      }

      const recentApplications = await this.applicationRepository.findRecent(sortBy, order, limit, days)
      return recentApplications
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findByReviewer (data, currentUser) {
    const reviewer = currentUser.id
    const query = this.mapQuery(data)
    let { sortBy, order, limit, skip } = query

    try {
      const applications = await this.applicationRepository.findByReviewer(reviewer, sortBy, order, skip, limit)
      return applications
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async countApplicationsByVacancy (id) {
    try {
      const count = await this.applicationRepository.count({ vacancy: id })
      return count
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async findById (id) {
    try {
      const application = await this.applicationRepository.findById(id)

      if (!application) throw new this.NotFoundError('application not found')

      return application
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async updateOne (reviewer, id) {
    try {
      const user = await this.userRepository.findById(reviewer)
      if (!user) throw new this.NotFoundError('user not found')

      if (user.role === 'reviewer') {
        const application = await this.applicationRepository.findById(id)
        if (!application) throw new this.NotFoundError('application not found')

        const updatedApplication = await this.applicationRepository.updateOne(id, { reviewer: reviewer })

        const result = await this.mailingService.sendEmail(user, this.constants.email_type.notification, { applicationId: application._id })

        this.logger.info(`Message sent from "${result.envelope.from}" to "${result.envelope.to}"`)

        return updatedApplication
      } else {
        throw new this.UnprocessableEntityError('this user is not a reviewer')
      }
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async updateMany (reviewer, ids) {
    try {
      const user = await this.userRepository.findById(reviewer)
      if (!user) throw new this.NotFoundError('user not found')

      if (user.role === 'reviewer') {
        const applications = await this.applicationRepository.updateMany(reviewer, ids)
        return applications
      } else {
        throw new this.UnprocessableEntityError('this user is not a reviewer')
      }
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async setMark (id, questionId, mark) {
    try {
      let application = await this.applicationRepository.findById(id)
      if (!application) throw new this.NotFoundError('application not found')

      const question = application.questions.find(el => {
        return (JSON.stringify(el._id) === JSON.stringify(questionId))
      })
      if (!question) throw new this.NotFoundError('question not found')

      const options = [{ 'question._id': questionId }]
      const update = { $set: { 'questions.$[question].mark': mark } }

      application = await this.applicationRepository.updateOne(id, update, options)

      return application
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async delete (ids) {
    try {
      await this.applicationRepository.delete(ids)
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async bestScore (period) {
    try {
      const bestScore = await this.applicationRepository.findBestScorePerPeriod(period)
      return (typeof bestScore[0].score === 'number') ? bestScore[0].score : 0
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async countNeedReviewApplications () {
    try {
      const count = await this.applicationRepository.count({ status: 'completed' })
      return count
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async createComment (appId, text, currentUser) {
    try {
      const fullName = `${currentUser.firstName} ${currentUser.lastName}`

      const application = await this.applicationRepository.createComment(appId, fullName, currentUser._id, text)
      return application.comments[application.comments.length - 1]
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async evaluateApplication (id) {
    try {
      const application = await this.applicationRepository.findById(id)
      if (!application) throw new this.NotFoundError('application not found')

      const marksTotalSum = application.questions.reduce((acc, cur) => {
        return acc.mark + cur.mark
      })
      const marksMaxSum = application.questions.length * 10
      const score = (marksTotalSum / marksMaxSum * 100).toFixed(2)

      const updatedApplication = await this.applicationRepository.updateOne(id, { status: this.constants.application_status.evaluated, score: score })
      return updatedApplication
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findUserByApplication (id) {
    try {
      const application = await this.applicationRepository.findById(id)
      if (!application) throw new this.NotFoundError('application not found')

      const candidate = await this.userService.findUser({
        _id: application.candidate
      })
      if (!candidate) throw new this.NotFoundError('user not found')

      return candidate
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }
}

module.exports = ApplicationService

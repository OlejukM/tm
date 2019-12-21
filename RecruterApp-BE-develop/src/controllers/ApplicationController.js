const { makeInvoker } = require('awilix-express')

class ApplicationController {
  constructor ({ applicationService, ApplicationDto, logger, userService, vacancyService, CommentDto, VacancyDto,
    currentUser }) {
    this.applicationService = applicationService
    this.ApplicationDto = ApplicationDto
    this.logger = logger
    this.vacancyService = vacancyService
    this.userService = userService
    this.CommentDto = CommentDto
    this.VacancyDto = VacancyDto
    this.currentUser = currentUser
  }

  async createApplication (req, res, next) {
    try {
      const application = await this.applicationService.createApplication(req.body)

      res.json(this.ApplicationDto.create(application))
    } catch (err) {
      next(err)
    }
  }

  async setAnswer (req, res, next) {
    try {
      const application = await this.applicationService.setAnswer(req.params.id, req.params.questionId, req.body.answer)

      const questions = application.questions.map(q => this.ApplicationDto.createQuestion(q))
      res.json(questions)
    } catch (err) {
      next(err)
    }
  }

  async getQuestions (req, res, next) {
    try {
      const questions = await this.applicationService.getQuestions(req.params.id)

      res.json(questions.map(question => this.ApplicationDto.createQuestion(question)))
    } catch (err) {
      next(err)
    }
  }

  async getQuestionDetails (req, res, next) {
    try {
      const question = await this.applicationService.getQuestionDetails(req.params.id, req.params.questionId)

      res.json(this.ApplicationDto.createQuestion(question))
    } catch (err) {
      next(err)
    }
  }

  async submitApplication (req, res, next) {
    try {
      const application = await this.applicationService.submitApplication(req.params.id, req.body.time)

      res.json(this.ApplicationDto.createSubmitted(application))
    } catch (err) {
      next(err)
    }
  }

  async getVacancyDetails (req, res, next) {
    try {
      const vacancy = await this.applicationService.getVacancyDetails(req.params.id)

      res.json(this.VacancyDto.createCandidateLevelDetails(vacancy))
    } catch (err) {
      next(err)
    }
  }

  async getApplicationsByVacancy (req, res, next) {
    try {
      const countApplications = await this.applicationService.countApplicationsByVacancy(req.params.id)

      const allApplications = await this.applicationService.findByVacancy(req.query, req.params.id)
      res.json(this.ApplicationDto.createList(allApplications, countApplications))
    } catch (err) {
      next(err)
    }
  }

  async findRecent (req, res, next) {
    try {
      const recentApplications = await this.applicationService.findRecent(req.query)
      res.json(this.ApplicationDto.createList(recentApplications))
    } catch (err) {
      next(err)
    }
  }

  async getApplicationsByReviewer (req, res, next) {
    try {
      const applications = await this.applicationService.findByReviewer(req.query, this.currentUser)
      res.json(this.ApplicationDto.createList(applications))
    } catch (err) {
      next(err)
    }
  }

  async getApplication (req, res, next) {
    try {
      const application = await this.applicationService.findById(req.params.id)
      res.json(this.ApplicationDto.create(application))
    } catch (err) {
      next(err)
    }
  }

  async updateOne (req, res, next) {
    try {
      const updatedApplication = await this.applicationService.updateOne(req.body.reviewer, req.params.id)
      res.json(this.ApplicationDto.create(updatedApplication))
    } catch (err) {
      next(err)
    }
  }

  async updateMany (req, res, next) {
    try {
      const updatedApplications = await this.applicationService.updateMany(req.body.reviewer, req.body.ids)
      res.json(this.ApplicationDto.createList(updatedApplications))
    } catch (err) {
      next(err)
    }
  }

  async delete (req, res, next) {
    try {
      await this.applicationService.delete(req.body.ids)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  async getGeneralStatistic (req, res, next) {
    try {
      const countActiveVacancies = await this.vacancyService.countActiveVacancies()
      const countNeedReviewApplications = await this.applicationService.countNeedReviewApplications()
      const bestScoreToday = await this.applicationService.bestScore(req.query.period)

      res.json(this.ApplicationDto.createStatistic(countActiveVacancies, countNeedReviewApplications, bestScoreToday))
    } catch (err) {
      next(err)
    }
  }

  async createComment (req, res, next) {
    try {
      const comment = await this.applicationService.createComment(req.params.id, req.body.text, this.currentUser)
      res.json(this.CommentDto.create(comment))
    } catch (err) {
      next(err)
    }
  }

  async setMark (req, res, next) {
    try {
      const application = await this.applicationService.setMark(req.params.id, req.params.questionId, req.body.mark)
      res.json(this.ApplicationDto.create(application))
    } catch (err) {
      next(err)
    }
  }

  async evaluateApplication (req, res, next) {
    try {
      const application = await this.applicationService.evaluateApplication(req.params.id)
      res.json(this.ApplicationDto.create(application))
    } catch (err) {
      next(err)
    }
  }

  async generateVerificationCode (req, res, next) {
    try {
      await this.applicationService.generateCode(req.params.id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  async generateToken (req, res, next) {
    try {
      const jwt = await this.applicationService.generateToken(req.body.code, req.params.id)
      const candidate = await this.applicationService.findUserByApplication(req.params.id)
      res.json(this.ApplicationDto.createToken(jwt, candidate))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = makeInvoker(ApplicationController)

const { makeInvoker } = require('awilix-express')

class QuestionController {
  constructor ({ questionService, QuestionDto, currentUser }) {
    this.questionService = questionService
    this.QuestionDto = QuestionDto
    this.currentUser = currentUser
  }

  async createQuestion (req, res, next) {
    try {
      const question = await this.questionService.createQuestion(req.body, this.currentUser)
      res.json(this.QuestionDto.create(question))
    } catch (err) {
      next(err)
    }
  }

  async updateQuestion (req, res, next) {
    try {
      const updatedQuestion = await this.questionService.updateQuestion(req.body, req.params.id, this.currentUser)
      res.json(this.QuestionDto.create(updatedQuestion))
    } catch (err) {
      next(err)
    }
  }

  async findAll (req, res, next) {
    try {
      const countQuestions = await this.questionService.count()

      const allQuestions = await this.questionService.findAll(req)
      res.json(this.QuestionDto.createList(allQuestions, countQuestions))
    } catch (err) {
      next(err)
    }
  }

  async getQuestion (req, res, next) {
    try {
      const question = await this.questionService.findById(req.params.id)
      res.json(this.QuestionDto.create(question))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = makeInvoker(QuestionController)

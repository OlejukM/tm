const { makeInvoker } = require('awilix-express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

class QuestionMiddleware {
  constructor ({ ValidationError, settingService, constants, AppError }) {
    this.ValidationError = ValidationError
    this.settingService = settingService
    this.constants = constants
    this.AppError = AppError
  }

  async createValidate (req, res, next) {
    try {
      const schema = {
        title: Joi.string()
          .min(5)
          .max(255)
          .required(),
        description: Joi.string()
          .min(5)
          .max(3000)
          .required(),
        type: Joi.string()
          .required()
          .valid(this.constants.question_type.text, this.constants.question_type.code, this.constants.question_type.video),
        duration: Joi.number(),
        topics: Joi.array().min(1)
          .items(Joi.string())
          .required()
      }

      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      next(new this.ValidationError(err))
    }
  }

  async validateBeforeUpdate (req, res, next) {
    const schemaId = {
      id: Joi.objectId()
    }

    try {
      await Joi.validate(req.params, schemaId)

      const schema = {
        author: Joi.objectId(),
        title: Joi.string()
          .min(5)
          .max(255),
        description: Joi.string()
          .min(5)
          .max(3000),
        type: Joi.string()
          .valid(this.constants.question_type.text, this.constants.question_type.code, this.constants.question_type.video),
        duration: Joi.number(),
        topics: Joi.array().min(1)
          .items(Joi.string())
      }

      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      next(new this.ValidationError(err))
    }
  }

  async validateId (req, res, next) {
    const schemaId = {
      id: Joi.objectId()
    }

    try {
      await Joi.validate(req.params, schemaId)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateQuery (req, res, next) {
    try {
      const questionTopics = await this.settingService.getQuestionTopics()

      if (req.query.topics) req.query.topics = req.query.topics.split(',')

      const schema = {
        title: Joi.string().allow(''),
        type: Joi.string().allow('')
          .valid(this.constants.question_type.text, this.constants.question_type.code, this.constants.question_type.video),
        skip: Joi.number().required(),
        limit: Joi.number().required(),
        topics: Joi.array().items(Joi.string().valid(questionTopics)).allow(''),
        sortBy: Joi.string().allow(''),
        order: Joi.string().valid('ASC', 'DESC').allow('')
      }

      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      next(new this.ValidationError(err))
    }
  }
}

module.exports = makeInvoker(QuestionMiddleware)

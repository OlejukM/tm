const constants = require('../utils/constants')
const { makeInvoker } = require('awilix-express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

class VacancyMiddleware {
  constructor ({ ValidationError, settingService, AppError }) {
    this.ValidationError = ValidationError
    this.settingService = settingService
    this.AppError = AppError
  }

  async createValidate (req, res, next) {
    try {
      const vacancyTypes = await this.settingService.getVacancyTypes()

      const schema = {
        title: Joi.string().min(1).max(500).required(),
        type: Joi.string().required()
          .valid(vacancyTypes),
        description: Joi.string().min(1).max(1500).required(),
        status: Joi.string()
          .valid(
            constants.vacancy_status.onHold,
            constants.vacancy_status.active,
            constants.vacancy_status.closed)
          .default(constants.vacancy_status.onHold),
        questions: Joi.array().items(Joi.objectId()),
        link: Joi.string().required().min(3)
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
      id: Joi.objectId().required()
    }
    try {
      await Joi.validate(req.params, schemaId)

      const vacancyTypes = await this.settingService.getVacancyTypes()

      const schema = {
        title: Joi.string().min(1).max(500).required(),
        type: Joi.string()
          .valid(vacancyTypes)
          .required(),
        description: Joi.string().min(1).max(15000).required(),
        status: Joi.string()
          .valid(
            constants.vacancy_status.onHold,
            constants.vacancy_status.active,
            constants.vacancy_status.closed)
          .default(constants.vacancy_status.onHold),
        questions: Joi.array().items(Joi.objectId()),
        link: Joi.string().required()
      }

      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      if (err instanceof this.AppError) return next(err)
      next(new this.ValidationError(err))
    }
  }

  async validateQuery (req, res, next) {
    const schema = {
      sortBy: Joi.string()
        .valid(Object.values(constants.vacancy_param))
        .default(constants.vacancy_param.title),
      order: Joi.string()
        .valid('asc', 'desc')
        .default('asc'),
      skip: Joi.number().default(1),
      limit: Joi.number().default(10)
    }

    try {
      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateId (req, res, next) {
    const schema = {
      id: Joi.objectId().required()
    }
    try {
      await Joi.validate(req.params, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }
}

module.exports = makeInvoker(VacancyMiddleware)

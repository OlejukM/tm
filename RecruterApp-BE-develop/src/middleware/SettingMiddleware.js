const { makeInvoker } = require('awilix-express')
const Joi = require('joi')

class SettingMiddleware {
  constructor ({ ValidationError, settingService, AppError }) {
    this.ValidationError = ValidationError
    this.settingService = settingService
    this.AppError = AppError
  }

  async vacancyTypeValidation (req, res, next) {
    const schema = {
      name: Joi.string()
        .required()
        .min(1)
        .max(100)
    }
    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async questionTopicValidation (req, res, next) {
    const schema = {
      topics: Joi.array()
        .items(Joi.string().min(1).max(100))
        .required()
    }
    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }
}

module.exports = makeInvoker(SettingMiddleware)

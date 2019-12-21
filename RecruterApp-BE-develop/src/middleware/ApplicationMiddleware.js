const { makeInvoker } = require('awilix-express')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

class ApplicationMiddleware {
  constructor ({ ValidationError }) {
    this.ValidationError = ValidationError
  }

  async validate (req, res, next) {
    const schema = {
      candidate: Joi.object({
        firstName: Joi.string()
          .trim()
          .regex(/[A-Za-z]/)
          .min(1)
          .max(256),
        lastName: Joi.string()
          .trim()
          .regex(/[A-Za-z]/)
          .min(1)
          .max(256),
        email: Joi.string()
          .required()
          .trim()
          .lowercase()
          .min(6)
          .max(256)
          .email({ minDomainAtoms: 2 })
      }).required(),
      vacancy: Joi.objectId().required()
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateQuery (req, res, next) {
    const schema = {
      sortBy: Joi.string().valid('status', 'score', 'reviewer', 'invitedAt'),
      order: Joi.string().valid('asc', 'desc'),
      skip: Joi.number().integer().required(),
      limit: Joi.number().integer().required()
    }

    try {
      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateQueryForRecentApplications (req, res, next) {
    const schema = {
      sortBy: Joi.string().valid('score', 'candidate', 'reviewer'),
      order: Joi.string().valid('asc', 'desc'),
      limit: Joi.number().integer().required(),
      days: Joi.number().integer().required()
    }

    try {
      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateQueryForReviewerApplications (req, res, next) {
    const schema = {
      sortBy: Joi.string().valid('status', 'score', 'candidate'),
      order: Joi.string().valid('asc', 'desc'),
      skip: Joi.number().integer().required(),
      limit: Joi.number().integer().required()
    }

    try {
      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateId (req, res, next) {
    const schemaId = {
      id: Joi.objectId(),
      questionId: Joi.objectId()
    }

    try {
      await Joi.validate(req.params, schemaId)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateBeforeUpdate (req, res, next) {
    const schema = {
      reviewer: Joi.objectId().required(),
      ids: Joi.array().items(Joi.objectId())
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateBeforeDelete (req, res, next) {
    const schema = {
      ids: Joi.array().items(Joi.objectId())
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async commentValidate (req, res, next) {
    const idSchema = {
      id: Joi.objectId().required()
    }

    const schema = {
      text: Joi.string().min(3).max(3000).required()
    }

    try {
      await Joi.validate(req.params, idSchema)
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateStatistic (req, res, next) {
    const schema = {
      period: Joi.number().integer().min(1).required()
    }

    try {
      await Joi.validate(req.query, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateMark (req, res, next) {
    const schema = {
      mark: Joi.number().integer().min(1).max(10).allow(null)
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async validateAnswer (req, res, next) {
    const schema = {
      answer: Joi.string().trim().min(1).max(4096).required()
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }

  async valiadateCode (req, res, next) {
    const schema = {
      code: Joi.number().integer().required()
    }

    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }
}

module.exports = makeInvoker(ApplicationMiddleware)

const { makeInvoker } = require('awilix-express')
const Joi = require('joi')

class UserMiddleware {
  constructor ({ ValidationError, isEmpty }) {
    this.ValidationError = ValidationError
    this.isEmpty = isEmpty
  }

  transformUserSearchQuery (query, isEmpty) {
    function removeEmptyFields (q) {
      return q.filter(function (val) { return !isEmpty(val[1]) })
    }

    function splitFieldsAtCommas (q) {
      return q.map(function (val) { return val[1].includes(',') ? [val[0], val[1].split(',')] : val })
    }

    function addINtoArrayFields (q) {
      return q.map(function (val) {
        if (Array.isArray(val[1])) return [val[0], { $in: val[1].filter(v => !isEmpty(v)) }]
        else return val
      })
    }

    let queryArray = Object.entries(query)
    queryArray = removeEmptyFields(queryArray)
    queryArray = splitFieldsAtCommas(queryArray)
    queryArray = addINtoArrayFields(queryArray)
    queryArray = removeEmptyFields(queryArray)

    const q = queryArray.reduce(function (acc, val) {
      acc[val[0]] = val[1]
      return acc
    }, {})

    return q
  }

  transformSearchQuery (req, res, next) {
    req.query = this.transformUserSearchQuery(req.query, this.isEmpty)

    next()
  }

  async validateUser (req, res, next) {
    const schema = {
      email: Joi.string()
        .required()
        .trim()
        .lowercase()
        .min(6)
        .max(256)
        .email({ minDomainAtoms: 2 })
    }
    try {
      await Joi.validate(req.body, schema)
      next()
    } catch (err) {
      next(new this.ValidationError(err))
    }
  }
}

module.exports = makeInvoker(UserMiddleware)

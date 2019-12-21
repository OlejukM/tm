const mongoose = require('mongoose')
const Schema = mongoose.Schema
const constants = require('../utils/constants')

const vacancySchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 500,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15000
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: [constants.vacancy_status.active, constants.vacancy_status.closed, constants.vacancy_status.onHold],
    default: constants.vacancy_status.onHold
  },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question'
  }],
  type: {
    type: String
  },
  link: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  }
},
{ timestamps: {
  createdAt: 'created_at'
} })

module.exports = mongoose.model('Vacancy', vacancySchema)

const constants = require('../utils/constants')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  mark: {
    type: Number,
    min: 1,
    max: 10
  },
  answer: {
    type: String,
    minlength: 3,
    maxlength: 3000
  },
  videoKey: {
    type: String
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  locked: {
    type: Boolean,
    default: true
  }
})

const commentSchema = new Schema({
  by: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    minlength: 3,
    maxlength: 3000,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

const applicationSchema = new Schema({
  candidate: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  reviewer: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  vacancy: {
    type: mongoose.Types.ObjectId,
    ref: 'Vacancy',
    required: true
  },
  questions: [ questionSchema ],
  invitedAt: {
    type: Date
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  evaluatedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: [
      constants.application_status.completed,
      constants.application_status.evaluated,
      constants.application_status.invited,
      constants.application_status.started
    ],
    required: true
  },
  score: {
    type: Number
  },
  comments: [ commentSchema ],
  verificationCode: {
    type: String
  }
})

applicationSchema.virtual('timeTaken').get(function () {
  let time = {
    hours: this.completedAt.getHours() - this.startedAt.getHours(),
    minutes: this.completedAt.getMinutes() - this.startedAt.getMinutes()
  }

  if (time.hours < 0) {
    time.hours += 24
  }

  if (time.minutes < 0) {
    time.hours--
    time.minutes += 60
  }

  return time
})

module.exports = mongoose.model('Application', applicationSchema)

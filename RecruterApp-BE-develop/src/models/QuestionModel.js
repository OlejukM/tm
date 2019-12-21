const constants = require('../utils/constants')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 3000,
    trim: true
  },
  type: {
    type: String,
    enum: [
      constants.question_type.text,
      constants.question_type.code,
      constants.question_type.video],
    required: true
  },
  duration: {
    type: Number
  },
  topics: [{
    type: String
  }]
})

module.exports = mongoose.model('Question', questionSchema)

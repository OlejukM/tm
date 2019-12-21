const mongoose = require('mongoose')
const Schema = mongoose.Schema

const systemVarsSchema = new Schema({
  vacancy_types: [{
    type: String,
    minlength: 1,
    maxlength: 100,
    trim: true
  }],
  question_topics: [{
    type: String,
    minlength: 1,
    maxlength: 100,
    trim: true
  }]
})

module.exports = mongoose.model('SystemVars', systemVarsSchema)

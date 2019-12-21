const mongoose = require('mongoose')
const Schema = mongoose.Schema

function capitalize (value) {
  if (typeof value !== 'string') return ''

  return value.charAt(0).toUpperCase() + value.substring(1)
}

function inspect (value, schematype) {
  if (!value && schematype.options.required) {
    throw new Error(`${schematype.path} is required.`)
  }
  return value
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    set: (val, schtype) => capitalize(inspect(val, schtype)),
    minLength: 1,
    maxLength: 256
  },
  lastName: {
    type: String,
    trim: true,
    set: (val, schtype) => capitalize(inspect(val, schtype)),
    minLength: 1,
    maxLength: 256
  },
  email: {
    type: String,
    required: true,
    trim: true,
    set: inspect,
    minLength: 6,
    maxLength: 256,
    lowercase: true,
    unique: true,
    index: true
  },
  role: {
    type: String,
    trim: true,
    lowercase: true,
    enum: ['admin', 'recruiter', 'reviewer', 'candidate'],
    required: true,
    default: 'candidate',
    set: inspect
  },
  googleId: {
    type: String,
    trim: true,
    match: [/\d{21}/, 'Google User ID not valid.']
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

UserSchema.virtual('accessLevel').get(function () {
  switch (this.role) {
    case 'admin': return 4
    case 'recruiter': return 3
    case 'reviewer': return 2
    case 'candidate': return 1
    default: return 0
  }
})

module.exports = mongoose.model('User', UserSchema)

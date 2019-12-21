const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const { scopePerRequest } = require('awilix-express')

const container = require('./container')
const ErrorMiddleware = require('../src/middleware/ErrorMiddleware')
const seeds = require('./seed/')
const app = express()
const port = process.env.PORT

const mongoDB = process.env.MONGODB_URI

mongoose.Promise = global.Promise

app.use(cors())
app.use(scopePerRequest(container))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/hc', (req, res) => res.sendStatus(200))

app.use('/questions', require('./routes/questions'))
app.use('/vacancies', require('./routes/vacancies'))
app.use('/users', require('./routes/users'))
app.use('/signin', require('./routes/signin'))
app.use('/applications', require('./routes/applications'))
app.use('/settings', require('./routes/settings'))

app.use('/', ErrorMiddleware.errorHandler)

mongoose.connect(mongoDB, { useNewUrlParser: true })
  .then(async () => {
    console.log('Connected to MongoDB...')
    const seed = await seeds()
    console.log(seed)
  })
  .then(() => {
    app.listen(port, () => console.log(`RecruterApp-BE is running on port ${port}!`))
  })
  .catch(err => {
    console.log('MongoDB connection error:', err)
  })
mongoose.set('debug', process.env.NODE_ENV === 'local')

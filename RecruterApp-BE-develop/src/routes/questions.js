const router = require('express').Router()

const QuestionController = require('../controllers/QuestionController')
const QuestionMiddleware = require('../middleware/QuestionMiddleware')
const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')
const HasReviewerRights = require('../middleware/HasReviewerRights')

router.post('/',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), QuestionMiddleware('createValidate'),
  QuestionController('createQuestion'))

router.put('/:id',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), QuestionMiddleware('validateBeforeUpdate'),
  QuestionController('updateQuestion'))

router.get('/',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), QuestionMiddleware('validateQuery'),
  QuestionController('findAll'))

router.get('/:id', GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), QuestionMiddleware('validateId'),
  QuestionController('getQuestion'))

module.exports = router

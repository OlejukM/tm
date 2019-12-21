const router = require('express').Router()

const ApplicationController = require('../controllers/ApplicationController')
const ApplicationMiddleware = require('../middleware/ApplicationMiddleware')
const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')
const HasReviewerRights = require('../middleware/HasReviewerRights')
const HasRecruiterRights = require('../middleware/HasRecruiterRights')
const JWTAuthMiddleware = require('../middleware/JWTAuthMiddleware')
const CandidateAccessMiddleware = require('../middleware/CandidateAccessMiddleware')
const HasPublicRights = require('../middleware/HasPublicRights')

router.get('/:id/submission',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'),
  ApplicationController('getApplication'))

router.get('/:id/questions',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'),
  ApplicationController('getQuestions'))

router.get('/:id/questions/:questionId',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'),
  ApplicationController('getQuestionDetails'))

router.patch('/:id/questions/:questionId',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'), ApplicationMiddleware('validateAnswer'),
  ApplicationController('setAnswer'))

router.post('/:id/submission',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'),
  ApplicationController('submitApplication'))

router.get('/:id/vacancy',
  JWTAuthMiddleware('authenticate'), CandidateAccessMiddleware('grantAccess'), ApplicationMiddleware('validateId'),
  ApplicationController('getVacancyDetails'))

router.post('/',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validate'),
  ApplicationController('createApplication'))

router.get('/home/recruiter',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateQueryForRecentApplications'),
  ApplicationController('findRecent'))

router.get('/:id',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), ApplicationMiddleware('validateId'),
  ApplicationController('getApplication'))

router.get('/home/reviewer',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), ApplicationMiddleware('validateQueryForReviewerApplications'),
  ApplicationController('getApplicationsByReviewer'))

router.put('/:id',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateId'), ApplicationMiddleware('validateBeforeUpdate'),
  ApplicationController('updateOne'))

router.put('/',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateBeforeUpdate'),
  ApplicationController('updateMany'))

router.patch('/:id/review/:questionId/question',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), ApplicationMiddleware('validateId'), ApplicationMiddleware('validateMark'),
  ApplicationController('setMark'))

router.patch('/:id/evaluate',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), ApplicationMiddleware('validateId'),
  ApplicationController('evaluateApplication'))

router.delete('/',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateBeforeDelete'),
  ApplicationController('delete'))

router.get('/info/statistics',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateStatistic'),
  ApplicationController('getGeneralStatistic'))

router.post('/:id/comments',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'), ApplicationMiddleware('commentValidate'),
  ApplicationController('createComment'))

router.post('/:id/verification',
  HasPublicRights('authorize'),
  ApplicationController('generateVerificationCode'))

router.post('/:id/accessToken',
  HasPublicRights('authorize'), ApplicationMiddleware('valiadateCode'),
  ApplicationController('generateToken'))

module.exports = router

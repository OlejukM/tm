const router = require('express').Router()

const UserController = require('../controllers/UserController')
const UserMiddleware = require('../middleware/UserMiddleware')
const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')
const HasReviewerRights = require('../middleware/HasReviewerRights')
const HasRecruiterRigths = require('../middleware/HasRecruiterRights')
const HasAdminRights = require('../middleware/HasAdminRights')

router.get('/',
  GoogleAuthMiddleware('authenticate'),
  HasReviewerRights('authorize'),
  UserMiddleware('transformSearchQuery'),
  UserController('find')
)

router.get('/recruiters',
  GoogleAuthMiddleware('authenticate'),
  HasAdminRights('authorize'),
  UserController('findRecruiters')
)

router.post('/recruiters',
  GoogleAuthMiddleware('authenticate'),
  HasAdminRights('authorize'),
  UserMiddleware('validateUser'),
  UserController('recruiterInvite')
)

router.post('/reviewers',
  GoogleAuthMiddleware('authenticate'),
  HasRecruiterRigths('authorize'),
  UserMiddleware('validateUser'),
  UserController('reviewerInvite')
)

module.exports = router

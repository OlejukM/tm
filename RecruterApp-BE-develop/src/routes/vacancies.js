const router = require('express').Router()

const VacancyController = require('../controllers/VacancyConroller')
const VacancyMiddleware = require('../middleware/VacancyMiddleware')
const ApplicationController = require('../controllers/ApplicationController')
const ApplicationMiddleware = require('../middleware/ApplicationMiddleware')
const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')
const HasRecruiterRights = require('../middleware/HasRecruiterRights')

router.post('/',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('createValidate'),
  VacancyController('createVacancy'))

router.put('/:id',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('validateBeforeUpdate'),
  VacancyController('updateVacancy'))

router.get('/',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('validateQuery'),
  VacancyController('findAllVacancies'))

router.get('/:id',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('validateId'),
  VacancyController('getVacancy'))

router.get('/:id/statistics',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('validateId'),
  VacancyController('getVacancyStatistics'))

router.get('/statistics/all',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), VacancyMiddleware('validateQuery'),
  VacancyController('getVacancyStatisticsList'))

router.get('/:id/applications',
  GoogleAuthMiddleware('authenticate'), HasRecruiterRights('authorize'), ApplicationMiddleware('validateId'), ApplicationMiddleware('validateQuery'),
  ApplicationController('getApplicationsByVacancy'))

module.exports = router

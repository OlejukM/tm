const router = require('express').Router()

const GoogleAuthMiddleware = require('../middleware/GoogleAuthMiddleware')
const SettingMiddleware = require('../middleware/SettingMiddleware')
const HasReviewerRights = require('../middleware/HasReviewerRights')
const HasAdminRights = require('../middleware/HasAdminRights')
const SettingController = require('../controllers/SettingConroller')

router.get('/question_topics',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'),
  SettingController('getQuestionTopics'))

router.post('/question_topics',
  GoogleAuthMiddleware('authenticate'), HasAdminRights('authorize'), SettingMiddleware('questionTopicValidation'),
  SettingController('addQuestionTopics'))

router.delete('/question_topics/:name',
  GoogleAuthMiddleware('authenticate'), HasAdminRights('authorize'),
  SettingController('deleteQuestionTopic'))

router.get('/vacancies_types',
  GoogleAuthMiddleware('authenticate'), HasReviewerRights('authorize'),
  SettingController('getVacancyTypes'))

router.post('/vacancies_types',
  GoogleAuthMiddleware('authenticate'), HasAdminRights('authorize'), SettingMiddleware('vacancyTypeValidation'),
  SettingController('addVacancyType'))

module.exports = router

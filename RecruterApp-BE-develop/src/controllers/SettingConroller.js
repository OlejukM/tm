const { makeInvoker } = require('awilix-express')

class SettingController {
  constructor ({ settingService, SettingDto }) {
    this.settingService = settingService
    this.SettingDto = SettingDto
  }

  async getVacancyTypes (req, res, next) {
    try {
      const vacancyTypes = await this.settingService.getVacancyTypes()
      res.json(this.SettingDto.createVacancyTypes(vacancyTypes))
    } catch (err) {
      next(err)
    }
  }

  async getQuestionTopics (req, res, next) {
    try {
      const questionTopics = await this.settingService.getQuestionTopics()
      res.json(this.SettingDto.createQuestionTopics(questionTopics))
    } catch (err) {
      next(err)
    }
  }

  async addVacancyType (req, res, next) {
    try {
      const vacancyType = await this.settingService.addVacancyType(req.body.name)
      res.json(this.SettingDto.createVacancyType(vacancyType))
    } catch (err) {
      next(err)
    }
  }

  async addQuestionTopics (req, res, next) {
    try {
      const questionTopics = await this.settingService.addQuestionTopics(req.body.topics)
      res.json(questionTopics)
    } catch (err) {
      next(err)
    }
  }

  async deleteQuestionTopic (req, res, next) {
    try {
      await this.settingService.deleteQuestionTopic(req.params.name)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = makeInvoker(SettingController)

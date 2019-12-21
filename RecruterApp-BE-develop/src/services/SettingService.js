class SettingService {
  constructor ({ settingRepository, AppError, ValidationError }) {
    this.settingRepository = settingRepository
    this.AppError = AppError
    this.ValidationError = ValidationError
  }

  async getVacancyTypes () {
    try {
      const vacancyTypes = await this.settingRepository.getVacancyTypes()
      return vacancyTypes
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async getQuestionTopics () {
    try {
      const questionTopics = await this.settingRepository.getQuestionTopics()
      return questionTopics
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async addVacancyType (type) {
    try {
      const vacancyTypes = await this.settingRepository.getVacancyTypes()

      if (vacancyTypes.includes(type)) throw new this.ValidationError('Type already exsist')

      const systemVars = await this.settingRepository.addVacancyType(type)
      return systemVars.vacancy_types[systemVars.vacancy_types.length - 1]
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async addQuestionTopics (topics) {
    try {
      const questionTopics = await this.settingRepository.getQuestionTopics()

      topics.forEach(topic => {
        if (questionTopics.includes(topic)) {
          throw new this.ValidationError('Topic already exsist')
        }
      })

      await this.settingRepository.addQuestionTopics(topics)
      return topics
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async deleteQuestionTopic (name) {
    try {
      await this.settingRepository.deleteQuestionTopic(name)
    } catch (err) {
      throw new this.AppError(err)
    }
  }
}

module.exports = SettingService

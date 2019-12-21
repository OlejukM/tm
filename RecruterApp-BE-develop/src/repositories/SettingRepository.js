class SettingRepository {
  constructor ({ SettingModel }) {
    this.SettingModel = SettingModel
  }

  async getVacancyTypes () {
    const systemVars = await this.SettingModel.findOne()
    return systemVars.vacancy_types
  }

  async getQuestionTopics () {
    const systemVars = await this.SettingModel.findOne()
    return systemVars.question_topics
  }

  async addVacancyType (type) {
    const systemVars = await this.SettingModel.findOneAndUpdate({}, {
      $push: {
        vacancy_types: type
      }
    }, { new: true })
    return systemVars
  }

  async addQuestionTopics (topic) {
    const systemVars = await this.SettingModel.findOneAndUpdate({}, {
      $push: {
        question_topics: topic
      }
    }, { new: true })
    return systemVars
  }

  async deleteQuestionTopic (name) {
    await this.SettingModel.findOneAndUpdate({}, {
      $pullAll: {
        question_topics: [name]
      }
    })
  }
}

module.exports = SettingRepository

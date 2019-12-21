class SettingDto {
  static createVacancyTypes (vacancyTypes) {
    return {
      vacancyTypes
    }
  }

  static createQuestionTopics (questionTopics) {
    return {
      questionTopics
    }
  }

  static createVacancyType (type) {
    return type
  }

  static createQuestionTopic (topic) {
    return topic
  }
}

module.exports = SettingDto

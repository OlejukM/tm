class VacancyDto {
  static createList (vacancy, count) {
    return {
      items: vacancy.map(vacancy => this.create(vacancy)),
      count: count
    }
  }

  static create (vacancy) {
    return {
      id: vacancy._id,
      title: vacancy.title,
      description: vacancy.description,
      type: vacancy.type,
      questions: vacancy.questions ? vacancy.questions.map(question => {
        return {
          id: question._id,
          type: question.type,
          topics: question.topics,
          title: question.title,
          description: question.description,
          duration: question.duration
        }
      }) : [],
      status: vacancy.status,
      created_at: vacancy.created_at,
      link: vacancy.link
    }
  }

  static createStatistics (vacancy) {
    return {
      status: vacancy.status,
      avgScore: vacancy.avgScore,
      completed: vacancy.completed,
      opened: vacancy.opened
    }
  }

  static createCandidateLevelDetails (vacancy) {
    return {
      type: vacancy.type,
      title: vacancy.title,
      description: vacancy.description
    }
  }
}

module.exports = VacancyDto

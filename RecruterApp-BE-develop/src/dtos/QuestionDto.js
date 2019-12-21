class QuestionDto {
  static createList (questions, count) {
    return {
      items: questions.map(question => this.create(question)),
      count: count
    }
  }

  static create (question) {
    return {
      id: question._id,
      author: {
        id: question.author._id,
        firstName: question.author.firstName,
        lastName: question.author.lastName
      },
      topics: question.topics,
      title: question.title,
      description: question.description,
      type: question.type,
      duration: question.duration
    }
  }
}

module.exports = QuestionDto

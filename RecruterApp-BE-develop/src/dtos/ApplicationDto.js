class ApplicationDto {
  static create (application) {
    return {
      id: application._id,
      status: application.status,
      score: application.score,
      startedAt: application.startedAt,
      evaluatedAt: application.evaluatedAt,
      completedAt: application.completedAt,
      invitedAt: application.invitedAt,
      timeTaken: application.completedAt ? application.timeTaken : null,
      candidate: {
        id: application.candidate._id,
        firstName: application.candidate.firstName,
        lastName: application.candidate.lastName,
        email: application.candidate.email
      },
      reviewer: application.reviewer ? {
        id: application.reviewer._id,
        firstName: application.reviewer.firstName,
        lastName: application.reviewer.lastName,
        email: application.reviewer.email
      } : null,
      vacancy: {
        id: application.vacancy._id,
        title: application.vacancy.title,
        status: application.vacancy.status
      },
      questions: application.questions ? application.questions.map(q => {
        return {
          id: q._id,
          mark: q.mark,
          type: q.question ? q.question.type : q.question,
          topics: q.question ? q.question.topics : q.question,
          title: q.question ? q.question.title : q.question,
          description: q.question ? q.question.description : q.question,
          duration: q.question ? q.question.duration : q.question,
          answer: q.answer
        }
      }) : [],
      comments: application.comments ? application.comments.map(c => {
        return {
          id: c._id,
          by: c.by,
          text: c.text,
          createdAt: c.createdAt
        }
      }) : []
    }
  }

  static createList (applications, count) {
    return {
      items: applications.map(e => this.create(e)),
      count: count
    }
  }

  static createStatistic (active, needReview, bestScore) {
    return {
      activeVacancies: active,
      needReview: needReview,
      bestScoreToday: bestScore
    }
  }

  static createQuestion (question) {
    return (question.locked) ? null : {
      id: question._id,
      type: question.question ? question.question.type : null,
      topics: question.question ? question.question.topics : null,
      title: question.question ? question.question.title : null,
      description: question.question ? question.question.description : null,
      answer: question.answer,
      isDone: !!question.answer
    }
  }

  static createToken (token, user) {
    return {
      token: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
        role: user.role,
        email: user.email
      }
    }
  }

  static createSubmitted (application) {
    return {
      status: application.status
    }
  }
}

module.exports = ApplicationDto

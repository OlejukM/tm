class VacancyService {
  constructor ({ vacancyRepository, NotFoundError, mapQuery, applicationRepository, AppError, constants, currentUser }) {
    this.vacancyRepository = vacancyRepository
    this.NotFoundError = NotFoundError
    this.mapQuery = mapQuery
    this.applicationRepository = applicationRepository
    this.AppError = AppError
    this.constants = constants
    this.currentUser = currentUser
  }

  async createVacancy (data, currentUser) {
    try {
      let vacancy = Object.assign({}, data)
      vacancy.author = currentUser._id
      vacancy = await this.vacancyRepository.create(vacancy)
      return vacancy
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async updateVacancy (id, data, currentUser) {
    try {
      let vacancy = await this.vacancyRepository.findById(id)
      if (!vacancy) throw new this.NotFoundError('vacancy not found')
      vacancy = Object.assign({}, data)
      vacancy.author = currentUser._id
      vacancy = await this.vacancyRepository.update(id, vacancy)
      return vacancy
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async findAllVacancies (req) {
    const query = this.mapQuery(req.query)
    const { sortBy, skip, limit, order } = query
    try {
      const vacancies = await this.vacancyRepository.findAll(sortBy, order, skip, limit)
      return vacancies
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async getVacancy (id) {
    try {
      const vacancy = await this.vacancyRepository.findById(id)
      if (!vacancy) throw new this.NotFoundError('vacancy not found')
      return vacancy
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async count () {
    try {
      const count = await this.vacancyRepository.count()
      return count
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async getVacancyStatistics (id) {
    try {
      const vacancy = await this.vacancyRepository.findById(id)
      if (!vacancy) throw new this.NotFoundError('vacancy not found')

      const applications = await this.applicationRepository.findByVacancyId(id)

      const scores = applications
        .filter(application => {
          return application.status === this.constants.application_status.evaluated && typeof application.score === 'number'
        })
        .map(application => application.score)

      const avgScore = scores.length ? (scores.reduce((acc, score) => acc + score, 0) / scores.length) : null
      const statistics = {
        id: vacancy._id,
        title: vacancy.title,
        type: vacancy.type,
        status: vacancy.status,
        opened: vacancy.created_at,
        completed: scores.length,
        avgScore: avgScore
      }
      return statistics
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  async getVacancyStatisticsList () {
    try {
      const vacancies = await this.vacancyRepository.findAll()
      let statistics = vacancies.map(vacancy => this.getVacancyStatistics(vacancy._id))
      statistics = await Promise.all(statistics)

      return statistics
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  async countActiveVacancies () {
    try {
      const count = await this.vacancyRepository.count({ status: this.constants.vacancy_status.active })
      return count
    } catch (err) {
      throw new this.AppError(err)
    }
  }
}

module.exports = VacancyService

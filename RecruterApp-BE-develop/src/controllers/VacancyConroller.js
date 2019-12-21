const { makeInvoker } = require('awilix-express')

class VacancyController {
  constructor ({ vacancyService, VacancyDto, currentUser }) {
    this.vacancyService = vacancyService
    this.VacancyDto = VacancyDto
    this.currentUser = currentUser
  }

  async createVacancy (req, res, next) {
    try {
      const vacancy = await this.vacancyService.createVacancy(req.body, this.currentUser)
      res.json(this.VacancyDto.create(vacancy))
    } catch (err) {
      next(err)
    }
  }

  async updateVacancy (req, res, next) {
    try {
      const vacancy = await this.vacancyService.updateVacancy(req.params.id, req.body, this.currentUser)
      res.json(this.VacancyDto.create(vacancy))
    } catch (err) {
      next(err)
    }
  }

  async findAllVacancies (req, res, next) {
    try {
      const countVacancies = await this.vacancyService.count()
      const vacancies = await this.vacancyService.findAllVacancies(req)
      res.json(this.VacancyDto.createList(vacancies, countVacancies))
    } catch (err) {
      next(err)
    }
  }

  async getVacancy (req, res, next) {
    try {
      const vacancy = await this.vacancyService.getVacancy(req.params.id)
      res.json(this.VacancyDto.create(vacancy))
    } catch (err) {
      next(err)
    }
  }

  async getVacancyStatistics (req, res, next) {
    try {
      const statistics = await this.vacancyService.getVacancyStatistics(req.params.id)
      res.json(this.VacancyDto.createStatistics(statistics))
    } catch (err) {
      next(err)
    }
  }

  async getVacancyStatisticsList (req, res, next) {
    try {
      const statistics = await this.vacancyService.getVacancyStatisticsList()
      res.json(statistics.map(statistics => this.VacancyDto.createStatistics(statistics)))
    } catch (err) {
      next(err)
    }
  }
}

module.exports = makeInvoker(VacancyController)

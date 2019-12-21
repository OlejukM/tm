class VacancyRepository {
  constructor ({ VacancyModel }) {
    this.VacancyModel = VacancyModel
  }

  create (data) {
    return this.VacancyModel.create(data)
  }

  findById (id) {
    return this.VacancyModel.findById(id).populate({ path: 'questions' })
  }

  update (id, data) {
    return this.VacancyModel.findByIdAndUpdate(id, data, { new: true })
  }

  findAll (sortBy, order, skip, limit) {
    return this.VacancyModel
      .find()
      .sort({ [sortBy]: order })
      .skip((skip - 1) * limit)
      .limit(+limit)
      .populate('questions')
  }

  count (filter) {
    return this.VacancyModel.countDocuments(filter)
  }
}

module.exports = VacancyRepository

const awilix = require('awilix')
const Lifetime = awilix.Lifetime

const QuestionDto = require('./dtos/QuestionDto')
const VacancyDto = require('./dtos/VacancyDto')
const UserDto = require('./dtos/UserDto')
const SettingDto = require('./dtos/SettingDto')
const ApplicationDto = require('./dtos/ApplicationDto')
const CommentDto = require('./dtos/CommentDto')

const QuestionService = require('./services/QuestionService')
const VacancyService = require('./services/VacancyService')
const UserService = require('./services/UserService')
const SettingService = require('./services/SettingService')
const ApplicationService = require('./services/ApplicationService')
const MailingService = require('./services/MailingService')

const QuestionRepository = require('./repositories/QuestionRepository')
const VacancyRepository = require('./repositories/VacancyRepository')
const UserRepository = require('./repositories/UserRepository')
const SettingRepository = require('./repositories/SettingRepository')
const ApplicationRepository = require('./repositories/ApplicationRepository')

const QuestionModel = require('./models/QuestionModel')
const VacancyModel = require('./models/VacancyModel')
const UserModel = require('./models/UserModel')
const SettingModel = require('./models/SettingsModel')
const ApplicationModel = require('./models/ApplicationModel')

const NotFoundError = require('./utils/errors/NotFoundError')
const ValidationError = require('./utils/errors/ValidationError')
const AppError = require('../src/utils/errors/AppError')
const UnauthorizedAccessError = require('../src/utils/errors/UnauthorizedAccessError')
const ForbiddenError = require('./utils/errors/ForbiddenError')
const UnprocessableEntityError = require('./utils/errors/UnprocessableEntityError')

const isEmpty = require('./utils/isEmpty')
const parseHeader = require('./utils/helpers/parseHeader')
const { verifyGoogleIdToken } = require('./utils/helpers/GoogleIdTokenHandler')
const { verifyJWT, signJWT } = require('./utils/helpers/JWTHandler')
const constants = require('../src/utils/constants')
const mapQuery = require('../src/utils/mapQuery')
const logger = require('./utils/logger')
const randomNumber = require('./utils/randomNumber')

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

container.register({
  QuestionDto: awilix.asValue(QuestionDto),
  VacancyDto: awilix.asValue(VacancyDto),
  SettingDto: awilix.asValue(SettingDto),
  UserDto: awilix.asValue(UserDto),
  ApplicationDto: awilix.asValue(ApplicationDto),
  CommentDto: awilix.asValue(CommentDto)
})

container.register({
  questionService: awilix.asClass(QuestionService, { lifetime: Lifetime.SCOPED }),
  vacancyService: awilix.asClass(VacancyService, { lifetime: Lifetime.SCOPED }),
  settingService: awilix.asClass(SettingService, { lifetime: Lifetime.SCOPED }),
  userService: awilix.asClass(UserService, { lifetime: Lifetime.SCOPED }),
  applicationService: awilix.asClass(ApplicationService, { lifetime: Lifetime.SCOPED }),
  mailingService: awilix.asClass(MailingService, { lifetime: Lifetime.SCOPED })
})

container.register({
  questionRepository: awilix.asClass(QuestionRepository, { lifetime: Lifetime.SINGLETON }),
  vacancyRepository: awilix.asClass(VacancyRepository, { lifetime: Lifetime.SINGLETON }),
  settingRepository: awilix.asClass(SettingRepository, { lifetime: Lifetime.SINGLETON }),
  userRepository: awilix.asClass(UserRepository, { lifetime: Lifetime.SINGLETON }),
  applicationRepository: awilix.asClass(ApplicationRepository, { lifetime: Lifetime.SINGLETON })
})

container.register({
  QuestionModel: awilix.asValue(QuestionModel),
  VacancyModel: awilix.asValue(VacancyModel),
  SettingModel: awilix.asValue(SettingModel),
  UserModel: awilix.asValue(UserModel),
  ApplicationModel: awilix.asValue(ApplicationModel)
})

container.register({
  ValidationError: awilix.asValue(ValidationError),
  AppError: awilix.asValue(AppError),
  NotFoundError: awilix.asValue(NotFoundError),
  UnauthorizedAccessError: awilix.asValue(UnauthorizedAccessError),
  ForbiddenError: awilix.asValue(ForbiddenError),
  UnprocessableEntityError: awilix.asValue(UnprocessableEntityError)
})

container.register({
  isEmpty: awilix.asValue(isEmpty),
  parseHeader: awilix.asValue(parseHeader),
  verifyGoogleIdToken: awilix.asValue(verifyGoogleIdToken),
  verifyJWT: awilix.asValue(verifyJWT),
  signJWT: awilix.asValue(signJWT),
  constants: awilix.asValue(constants),
  mapQuery: awilix.asValue(mapQuery),
  logger: awilix.asValue(logger),
  randomNumber: awilix.asValue(randomNumber)
})

module.exports = container

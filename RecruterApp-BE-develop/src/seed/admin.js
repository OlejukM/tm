const constants = require('../utils/constants')
const UserModel = require('../models/UserModel')

module.exports = async () => {
  let admin = await UserModel.findOne({ role: constants.admin.role, email: constants.admin.email })
  if (!admin) admin = await UserModel.create(constants.admin)
  return 'Admin Confirmed...'
}

class UserDto {
  static create (user) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: user.email,
      id: user._id
    }
  }

  static createUserList (users, count) {
    return {
      items: users.map(user => this.create(user)),
      count: count
    }
  }
}

module.exports = UserDto

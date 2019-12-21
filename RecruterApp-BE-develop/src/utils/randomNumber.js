module.exports = function (length) {
  let str = ''

  for (let i = 0; i < length; i++) {
    const number = Math.random() * Math.floor(9)
    str += Math.round(number)
  }

  return str.toString()
}

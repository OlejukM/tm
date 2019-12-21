module.exports = function isEmpty (val) {
  return val === undefined || val === null || (typeof val === 'string' && !val.trim().length) || (typeof val === 'object' && !Object.keys(val).length)
}

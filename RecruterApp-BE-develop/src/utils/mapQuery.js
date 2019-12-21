module.exports = function mapQuery (query) {
  let newQuery = Object.assign({}, query)

  Object.keys(newQuery).forEach((key) => (newQuery[key] === '') && delete newQuery[key])

  if (newQuery.order) newQuery.order = newQuery.order.match(new RegExp(/asc/, 'i')) ? 1 : -1

  newQuery.limit = parseInt(newQuery.limit)
  newQuery.skip = parseInt(newQuery.skip)
  return newQuery
}

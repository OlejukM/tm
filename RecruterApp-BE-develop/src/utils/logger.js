const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
  transports: [
    new transports.File({
      filename: 'logfile.log'
    }),
    new transports.Console({
      level: 'debug',
      format: format.combine(format.simple())
    })
  ]
})

const nodemailer = require('nodemailer')
const pug = require('pug')

class MailingService {
  constructor ({ AppError, UnprocessableEntityError, logger, constants }) {
    this.AppError = AppError
    this.UnprocessableEntityError = UnprocessableEntityError
    this.logger = logger
    this.constants = constants
  }

  async sendEmail (user, emailType, params) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
      }
    })

    let mailOptions

    switch (emailType) {
      case this.constants.email_type.candidateInvitation:
        mailOptions = this.candidateInvitation(user, params, emailType)
        break

      case this.constants.email_type.notification:
        mailOptions = this.notification(user, params, emailType)
        break

      case this.constants.email_type.verification:
        mailOptions = this.verification(user, params, emailType)
        break

      case this.constants.email_type.administrationInvintation:
        mailOptions = this.administrationInvintation(user, emailType)
        break
    }

    try {
      const result = await transporter.sendMail(mailOptions)

      this.logger.info(`Message sent: ${result.messageId}`)

      return result
    } catch (err) {
      if (err instanceof this.AppError) throw err
      throw new this.AppError(err)
    }
  }

  candidateInvitation (user, params, emailType) {
    try {
      const link = `${process.env.APP_URL}/applications/${params.applicationId}`

      const emailContents = pug.renderFile(`src/utils/templates/${emailType}.pug`, {
        name: user.firstName,
        link: link
      })

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Application Invite',
        html: emailContents,
        generateTextFromHTML: true
      }
      return mailOptions
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  notification (user, params, emailType) {
    const link = `${process.env.APP_URL}/applications/${params.applicationId}`

    const emailContents = pug.renderFile(`src/utils/templates/${emailType}.pug`, {
      name: user.firstName,
      link: link
    })

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Evaluate the application',
      html: emailContents,
      generateTextFromHTML: true
    }
    return mailOptions
  }

  verification (user, params, emailType) {
    try {
      const emailContents = pug.renderFile(`src/utils/templates/${emailType}.pug`, {
        code: params.code
      })

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Verify login',
        html: emailContents,
        generateTextFromHTML: true
      }

      return mailOptions
    } catch (err) {
      throw new this.AppError(err)
    }
  }

  administrationInvintation (user, emailType) {
    try {
      const link = process.env.SIGNIN_LINK

      const emailContents = pug.renderFile(`src/utils/templates/${emailType}.pug`, {
        link: link
      })

      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Application Invite',
        html: emailContents,
        generateTextFromHTML: true
      }

      return mailOptions
    } catch (err) {
      throw new this.AppError(err)
    }
  }
}

module.exports = MailingService

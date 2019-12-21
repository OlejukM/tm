module.exports = {

  question_type: {
    text: 'text',
    code: 'code',
    video: 'video'
  },

  vacancy_status: {
    active: 'active',
    closed: 'closed',
    onHold: 'on hold'
  },

  vacancy_param: {
    title: 'title',
    status: 'status',
    created_at: 'created_at',
    type: 'type'
  },

  vacancy_type: {
    none: 'none',
    web: 'web',
    managment: 'management',
    ios: 'ios',
    android: 'android'
  },

  application_status: {
    invited: 'invited',
    started: 'started',
    completed: 'completed',
    evaluated: 'evaluated'
  },

  email_type: {
    candidateInvitation: 'candidateInvitation',
    notification: 'notification',
    verification: 'verification',
    recruiterInvintation: 'recruiterInvintation',
    administrationInvintation: 'administrationInvintation'
  },

  admin: {
    firstName: 'Test',
    lastName: 'Admin',
    email: 'testuserfortc5tm@gmail.com',
    role: 'admin'
  },

  user_role: {
    admin: 'admin',
    recruiter: 'recruiter',
    reviewer: 'reviewer',
    candidate: 'candidate'
  },

  jwt_error_names: ['TokenExpiredError', 'JsonWebTokenError', 'NotBeforeError']

}

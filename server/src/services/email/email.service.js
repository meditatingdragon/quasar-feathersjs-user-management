// Initializes the `email` service on path `/email`
const Mailer = require('feathers-mailer');
const hooks = require('./email.hooks');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use(
    '/email',
    Mailer(
      smtpTransport({
        host: app.get('smtp_host'),
        secure: true,
        auth: {
          user: app.get('smtp_user'),
          pass: app.get('smtp_pw'),
        },
      })
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('email');

  service.hooks(hooks);
};

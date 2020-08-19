// Initializes the `auth-management` service on path `/auth-management`
const authManagement = require('feathers-authentication-management');
const hooks = require('./auth-management.hooks');
const notifier = require('./notifier');

module.exports = function (app) {
  app.configure(authManagement(notifier(app)));

  // Get our initialized service so that we can register hooks
  const service = app.service('authManagement');

  service.hooks(hooks);
};

/* eslint-disable no-unused-vars */
exports.Account = class Account {
  constructor(options, app) {
    this.options = options || {};
    this.app = app;
  }

  async find(params) {
    return [];
  }

  async get(id, params) {
    return {
      id,
      text: `A new message with ID: ${id}!`,
    };
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    console.log('id', id, data);
    let user = await this.app.service('users').find({
      query: {
        email: data.email,
      },
    });
    let updatedUser = Object.assign({}, user, data.user);
    await this.app.service('users').patch(user.id, user);
    console.log('user', user);
    return data;
  }

  async remove(id, params) {
    return { id };
  }
};

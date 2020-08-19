const app = require('../../src/app');

describe('\'email\' service', () => {
  it('registered the service', () => {
    const service = app.service('email');
    expect(service).toBeTruthy();
  });
});

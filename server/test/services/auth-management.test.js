const app = require('../../src/app');

describe('\'auth-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('auth-management');
    expect(service).toBeTruthy();
  });
});

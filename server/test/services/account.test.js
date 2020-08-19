const app = require('../../src/app');

describe('\'account\' service', () => {
  it('registered the service', () => {
    const service = app.service('account');
    expect(service).toBeTruthy();
  });
});

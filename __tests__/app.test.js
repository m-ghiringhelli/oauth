const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github');

describe('github oauth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should redirect to github oauth page on login', async () => {
    const res = await request(app).get('/api/v1/github/login');

    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('should login and redirect to posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/callback?code=12')
      .redirects(1);

    console.log('res', res.body);
    
    expect(res.body).toEqual({
      id: expect.any(String),
      username: 'fake_user',
      email: 'fake_email@fake.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});

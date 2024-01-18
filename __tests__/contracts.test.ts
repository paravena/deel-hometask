import supertest from 'supertest';
import app from '../src/app';

describe('Contracts API', () => {
  let request;
  beforeEach(() => {
    request = supertest(app)
  })

  it('should return all contracts', async () => {
    console.log('DIALECT', process.env.DB_DIALECT);
    console.log('DB_FILE_NAME', process.env.DB_FILE_NAME);
    const res = await request
      .get('/api/contracts/')
      .set('profile_id', 4)
    expect(res.status).toEqual(200);
  })
})

import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

jest.mock('@sendgrid/mail');

const claimRequest = {
  claimElements: 4,
  amount: 9800,
  details: {
    overtime: 12,
    weekend: 3,
    shift: 3,
    atm: 1,
    outstation: 98000
  },
  dates: {
    overtime: '7/22/2019, 7/23/2019',
    weekend: '7/22/2019, 7/23/2019',
    shift: '7/22/2019, 7/23/2019',
    atm: '7/22/2019, 7/23/2019',
    outstation: '7/22/2019, 7/23/2019',
  }
};

describe('Create Claim Tests', () => {
  let server;
  let request;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Create claim', () => {
    let token;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN012345', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if request does not contain required props or is an empty request', async () => {
      const response = await request
        .post('/users/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ someKey: 'someValue' });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('The following props are missing: claimElements,amount,details');
    });

    it('should fail if claim request does not contain details', async () => {
      const response = await request
        .post('/users/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ ...claimRequest, details: {} });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('claim request details cannot be empty');
    });
<<<<<<< HEAD

    it('should create claim request', async () => {
=======
    
    it('should fail if props do not have values', async () => {
      const response = await request
        .post('/users/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekend: '' });

      const errorMessage = 'Please enter a value for weekend.';

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual(errorMessage);
    });

    it('should fail if the value of overtime props exceeds the maximum for the month', async () => {
      const response = await request
        .post('/users/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ weekday: 25, weekend: 14 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors.length).toEqual(2);
      expect(response.body.errors[0]).toEqual('weekday maximum value exceeded.');
      expect(response.body.errors[1]).toEqual('weekend maximum value exceeded.');
    });

    it('should successfully submit overtime request', async () => {
      jest.spyOn(EmailNotifications, 'sender').mockImplementation(() => {});

      const amount = (20 * 150) + (8 * 800);
>>>>>>> update overtimeWindowIsActive field when cron job updates overtimeWindow status
      const response = await request
        .post('/users/claim')
        .set('cookie', token)
        .set('Accept', 'application/json')
<<<<<<< HEAD
        .send(claimRequest);
=======
        .send({ weekday: 20, weekend: 8 });
>>>>>>> update overtimeWindowIsActive field when cron job updates overtimeWindow status

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Your claim request was created successfully.');
      expect(response.body.data.amount).toEqual(claimRequest.amount);
    });

    it('should update pending claim request', async () => {
      const response = await request
        .put('/users/claims/1')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(claimRequest);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim updated.');
      expect(response.body.data.amount).toEqual(claimRequest.amount);
    });
  });
});

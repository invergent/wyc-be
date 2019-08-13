import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { lineManagerHash, NCLineManagerHash } from '../testUtils';

jest.mock('@sendgrid/mail');

describe('Pending Claims Tests', () => {
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

  describe('pendingClaimsForlineManagers', () => {
    let lineManagerToken;
    let NClineManagerToken;

    beforeAll(async () => {
      // verify line manager
      const response1 = await request.get(`/line-manager/verify?hash=${lineManagerHash}`);
      lineManagerToken = response1.header['set-cookie'];

      const response2 = await request.get(`/line-manager/verify?hash=${NCLineManagerHash}`);
      NClineManagerToken = response2.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should get claims awaiting the line manager\'s approval.', async () => {
      const response = await request.get('/line-manager/claims/pending').set('cookie', lineManagerToken);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('You have 2 claims to approve.');
      expect(response.body.data.pendingClaims[0].firstname).toEqual('Molly');
      expect(response.body.data.pendingClaims[1].firstname).toEqual('Ligamala');
    });

    it('should return 404 if there are no claims for line manager to approve .', async () => {
      const response = await request.get('/line-manager/claims/pending').set('cookie', NClineManagerToken);

      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('You currently have no pending claims to approve.');
    });

    it('should fail if line manager is unauthorised.', async () => {
      const response = await request.get('/line-manager/claims/pending');
      const errorToLineManager = `Your request was unauthorised.${
        ''
      } Be sure to have clicked the button in the email you recieved.`;

      expect(response.status).toBe(401);
      expect(response.body.message).toEqual(errorToLineManager);
    });
  });
});

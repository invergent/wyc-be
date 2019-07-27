import supertest from 'supertest';
import http from 'http';
import app from '../../../app';
import { lineManagerHash } from '../testUtils';
import EmailNotifications from '../../../Application/Features/utilities/notifications/EmailNotifications';
import { companyInfo } from '../../../Application/Features/utilities/utils/general';

companyInfo.VLA = { emailAddress: 'someEmailAddress' };

jest.mock('@sendgrid/mail');

describe('Claim Approval Tests', () => {
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

  describe('Supervisor Claim Approval', () => {
    let lineManagerToken;

    beforeAll(async () => {
      // verify line manager
      const lineManagerVerificationResponse = await request.get(`/line-manager/verify?hash=${lineManagerHash}`);
      lineManagerToken = lineManagerVerificationResponse.header['set-cookie'];
    });

    beforeEach(() => jest.spyOn(EmailNotifications, 'sender').mockImplementation(() => {}));

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should fail if claim is not amongst pending claims assigned to the line manager for approval.', async () => {
      const response = await request.put('/line-manager/claims/pending/1/approve').set('cookie', lineManagerToken);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('This claim is not on your pending list. Access denied.');
    });

    it('should approve claim.', async () => {
      const response = await request.put('/line-manager/claims/pending/2/approve').set('cookie', lineManagerToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim approved.');
      expect(response.body.data.status).toEqual('Processing');
    });

    it('should decline claim.', async () => {
      const response = await request.put('/line-manager/claims/pending/5/decline').set('cookie', lineManagerToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim declined.');
      expect(response.body.data.status).toEqual('Declined');
    });

    it('should request edit on specified staff claim', async () => {
      const response = await request
        .put('/line-manager/claims/pending/3/request-edit')
        .set('cookie', lineManagerToken)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Edit requested.');
    });
  });

  describe('Staff Claim Approval (Cancelled)', () => {
    let staffToken;
    let staffToken2;

    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/signin')
        .send({ staffId: 'TN074695', password: 'password' })
        .set('Accept', 'application/json');

      staffToken = response.header['set-cookie'];

      // signin a user
      const response2 = await request
        .post('/signin')
        .send({ staffId: 'TN075595', password: 'password' })
        .set('Accept', 'application/json');

      staffToken2 = response2.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    });

    it('should fail if claim does not exist.', async () => {
      const response = await request.delete('/users/claims/10000').set('cookie', staffToken2);
      expect(response.status).toBe(404);
      expect(response.body.message).toEqual('Claim does not exist.');
    });

    it('should fail if staff is unauthorised to access claim.', async () => {
      const response = await request.delete('/users/claims/7').set('cookie', staffToken2);
      expect(response.status).toBe(401);
      expect(response.body.message).toEqual('You do not have access to this claim.');
    });

    it('should cancel claim.', async () => {
      const response = await request.delete('/users/claims/7').set('cookie', staffToken);
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Claim cancelled.');
      expect(response.body.data.status).toEqual('Cancelled');
    });

    it('Cancelling a claim in the processing stage should fail.', async () => {
      const response = await request.delete('/users/claims/8').set('cookie', staffToken2);
      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('Operation failed. Only pending claims can be cancelled.');
    });
  });
});

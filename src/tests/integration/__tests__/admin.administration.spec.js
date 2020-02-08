import supertest from 'supertest';
import http from 'http';
import app from '../../../app';

jest.mock('@sendgrid/mail');

describe('Admin Administration', () => {
  let server;
  let request;
  let token;

  beforeAll((done) => {
    server = http.createServer(app);
    server.listen(7000, done);
    request = supertest('http://init.overtime-api.example.com:7000');
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Bulk Create Staff with excel upload.', () => {
    beforeAll(async () => {
      // signin a user
      const response = await request
        .post('/admin/login')
        .send({ email: 'theadmin@init.com', password: 'password' })
        .set('Accept', 'application/json');

      token = response.header['set-cookie'];
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should fail if doc field is not provided.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('someField', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('The following fields are missing: doc');
    });

    it('should fail if file extension is neither csv nor xlsx.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.else')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('file type must be .xlsx, .csv');
    });

    it('should fail if upload document is an invalid excel file.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.xlsx')
        .set('cookie', token);

      const message = `An error occurred while processing your request.${''
      } This could be a problem with the file you uploaded.`;

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual(message);
    });

    it('should fail if excel data set contain invalid entries.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validExcelWithErrors.xlsx`, 'staff.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('4 rows contain errors.');
      expect(response.body.rowsWithErrors).toHaveLength(4);
      expect(response.body.rowsWithErrors[0]).toHaveProperty('line');
      expect(response.body.rowsWithErrors[0]).toHaveProperty('errors');
    });
    
    it('should successfully create all staff listed in the excel document.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validExcel.xlsx`, 'staff.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('10 staff created successfully.');
      expect(response.body.data).toHaveLength(10);
      expect(response.body.data[0]).toHaveProperty('staffId');
      expect(response.body.data[0]).toHaveProperty('firstname');
    });

    it('should fail if staff already exists.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validExcel.xlsx`, 'staff.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('staffId must be unique');
    });

    it('should create a single staff.', async () => {
      const response = await request
        .post('/admin/staff/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({
          staffId: 'TN343434', firstname: 'Joana', lastname: 'Molara', middlename: 'Rolis', email: 'this@email.com', phone: '80234567890', accountNumber: '00234567890'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Staff created successfully.');
    });

    it('should fail with a conflict error if staff already exists.', async () => {
      const conflictResponse = await request
        .post('/admin/staff/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({
          staffId: 'TN343434', firstname: 'Joana', lastname: 'Molara', middlename: 'Rolis', email: 'this@email.com', phone: '080234567890', accountNumber: '00234567890'
        });

      expect(conflictResponse.status).toBe(409);
      expect(conflictResponse.body.message).toEqual('Staff already exists.');
    });

    it('should fetch all staff (without admins).', async () => {
      const response = await request.get('/admin/staff?staffId=&limit=10000000&staffOnly=false').set('cookie', token);
      
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
    });

    it('should fetch a single staff.', async () => {
      const staffId = 'TN098432';
      const response = await request.get(`/admin/staff/${staffId}`).set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
      expect(response.body.data.staffId).toEqual(staffId);
    });
  });

  describe('Authorise staff to submit overtime claim for previous months in the current claim cycle', () => {
    it('should fail if permittedMonths is not an array.', async () => {
      const response = await request
        .put('/admin/staff/multiple-claims')
        .send({ staffId: 'TN098432', extraMonthsPermitted: true, extraMonthsData: { permittedMonths: 'some string' } })
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toEqual('permittedMonths is required and must be an array');
    });

    it('should fail if permittedMonths is an array but empty.', async () => {
      const response = await request
        .put('/admin/staff/multiple-claims')
        .send({ staffId: 'TN098432', extraMonthsPermitted: true, extraMonthsData: { permittedMonths: [] } })
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toEqual('List of permitted months is empty');
    });

    it('should fail if permittedMonths list contains an invalid month entry.', async () => {
      const response = await request
        .put('/admin/staff/multiple-claims')
        .send({ staffId: 'TN098432', extraMonthsPermitted: true, extraMonthsData: { permittedMonths: ['2019/you', 'Auguste'] } })
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.errors[0]).toEqual('permittedMonths contain invalid month entries');
    });

    it('should authorise a staff to submit multiple overtime claims in a month.', async () => {
      const response = await request
        .put('/admin/staff/multiple-claims')
        .send({ staffId: 'TN098432', extraMonthsPermitted: true, extraMonthsData: { permittedMonths: ['2019/07', '2019/08'] } })
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Permission granted!');
    });
  });

  describe('Bulk Create Branches with excel upload.', () => {
    it('should fail if excel data set contain invalid entries.', async () => {
      const response = await request
        .post('/admin/branch')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validBranchesWithErrors.xlsx`, 'branches.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('4 rows contain errors.');
      expect(response.body.rowsWithErrors).toHaveLength(4);
      expect(response.body.rowsWithErrors[0]).toHaveProperty('line');
      expect(response.body.rowsWithErrors[0]).toHaveProperty('errors');
    });

    it('should successfully create all branches listed in the excel document.', async () => {
      const response = await request
        .post('/admin/branch')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validBranches.xlsx`, 'branches.xlsx')
        .set('cookie', token);
      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('10 branches created successfully.');
      expect(response.body.data).toHaveLength(10);
      expect(response.body.data[0]).toHaveProperty('solId');
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('address');
    });

    it('should fail if branch already exists.', async () => {
      const response = await request
        .post('/admin/branch')
        .set('Content-Type', 'multipart/form-data')
        .attach('doc', `${__dirname}/testFiles/validBranches.xlsx`, 'branches.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('There was an error creating branches ERR500CRTBRC.');
    });

    it('should create a single branch.', async () => {
      const response = await request
        .post('/admin/branch/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ solId: '989', name: 'Molara', address: 'this is an address' });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Branch created successfully.');
    });

    it('should fail with a conflict error if branch already exists.', async () => {
      const response = await request
        .post('/admin/branch/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ solId: '989', name: 'Molara', address: 'this is an address' });

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('Branch already exists.');
    });
  });

  describe('Manage holidays.', () => {
    const holiday = { yearMonth: '2019/10', fullDate: 'some date string' };

    it('should fail if a field\'s value is invalid or not set.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ name: '', yearMonth: '2019' });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors).toHaveLength(1);
    });

    it('should add holiday.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(holiday);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Holiday added!');
      expect(response.body.data.yearMonth).toEqual(holiday.yearMonth);
      expect(response.body.data.fullDate).toEqual(holiday.fullDate);
    });

    it('should respond with a conflict response if day already exists.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(holiday);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('Holiday already exists');
      expect(response.body.data.yearMonth).toEqual(holiday.yearMonth);
      expect(response.body.data.fullDate).toEqual(holiday.fullDate);
    });

    it('should fetch all holidays.', async () => {
      const response = await request.get('/admin/holidays').set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Found 1 holidays');
      expect(response.body.data).toHaveLength(1);
    });

    it('should fail if holiday not found.', async () => {
      const response = await request
        .delete('/admin/holidays?fullDate="some date string"')
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Holiday not found.');
    });

    it('should remove holiday.', async () => {
      const response = await request
        .delete('/admin/holidays?fullDate=some date string')
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Holiday removed!');
    });
  });

  describe('Claim administration.', () => {
    it('should fetch a single claim.', async () => {
      const response = await request.get('/admin/claims/2').set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful!');
      expect(response.body.data).toHaveProperty('claimElements');
      expect(response.body.data).toHaveProperty('monthOfClaim');
    });

    it('should respond with a 403 fail error if staff has already changed password.', async () => {
      const response = await request
        .post('/admin/staff/resend-credentials')
        .send({ staffId: 'TN098432' })
        .set('cookie', token);

      expect(response.status).toBe(403);
      expect(response.body.message).toEqual('Password already changed');
    });

    it('should successfully resend activation email.', async () => {
      const response = await request
        .post('/admin/staff/resend-credentials')
        .send({ staffId: 'TN012345' })
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Activation email resent!');
    });
  });
});

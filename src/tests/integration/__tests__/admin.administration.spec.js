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

    it('should fail if excelDoc field is not provided.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('someField', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('The following fields are missing: excelDoc');
    });

    it('should fail if file extension is not xlsx.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('excelDoc', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.else')
        .set('cookie', token);

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors[0]).toEqual('file type must be xlsx');
    });

    it('should fail if upload document is an invalid xlsx file.', async () => {
      const response = await request
        .post('/admin/staff')
        .set('Content-Type', 'multipart/form-data')
        .attach('excelDoc', `${__dirname}/testFiles/invalidExcel.xlsx`, 'invalidExcel.xlsx')
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
        .attach('excelDoc', `${__dirname}/testFiles/validExcelWithErrors.xlsx`, 'staff.xlsx')
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
        .attach('excelDoc', `${__dirname}/testFiles/validExcel.xlsx`, 'staff.xlsx')
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
        .attach('excelDoc', `${__dirname}/testFiles/validExcel.xlsx`, 'staff.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('staffId must be unique');
    });
  });

  describe('Bulk Create Branches with excel upload.', () => {
    it('should fail if excel data set contain invalid entries.', async () => {
      const response = await request
        .post('/admin/branch')
        .set('Content-Type', 'multipart/form-data')
        .attach('excelDoc', `${__dirname}/testFiles/validBranchesWithErrors.xlsx`, 'branches.xlsx')
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
        .attach('excelDoc', `${__dirname}/testFiles/validBranches.xlsx`, 'branches.xlsx')
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
        .attach('excelDoc', `${__dirname}/testFiles/validBranches.xlsx`, 'branches.xlsx')
        .set('cookie', token);

      expect(response.status).toBe(500);
      expect(response.body.message).toEqual('There was an error creating branches ERR500CRTBRC.');
    });

    it('should create a single branch.', async () => {
      const response = await request
        .post('/admin/branch/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ solId: '9898', name: 'Molara', address: 'this is an address' });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Branch created successfully.');
    });

    it('should create a single staff.', async () => {
      const response = await request
        .post('/admin/staff/single')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({
          staffId: 'TN343434', firstname: 'Joana', lastname: 'Molara', middlename: 'Rolis', email: 'this@email.com', phone: '080234567890', accountNumber: '00234567890'
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Staff created successfully.');
    });

    it('should fetch all staff.', async () => {
      const response = await request
        .get('/admin/staff')
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Request successful');
    });
  });

  describe('Mark Claim As Completed.', () => {
    it('should mark claims with status "Processing" as "Completed".', async () => {
      const response = await request.put('/admin/claims/completed').set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Successfully marked 3 claims as completed.');
    });

    it('should not update if there are no claims with "Processing" status.', async () => {
      const response = await request.put('/admin/claims/completed').set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('No claims were marked as completed.');
    });
  });

  describe('Manage holidays.', () => {
    const holiday = { month: 6, date: 8, fullDate: 'some date string' };

    it('should fail if a field\'s value is invalid or not set.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send({ name: '', date: 41, month: 16 });

      expect(response.status).toBe(400);
      expect(response.body.message).toEqual('validationErrors');
      expect(response.body.errors).toHaveLength(3);
    });

    it('should add holiday.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(holiday);

      expect(response.status).toBe(201);
      expect(response.body.message).toEqual('Holiday added!');
      expect(response.body.data.month).toEqual(holiday.month);
      expect(response.body.data.date).toEqual(holiday.date);
    });

    it('should respond with a conflict response if day already exists.', async () => {
      const response = await request.post('/admin/holidays')
        .set('cookie', token)
        .set('Accept', 'application/json')
        .send(holiday);

      expect(response.status).toBe(409);
      expect(response.body.message).toEqual('Holiday already exists');
      expect(response.body.data.month).toEqual(holiday.month);
      expect(response.body.data.date).toEqual(holiday.date);
    });

    it('should fetch all holidays.', async () => {
      const response = await request.get('/admin/holidays').set('cookie', token);
      console.log(response.body)
      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Found 2 holidays');
      expect(response.body.data).toHaveLength(2);
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
        .delete('/admin/holidays?fullDate=2019-08-09T22:23:33.739Z')
        .set('cookie', token);

      expect(response.status).toBe(200);
      expect(response.body.message).toEqual('Holiday removed!');
    });
  });
});
